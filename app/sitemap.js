import { APP_BASE_URL } from "@/constants/Constant";
import axios from "axios";

async function fetchProperties() {
  const response = await axios.get(`${APP_BASE_URL}/properties/show?limit=4500`);
  const data = await response.data;
  return data;
}

function getUrlString(data) {
  let url = `${
    !!data?.features?.find((feature) => feature.title == "bedroom")
      ? `${
          data?.features?.find((feature) => feature.title == "bedroom")?.value
        }-`
      : ""
  }${
    data?.property_type?.pt_name?.toLowerCase() === "shop" ||
    data?.property_type?.pt_name?.toLowerCase() === "office" ||
    data?.property_type?.pt_name?.toLowerCase() === "plot"
      ? ""
      : "bhk-"
  }${data?.area?.super_area}-${
    data?.area?.super_area_unit?.toLowerCase() === "sqft"
      ? "sq-ft"
      : data?.area?.super_area_unit?.toLowerCase()
  }-${
    data?.property_type?.pt_name?.toLowerCase() === "flat"
      ? "multistorey-apartment-flat-for-"
      : data?.property_type?.pt_name?.toLowerCase() === "house"
      ? "residential-house-for-"
      : data?.property_type?.pt_name?.toLowerCase() === "villa"
      ? "residential-villa-for-"
      : data?.property_type?.pt_name?.toLowerCase() === "shop"
      ? "commercial-shop-for-"
      : data?.property_type?.pt_name?.toLowerCase() === "office"
      ? "commercial-office-space-for-"
      : data?.property_type?.pt_name?.toLowerCase() === "plot"
      ? `${
          data.real_estate === "commercial" ? "industrial" : "residential"
        }-land-plot-for-`
      : ""
  }${
    data?.property_action === "sell" ? "sale" : "rent"
  }-in-${data?.locality?.toLowerCase()}-${data?.location?.toLowerCase()}`;
  return url;
}

export default async function sitemap() {
  // const properties = await fetchProperties();
  const properties = [];
  return properties.map((property) => ({
    url: `https://albionpropertyhub.com/propertydetails/${getUrlString(
      property
    )}-${property.p_id}`,
    lastModified: property.created_at,
    priority : 0.8
  }));
}
