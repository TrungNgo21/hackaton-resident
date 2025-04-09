import PropertyList from "@/app/components/properties/property-list";
import { getProperties } from "../actions/get-properties";
import { Suspense } from "react";
import Loading from "../loading";

export default async function Home() {
  return (
    <Suspense fallback={<Loading />}>
      <PropertyList propertiesPromise={getProperties()} />
    </Suspense>
  );
}
