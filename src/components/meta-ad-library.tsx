
"use client";

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Search, AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from './ui/label';

const adCategories = {
    "ALL": "Todos los anuncios",
    "POLITICAL_AND_ISSUE_ADS": "Temas sociales, elecciones o política"
};

const countries = {
    "MX": "México",
    "US": "Estados Unidos",
    "ES": "España",
    "CO": "Colombia",
    "AR": "Argentina",
    "ALL": "Todos los países"
};

const MetaAdLibrary = () => {
  const [keyword, setKeyword] = useState('');
  const [country, setCountry] = useState('MX');
  const [adCategory, setAdCategory] = useState('ALL');
  const [searchUrl, setSearchUrl] = useState('');
  const [error, setError] = useState('');

  const handleAnalyze = () => {
    if (!keyword) {
      setError('Por favor, ingresa un término de búsqueda (ej. el nombre de una marca).');
      return;
    }

    setError('');
    const url = `https://www.facebook.com/ads/library/?active_status=all&ad_type=${adCategory}&country=${country}&q=${encodeURIComponent(keyword)}&search_type=keyword_unordered&media_type=all`;
    setSearchUrl(url);
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
                <Label htmlFor='country-select'>País</Label>
                <Select value={country} onValueChange={setCountry}>
                    <SelectTrigger id="country-select">
                        <SelectValue placeholder="Seleccionar País" />
                    </SelectTrigger>
                    <SelectContent>
                        {Object.entries(countries).map(([code, name]) => (
                            <SelectItem key={code} value={code}>{name}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
             <div>
                <Label htmlFor='category-select'>Categoría de Anuncio</Label>
                <Select value={adCategory} onValueChange={setAdCategory}>
                    <SelectTrigger id="category-select">
                        <SelectValue placeholder="Seleccionar Categoría" />
                    </SelectTrigger>
                    <SelectContent>
                         {Object.entries(adCategories).map(([code, name]) => (
                            <SelectItem key={code} value={code}>{name}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <Input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Introduce un nombre o palabra clave"
            className="flex-grow"
          />
          <Button onClick={handleAnalyze} className="w-full sm:w-auto">
            <Search className="w-4 h-4 mr-2" />
            Buscar Anuncios
          </Button>
        </div>
        
        {error && (
            <Alert variant="destructive" className="mb-4">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        )}

        {searchUrl && (
          <div className="aspect-video w-full bg-muted rounded-lg overflow-hidden border">
            <iframe
              src={searchUrl}
              title="Meta Ad Library"
              className="w-full h-full"
              sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MetaAdLibrary;
