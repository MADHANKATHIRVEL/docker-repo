"use client";
import Cookies from "js-cookie";
import { usePathname } from "next/navigation";
import bedIcon from "@/assets/pgicons/bed.webp";
import carIcon from "@/assets/pgicons/car.webp";
import individualBuildingIcon from "@/assets/pgicons/flats.webp";
import operatingSinceIcon from "@/assets/pgicons/efficacy.webp";
import individualFlatsIcon from "@/assets/pgicons/cityscape.webp";
import gateClosingIcon from "@/assets/pgicons/gate.webp";
import femaleIcon from "@/assets/pgicons/hairstyle.webp";
import maleIcon from "@/assets/pgicons/man.webp";
import inSocietyIcon from "@/assets/pgicons/meeting.webp";
import bikeIcon from "@/assets/pgicons/motorcycle.webp";
import noticePeriodIcon from "@/assets/pgicons/notice.webp";
import studentIcon from "@/assets/pgicons/reading.webp";
import maleFemaleIcon from "@/assets/pgicons/user.webp";
import professionalIcon from "@/assets/pgicons/work-team.webp";
import professionalStudentsIcon from "@/assets/pgicons/professional_students.webp";
import washroomsIcon from "@/assets/pgicons/toilet.webp";
import acIcon from "@/assets/pgicons/air-conditioner.webp";
import tvIcon from "@/assets/pgicons/television.webp";
import cupboardIcon from "@/assets/pgicons/wardrobe.webp";
import cotIcon from "@/assets/pgicons/bed.webp";
import laundryIcon from "@/assets/pgicons/laundry-machine.webp";
import wardenIcon from "@/assets/pgicons/guard.webp";
import gymnasiumIcon from "@/assets/pgicons/dumbbell.webp";
import wifiIcon from "@/assets/pgicons/wifi-signal.webp";
import powerBackupIcon from "@/assets/pgicons/generator.webp";
import liftIcon from "@/assets/pgicons/elevator.webp";
import roomCleaningIcon from "@/assets/pgicons/homecleaning.webp";
import bikeCarIcon from "@/assets/pgicons/parking.webp";
import singleIcon from "@/assets/sharing/single.webp";
import doubleIcon from "@/assets/sharing/two.webp";
import tripleIcon from "@/assets/sharing/three.webp";
import fourIcon from "@/assets/sharing/four.webp";

