import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Property } from "@/lib/db/schema";
import { Droplet, Lightbulb, Wifi } from "lucide-react";
import Image from "next/image";

interface PropertyCardProps {
    property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>{property.district}</CardTitle>
                <CardDescription>{property.district}</CardDescription>
            </CardHeader>
            <CardContent className="p-4">
                <div className="relative w-full aspect-[16/9] max-h-[150px]">
                    <Image 
                        src={property.img} 
                        alt={property.district} 
                        fill
                        className="object-cover rounded-md"
                        sizes="300px"
                    />
                </div>
            </CardContent>
            <CardFooter className="flex justify-evenly">
                <div className="flex items-center gap-2">
                    <Lightbulb/>
                    <p className="text-sm">{property.electricity} kWh
                    </p>
                </div>
                <Separator orientation="vertical" />
                <div className="flex items-center gap-2">
                    <Droplet/>
                    <p className="text-sm">{property.waterPricePerUnit === 0 ? "Free" : `${property.waterPricePerUnit} / ${property.waterUnit}`}</p>
                </div>
                <Separator orientation="vertical" />

                <div className="flex items-center gap-2">
                    <Wifi/>
                    <p className="text-sm">{property.wifi === 0 ? "Free" : `${property.wifi}`} </p>
                </div>
            </CardFooter>
        </Card>
    )
}       