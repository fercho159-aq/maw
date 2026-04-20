
"use client";

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Search, AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';

const PageSpeedInsights = () => {
  const [url, setUrl] = useState('');
  const [analysisUrl, setAnalysisUrl] = useState('');
  const [error, setError] = useState('');

  const handleAnalyze = () => {
    if (!url) {
      setError('Por favor, ingresa una URL.');
      return;
    }

    let formattedUrl = url;
    if (!/^https?:\/\//i.test(url)) {
        formattedUrl = `https://${url}`;
    }

    try {
        const urlObject = new URL(formattedUrl);
        setError('');
        setAnalysisUrl(`https://pagespeed.web.dev/analysis?url=${encodeURIComponent(urlObject.href)}&hl=es`);
    } catch (e) {
        setError('La URL que ingresaste no es válida.');
        setAnalysisUrl('');
    }
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <Input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Introduce la URL de tu sitio web (ej. misitio.com)"
            className="flex-grow"
          />
          <Button onClick={handleAnalyze} className="w-full sm:w-auto">
            <Search className="w-4 h-4 mr-2" />
            Analizar Velocidad
          </Button>
        </div>
        
        {error && (
            <Alert variant="destructive" className="mb-4">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        )}

        {analysisUrl && (
          <div className="aspect-video w-full bg-muted rounded-lg overflow-hidden border">
            <iframe
              src={analysisUrl}
              title="Google PageSpeed Insights"
              className="w-full h-full"
              sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PageSpeedInsights;
