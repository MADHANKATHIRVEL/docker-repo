import axios from "axios";
import { APP_BASE_URL } from "@/constants/Constant";
import { cookies } from "next/headers";
import { decrypt } from "@/utils/userUtils";
import dynamic from "next/dynamic";

const ProductDetailsPage = dynamic(() => import("./ProductDetailsPage"), {
  ssr : false
});

function capitalizeWords(inputString) {
  if (typeof inputString == "string") {
    const words = inputString?.split(" ");
    const capitalizedWords = words?.map((word) => {
      if (word.length > 0) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      } else {
        return word;
      }
    });
    const resultString = capitalizedWords?.join(" ");
    return resultString;
  } else {
    return inputString;
  }
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

function formatText(location) {
  return location[0] == " "
    ? ` ${location[1]?.toUpperCase() + location?.slice(2)}`
    : location[0]?.toUpperCase() + location?.slice(1);
}

function getMetaTitle(data) {
  let formattedTitle = "";

  const bedroomFeature = data.features.find(
    (feature) => feature.title === "bedroom"
  );
  const ptName = data.property_type.pt_name.toLowerCase();
  const superAreaText = `${data.area.super_area} ${data.area.super_area_unit}`;
  const locationText = `${formatText(data.locality)} ${formatText(
    data.location
  )}`;
  let propertyaction = data.property_action.toLowerCase()
  if (propertyaction === "sell") {
    if (!!bedroomFeature) {
      const bedroomText = `${bedroomFeature.value} BHK `;
      switch (ptName) {
        case "flat":
          formattedTitle = `Buy ${bedroomText}Flat/Apartment in ${locationText}`;
          break;
        case "villa":
          formattedTitle = `Buy ${bedroomText}${superAreaText} villa for sale in ${locationText}`;
          break;
        case "house":
          formattedTitle = `${bedroomText}${superAreaText} Residential House for Sale in ${locationText}`;
          break;
      }
    } else {
      switch (ptName) {
        case "plot":
          formattedTitle = `${superAreaText} Residential Land/Plot For Sale In ${locationText}`;
          break;
        case "shop":
          formattedTitle = `${superAreaText} Commercial Shop For Sale In ${locationText}`;
          break;
        case "office":
          formattedTitle = `${superAreaText} Commercial Office Space For Sale In ${locationText}`;
          break;
      }
    }
  } else if (propertyaction === "rent") {
    if (!!bedroomFeature) {
      const bedroomText = `${bedroomFeature.value} BHK `;
      switch (ptName) {
        case "flat":
          formattedTitle = `${bedroomText}${superAreaText} Multistorey Apartment For Rent in ${locationText}`;
          break;
        case "villa":
          formattedTitle = `${bedroomText}${superAreaText} Residential Villa for Rent in ${locationText}`;
          break;
        case "house":
          formattedTitle = `${bedroomText}${superAreaText} Residential House for Rent in ${locationText}`;
          break;
      }
    } else {
      if (
        ptName === "plot" &&
        data?.real_estate?.toLowerCase() === "commercial"
      ) {
        formattedTitle = `${superAreaText} Commercial Land for Rent In ${locationText}`;
      } else {
        switch (ptName) {
          case "shop":
            formattedTitle = `${superAreaText} Commercial Shop for Rent In ${locationText}`;
            break;
          case "office":
            formattedTitle = `${superAreaText} Commercial Office Space for Rent In ${locationText}`;
            break;
        }
      }
    }
  }

  return formattedTitle;
}

function generateMetaDescription(data) {
  return `
    Listed By - ${capitalizeWords(data.seller_details.username)}. ${
    data.property_action == "sell" ? "Buy" : "Rent"
  } ${capitalizeWords(data.facing)} Facing ${data.area.super_area} ${
    data.area.super_area_unit
  } ${
    !!data.features.find((feature) => feature.title === "furnish_status")
      ? `${capitalizeWords(
          data.features.find((feature) => feature.title === "furnish_status")
            .value
        )} `
      : ""
  }${capitalizeWords(data.property_type.pt_name)} Albion ID - ${
    data.p_id
  } Click Here.
  `;
}

export async function getPropertyDetail(id) {
  "use server";
  const cookie = cookies();
  let userId =
    JSON.parse(decrypt(cookie.get("user-data")?.value))?.user_id ?? null;
  let url = `${APP_BASE_URL}/Properties/show?p_id=${id}`;
  if (userId) {
    url += `&user_id=${userId}`;
  }
  const response = await axios.get(url);
  return response.data;
}

export async function generateMetadata({ params, searchParams }) {
  const id = params.id.split("-")[params.id.split("-").length - 1];
  const data = await getPropertyDetail(id);
  const canonicalUrl = `https://albionpropertyhub.com/propertydetails/${params.id}`;

  return {
    title: getMetaTitle(data),
    description: generateMetaDescription(data),
    openGraph: {
      title: getUrlString(data),
      images: [data?.images[0]?.image_url],
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

const page = async ({ params, searchParams }) => {
  const id = params.id.split("-")[params.id.split("-").length - 1];
  const productDetail = await getPropertyDetail(id);
  return (
    productDetail && <ProductDetailsPage response={productDetail} id={id} />
  );
};

export default page;
