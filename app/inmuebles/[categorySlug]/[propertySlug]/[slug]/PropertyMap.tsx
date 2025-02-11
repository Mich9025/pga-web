"use client";

import { Map, Marker } from "pigeon-maps";
import { useEffect, useState } from "react";

interface MapProps {
  address: string;
}

export function PropertyMap({ address }: MapProps) {
  const [coordinates, setCoordinates] = useState<{
    lat: number;
    lon: number;
  } | null>(null);

  useEffect(() => {
    const getCoordinates = async () => {
      try {
        const searchAddress = `${address}, Bogotá, Colombia`;
        const encodedAddress = encodeURIComponent(searchAddress);

        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodedAddress}&limit=1`
        );

        const data = await response.json();

        if (data && data[0]) {
          setCoordinates({
            lat: parseFloat(data[0].lat),
            lon: parseFloat(data[0].lon),
          });
        }
      } catch (error) {
        console.error("Error getting coordinates:", error);
      }
    };

    getCoordinates();
  }, [address]);

  if (!coordinates) {
    return (
      <div className="w-full h-[50vh] bg-gray-100 rounded-lg animate-pulse" />
    );
  }

  // const maptilerProvider = maptiler("MY_API_KEY", "streets");
  return (
    <div className="w-full h-[50vh] relative rounded-lg overflow-hidden shadow-md">
      <Map
        // provider={maptilerProvider}
        defaultCenter={[coordinates.lat, coordinates.lon]}
        defaultZoom={17}
        dprs={[1, 2]} // this provider supports HiDPI tiles
        attribution={false}
      >
        <Marker
          width={50}
          anchor={[coordinates.lat, coordinates.lon]}
          color="#ff4444"
        />
      </Map>
    </div>
  );
}
