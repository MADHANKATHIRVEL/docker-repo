import ProjectList from "./ProjectList";

function getPageTitle(url, propertyAction) {
  let location = url.split("-")[url.split("-").length - 1];
  let formattedLocation =
    location[0] == " "
      ? ` ${location[1]?.toUpperCase() + location?.slice(2)}`
      : location[0]?.toUpperCase() + location?.slice(1);
  if (url.includes("flat")) {
    if (propertyAction === "sale") {
      return `Premium Flats and Apartments for Sale in ${formattedLocation}`;
    } else if (propertyAction === "rent") {
      return `Residential Flat Apartment for Rent in ${formattedLocation}`;
    }
  } else if (url.includes("villa")) {
    if (propertyAction === "sale") {
      return `Buy Independent Residential Villa for sale in ${formattedLocation}`;
    } else if (propertyAction === "rent") {
      return `Residential Villa for Rent in ${formattedLocation}`;
    }
  } else if (url.includes("house")) {
    if (propertyAction === "sale") {
      return `Buy Residential Independent House for Sale in ${formattedLocation}`;
    } else if (propertyAction === "rent") {
      return `Residential Independent House for Rent in ${formattedLocation}`;
    }
  } else if (url.includes("land")) {
    if (propertyAction === "sale") {
      return `Buy Residential Land/Plot for Sale in ${formattedLocation}`;
    } else if (propertyAction === "rent") {
      return `Commercial Land Space for Rent in ${formattedLocation}`;
    }
  } else if (url.includes("shop")) {
    if (propertyAction === "sale") {
      return `Buy Commercial Shop for Sale in ${formattedLocation}`;
    } else if (propertyAction === "rent") {
      return `Commercial Shop for Rent in ${formattedLocation}`;
    }
  } else if (url.includes("office")) {
    if (propertyAction === "sale") {
      return `Buy Commercial Shop for Sale in ${formattedLocation}`;
    } else if (propertyAction === "rent") {
      return `Commercial Office Space for Rent in ${formattedLocation}`;
    }
  } else {
    if(url.includes('pg')){
      return `Paying Guest (PG) Hostel for Rent in ${formattedLocation}`
    }
  }
}

function getMetaDescription(params, propertyAction) {
  let description = "";
  let location = params.split("-")[params.split("-").length - 1];
  let formattedLocation =
    location[0] == " "
      ? ` ${location[1]?.toUpperCase() + location?.slice(2)}`
      : location[0]?.toUpperCase() + location?.slice(1);
  switch (propertyAction) {
    case "sale":
      if (params.includes("flat")) {
        description += `Find a Wide Range of Flats / Apartment for Sale in ${formattedLocation} with Albion Property Hub. Browse through Verified Listings, including 2 BHK, 3 BHK, and 4 BHK apartments. `;
        break;
      } else if (params.includes("villa")) {
        description += `Own your dream home in ${formattedLocation}! Browse spacious & luxurious independent villas for sale in Coimbatore. Find your perfect property with bedrooms, great amenities & prime locations.`;
        break;
      } else if (params.includes("house")) {
        description += `${formattedLocation} Independent Houses: Find Your Perfect Home! Discover your dream independent house in Coimbatore. Search by size, location, and amenities. Great deals on spacious houses for you and your family.`;
        break;
      } else if (params.includes("land")) {
        description += `Build your dream home in ${formattedLocation}! Find the perfect residential land or plot for sale in Coimbatore. Search by size, location, and amenities. Affordable options for your future dream house.`;
        break;
      } else if (params.includes("shop")) {
        description += `Prime Location, Thriving Business: Find Your Commercial Shop in ${formattedLocation}!  Explore a variety of commercial shops for sale in Coimbatore. Great opportunities for growing businesses.`;
        break;
      } else if (params.includes("office")) {
        description += `In ${formattedLocation}? Find & buy your perfect commercial office space for sale. Browse listings, explore prime locations & contact sellers directly. Visit Now`;
        break;
      } else {
        break;
      }
      break;
    case "rent":
      if (params.includes("flat")) {
        description += `Find your rental home in ${formattedLocation}! Search for flats & apartments for rent. Browse spacious studios to family-friendly 3 BHKs. Choose your area & filter by amenities. Act fast!`;
        break;
      } else if (params.includes("villa")) {
        description += `Live luxuriously in ${formattedLocation}! Explore spacious villas for rent.  Find your perfect home with private gardens, multiple bedrooms & modern amenities. Search by location & price. `;
        break;
      } else if (params.includes("house")) {
        description += `${formattedLocation} living, your way! Find independent houses for rent. Enjoy privacy, extra space & a homely feel. Browse locations, filter by bedrooms & amenities. Find your perfect Coimbatore rental today!`;
        break;
      } else if (params.includes("land")) {
        description += `Build your vision in ${formattedLocation}! Find commercial land for rent & develop your dream project. Search by size, location & desired use. Contact property owners directly.`;
        break;
      } else if (params.includes("shop")) {
        description += `Launch your ${formattedLocation} business! Find your ideal commercial shop for rent. Browse listings by size, location & budget. Suitable for retail, office & more! Contact agents or landlords directly.`;
        break;
      } else if (params.includes("office")) {
        description += `Grow your business in ${formattedLocation}! Find perfectly sized office spaces for rent. Search by location, amenities & budget.  Furnished or unfurnished options are available. `;
        break;
      } else {
        description += `Find your perfect PG in ${formattedLocation}! Affordable & convenient living for students & working professionals. Search for single rooms, shared rooms, meals & amenities. `
        return;
      }
    default:
      break;
  }
  return description;
}

export async function generateMetadata({ params, searchParams }) {
  let propertyAction = params.url.includes("sale") ? "sale" : "rent";
  let title = getPageTitle(params.url, propertyAction);
  let description = getMetaDescription(params.url, propertyAction);
  return {
    title: title,
    description: description,
  };
}

const page = async () => {
  return <ProjectList />;
};

export default page;
