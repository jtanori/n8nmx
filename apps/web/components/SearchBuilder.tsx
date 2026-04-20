'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Trash2 } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix para iconos de Leaflet en Next.js
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon.src,
  shadowUrl: iconShadow.src,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

// Importación dinámica del mapa para evitar errores de SSR
const MapContainer = dynamic(() => import('react-leaflet').then((m) => m.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then((m) => m.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then((m) => m.Marker), { ssr: false });
const Circle = dynamic(() => import('react-leaflet').then((m) => m.Circle), { ssr: false });
const useMapEvents = dynamic(() => import('react-leaflet').then((m) => m.useMapEvents), { ssr: false });

function MapEvents({ onMapClick }: { onMapClick: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e: any) {
      onMapClick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

export const SearchBuilder = () => {
  const [locations, setLocations] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleMapClick = (lat: number, lng: number) => {
    const newLoc = {
      id: crypto.randomUUID(),
      city_name: `Punto (${lat.toFixed(2)}, ${lng.toFixed(2)})`,
      lat,
      lng,
      radius: 5000 
    };
    setLocations([...locations, newLoc]);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      <Card className="md:col-span-1">
        <CardHeader>
          <CardTitle>Configurar Búsqueda</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">¿Qué buscas?</label>
            <Input 
              placeholder="Ej. Talleres, Hoteles..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Destinos seleccionados</label>
            <div className="flex flex-wrap gap-2">
              {locations.map((loc) => (
                <Badge key={loc.id} variant="secondary" className="flex gap-1 items-center">
                  <MapPin size={12} /> {loc.city_name}
                  <Trash2 
                    size={12} 
                    className="cursor-pointer text-destructive" 
                    onClick={() => setLocations(locations.filter(l => l.id !== loc.id))}
                  />
                </Badge>
              ))}
            </div>
          </div>
          
          <Button className="w-full" disabled={locations.length === 0 || !searchTerm}>
            Guardar Tarea de Prospección
          </Button>
        </CardContent>
      </Card>

      <Card className="md:col-span-2 h-[500px] overflow-hidden">
        <MapContainer center={[29.089, -110.961]} zoom={7} className="h-full w-full">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <MapEvents onMapClick={handleMapClick} />
          {locations.map((loc) => (
            <React.Fragment key={loc.id}>
              <Marker position={[loc.lat, loc.lng]} />
              <Circle center={[loc.lat, loc.lng]} radius={loc.radius} color="red" />
            </React.Fragment>
          ))}
        </MapContainer>
      </Card>
    </div>
  );
};
