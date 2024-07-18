"use client";
import { decrypt } from "@/utils/userUtils";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";

const PropertyImagesSlider = dynamic(() => import("./PropertyImagesSlider"));

export default function page() {
  const params = useSearchParams();
  const decryptedData = JSON.parse(decrypt(params.get("data")));
  return (
    <PropertyImagesSlider
      indexValue={decryptedData.indexValue}
      images={JSON.parse(decryptedData.property_details)?.images}
      property_details={JSON.parse(decryptedData.property_details)}
    />
  );
}
