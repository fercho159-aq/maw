import { NextRequest, NextResponse } from 'next/server';

/**
 * Proxy API that fetches an external site's HTML, injects:
 * 1. History API patches (prevents SecurityError from replaceState/pushState)
 * 2. Scroll position reporter (sends scroll data to parent via postMessage)
 *
 * This lets the feedback overlay track the iframe's scroll position
 * without cross-origin restrictions.
 */
export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'Missing url parameter' }, { status: 400 });
  }

  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': req.headers.get('user-agent') || 'Mozilla/5.0',
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': req.headers.get('accept-language') || 'en-US,en;q=0.5',
      },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: `Failed to fetch: ${res.status}` },
        { status: res.status }
      );
    }

    let html = await res.text();

    const parsedUrl = new URL(url);
    const baseUrl = `${parsedUrl.protocol}//${parsedUrl.host}`;

    // ── 1. Inject History API patches at the VERY TOP of <head> ──
    // This MUST run before any framework scripts (Next.js, etc.) to prevent
    // SecurityError from replaceState/pushState with cross-origin URLs.
    const historyPatch = `
<script data-feedback-patch="true">
(function(){
  // 1. Patch History API to suppress cross-origin SecurityErrors
  var origPush = history.pushState;
  var origReplace = history.replaceState;
  history.pushState = function(s, t, u) {
    try { return origPush.call(this, s, t, u); } catch(e) {}
  };
  history.replaceState = function(s, t, u) {
    try { return origReplace.call(this, s, t, u); } catch(e) {}
  };

  // 2. Patch fetch to redirect RSC/prefetch requests to the real domain
  var origFetch = window.fetch;
  var realBase = '${baseUrl}';
  window.fetch = function(input, init) {
    try {
      var url = '';
      if (typeof input === 'string') {
        url = input;
      } else if (input instanceof Request) {
        url = input.url;
      } else if (input && input.url) {
        url = input.url;
      }
      
      var isLocalhost = url.indexOf(window.location.origin) === 0;
      var isRelative = url.startsWith('/') && !url.startsWith('/api/site-proxy');
      
      if (isLocalhost || isRelative) {
        var headers = (init && init.headers) || {};
        if (input instanceof Request) {
          headers = Object.fromEntries(input.headers.entries());
        }
        
        var isRsc = url.indexOf('_rsc=') !== -1 ||
          url.indexOf('__next') !== -1 ||
          headers['Next-Router-Prefetch'] === '1' ||
          headers['RSC'] === '1' ||
          headers['x-now-route-matches'] ||
          url.indexOf('?') !== -1; // catch-all for Next.js query params if needed
          
        if (isRsc || isLocalhost) {
          // Replace localhost with the real site base
          var newUrl = isLocalhost ? url.replace(window.location.origin, realBase) : (realBase + url);
          
          if (input instanceof Request) {
            input = new Request(newUrl, input);
          } else {
            input = newUrl;
          }
        }
      }
    } catch(e) {}
    return origFetch.call(this, input, init);
  };
  // 3. Intercept link clicks to keep navigation inside the proxy
  document.addEventListener('click', function(e) {
    var a = e.target.closest('a');
    if (!a) return;
    
    // Allow Next.js internal router to handle it if it wants, 
    // but if it's a hard link that would navigate the browser, notify parent
    var href = a.getAttribute('href');
    if (href && !href.startsWith('#') && !href.startsWith('javascript:')) {
      // Calculate absolute URL based on base href
      var absUrl = new URL(href, realBase).href;
      
      // Post message to parent to handle the navigation
      window.parent.postMessage({
        type: 'feedback-navigate',
        url: absUrl
      }, '*');
      
      // Prevent default to stop iframe from breaking out of proxy
      e.preventDefault();
      e.stopPropagation();
    }
  }, true);

})();
</script>`;

    // Inject right after <head> opening tag
    html = html.replace(/(<head[^>]*>)/i, `$1\n${historyPatch}`);

    // ── 2. Add <base href> so relative URLs resolve to the real domain ──
    if (!html.includes('<base')) {
      html = html.replace(
        /(<head[^>]*>)/i,
        `$1\n<base href="${baseUrl}/">`
      );
    }

    // ── 3. Inject scroll reporter before </body> ──
    const scrollScript = `
<script data-feedback-scroll="true">
(function() {
  function report() {
    window.parent.postMessage({
      type: 'feedback-scroll',
      scrollY: window.scrollY || window.pageYOffset || 0,
      scrollX: window.scrollX || window.pageXOffset || 0,
      documentHeight: Math.max(
        document.body.scrollHeight || 0,
        document.body.offsetHeight || 0,
        document.documentElement.clientHeight || 0,
        document.documentElement.scrollHeight || 0,
        document.documentElement.offsetHeight || 0
      ),
      viewportHeight: window.innerHeight,
      viewportWidth: window.innerWidth
    }, '*');
  }
  var ticking = false;
  window.addEventListener('scroll', function() {
    if (!ticking) {
      requestAnimationFrame(function() { report(); ticking = false; });
      ticking = true;
    }
  }, { passive: true });
  window.addEventListener('resize', report, { passive: true });
  window.addEventListener('load', report);
  report();
  setInterval(report, 500);
})();
</script>`;

    html = html.replace('</body>', `${scrollScript}\n</body>`);

    return new NextResponse(html, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        // Allow framing from our own origin only
        'X-Frame-Options': 'SAMEORIGIN',
        // Remove any CSP frame-ancestors that might block embedding
        'Content-Security-Policy': '',
      },
    });
  } catch (error) {
    console.error('Site proxy error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch site' },
      { status: 500 }
    );
  }
}
