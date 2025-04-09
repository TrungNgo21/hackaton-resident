import { getProperties } from "@/app/actions/get-properties";
import PropertyCard from "@/app/components/properties/property-card";
import { use } from "react";

interface PropertyListProps{
    propertiesPromise: ReturnType<typeof getProperties>
}
export default function PropertyList({propertiesPromise}: PropertyListProps) {
    const properties = use(propertiesPromise);
    return (
        <div className="container mx-auto grid grid-cols-4 gap-2 justify-center items-center">
            {properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
            ))}
        </div>
    )
}