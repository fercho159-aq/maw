import { NextRequest, NextResponse } from 'next/server';

interface BusinessData {
    nombre: string;
    categoria: string;
    direccion: string;
    telefono: string;
    sitio_web: string;
    calificacion: string;
    num_resenas: string;
    url: string;
}

// Check if we should use browserless.io in production
const BROWSERLESS_API_KEY = process.env.BROWSERLESS_API_KEY;
const USE_BROWSERLESS = !!BROWSERLESS_API_KEY;

async function getBrowser() {
    if (USE_BROWSERLESS) {
        // Use browserless.io for production
        const puppeteer = await import('puppeteer-core');

        const browserWSEndpoint = `wss://chrome.browserless.io?token=${BROWSERLESS_API_KEY}`;

        return await puppeteer.default.connect({
            browserWSEndpoint,
        });
    } else {
        // Local development: use regular puppeteer
        const puppeteer = await import('puppeteer');

        return await puppeteer.default.launch({
            headless: true,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-blink-features=AutomationControlled',
                '--lang=es'
            ],
        });
    }
}

export async function POST(request: NextRequest) {
    let browser = null;

    try {
        const { url, maxResults = 50, scrolls = 20 } = await request.json();

        if (!url || !url.includes('google.com/maps')) {
            return NextResponse.json(
                { error: 'URL de Google Maps inválida' },
                { status: 400 }
            );
        }

        // Check if service is available
        if (!USE_BROWSERLESS && process.env.NODE_ENV === 'production') {
            return NextResponse.json(
                {
                    error: 'Servicio no disponible',
                    details: 'Esta herramienta requiere configuración adicional para funcionar en producción. Por favor, contacta al administrador o usa la versión local.',
                    localOnly: true
                },
                { status: 503 }
            );
        }

        console.log('Iniciando scraper...');
        browser = await getBrowser();
        const page = await browser.newPage();

        // Set user agent to avoid detection
        await page.setUserAgent(
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        );

        await page.setViewport({ width: 1280, height: 800 });

        console.log('Navegando a:', url);
        await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });

        // Wait for results to load
        await page.waitForSelector('[role="feed"]', { timeout: 15000 }).catch(() => {
            console.log('No se encontró feed, intentando con selector alternativo...');
        });

        // Scroll to load more results
        console.log(`Realizando ${scrolls} scrolls...`);
        for (let i = 0; i < scrolls; i++) {
            await page.evaluate(() => {
                const feed = document.querySelector('[role="feed"]') ||
                    document.querySelector('.m6QErb.DxyBCb.kA9KIf.dS8AEf');
                if (feed) {
                    feed.scrollTop = feed.scrollHeight;
                }
            });
            await new Promise(resolve => setTimeout(resolve, 1000));
        }

        // Collect all business links
        const businessLinks: string[] = await page.evaluate(() => {
            const links: string[] = [];
            const elements = document.querySelectorAll('a.hfpxzc');
            elements.forEach((el) => {
                const href = el.getAttribute('href');
                if (href && href.includes('/maps/place/')) {
                    links.push(href);
                }
            });
            return links;
        });

        console.log(`Encontrados ${businessLinks.length} negocios`);

        // Limit results
        const linksToProcess = businessLinks.slice(0, maxResults);
        const businesses: BusinessData[] = [];

        // Extract data from each business
        for (let i = 0; i < linksToProcess.length; i++) {
            const link = linksToProcess[i];
            console.log(`Procesando ${i + 1}/${linksToProcess.length}`);

            try {
                await page.goto(link, { waitUntil: 'networkidle2', timeout: 30000 });
                await new Promise(resolve => setTimeout(resolve, 1500));

                const businessData = await page.evaluate(() => {
                    const getData = (selector: string): string => {
                        const el = document.querySelector(selector);
                        return el?.textContent?.trim() || '';
                    };

                    // Get name
                    const nombre = getData('h1.DUwDvf');

                    // Get category
                    const categoria = getData('button.DkEaL');

                    // Get address
                    let direccion = '';
                    const addressBtn = document.querySelector('button[data-item-id="address"]');
                    if (addressBtn) {
                        const ariaLabel = addressBtn.getAttribute('aria-label') || '';
                        direccion = ariaLabel.replace('Dirección: ', '').replace('Address: ', '');
                    }

                    // Get phone
                    let telefono = '';
                    const phoneBtn = document.querySelector('button[data-item-id*="phone"]');
                    if (phoneBtn) {
                        const ariaLabel = phoneBtn.getAttribute('aria-label') || '';
                        telefono = ariaLabel.replace('Teléfono: ', '').replace('Phone: ', '');
                    }

                    // Get website
                    let sitio_web = '';
                    const websiteLink = document.querySelector('a[data-item-id="authority"]');
                    if (websiteLink) {
                        sitio_web = websiteLink.getAttribute('href') || '';
                    }

                    // Get rating
                    let calificacion = '';
                    const ratingEl = document.querySelector('span.ceNzKf');
                    if (ratingEl) {
                        calificacion = ratingEl.getAttribute('aria-label') || '';
                    }

                    // Get number of reviews
                    let num_resenas = '';
                    const reviewElements = document.querySelectorAll('span.F7nice');
                    if (reviewElements.length > 1) {
                        num_resenas = reviewElements[1].textContent || '';
                    }

                    return {
                        nombre,
                        categoria,
                        direccion,
                        telefono,
                        sitio_web,
                        calificacion,
                        num_resenas,
                        url: window.location.href
                    };
                });

                if (businessData.nombre) {
                    businesses.push(businessData);
                }

            } catch (err) {
                console.error(`Error procesando negocio ${i + 1}:`, err);
                continue;
            }
        }

        // Disconnect (for browserless) or close (for local)
        if (USE_BROWSERLESS) {
            await browser.disconnect();
        } else {
            await browser.close();
        }
        browser = null;

        return NextResponse.json({
            success: true,
            total: businesses.length,
            data: businesses
        });

    } catch (error) {
        console.error('Error en scraping:', error);

        if (browser) {
            try {
                if (USE_BROWSERLESS) {
                    await browser.disconnect();
                } else {
                    await browser.close();
                }
            } catch {
                // Ignore cleanup errors
            }
        }

        const errorMessage = error instanceof Error ? error.message : 'Error desconocido';

        // Check for common errors and provide helpful messages
        if (errorMessage.includes('Could not find Chrome') || errorMessage.includes('executablePath')) {
            return NextResponse.json(
                {
                    error: 'Chrome no disponible',
                    details: 'Esta herramienta requiere Chrome para funcionar. En servidores en la nube, necesitas configurar BROWSERLESS_API_KEY.',
                    localOnly: true
                },
                { status: 503 }
            );
        }

        return NextResponse.json(
            {
                error: 'Error al procesar la solicitud',
                details: errorMessage
            },
            { status: 500 }
        );
    }
}

// Configure for serverless with longer timeout
export const maxDuration = 300; // 5 minutes max for Vercel Pro
export const dynamic = 'force-dynamic';
