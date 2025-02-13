"use client";

import { PropertyResponse } from "@/lib/wordpress.d";
import { Map, Marker, ZoomControl } from "pigeon-maps";
import { useState } from "react";

export function PropertyMap({ property }: { property: PropertyResponse }) {
  const coordinates_lat = parseFloat(String(property.coordinates?.lat));
  const coordinates_long = parseFloat(String(property.coordinates?.lon));

  const [zoom, setZoom] = useState(17);
  const [center, setCenter] = useState<[number, number]>(
    coordinates_lat && coordinates_long
      ? [coordinates_lat, coordinates_long]
      : [0, 0]
  );

  if (!coordinates_lat || !coordinates_long) {
    return (
      <div className="w-full h-[50vh] bg-gray-100 rounded-lg animate-pulse" />
    );
  }

  const position: [number, number] = [coordinates_lat, coordinates_long];

  return (
    <div className="w-full h-[50vh] relative rounded-lg overflow-hidden shadow-md">
      {/*
      <pre className="text-xs fixed bg-foreground text-background z-50 top-3 right-3 p-4 font-bold">
        {JSON.stringify(
          {
            coordinates_lat,
            coordinates_long,
            center,
            zoom,
            position,
          },
          null,
          2
        )}
      </pre> 
      */}
      <Map
        center={center}
        zoom={zoom}
        onBoundsChanged={({ center, zoom }) => {
          setCenter(center);
          setZoom(zoom);
        }}
        dprs={[1, 2]}
        attribution={false}
      >
        <ZoomControl />

        {coordinates_lat && coordinates_long && (
          <Marker
            width={50}
            anchor={position}
            color="#ff4444"
            key="property-marker"
          />
        )}
      </Map>
    </div>
  );
}
