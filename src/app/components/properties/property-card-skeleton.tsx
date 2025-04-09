import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Droplet, Lightbulb, Wifi } from "lucide-react";

export default function PropertyCardSkeleton() {
    return (
        <Card className="animate-pulse">
            <CardHeader className="space-y-2">
                <Skeleton className="h-5 w-1/3" />
                <Skeleton className="h-4 w-1/4" />
            </CardHeader>
            <CardContent>
                <Skeleton className="aspect-[3/2] w-full rounded-lg" />
            </CardContent>
            <CardFooter className="flex justify-evenly">
                <div className="flex items-center gap-2">
                    <Lightbulb className="text-muted-foreground" />
                    <Skeleton className="h-4 w-16" />
                </div>
                <Separator orientation="vertical" />
                <div className="flex items-center gap-2">
                    <Droplet className="text-muted-foreground" />
                    <Skeleton className="h-4 w-16" />
                </div>
                <Separator orientation="vertical" />
                <div className="flex items-center gap-2">
                    <Wifi className="text-muted-foreground" />
                    <Skeleton className="h-4 w-16" />
                </div>
            </CardFooter>
        </Card>
    );
} 