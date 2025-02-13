"use client";

import { PropertyResponse } from "@/lib/wordpress.d";
import Image from "next/image";
import Link from "next/link";
import { Map, Marker, ZoomControl } from "pigeon-maps";
import { useEffect, useState } from "react";

interface SearchMapProps {
  properties: PropertyResponse[];
}

export function SearchMap({ properties }: SearchMapProps) {
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lon: number;
  } | null>(null);
  const [selectedProperty, setSelectedProperty] =
    useState<PropertyResponse | null>(null);

  // Get user's location
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location:", error);
          // Default to Bogotá center if location access is denied
          setUserLocation({ lat: 4.6097, lon: -74.0817 });
        }
      );
    }
  }, []);

  if (!userLocation) {
    return (
      <div className="w-full h-[70vh] bg-gray-100 rounded-lg animate-pulse" />
    );
  }

  const handleMarkerClick = (property: PropertyResponse) => {
    setSelectedProperty(property);
  };

  // Filter properties that have coordinates
  const propertiesWithCoords = properties.filter(
    (property) => property.coordinates?.lat && property.coordinates?.lon
  );

  return (
    <div className="w-full h-[70vh] relative rounded-lg overflow-hidden shadow-md bg-secondary">
      <Map
        defaultCenter={[userLocation.lat, userLocation.lon]}
        defaultZoom={13}
        dprs={[1, 2]}
        attribution={false}
        onClick={(e) => {
          // set properties to null if clicked outside of markers
          setSelectedProperty(null);
        }}
      >
        <ZoomControl />

        {/* User location marker */}
        <Marker
          width={50}
          anchor={[userLocation.lat, userLocation.lon]}
          className="relative inline-flex size-5 rounded-full bg-blue-600  border-2 border-white after:absolute  after:inset-0  after:-z-10 after:size-full after:rounded-full  after:bg-blue-600  after:opacity-90  after:animate-ping  after:[animation-duration:3s]  after:content-['']"
        />

        {/* Property markers */}
        {propertiesWithCoords.map((property) => (
          <Marker
            key={property.id}
            width={50}
            anchor={[
              parseFloat(String(property.coordinates!.lat)),
              parseFloat(String(property.coordinates!.lon)),
            ]}
            color={selectedProperty?.id === property.id ? "#ff4444" : "#2ECC71"}
            onClick={() => handleMarkerClick(property)}
          />
        ))}
      </Map>

      {/* Optional: Popup for selected property */}
      {selectedProperty && (
        <div className="absolute bottom-4 left-4 right-4 bg-background text-foreground p-3 rounded-lg shadow-lg md:max-w-sm flex gap-4">
          <div className="relative bg-muted w-32">
            <Image
              src={selectedProperty.featured_image_url as string}
              alt={selectedProperty.frontend?.title as string}
              width={400}
              height={400}
              className="object-cover rounded-md"
            />
          </div>
          <div className="py-2">
            <Link href={String(selectedProperty.frontend?.path)}>
              <h3 className="font-semibold text-black">
                {selectedProperty.frontend?.title}
              </h3>
            </Link>
            <p className="text-sm">{selectedProperty.direccion}</p>
            {selectedProperty.precio_lista && (
              <p className="text-sm font-medium">
                {selectedProperty.precio_lista}
              </p>
            )}
            {selectedProperty.area_cons && (
              <p className="text-sm">{selectedProperty.area_cons} m²</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