export const formatText = (str) => {
  if (!str) return;
  if (typeof str !== "string") {
    return str;
  }
  let splittedString = str.split("_");
  if ((splittedString.length > 1) & (splittedString.length < 3)) {
    return (
      splittedString[0].charAt(0).toUpperCase() +
      splittedString[0].slice(1) +
      " " +
      splittedString[1].charAt(0).toUpperCase() +
      splittedString[1].slice(1)
    );
  } else if (splittedString.length >= 3) {
    return (
      splittedString[0].charAt(0).toUpperCase() +
      splittedString[0].slice(1) +
      " " +
      splittedString[1].charAt(0).toUpperCase() +
      splittedString[1].slice(1) +
      " " +
      splittedString[2].charAt(0).toUpperCase() +
      splittedString[2].slice(1)
    );
  } else {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
};

export function capitalizeFirstLetter(text) {
  if (text == null || text == "") {
    return;
  }
  if (text[0] == " ") {
    return ` ${text[1]?.toUpperCase() + text?.slice(2)}`;
  }
  return text[0]?.toUpperCase() + text?.slice(1);
}

export const getPropertyStatus = [
  "REJECTED",
  "POSTED",
  "IN REVIEW",
  "SOLD",
  "CANCELLED",
];

export const getStatusColor = ["#FFC0CB", "gold", "orange", "green", "red"];

export const formatMobileNumber = (mobileNumber) => {
  return mobileNumber?.slice(0, -5) + "X"?.repeat(5);
};

export const addEllipsis = (text, breakCount) => {
  if (text?.length > 15) {
    return text?.substring(0, breakCount).concat("...");
  }
  return text;
};

export function formatPrice(number) {
  if (number >= 1000 && number < 100000) {
    let formattedVal = number / 1000;
    if (Number.isInteger(formattedVal) === false) {
      return (number / 1000).toFixed(2) + " K";
    }
    return number / 1000 + " K";
  } else if (number >= 100000 && number < 10000000) {
    let formattedVal = number / 100000;
    if (Number.isInteger(formattedVal) === false) {
      return (number / 100000).toFixed(2) + " Lakh";
    }
    return number / 100000 + " Lakh";
  } else if (number >= 10000000 && number < 1000000000) {
    let formattedVal = number / 10000000;
    if (Number.isInteger(formattedVal) === false) {
      return (number / 10000000).toFixed(2) + " Cr";
    }
    return number / 10000000 + " Cr";
  } else {
    return number;
  }
}

export function getUrlString(data) {
  let url = "";

  switch(data?.property_type?.pt_name?.toLowerCase()){
    case "flat":
      url = `${data?.features[0].value ?? 1}-bhk-${data?.area?.super_area}-${
        data?.area?.super_area_unit?.toLowerCase() == "sqft"
          ? "sq-ft"
          : data?.area?.super_area_unit?.toLowerCase()
      }-multistorey-apartment-flat-for-`;
      break;
    case "house":
      url = `${data?.features[0]?.value ?? 1}-bhk-${data?.area?.super_area}-${
        data?.area?.super_area_unit?.toLowerCase() == "sqft"
          ? "sq-ft"
          : data?.area?.super_area_unit?.toLowerCase()
      }-residential-house-for-`;
      break;
    case "villa":
      url = `${data?.features[0].value ?? 1}-bhk-${data?.area?.super_area}-${
        data?.area?.super_area_unit?.toLowerCase() == "sqft"
          ? "sq-ft"
          : data?.area?.super_area_unit?.toLowerCase()
      }-residential-villa-for-`;
      break;
    case "shop":
      url = `${data?.area?.super_area}-${
        data?.area?.super_area_unit?.toLowerCase() == "sqft"
          ? "sq-ft"
          : data?.area?.super_area_unit?.toLowerCase()
      }-commercial-shop-for-`;
      break;
    case "office":
      url = `${data?.area?.super_area}-${
        data?.area?.super_area_unit?.toLowerCase() == "sqft"
          ? "sq-ft"
          : data?.area?.super_area_unit?.toLowerCase()
      }-commercial-office-space-for-`;
      break;
    case "plot":
      url = `${data?.area?.super_area}-${
        data?.area?.super_area_unit?.toLowerCase() == "sqft"
          ? "sq-ft"
          : data?.area?.super_area_unit?.toLowerCase()
      }-${data.real_estate == "commercial" ? "industrial" : "residential"}-land-plot-for-`;
      break;
    case "pg":
      url = `pg-for-`;
      break;
    default:
      break;
  }
  url += `${
    data?.property_action == "sell" ? "sale" : "rent"
  }-in-${data?.locality?.toLowerCase()}-${data?.location?.toLowerCase()}`;
  
  return url;
}

export const amenitiesListObj = {
  flat: [
    {
      value: "lift",
      label: "Lift",
      isSelected: false,
    },
    {
      value: "fitness_centre",
      label: "Fitness centre",
      isSelected: false,
    },
    {
      value: "camera",
      label: "Surveillance cameras",
      isSelected: false,
    },
    {
      value: "wi-fi",
      label: "Building Wi-Fi",
      isSelected: false,
    },
    {
      value: "security",
      label: "Security",
      isSelected: false,
    },
    {
      value: "water",
      label: "24 / 7 Water",
      isSelected: false,
    },
    {
      value: "parking",
      label: "Parking",
      isSelected: false,
    },
    {
      value: "power_backup",
      label: "Power Backup",
      isSelected: false,
    },
  ],
  villa: [
    {
      value: "lift",
      label: "Lift",
      isSelected: false,
    },
    {
      value: "fitness_centre",
      label: "Fitness centre",
      isSelected: false,
    },
    {
      value: "camera",
      label: "Surveillance cameras",
      isSelected: false,
    },
    {
      value: "wi-fi",
      label: "Building Wi-Fi",
      isSelected: false,
    },
    {
      value: "security",
      label: "Security",
      isSelected: false,
    },
    {
      value: "water",
      label: "24 / 7 Water",
      isSelected: false,
    },
    {
      value: "parking",
      label: "Parking",
      isSelected: false,
    },
    {
      value: "power_backup",
      label: "Power Backup",
      isSelected: false,
    },
  ],
  house: [
    {
      value: "lift",
      label: "Lift",
      isSelected: false,
    },
    {
      value: "fitness_centre",
      label: "Fitness centre",
      isSelected: false,
    },
    {
      value: "camera",
      label: "Surveillance cameras",
      isSelected: false,
    },
    {
      value: "security",
      label: "Security",
      isSelected: false,
    },
    {
      value: "water",
      label: "24 / 7 Water",
      isSelected: false,
    },
    {
      value: "parking",
      label: "Parking",
      isSelected: false,
    },
    {
      value: "power_backup",
      label: "Power Backup",
      isSelected: false,
    },
  ],
  shop: [
    {
      value: "lift",
      label: "Lift",
      isSelected: false,
    },
    {
      value: "camera",
      label: "Surveillance cameras",
      isSelected: false,
    },
    {
      value: "security",
      label: "Security",
      isSelected: false,
    },
    {
      value: "water",
      label: "24 / 7 Water",
      isSelected: false,
    },
    {
      value: "parking",
      label: "Parking",
      isSelected: false,
    },
    {
      value: "power_backup",
      label: "Power Backup",
      isSelected: false,
    },
  ],
  office: [
    {
      value: "lift",
      label: "Lift",
      isSelected: false,
    },
    {
      value: "camera",
      label: "Surveillance cameras",
      isSelected: false,
    },
    {
      value: "wi-fi",
      label: "Building Wi-Fi",
      isSelected: false,
    },
    {
      value: "security",
      label: "Security",
      isSelected: false,
    },
    {
      value: "water",
      label: "24 / 7 Water",
      isSelected: false,
    },
    {
      value: "parking",
      label: "Parking",
      isSelected: false,
    },
    {
      value: "power_backup",
      label: "Power Backup",
      isSelected: false,
    },
  ],
  plot: [
    {
      value: "lift",
      label: "Lift",
      isSelected: false,
    },
    {
      value: "fitness_centre",
      label: "Fitness centre",
      isSelected: false,
    },
    {
      value: "camera",
      label: "Surveillance cameras",
      isSelected: false,
    },
    {
      value: "wi-fi",
      label: "Building Wi-Fi",
      isSelected: false,
    },
    {
      value: "security",
      label: "Security",
      isSelected: false,
    },
    {
      value: "water",
      label: "24 / 7 Water",
      isSelected: false,
    },
    {
      value: "parking",
      label: "Parking",
      isSelected: false,
    },
    {
      value: "power_backup",
      label: "Power Backup",
      isSelected: false,
    },
  ],
};

export function capitalizeWords(inputString) {
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

export const pgIcons = {
  no_of_beds: bedIcon,
  car: carIcon,
  individual_building: individualBuildingIcon,
  operating_since: operatingSinceIcon,
  individual_flats: individualFlatsIcon,
  gate_closing: gateClosingIcon,
  female: femaleIcon,
  male: maleIcon,
  in_society: inSocietyIcon,
  bike: bikeIcon,
  notice_period: noticePeriodIcon,
  student: studentIcon,
  male_female: maleFemaleIcon,
  professional: professionalIcon,
  professional_students: professionalStudentsIcon,
  washrooms: washroomsIcon,
  ac: acIcon,
  tv: tvIcon,
  cupboard: cupboardIcon,
  cot: cotIcon,
  laundry: laundryIcon,
  warden: wardenIcon,
  gymnasium: gymnasiumIcon,
  wifi: wifiIcon,
  power_backup: powerBackupIcon,
  lift: liftIcon,
  "room cleaning": roomCleaningIcon,
  "bike & car": bikeCarIcon,
  single: singleIcon,
  double: doubleIcon,
  triple: tripleIcon,
  four: fourIcon,
};

export const removeAllCookies = () => {
  const cookieNames = Object.keys(Cookies.get());

  cookieNames.forEach((cookieName) => {
    Cookies.remove(cookieName);
  });
};

export function getPathname() {
  const pathname = usePathname();
  return pathname;
}

export const dateFormatter = (
  date = new Date().toLocaleDateString().split("/").join("-"),
  format = "dd-mm-yyyy-dy",
  stringLimit = 0,
  middleMark = " "
) => {
  const months = [
    "January",
    "Feburary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const SubStrings = (prop) =>
    stringLimit ? prop.substring(0, stringLimit) : prop;

  const dateString = new Date(date).getDate();
  const dayString = SubStrings(days[new Date(date).getDay()]);
  const monthString = SubStrings(months[new Date(date).getMonth()]);
  const yearString = new Date(date).getFullYear().toString();

  const dateArr = [];
  const formattedIndex = [];

  if (format) {
    if (format.includes("dd")) {
      formattedIndex.push(format.split("-").findIndex((i) => i === "dd"));
      dateArr.push(dateString);
    }
    if (format.includes("mm")) {
      formattedIndex.push(format.split("-").findIndex((i) => i === "mm"));
      dateArr.push(monthString);
    }
    if (format.includes("yyyy")) {
      formattedIndex.push(format.split("-").findIndex((i) => i === "yyyy"));
      dateArr.push(yearString);
    }
    if (format.includes("dy")) {
      formattedIndex.push(format.split("-").findIndex((i) => i === "dy"));
      dateArr.push(dayString);
    }
  }

  const outputString = formattedIndex
    .map((i) => dateArr[i])
    .toString()
    .split(",")
    .join(middleMark);

  return outputString;
};
