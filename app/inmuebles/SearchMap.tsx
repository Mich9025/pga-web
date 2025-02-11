"use client";

import { PropertyResponse } from "@/lib/wordpress.d";
import Image from "next/image";
import Link from "next/link";
import { Map, Marker } from "pigeon-maps";
import { useEffect, useState } from "react";

interface SearchMapProps {
  properties: PropertyResponse[];
}

export function SearchMap({ properties }: SearchMapProps) {
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lon: number;
  } | null>(null);
  const [propertiesWithCoords, setPropertiesWithCoords] = useState<
    PropertyResponse[]
  >([]);
  const [selectedProperty, setSelectedProperty] =
    useState<PropertyResponse | null>(null);
  const [isLoadingCoords, setIsLoadingCoords] = useState(true);

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

  // Get coordinates for all properties
  useEffect(() => {
    const getCoordinates = async (property: PropertyResponse) => {
      if (property.coordinates) return property; // Use cached coordinates if available

      try {
        const searchAddress = `${property.direccion}, Bogotá, Colombia`;
        const encodedAddress = encodeURIComponent(searchAddress);
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodedAddress}&limit=1`
        );
        const data = await response.json();

        if (data && data[0]) {
          return {
            ...property,
            coordinates: {
              lat: parseFloat(data[0].lat),
              lon: parseFloat(data[0].lon),
            },
          };
        }
        return property;
      } catch (error) {
        console.error("Error getting coordinates for property:", error);
        return property;
      }
    };

    const getAllCoordinates = async () => {
      setIsLoadingCoords(true);
      // Add delay between requests to avoid rate limiting
      const updatedProperties = [];
      for (const property of properties) {
        const updatedProperty = await getCoordinates(property);
        updatedProperties.push(updatedProperty);
        await new Promise((resolve) => setTimeout(resolve, 1000)); // 1 second delay
      }
      setPropertiesWithCoords(updatedProperties.filter((p) => p.coordinates));
      setIsLoadingCoords(false);
    };

    getAllCoordinates();
  }, [properties]);

  if (!userLocation || isLoadingCoords) {
    return (
      <div className="w-full h-[70vh] bg-gray-100 rounded-lg animate-pulse" />
    );
  }

  const handleMarkerClick = (property: PropertyResponse) => {
    setSelectedProperty(property);
    // if (onSelectProperty) {
    //   onSelectProperty(property);
    // }
  };

  return (
    <div className="w-full h-[70vh] relative rounded-lg overflow-hidden shadow-md bg-secondary">
      <Map
        defaultCenter={[userLocation.lat, userLocation.lon]}
        defaultZoom={13}
        dprs={[1, 2]}
        attribution={false}
      >
        {/* User location marker */}
        <Marker
          width={50}
          anchor={[userLocation.lat, userLocation.lon]}
          color="#4A90E2"
        />

        {/* Property markers */}
        {propertiesWithCoords.map((property) => (
          <Marker
            key={property.id}
            width={50}
            anchor={[property.coordinates!.lat, property.coordinates!.lon]}
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
