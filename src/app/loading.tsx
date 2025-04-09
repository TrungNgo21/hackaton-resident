import PropertyCardSkeleton from "./components/properties/property-card-skeleton";

export default function Loading() {
    return (
        <div className="container mx-auto grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
                <PropertyCardSkeleton key={index} />
            ))}
        </div>
    );
} 