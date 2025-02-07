import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { WooProduct } from "@/lib/wordpress.d";
import Image from "next/image";
import Link from "next/link";

interface PropertyCardProps {
  property: WooProduct;
}

export function PropertyCard({ property }: PropertyCardProps) {
  // Extract metadata
  const precio = property.meta_data.find((m) => m.key === "price")
    ?.value as string;
  const area = property.meta_data.find((m) => m.key === "area")
    ?.value as string;
  const habitaciones = property.meta_data.find((m) => m.key === "habitaciones")
    ?.value as string;
  const banos = property.meta_data.find((m) => m.key === "banos")
    ?.value as string;
  const parking = property.meta_data.find((m) => m.key === "parking")
    ?.value as string;

  return (
    <Card className="group overflow-hidden">
      <Link href={`/inmuebles/${property.slug}`}>
        <CardHeader className="p-0 relative aspect-square">
          {/* Main Image */}
          {property.images?.[0] && (
            <Image
              src={property.images[0].src}
              alt={property.name}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
          )}
          {/* Status Badge */}
          <Badge className="absolute top-4 left-4 z-10" variant="secondary">
            {property.status === "publish" ? "Active" : property.status}
          </Badge>
          {/* Favorite Button */}
          {/* <button
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
            onClick={(e) => {
              e.preventDefault();
              // Add favorite functionality
            }}
          >
            <Heart className="w-4 h-4" />
          </button> */}
        </CardHeader>

        <CardContent className="p-4 space-y-3">
          {/* Price */}
          <div className="text-lg font-bold">
            {precio || "Precio a consultar"}
          </div>

          {/* Title */}
          <h3 className="font-semibold line-clamp-1">{property.name}</h3>

          {/* Location */}
          <p className="text-sm text-muted-foreground line-clamp-1">
            {property.categories?.[0]?.name || "Location not specified"}
          </p>

          {/* Property Type */}
          <p className="text-sm text-muted-foreground">
            {property.tags?.[0]?.name || "Type not specified"}
          </p>
        </CardContent>

        <CardFooter className="p-4 pt-0 grid grid-cols-4 gap-2 text-xs text-muted-foreground">
          {/* Stats */}
          {area && (
            <div className="flex items-center gap-1">
              <span className="font-medium">{area}</span>
            </div>
          )}
          {habitaciones && (
            <div className="flex items-center gap-1">
              <span className="font-medium">{habitaciones}</span>
              <span>hab</span>
            </div>
          )}
          {banos && (
            <div className="flex items-center gap-1">
              <span className="font-medium">{banos}</span>
              <span>baños</span>
            </div>
          )}
          {parking && (
            <div className="flex items-center gap-1">
              <span className="font-medium">{parking}</span>
              <span>park</span>
            </div>
          )}
        </CardFooter>
      </Link>
    </Card>
  );
}
