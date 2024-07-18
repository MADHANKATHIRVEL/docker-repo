"use client";
import { useContext, useEffect, useState } from "react";
import "./post-property.css";
import { CheckOutlined, PlusOutlined } from "@/utils/icons";
import Image from "next/image";
import {
  Button,
  Checkbox,
  Form,
  Input,
  InputNumber,
  Modal,
  Radio,
  Select,
  Switch,
  Tag,
  TimePicker,
  Upload,
  notification,
} from "@/utils/antd-component";
import { styled } from "styled-components";
import TextArea from "antd/es/input/TextArea";
import imageBorder from "@/assets/img_border.webp";
import imageUploadRules from "@/assets/imageUpload-rules.webp";
import uploadSingleImage from "@/assets/image.webp";
import uploadMultipleImage from "@/assets/image-gallery.webp";
import postPropertySuccessImage from "@/assets/property.gif";
import axios from "axios";
import { APP_BASE_URL } from "@/constants/Constant";
import { useRouter } from "next/navigation";
import { AppContext } from "@/context/Context";
import {
  amenitiesListObj,
  capitalizeFirstLetter,
  capitalizeWords,
  formatText,
} from "../../utils/helpers";
import {
  getUserType as getTypeOfUser,
  getUserId,
  getUserMobileNumber,
} from "../../utils/userUtils";
import Link from "next/link";
import Cookies from "js-cookie";
import dynamic from "next/dynamic";

const SEO = dynamic(() => import("@/components/seo/SEO"), {
  ssr: false,
});

const { Item } = Form;

const StyledUpload = styled(Upload)`
  .ant-upload.ant-upload-select {
    width: 30vh !important;
    height: 20vh !important;
  }
  .ant-upload-list-item-container {
    border: 1px solid #cccccc !important;
    border-radius: 4px !important;
    width: 30vh !important;
    height: 20vh !important;
  }
  .ant-upload-list-item-error {
    border: none !important;
  }
`;

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const PostProperty = () => {
  const { cities } = useContext(AppContext);
  const router = useRouter();
  const [priceNegotiable, setPriceNegotiable] = useState(false);
  const [govTaxInclusive, setGovTaxInclusive] = useState(false);
  const [allInclusivePrice, setAllInclusivePrice] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [isMainRoadFacing, setIsMainRoadFacing] = useState();
  const [isCornerShop, setIsCornerShop] = useState();
  const [hasPersonalWashroom, setHasPersonalWashroom] = useState();
  const [pantry, setPantry] = useState("");
  const [totalWashroom, setTotalWashroom] = useState();
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [roomCategory, setRoomCategory] = useState(["single"]);
  const [carpetArea, setCarpetArea] = useState("");
  const [carpetAreaUnit, setCarpetAreaUnit] = useState("sqft");
  const [pgFoods, setPgFoods] = useState([]);
  const [superArea, setSuperArea] = useState("");
  const [superAreaUnit, setSuperAreaUnit] = useState("sqft");
  const [fileList, setFileList] = useState([]);
  const [furnished, setFurnished] = useState("furnished");
  const [propertyAction, setPropertyAction] = useState("sell");
  const [propertyType, setPropertyType] = useState(undefined);
  const [gateClosing, setGateClosing] = useState();
  const [gateClosingTime, setGateClosingTime] = useState("pm");
  const [parkingAvailability, setParkingAvailability] = useState("yes");
  const [city, setCity] = useState();
  const [cityId, setCityId] = useState();
  const [location, setLocation] = useState();
  const [propertyName, setPropertyName] = useState();
  const [postingAs, setPostingAs] = useState("owner");
  const [isApiCall, setIsApICall] = useState(false);
  const [propertyFacing, setPropertyFacing] = useState();
  const [totalNumberOfFloors, setTotalNumberOfFloors] = useState();
  const [boundaryWallMade, setBoundaryWallMade] = useState(false);
  const [currentConstruction, setCurrentConstruction] = useState(false);
  const [totalFloorAllowed, setTotalFloorAllowed] = useState();
  const [haveNecessaryDocuments, setHaveNecessaryDocuments] = useState();
  const [isActiveBtn, setIsActiveBtn] = useState("residential");
  const [officeFloorNumber, setOfficeFloorNumber] = useState();
  const [selectedYears, setSelectedYears] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState(0);
  const [localities, setLocalities] = useState([]);
  const [reraId, setReraId] = useState(undefined);
  const [showImagesNotUploadedModal, setShowImagesNotUploadedModal] =
    useState(false);
  const [totalNumberofFloorInOffice, setTotalNumberofFloorInOffice] =
    useState();
  const [features, setFeatures] = useState([
    {
      key: "bedrooms",
      label: "Bedrooms",
      value: 1,
    },
    {
      key: "balconies",
      label: "Balconies",
      value: 0,
    },
    {
      key: "bathrooms",
      label: "Bathrooms",
      value: 0,
    },
  ]);
  const [area, setArea] = useState({
    carpet: {
      value: 0,
      unit: "sqft",
    },
    super: {
      value: 0,
      unit: "sqft",
    },
  });
  const [availability, setAvailability] = useState("ready_to_move");
  const [propertyAge, setPropertyAge] = useState("0");
  const [expectedPrice, setExpectedPrice] = useState();
  const [tokenAmount, setTokenAmount] = useState();
  const [flatFloor, setFlatFloor] = useState(1);
  const [totalNumberOfFlatsInSociety, setTotalNumberOfFlatsInSociety] =
    useState("10");
  const [totalFloors, setTotalFloors] = useState(1);
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [postAgreement, setPostAgreement] = useState(false);
  const [whatsappAgreement, setWhatsappAgreement] = useState(false);
  const [mainImage, setMainImg] = useState();
  const [subImages, setSubImages] = useState();
  // const [cities, setCities] = useState([]);
  const [postPropertySuccess, setPostPropertySuccess] = useState(false);
  const [operatingSince, setOperatingSince] = useState();
  const [presentIn, setPresentIn] = useState("induvidual_building");
  const [preferredGender, setPreferredGender] = useState("male");
  const [preferredTenant, setPreferredTenant] = useState("professional");
  const [noticePeriod, setNoticePeriod] = useState();
  const [foodProvided, setFoodProvided] = useState(false);
  const [providedFood, setProvidedFood] = useState(["Breakfast"]);
  const [noOfBeds, setNoOfBeds] = useState(undefined);
  const [foodCharges, setFoodCharges] = useState();
  const [foodType, setFoodType] = useState();
  const [pgRules, setPgRules] = useState([]);
  const [servicesAvailable, setServicesAvailable] = useState([]);
  const [vegOrNonVeg, setVegOrNonVeg] = useState(false);
  const [amenitiesList, setAmenitiesList] = useState([
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
      value: "wi-fi",
      label: "Building Wi-Fi",
      isSelected: false,
    },
    {
      value: "cctv",
      label: "CCTV",
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
  ]);
  const [roomCategories, setRoomCategories] = useState([
    {
      key: "single",
      price_per_bed: "1",
      deposit: "1",
      no_of_beds: "1",
    },
  ]);
  const [pgAmenities, setPgAmenities] = useState([
    {
      key: 1,
      title: "washrooms",
      value: false,
    },
    {
      key: 2,
      title: "ac",
      value: false,
    },
    {
      key: 3,
      title: "tv",
      value: false,
    },
    {
      key: 4,
      title: "cupboard",
      value: false,
    },
    {
      key: 5,
      title: "cot",
      value: false,
    },
    {
      key: 6,
      title: "gymnasium",
      value: false,
    },
    {
      key: 7,
      title: "wifi",
      value: false,
    },
    {
      key: 8,
      title: "power_backup",
      value: false,
    },
    {
      key: 9,
      title: "lift",
      value: false,
    },
  ]);

  useEffect(() => {
    if (typeof window != undefined) {
      window.scrollTo({
        top: "0",
        left: "0",
        behavior: "smooth",
      });
    }
  }, []);

  useEffect(() => {
    if (propertyType != null && propertyType != "") {
      setAmenitiesList((prevState) => amenitiesListObj[propertyType]);
    }
  }, [propertyType]);

  // useEffect(() => {
  //   async function fetchDistrict() {
  //     const response = await axios.get(
  //       `${APP_BASE_URL}/Location/getLocation?location=city&state=31`
  //     );
  //     setCities((prevState) => response.data.city);
  //   }
  //   fetchDistrict();
  // }, []);

  useEffect(() => {
    if (!Cookies.get("user-data")) {
      router.push("/login");
      return;
    }
  }, []);

  useEffect(() => {
    async function getLocalities() {
      await axios
        .get(
          `${APP_BASE_URL}/Location/getLocation?location=locality&city=${cityId}`
        )
        .then((res) => setLocalities((prevState) => res.data.locality));
    }
    getLocalities();
  }, [cityId]);

  useEffect(() => {
    setPreviewOpen(false);
    setIsMainRoadFacing(undefined);
    setIsCornerShop(undefined);
    setHasPersonalWashroom(undefined);
    setPantry("");
    setTotalWashroom(undefined);
    setPreviewImage("");
    setPreviewTitle("");
    setFurnished("furnished");
    setPropertyType(undefined);
    setCity(undefined);
    setLocation(undefined);
    setPropertyName(undefined);
    setPostingAs("owner");
    setIsApICall(false);
    setPropertyFacing(undefined);
    setTotalNumberOfFloors(undefined);
    setBoundaryWallMade(false);
    setCurrentConstruction(false);
    setTotalFloorAllowed(undefined);
    setHaveNecessaryDocuments(undefined);
    setOfficeFloorNumber(undefined);
    setSelectedYears(0);
    setSelectedMonth(0);
    setTotalNumberofFloorInOffice(undefined);
    setFeatures([
      {
        key: "bedrooms",
        label: "Bedrooms",
        value: 1,
      },
      {
        key: "balconies",
        label: "Balconies",
        value: 0,
      },
      {
        key: "bathrooms",
        label: "Bathrooms",
        value: 0,
      },
    ]);
    setArea({
      carpet: {
        value: 0,
        unit: "sqft",
      },
      super: {
        value: 0,
        unit: "sqft",
      },
    });
    setAvailability("ready_to_move");
    setPropertyAge("0");
    setExpectedPrice(undefined);
    setTokenAmount(undefined);
    setFlatFloor(1);
    setTotalNumberOfFlatsInSociety("10");
    setTotalFloors(1);
    setAddress("");
    setDescription("");
    setPostAgreement(false);
    setWhatsappAgreement(false);
    setPostPropertySuccess(false);
    const initialAmenitiesList = amenitiesList.map((amenity) => ({
      ...amenity,
      isSelected: false,
    }));
    setAmenitiesList(initialAmenitiesList);
  }, [propertyAction, isActiveBtn]);

  function createAmenityObject() {
    let i = 1;
    let ammenityObj = [];
    amenitiesList
      .filter((amenity) => amenity["isSelected"] === true)
      .map((amenity) => {
        ammenityObj.push({
          key: i,
          title: amenity.label,
          value: true,
        });
        i += 1;
      });
    return ammenityObj;
  }

  function getPgPaylod() {
    let payload = [];
    if (preferredGender) {
      payload[payload.length] = {
        key: payload.length + 1,
        title: "gender",
        value: preferredGender,
      };
    }
    if (preferredTenant) {
      payload[payload.length] = {
        key: payload.length + 1,
        title: "tenant_preference",
        value: preferredTenant,
      };
    }
    if (presentIn) {
      payload[payload.length] = {
        key: payload.length + 1,
        title: "present_in",
        value: presentIn,
      };
    }
    if (operatingSince) {
      payload[payload.length] = {
        key: payload.length + 1,
        title: "operating_since",
        value: operatingSince,
      };
    }
    if (parkingAvailability) {
      payload[payload.length] = {
        key: payload.length + 1,
        title: "parking_availability",
        value: parkingAvailability,
      };
    }
    if (noticePeriod) {
      payload[payload.length] = {
        key: payload.length + 1,
        title: "notice_period",
        value: noticePeriod,
      };
    }
    if (gateClosing) {
      payload[payload.length] = {
        key: payload.length + 1,
        title: "gate_closing",
        value: gateClosing,
      };
    }
    if (noOfBeds) {
      payload[payload.length] = {
        key: payload.length + 1,
        title: "no_of_beds",
        value: noOfBeds,
      };
    }
    if (servicesAvailable.length > 1) {
      payload[payload.length] = {
        key: payload.length + 1,
        title: "Services Available",
        value: servicesAvailable,
      };
    }
    return payload;
  }

  function getFeaturesObject() {
    let featuresArray = [];
    switch (isActiveBtn) {
      case "commercial":
        switch (propertyType) {
          case "shop":
            if (pantry) {
              featuresArray.push({
                key: featuresArray.length + 1,
                title: "cafeteria",
                value: pantry,
              });
            }
            if (hasPersonalWashroom) {
              featuresArray.push({
                key: featuresArray.length + 1,
                title: "personal_washroom",
                value: hasPersonalWashroom,
              });
            }
            if (isMainRoadFacing) {
              featuresArray.push({
                key: featuresArray.length + 1,
                title: "main_road_facing",
                value: isMainRoadFacing,
              });
            }
            if (isCornerShop) {
              featuresArray.push({
                key: featuresArray.length + 1,
                title: "is_corner_shop",
                value: isCornerShop,
              });
            }
            if (totalNumberofFloorInOffice) {
              featuresArray.push({
                key: featuresArray.length + 1,
                title: "total_floor_in_office",
                value: totalNumberofFloorInOffice,
              });
            }
            if (officeFloorNumber) {
              featuresArray.push({
                key: featuresArray.length + 1,
                title: "office_floor_number",
                value: officeFloorNumber,
              });
            }
            break;
          case "office":
            if (pantry) {
              featuresArray.push({
                key: featuresArray.length + 1,
                title: "cafeteria",
                value: pantry,
              });
            }
            if (totalWashroom) {
              featuresArray.push({
                key: featuresArray.length + 1,
                title: "total_washroom",
                value: totalWashroom,
              });
            }
            // if(isMainRoadFacing){
            //   features.push({
            //     key : featuresArray.length + 1,
            //     title : "main_road_facing",
            //     value : isMainRoadFacing
            //   })
            // }
            // if(isCornerShop){
            //   features.push({
            //     key : featuresArray.length + 1,
            //     title : "is_corner_shop",
            //     value : isCornerShop
            //   })
            // }
            if (totalNumberofFloorInOffice) {
              featuresArray.push({
                key: featuresArray.length + 1,
                title: "total_floor_in_office",
                value: totalNumberofFloorInOffice,
              });
            }
            if (officeFloorNumber) {
              featuresArray.push({
                key: featuresArray.length + 1,
                title: "office_floor_number",
                value: officeFloorNumber,
              });
            }
            break;
          case "plot":
            if (boundaryWallMade) {
              featuresArray.push({
                key: featuresArray.length + 1,
                title: "boundary_wall_made",
                value: boundaryWallMade,
              });
            }
            if (totalFloorAllowed) {
              featuresArray.push({
                key: featuresArray.length + 1,
                title: "total_floor_allowed",
                value: totalFloorAllowed,
              });
            }
            break;
        }
      case "residential":
        switch (propertyType) {
          case "flat":
            featuresArray.push(
              {
                key: 1,
                title: "bedroom",
                value: features[0].value,
              },
              {
                key: 2,
                title: "balconies",
                value: features[1].value,
              },
              {
                key: 3,
                title: "bath",
                value: features[2].value,
              },
              {
                key: 4,
                title: "floor_base",
                value: flatFloor,
              },
              {
                key: 5,
                title: "total_floors",
                value: totalFloors,
              },
              {
                key: 6,
                title: "furnish_status",
                value: furnished,
              },
              {
                key: 7,
                title: "total_flats_nearby",
                value: totalNumberOfFlatsInSociety,
              }
            );
            break;
          case "villa":
            featuresArray.push(
              {
                key: 1,
                title: "bedroom",
                value: features[0].value,
              },
              {
                key: 2,
                title: "balconies",
                value: features[1].value,
              },
              {
                key: 3,
                title: "bath",
                value: features[2].value,
              },
              {
                key: 4,
                title: "floor_base",
                value: flatFloor,
              },
              {
                key: 5,
                title: "total_floors",
                value: totalFloorAllowed,
              },
              {
                key: 6,
                title: "furnish_status",
                value: furnished,
              }
            );
            break;
          case "house":
            featuresArray.push(
              {
                key: 1,
                title: "bedroom",
                value: features[0].value,
              },
              {
                key: 2,
                title: "balconies",
                value: features[1].value,
              },
              {
                key: 3,
                title: "bath",
                value: features[2].value,
              },
              {
                key: 4,
                title: "furnish_status",
                value: furnished,
              }
            );
            break;
          case "plot":
            featuresArray.push(
              {
                key: 1,
                title: "boundary_wall_made",
                value: boundaryWallMade,
              },
              {
                key: 2,
                title: "no_of_floors_allowed",
                value: totalFloorAllowed,
              },
              {
                key: 3,
                title: "current_construction",
                value: currentConstruction,
              }
            );
            break;
        }
      default:
        break;
    }
    if (availability === "under_construction") {
      featuresArray.push(
        {
          key: featuresArray.length + 1,
          title: "estimated_year",
          value: selectedYears,
        },
        {
          key: featuresArray.length + 1,
          title: "estimated_month",
          value: selectedMonth,
        }
      );
    }
    return featuresArray;
  }

  function getUserType() {
    switch (getTypeOfUser()) {
      case 1:
        return "Buyer";
      case 2:
        return "Owner";
      case 3:
        return "Builder";
      default:
        return;
    }
  }

  function getPgRules() {
    let i = 1;
    let pgRulesObject = [];
    amenitiesList
      .filter((amenity) => amenity["isSelected"] === true)
      .map((amenity) => {
        pgRulesObject.push({
          key: i,
          title: amenity.label,
          value: true,
        });
        i += 1;
      });
    return pgRulesObject;
  }

  function getPriceNegotiations() {
    let arr = [];
    if (allInclusivePrice) {
      arr[0] = {
        id: 1,
        title: "Clear Pricing, All Costs Included.",
        value: "Clear Pricing, All Costs Included.",
        index: 0,
      };
    }
    if (priceNegotiable) {
      arr[1] = {
        id: 1,
        title: "Price Negotiable",
        value: "Price Negotiable",
        index: 1,
      };
    }
    if (govTaxInclusive) {
      arr[2] = {
        id: 2,
        title: "Tax & Govt. Charges Excluded",
        value: "Tax & Govt. Charges Excluded",
        index: 2,
      };
    }
    return arr;
  }

  function createPostPropertyPayload(main, sub) {
    if (propertyAction == "pg") {
      return {
        property_action: "rent",
        property_type: "pg",
        real_estate: "residential",
        property_name: propertyName,
        location: city,
        locality: location,
        features: getPgPaylod(),
        amenities: pgAmenities,
        rules: pgRules,
        foods: [
          {
            key: 1,
            title: "food",
            value: providedFood,
          },
          {
            key: 2,
            title: "provided",
            value: foodType,
          },
          {
            key: 3,
            title: "charge",
            value: foodCharges,
          },
        ],
        expected_price: parseInt(expectedPrice),
        token_amount: parseInt(tokenAmount),
        address: address,
        seller_id: getUserId(),
        description: description,
        device_id: 1,
        main_image: main,
        sub_images: sub,
        room_category: roomCategories,
        // fcm_token: Cookies.get("token"),
        price_negotiations: getPriceNegotiations(),
        expected_price: 0,
      };
    }
    return {
      seller_id: getUserId(),
      property_action: propertyAction,
      // fcm_token: Cookies.get("token"),
      property_type: propertyType,
      location: city,
      locality: location,
      property_name: propertyName,
      posting_as: postingAs,
      real_estate: isActiveBtn,
      amenities: createAmenityObject(),
      features: getFeaturesObject(),
      area: {
        carpet_area: carpetArea,
        carpet_area_unit: carpetAreaUnit,
        super_area: superArea,
        super_area_unit: superAreaUnit,
      },
      availability: availability,
      property_age: parseInt(propertyAge),
      expected_price: parseInt(expectedPrice),
      token_amount: parseInt(tokenAmount),
      address: address,
      main_image: main,
      sub_images: sub,
      facing: propertyFacing,
      device_id: 1,
      posted_by: getTypeOfUser(),
      description: description,
      exclusive: postAgreement,
      rera_id: reraId,
      price_negotiations: getPriceNegotiations(),
    };
  }

  const handleCancel = () => setPreviewOpen(false);

  let rooms = [
    {
      key: "bedrooms",
      label: "Bedrooms",
      value: 0,
    },
    {
      key: "balconies",
      label: "Balconies",
      value: 0,
    },
    {
      key: "bathrooms",
      label: "Bathrooms",
      value: 0,
    },
  ];

  let furnishedStatus = [
    {
      key: "furnished",
      label: "Furnished",
    },
    {
      key: "unfurnished",
      label: "Un Furnished",
    },
    {
      key: "semi_furnished",
      label: "Semi Furnished",
    },
  ];

  function handleIncrement(index, key) {
    let newData = [...features];
    if (newData[index]["value"] < 20) {
      newData[index]["value"] += 1;
    }
    setFeatures((prevState) => [...newData]);
  }
  function handleDecrement(index, key) {
    let newData = [...features];
    newData[index]["value"] -= 1;
    setFeatures((prevState) => [...newData]);
  }

  const selectCarpetAreaAfter = (
    <Select
      defaultValue="sqft"
      onChange={(value) => setCarpetAreaUnit(value)}
      placeholder="Select"
    >
      <Select.Option value="sqft">Sq.Ft</Select.Option>
      <Select.Option value="cent">Cent</Select.Option>
      <Select.Option value="acre">Acre</Select.Option>
    </Select>
  );

  const selectSuperAreaAfter = (
    <Select
      defaultValue="sqft"
      onChange={(value) => setSuperAreaUnit(value)}
      className="select-area-after"
      placeholder="Select"
    >
      <Select.Option value="sqft">Sq.Ft</Select.Option>
      <Select.Option value="cent">Cent</Select.Option>
      <Select.Option value="acre">Acre</Select.Option>
    </Select>
  );

  const uploadButton = (
    <>
      <Image
        src={fileList.length !== 0 ? uploadMultipleImage : uploadSingleImage}
        height={35}
        width={35}
        alt="Upload Image"
        loading="lazy"
      />
      <div className="uploadImageComp">
        {fileList.length !== 0 ? "Upload Multiple Images" : "Upload Main Image"}
      </div>
    </>
  );

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  function handlePgRules(item) {
    if (pgRules.includes(item)) {
      setPgRules((prevState) => prevState.filter((rule) => rule != item));
    } else {
      setPgRules((prevState) => [...prevState, item]);
    }
  }

  function handleServiceAvailable(item) {
    if (servicesAvailable.includes(item)) {
      setServicesAvailable((prevState) =>
        prevState.filter((rule) => rule != item)
      );
    } else {
      setServicesAvailable((prevState) => [...prevState, item]);
    }
  }

  function handleProvidedFood(item) {
    if (providedFood.includes(item)) {
      setProvidedFood((prevState) => prevState.filter((food) => food != item));
    } else {
      setProvidedFood((prevState) => [...prevState, item]);
    }
  }

  const handleChange = async ({ fileList: newFileList }) => {
    const hasInvalidType = newFileList.some(
      (item) =>
        !["image/jpg", "image/jpeg", "image/png", "image/webp"].includes(
          item.type
        )
    );

    if (hasInvalidType) {
      notification.error({
        message: "File Format Not Allowed",
        placement: "bottomRight",
      });
      return;
    }
    try {
      const updatedFileList = await newFileList.map((file) => ({
        ...file,
        status: "uploading",
      }));
      const doneFileList = await updatedFileList.map((file) => ({
        ...file,
        status: "done",
      }));
      setFileList((prevState) => doneFileList);
    } catch (error) {
      notification.error({
        message: "Error Uploading Image",
        description: "",
        placement: "bottomRight",
      });
    }
  };

  function handleRadioChange(e) {
    setPropertyAction((prevState) => e.target.value);
  }

  function validateUserInputs(actionType) {
    switch (actionType) {
      case "sell":
        if (propertyType === "plot") {
          if (
            !city ||
            !location ||
            !address ||
            !expectedPrice ||
            !currentConstruction ||
            !superArea ||
            !propertyFacing
          ) {
            if (currentConstruction === "yes") {
              if (!selectedYears || !selectedMonth) {
                return true;
              } else {
                return false;
              }
            }
            return true;
          } else {
            if (currentConstruction === "yes") {
              if (!selectedYears || !selectedMonth) {
                return true;
              } else {
                return false;
              }
            }
            return false;
          }
        }
        if (propertyType === "flat") {
          if (
            !city ||
            !location ||
            !address ||
            !propertyAge ||
            !expectedPrice ||
            !availability ||
            !carpetArea ||
            !superArea ||
            !propertyFacing ||
            !furnished ||
            !flatFloor ||
            !totalFloors
          ) {
            return true;
          } else {
            return false;
          }
        }
        if (propertyType === "villa") {
          if (
            !city ||
            !location ||
            !address ||
            !propertyAge ||
            !expectedPrice ||
            !availability ||
            !carpetArea ||
            !superArea ||
            !propertyFacing ||
            !furnished
          ) {
            return true;
          } else {
            return false;
          }
        }
        if (propertyType === "shop" || propertyType === "office") {
          if (
            !city ||
            !location ||
            !address ||
            !propertyAge ||
            !expectedPrice ||
            !availability ||
            !carpetArea ||
            !superArea ||
            !propertyFacing ||
            !furnished
          ) {
            return true;
          } else {
            return false;
          }
        }
        return false;
      case "rent":
        if (propertyType === "shop" || propertyType === "office") {
          if (
            !city ||
            !location ||
            !address ||
            !propertyAge ||
            !expectedPrice ||
            !availability ||
            !carpetArea ||
            !superArea ||
            !propertyFacing ||
            !furnished
          ) {
            return true;
          } else {
            return false;
          }
        }
        if (propertyType === "plot") {
          if (
            !city ||
            !location ||
            !address ||
            !expectedPrice ||
            !currentConstruction ||
            !superArea ||
            !propertyFacing
          ) {
            if (currentConstruction === "yes") {
              if (!selectedYears || !selectedMonth) {
                return true;
              } else {
                return false;
              }
            }
            return true;
          } else {
            if (currentConstruction === "yes") {
              if (!selectedYears || !selectedMonth) {
                return true;
              } else {
                return false;
              }
            }
            return false;
          }
        }
        if (propertyType === "flat") {
          if (
            !city ||
            !location ||
            !address ||
            !propertyAge ||
            !expectedPrice ||
            !availability ||
            !carpetArea ||
            !superArea ||
            !propertyFacing ||
            !furnished ||
            !flatFloor ||
            !totalFloors
          ) {
            return true;
          } else {
            return false;
          }
        }
        if (propertyType === "villa") {
          if (
            !city ||
            !location ||
            !address ||
            !propertyAge ||
            !expectedPrice ||
            !availability ||
            !carpetArea ||
            !superArea ||
            !propertyFacing ||
            !furnished
          ) {
            return true;
          } else {
            return false;
          }
        }
        if (propertyType === "pg") {
          return false;
        }
    }
  }

  async function handlePostPropertySubmit() {
    setIsApICall((prevState) => true);
    let imageResults = fileList.map((item) => {
      if (item.status === "uploading") {
        return true;
      }
    });
    if (parseInt(carpetArea) <= 0) {
      notification.error({
        message: "Invalid Carpet Area",
        description: "Entered Carpet Area Seems Wrong",
      });
      setIsApICall((prevState) => false);
      return;
    }
    if (parseInt(superArea) <= 0) {
      notification.error({
        message: "Invalid Super Area",
        description: "Entered Super Area Seems Wrong",
        placement: "bottomRight",
      });
      setIsApICall((prevState) => false);
      return;
    }
    if (parseInt(superArea) < parseInt(carpetArea)) {
      notification.error({
        message: "Carpet Value Is Greater Than Super Value",
        placement: "bottomRight",
      });
      setIsApICall((prevState) => false);
    } else {
      if (imageResults[0]) {
        notification.warning({
          message: "Please Wait For Images To Upload",
          placement: "bottomRight",
        });
        setIsApICall((prevState) => false);
      } else {
        const newForm = new FormData();
        if (fileList.length === 1) {
          newForm.append("main_image", fileList[0].originFileObj);
        } else {
          if(fileList.length > 0){
            newForm.append("main_image", fileList[0].originFileObj);
            for (let i = 1; i < fileList.length; i++) {
              newForm.append("sub_image[]", fileList[i].originFileObj);
            }
          }
        }
        const response = await axios.post(
          `${APP_BASE_URL}/Properties/add_image`,
          newForm,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setMainImg((prevState) => response.data.main_image);
        setSubImages((prevState) => response.data.sub_images);
        await axios
          .post(
            `${APP_BASE_URL}/Properties/create`,
            createPostPropertyPayload(
              response.data.main_image,
              response.data.sub_images
            )
          )
          .then((res) => {
            if (res.status === 200) {
              setPostPropertySuccess((prevState) => true);
              setIsApICall((prevState) => false);
            }
          })
          .catch((err) => {
            if (err.response.data.message === "Not inserted") {
              notification.error({
                message: "You've Exceeded Your Post Quota",
                description: (
                  <>
                    Please Upgrade Your Plan To Post Property{" "}
                    <Link
                      href={{
                        pathname: "/plans",
                      }}
                      className="plansRedirect"
                    >
                      Click Here{" "}
                    </Link>
                    To Upgrade Your Plan
                  </>
                ),
                placement: "bottomRight",
              });
            }
            notification.error({
              message: "Something Went Wrong When Posting Property",
              description: "Please Check After Sometime",
            });
            setIsApICall((prevState) => false);
          }).finally(() => setIsApICall(false))
      }
    }
  }

  function handleTagClick(index) {
    let newData = amenitiesList;
    newData[index].isSelected = !amenitiesList[index].isSelected;
    setAmenitiesList((prevState) => [...newData]);
  }

  console.log(fileList, "fileList");

  const options = [
    {
      label: "Dry",
      value: "dry",
    },
    {
      label: "Wet",
      value: "wet",
    },
    {
      label: "Not Applicable",
      value: "not_applicable",
    },
  ];

  const onChangePantry = ({ target: { value } }) => {
    setPantry((prevState) => value);
    // setValue1(value);
  };

  function handleRoomCategoryInput(value, index, key) {
    let newData = [...roomCategories];
    newData[index][key] = value;
    setRoomCategories((prevState) => [...newData]);
  }

  function validatePgInputs() {
    return (
      !city ||
      !location ||
      !address ||
      !operatingSince ||
      !presentIn ||
      !propertyName ||
      !gateClosing ||
      !noticePeriod
    );
  }

  const checkPropertyType = (_, value) => {
    if (value) {
      return Promise.resolve();
    }
    return Promise.reject(new Error('Price must be greater than zero!'));
  };

  return (
    <>
      <SEO titleTemplate={"Post Property"} />
      {showImagesNotUploadedModal && (
        <Modal
          open={showImagesNotUploadedModal}
          onCancel={() => setShowImagesNotUploadedModal((prevState) => false)}
          footer={null}
        >
          <h3 className="oranceText">ALERT</h3>
          <h1>No Images Uploaded For This Property</h1>
          <span>Are You Sure To Post Property?</span>
          <div>
            <p>
              Enhance your property listing by adding high-quality images.
              Visual content not only makes your property more attractive to
              potential buyers or renters but also improves its online
              visibility.
            </p>
            <p>
              Studies show that listings with images receive more engagement.
              Take this opportunity to showcase the best features of your
              property and make a lasting impression on your audience.
            </p>
            <p>
              If you need assistance with uploading images or have any
              questions, feel free to reach out to{" "}
              <a href="mailto:support@albionpropertyhub.com">
                our support team
              </a>
              . We're here to help you create a compelling property listing that
              stands out in the market.
            </p>
          </div>
          <div className="up-image">
            <Button
              className="actionbtn"
              onClick={() =>
                setShowImagesNotUploadedModal((prevState) => false)
              }
            >
              Upload Image
            </Button>
            <Button
              className="actionbtn"
              onClick={() => {
                if (!getUserMobileNumber() || getUserMobileNumber() == "0") {
                  notification.warning({
                    message: "Please Update Your Profile",
                    description: (
                      <span>
                        Update Your Profile By Clicking{" "}
                        <a href="/profile">here</a>
                      </span>
                    ),
                  });
                } else {
                  handlePostPropertySubmit();
                }
              }}
            >
              Post Property
            </Button>
          </div>
        </Modal>
      )}
      {postPropertySuccess && (
        <Modal
          open={postPropertySuccess}
          onCancel={() => {
            setPostPropertySuccess((prevState) => false);
            router.push("/");
          }}
          footer={null}
          className="postpropertysuccess-modal"
        >
          <div className="container">
            <Image
              src={postPropertySuccessImage}
              alt="Success"
              className="successImg"
              loading="lazy"
            />
            <span>
              {propertyAction == "pg" ? "PG" : "Property"} Posted Successfully
            </span>
            <p className="mainText">
              Your {propertyAction == "pg" ? "PG" : "Property"} Is Under Review
            </p>
            <span>We'll Get Back To You Soon</span>
          </div>
        </Modal>
      )}
      <div className="post-property-page">
        <div className="post-property-cards">
          <div className="left-panel">
            <div className="left-panel-contents">
              <span className="header-title">Upload Images</span>
              <div className="upload-image-desc">
                <Image
                  placeholder="blur"
                  src={imageBorder}
                  loading="lazy"
                  alt="Upload Image"
                />
                <span className="get-offers-text">
                  <span>85% of Buyers enquire on Properties with Photos </span>
                  Upload Photos & Get upto{" "}
                  <span className="themecolor">10X more Enquiries</span>
                </span>
              </div>
              <div className="property-images">
                <div className="property-images-div-upload">
                  <StyledUpload
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={handlePreview}
                    customRequest={() => {}}
                    onChange={handleChange}
                    multiple={fileList.length === 0 ? false : true}
                    accept="image/jpg,image/jpeg,image/png,image/webp"
                  >
                    {fileList.length >= 8 ? null : uploadButton}
                  </StyledUpload>
                  <Modal
                    open={previewOpen}
                    title={previewTitle}
                    footer={null}
                    onCancel={handleCancel}
                  >
                    <Image
                      placeholder="blur"
                      alt="Preview Image"
                      src={previewImage}
                      loading="lazy"
                      className="modalImage"
                    />
                  </Modal>
                </div>
              </div>
              <div className="imageUpload-img-container">
                <Image
                  placeholder="blur"
                  src={imageUploadRules}
                  loading="lazy"
                  alt="Upload Image"
                  className="image-upload-rules"
                  height={100}
                />
              </div>
              <span className="accepted-format">
                Accepted formats are .jpg, .jpeg , .webp & .png. Maximum size
                allowed is 20 MB.
              </span>
            </div>
          </div>
          <div className="right-panel">
            <div className="sell-rent-header">
              <span className="header-title">Sell or Rent your Property</span>
              <Tag className="new-tag-btn">NEW</Tag>
            </div>
            <div className="sell-rent-inputDivs">
              <span className="sell-rent-input-label">
                Property Details{" "}
                <span className="sell-rent-input-sub-desc">(For)</span>{" "}
              </span>
              <Radio.Group
                className="radio-groups"
                onChange={handleRadioChange}
                value={propertyAction}
              >
                <Radio value={"sell"} className="radio-options">
                  Sell
                </Radio>
                <Radio value={"rent"} className="radio-options">
                  Rent
                </Radio>
                <Radio value={"pg"} className="radio-options">
                  PG
                </Radio>
              </Radio.Group>
            </div>
            <Form
              onFinish={() => {
                if (!getUserMobileNumber() || getUserMobileNumber() == "0") {
                  notification.warning({
                    message: "Please Update Your Profile",
                    description: (
                      <span>
                        Update Your Profile By Clicking{" "}
                        <a href="/profile">here</a>
                      </span>
                    ),
                  });
                } else {
                  if (fileList.length === 0) {
                    setShowImagesNotUploadedModal((prevState) => true);
                  } else {
                    handlePostPropertySubmit();
                  }
                }
              }}
              layout="verical"
            >
              {propertyAction != "pg" && (
                <div className="sell-rent-input-parent-container">
                  <span className="sell-rent-input-label">
                    Select Real Estate
                  </span>
                  <div className="sell-rent-input-parent-child">
                    <Button
                      className={
                        isActiveBtn === "residential"
                          ? "isActiveBtn"
                          : "isInActiveBtn"
                      }
                      onClick={() => setIsActiveBtn("residential")}
                    >
                      Residential
                    </Button>
                    <Button
                      className={
                        isActiveBtn === "commercial"
                          ? "isActiveBtn"
                          : "isInActiveBtn"
                      }
                      onClick={() => setIsActiveBtn("commercial")}
                    >
                      Commercial
                    </Button>
                  </div>
                </div>
              )}
              {propertyAction != "pg" && (
                <div className="sell-rent-inputDivs property-type-sec">
                  <span className="sell-rent-input-label sr-property-type">
                    Property Type{" "}
                  </span>
                  <Form.Item
                    rules={[
                      {
                        validator: (_, value) => {
                          if (!value) {
                            return Promise.reject(
                              new Error("Please Select A Property Type")
                            );
                          }
                          return Promise.resolve();
                        },
                      },
                    ]}
                    name={"property_type"}
                  >
                    <Select
                      className="option-select1"
                      placeholder="Select Type"
                      onChange={(value) => setPropertyType(value)}
                    >
                      {isActiveBtn === "residential" ? (
                        <>
                          <Select.Option value="flat">
                            Flat / Apartment
                          </Select.Option>
                          <Select.Option value="villa">Villa</Select.Option>
                          <Select.Option value="house">House</Select.Option>
                          {propertyAction != "rent" && (
                            <Select.Option value="plot">
                              Land / Plot
                            </Select.Option>
                          )}
                        </>
                      ) : (
                        <>
                          <Select.Option value="shop">Shop</Select.Option>
                          <Select.Option value="office">Office</Select.Option>
                          <Select.Option value="plot">Land</Select.Option>
                        </>
                      )}
                    </Select>
                  </Form.Item>
                </div>
              )}
              <div className="sell-rent-inputDivs">
                <span className="sell-rent-input-label">
                  {propertyAction != "pg" ? `Property Location` : `PG Location`}{" "}
                  <span className="sell-rent-input-sub-desc">
                    (City, Name of Project/Society)
                  </span>
                </span>
                <div className="location-inputs">
                  <Form.Item
                    rules={[
                      {
                        validator: (_, value) => {
                          if (!value) {
                            return Promise.reject(
                              new Error("Please Select A District")
                            );
                          }
                          return Promise.resolve();
                        },
                      },
                    ]}
                    name={"district"}
                  >
                    <Select
                      showSearch
                      placeholder="Enter District"
                      value={city}
                      onChange={(e, option) => {
                        setCity((prevState) => e);
                        setCityId((prevState) => option?.key);
                      }}
                      className="common-width-select"
                      // required
                    >
                      {cities.map((city) => (
                        <Select.Option
                          value={city.city?.toLowerCase()}
                          key={city.city_id}
                        >
                          {city.city}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    rules={[
                      {
                        validator: (_, value) => {
                          if (!value) {
                            return Promise.reject(
                              new Error("Please Select A Locality")
                            );
                          }
                          return Promise.resolve();
                        },
                      },
                    ]}
                    name={"locality"}
                  >
                    <Select
                      showSearch
                      placeholder="Enter Locality"
                      value={location}
                      onChange={(value) => {
                        setLocation(value);
                      }}
                      className="city-location-filter common-width-select"
                    >
                      {localities.length > 0 ? (
                        localities.map((city) => (
                          <Select.Option
                            value={city?.toLowerCase()}
                            key={`${city?.toLowerCase()}_${
                              Math.random() * 1000 + 1
                            }`}
                          >
                            {city}
                          </Select.Option>
                        ))
                      ) : (
                        <> Please Select District </>
                      )}
                    </Select>
                  </Form.Item>
                  {propertyAction != "pg" && (
                    <Input
                      placeholder={"Name of Property (Optional)"}
                      className="placeholder_change projectName locInput"
                      value={propertyName}
                      onChange={(e) => setPropertyName(e.target.value)}
                    />
                  )}
                </div>
                <Item
                  rules={[
                    {
                      validator: (_, e) => {
                        if (e == undefined) {
                          return Promise.reject(
                            new Error("Please Enter Valid Address")
                          );
                        }
                        return Promise.resolve();
                      },
                    },
                  ]}
                  name={"address"}
                >
                  <TextArea
                    className="input-text-area"
                    placeholder="Enter Valid Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    autoSize={{ minRows: 3, maxRows: 10 }}
                    maxLength={500}
                    showCount
                    // required
                  />
                </Item>
                <span className="sell-rent-input-label">
                  {propertyAction != "pg"
                    ? `Property Description`
                    : `PG Description`}{" "}
                  <span className="sell-rent-input-sub-desc">(Optional)</span>
                </span>
                <TextArea
                  className="input-text-area"
                  placeholder="About Property"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  autoSize={{ minRows: 3, maxRows: 10 }}
                  maxLength={1000}
                  showCount
                />
              </div>
              {propertyAction == "pg" && (
                <div className="sell-rent-inputDivs property-type-sec">
                  <span className="sell-rent-input-label sr-property-type">
                    Operating Since{" "}
                  </span>
                  <InputNumber
                    placeholder="Ex : 2024"
                    value={operatingSince}
                    onChange={(value) => setOperatingSince(value)}
                    maxLength={4}
                    controls={false}
                    className="select-w-140"
                    // required
                  />
                </div>
              )}
              {propertyAction == "pg" && (
                <div className="sell-rent-inputDivs property-type-sec">
                  <span className="sell-rent-input-label sr-property-type">
                    PG Present In{" "}
                  </span>
                  <Select
                    placeholder="Select"
                    value={presentIn}
                    onChange={(value) => setPresentIn(value)}
                  >
                    <Select.Option value="induvidual_building">
                      An Independent Building
                    </Select.Option>
                    <Select.Option value="induvidual_flats">
                      An Independent Flat(s)
                    </Select.Option>
                    <Select.Option value="in_society">In Society</Select.Option>
                  </Select>
                </div>
              )}
              {propertyAction == "pg" && (
                <div className="sell-rent-inputDivs property-type-sec">
                  <span className="sell-rent-input-label sr-property-type">
                    Name Of Your Paying Guest (PG)
                  </span>
                  <Input
                    placeholder="Enter Name Of PG"
                    onChange={(e) => setPropertyName(e.target.value)}
                    value={propertyName}
                    // required
                  />
                </div>
              )}
              {propertyAction == "pg" && (
                <div className="sell-rent-inputDivs property-type-sec">
                  <span className="sell-rent-input-label sr-property-type">
                    You Are Posting As{" "}
                  </span>
                  <Radio.Group
                    className="radio-groups"
                    value={postingAs}
                    onChange={(e) => {
                      setPostingAs((prevState) => e.target.value);
                    }}
                  >
                    <Radio value={"owner"} className="radio-options">
                      Owner
                    </Radio>
                    <Radio value={"property_manager"} className="radio-options">
                      Property Manager
                    </Radio>
                    <Radio value={"agent"} className="radio-options">
                      Agent
                    </Radio>
                  </Radio.Group>
                </div>
              )}
              {propertyAction == "pg" && (
                <div className="sell-rent-inputDivs property-type-sec">
                  <span className="sell-rent-input-label sr-property-type">
                    Select Available Room Categories
                  </span>
                  <div className="room-category-section">
                    {["single", "double", "triple", "four"].map((item) => (
                      <Tag
                        className={
                          roomCategories
                            .map((item1) => item1.key)
                            .find((p) => p == item)
                            ? "roomcategory activecategory"
                            : "roomcategory"
                        }
                        onClick={() => {
                          if (
                            roomCategories
                              .map((item1) => item1.key)
                              .find((p) => p == item)
                          ) {
                            setRoomCategories((prevState) =>
                              prevState.filter((roomCat) => roomCat.key != item)
                            );
                          } else {
                            setRoomCategories((prevState) => [
                              ...prevState,
                              {
                                key: item,
                                price_per_bed: "1",
                                deposit: "1",
                                no_of_beds: "1",
                              },
                            ]);
                          }
                        }}
                      >
                        {capitalizeFirstLetter(item)}
                      </Tag>
                    ))}
                  </div>
                </div>
              )}
              {propertyAction == "pg" && (
                <div className="sell-rent-inputDivs property-type-sec">
                  {roomCategories.map((item, index) => (
                    <div
                      className={`room-category-area subfeatureinput ${
                        index >= 1 ? "bb1" : ""
                      }`}
                    >
                      <div className="featureinputs">
                        <span className="pg-price">
                          Number of Rooms In PG - (
                          {capitalizeFirstLetter(item.key)})
                        </span>
                        <InputNumber
                          placeholder="Number of Rooms In PG"
                          value={roomCategories[index].no_of_beds}
                          formatter={(value) =>
                            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                          }
                          onChange={(value) =>
                            handleRoomCategoryInput(
                              Math.abs(value),
                              index,
                              "no_of_beds"
                            )
                          }
                          // required
                          className="select-w-180"
                          controls={false}
                        />
                        <span className="pg-price">
                          Monthly Rent Per Bed - (
                          {capitalizeFirstLetter(item.key)})
                        </span>
                        <InputNumber
                          prefix={<span>&#x20B9;</span>}
                          // required
                          placeholder="Monthly Rent Per Bed"
                          value={roomCategories[index].price_per_bed}
                          formatter={(value) =>
                            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                          }
                          onChange={(value) =>
                            handleRoomCategoryInput(
                              Math.abs(value),
                              index,
                              "price_per_bed"
                            )
                          }
                          className="select-w-180"
                          controls={false}
                        />
                      </div>
                      <div className="featureinputs">
                        <span className="pg-price">
                          Security Deposit Per Bed - (
                          {capitalizeFirstLetter(item.key)})
                        </span>
                        <InputNumber
                          prefix={<span>&#x20B9;</span>}
                          // required
                          placeholder="Deposit Per Bed"
                          formatter={(value) =>
                            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                          }
                          value={roomCategories[index].deposit}
                          onChange={(value) =>
                            handleRoomCategoryInput(
                              Math.abs(value),
                              index,
                              "deposit"
                            )
                          }
                          className="select-w-180"
                          controls={false}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {propertyAction == "pg" && (
                <div className="sell-rent-inputDivs property-type-sec">
                  <span className="sell-rent-input-label sr-property-type">
                    Preferred Gender
                  </span>
                  <div className="room-category-section">
                    {["male", "female", "male_female"].map((item) => (
                      <Tag
                        className={
                          preferredGender == item
                            ? "roomcategory activecategory"
                            : "roomcategory"
                        }
                        onClick={() => {
                          setPreferredGender(item);
                        }}
                      >
                        {capitalizeFirstLetter(
                          formatText(item == "male_female" ? "Both" : item)
                        )}
                      </Tag>
                    ))}
                  </div>
                </div>
              )}
              {propertyAction == "pg" && (
                <div className="sell-rent-inputDivs property-type-sec">
                  <span className="sell-rent-input-label sr-property-type">
                    Gate Closing
                  </span>
                  <div className="room-category-section">
                    <TimePicker
                      use12Hours
                      format={"h:mm a"}
                      onChange={(time, timeString) => {
                        setGateClosing(timeString);
                      }}
                      placeholder="Select Time"
                      className="select-w-140"
                    />
                  </div>
                </div>
              )}
              {propertyAction == "pg" && (
                <div className="sell-rent-inputDivs property-type-sec">
                  <span className="sell-rent-input-label sr-property-type">
                    PG Rules
                  </span>
                  <div className="room-category-section">
                    {[
                      "Veg Only",
                      "No Smoking",
                      "Drinking alcohol Not Allowed",
                      "Restricted Entry of Opposite Gender",
                      "Guardian Not Allowed",
                    ].map((item) => (
                      <Tag
                        onClick={() => handlePgRules(item)}
                        className={
                          pgRules.includes(item)
                            ? "roomcategory activecategory"
                            : "roomcategory"
                        }
                      >
                        {item}
                      </Tag>
                    ))}
                  </div>
                </div>
              )}
              {propertyAction == "pg" && (
                <div className="sell-rent-inputDivs property-type-sec">
                  <span className="sell-rent-input-label sr-property-type">
                    Services Available
                  </span>
                  <div className="room-category-section">
                    {["Laundry", "Room Cleaning", "Warden"].map((item) => (
                      <Tag
                        onClick={() => handleServiceAvailable(item)}
                        className={
                          servicesAvailable.includes(item)
                            ? "roomcategory activecategory"
                            : "roomcategory"
                        }
                      >
                        {item}
                      </Tag>
                    ))}
                  </div>
                </div>
              )}
              {propertyAction == "pg" && (
                <div className="sell-rent-inputDivs property-type-sec">
                  <span className="sell-rent-input-label sr-property-type">
                    Food Provided{" "}
                    <Switch
                      foodProvided
                      onChange={() =>
                        setFoodProvided((prevState) => !prevState)
                      }
                      className="foodProvided"
                    />
                  </span>
                  <div className="room-category-section">
                    {foodProvided && (
                      <div className="featureinputs">
                        <div className="flex-wrap-5">
                          {["Breakfast", "Lunch", "Dinner"].map((item) => (
                            <Tag
                              className={
                                providedFood.includes(item)
                                  ? "roomcategory activecategory"
                                  : "roomcategory"
                              }
                              onClick={() => handleProvidedFood(item)}
                            >
                              {item}
                            </Tag>
                          ))}
                        </div>
                        <Select
                          placeholder="Select Food Charges"
                          value={foodCharges}
                          onChange={(value) => setFoodCharges(value)}
                        >
                          <Select.Option value="Included In Rent">
                            Included In Rent
                          </Select.Option>
                          <Select.Option value="Per Meal Basis">
                            Per Meal Basis
                          </Select.Option>
                          <Select.Option value="Fixed Monthly Amount">
                            Fixed Monthly Amount
                          </Select.Option>
                        </Select>
                        <Select
                          placeholder="Food Provided"
                          value={foodType}
                          onChange={(value) => setFoodType(value)}
                        >
                          <Select.Option value="Veg">Veg</Select.Option>
                          <Select.Option value="both">
                            Veg & Non-Veg
                          </Select.Option>
                        </Select>
                      </div>
                    )}
                  </div>
                </div>
              )}
              {propertyAction == "pg" && (
                <div className="sell-rent-inputDivs property-type-sec">
                  <span className="sell-rent-input-label sr-property-type">
                    Parking Availablility
                  </span>
                  <div className="room-category-section">
                    <Tag
                      className={
                        parkingAvailability == "bike"
                          ? "roomcategory activecategory"
                          : "roomcategory"
                      }
                      onClick={() => setParkingAvailability("bike")}
                    >
                      Two Wheeler
                    </Tag>
                    <Tag
                      className={
                        parkingAvailability == "car"
                          ? "roomcategory activecategory"
                          : "roomcategory"
                      }
                      onClick={() => setParkingAvailability("car")}
                    >
                      Four Wheeler
                    </Tag>
                    <Tag
                      className={
                        parkingAvailability == "bike & car"
                          ? "roomcategory activecategory"
                          : "roomcategory"
                      }
                      onClick={() => setParkingAvailability("bike & car")}
                    >
                      Both
                    </Tag>
                  </div>
                </div>
              )}
              {propertyAction == "pg" && (
                <div className="sell-rent-inputDivs property-type-sec">
                  <span className="sell-rent-input-label sr-property-type">
                    Tenants Preferred
                  </span>
                  <div className="room-category-section">
                    {["professional", "student", "professional_students"].map(
                      (item) => (
                        <Tag
                          className={
                            preferredTenant == item
                              ? "roomcategory activecategory"
                              : "roomcategory"
                          }
                          onClick={() =>
                            setPreferredTenant((prevState) =>
                              item == "professional_students"
                                ? "professional_students"
                                : item?.toLowerCase()
                            )
                          }
                        >
                          {capitalizeFirstLetter(
                            formatText(
                              item == "professional_students"
                                ? "Professional & Students"
                                : item
                            )
                          )}
                        </Tag>
                      )
                    )}
                  </div>
                </div>
              )}
              {propertyAction == "pg" && (
                <div className="sell-rent-inputDivs property-type-sec">
                  <span className="sell-rent-input-label sr-property-type">
                    Select Notice Period
                  </span>
                  <Select
                    placeholder="Select"
                    onChange={(value) => setNoticePeriod(value)}
                    value={noticePeriod}
                  >
                    <Select.Option value="7">1 Week</Select.Option>
                    <Select.Option value="15">15 Days</Select.Option>
                    <Select.Option value="30">1 Month</Select.Option>
                    <Select.Option value="60">2 Months</Select.Option>
                    <Select.Option value="> 60">&gt; 2 Months</Select.Option>
                    <Select.Option value="0">No Notice Period</Select.Option>
                  </Select>
                </div>
              )}
              {propertyAction == "pg" && (
                <div className="sell-rent-inputDivs property-type-sec">
                  <span className="sell-rent-input-label sr-property-type">
                    Amenities
                  </span>
                  <div className="flex-wrap-5">
                    {pgAmenities.map((item, index) => (
                      <Tag
                        className={
                          item.value ? "selected-amenities" : "amenities-tag"
                        }
                        onClick={() =>
                          setPgAmenities((prevState) =>
                            prevState.map((amenity, i) => {
                              return i === index
                                ? { ...amenity, value: !amenity.value }
                                : amenity;
                            })
                          )
                        }
                      >
                        {capitalizeWords(formatText(item.title))}
                      </Tag>
                    ))}
                  </div>
                </div>
              )}
              {propertyAction != "pg" &&
                propertyType &&
                propertyType === "plot" && (
                  <div className="sell-rent-inputDivs">
                    <span className="sell-rent-input-label">
                      Property Features
                    </span>
                    <div className="featureinputs">
                      <div className="subfeatureinput">
                        <span className="input-spn-label">
                          Boundary Wall Made
                        </span>
                        <Form.Item
                          rules={[{
                            required : true,
                            message : "Please Select"
                          }]}
                          name={"boundaryWallMade"}
                        >
                        <Select
                          onChange={(value) => setBoundaryWallMade(value)}
                          placeholder="Select"
                          className="select-w-140"
                          value={boundaryWallMade}
                        >
                          <Select.Option value="yes">Yes</Select.Option>
                          <Select.Option value="no">No</Select.Option>
                        </Select>
                        </Form.Item>
                      </div>
                      <div className="subfeatureinput">
                        <span className="input-spn-label">
                          Total Number of Floors Allowed For Const.
                        </span>
                        <Form.Item
                          rules={[{
                            required : true,
                            message : "Please Enter Total Floor Allowed"
                          }]}
                          name={"totalFloorAllowed"}
                        >
                        <Input
                          className="select-w-140"
                          value={totalFloorAllowed}
                          type="number"
                          onChange={(e) => setTotalFloorAllowed(e.target.value)}
                        />
                        </Form.Item>
                      </div>
                      <div className="subfeatureinput">
                        <span className="input-spn-label">
                          Any Current Construction
                        </span>
                        <Form.Item
                          rules={[{
                            required : true,
                            message : "Please Select Current Construction Period"
                          }]}
                          name={"currentConstruction"}
                        >
                          <Select
                            value={currentConstruction}
                            onChange={(value) => setCurrentConstruction(value)}
                            placeholder="Select"
                            className="select-w-140"
                          >
                            <Select.Option value="yes">Yes</Select.Option>
                            <Select.Option value="no">No</Select.Option>
                          </Select>
                        </Form.Item>
                        {currentConstruction === "yes" && (
                          <div className="featureinputs mtop10">
                            <span className="input-spn-label">
                              Current Construction Completion Time
                            </span>
                            <div className="flex-g10">
                            <Form.Item
                          rules={[{
                            required : true,
                            message : "Please Select"
                          }]}
                          name={"selectedYears"}
                          
                        >
                              <Select
                                placeholder="Select Years"
                                onChange={(value) => setSelectedYears(value)}
                                className="select-w-140"
                                value={selectedYears}
                              >
                                {Array.from(
                                  { length: 10 },
                                  (_, index) => index + 1
                                ).map((item) => (
                                  <Select.Option value={item}>
                                    {item}
                                  </Select.Option>
                                ))}
                              </Select>
                              </Form.Item>
                              <Form.Item
                          rules={[{
                            required : true,
                            message : "Please Select"
                          }]}
                          name={"selectedMonth"}
                        >
                              <Select
                                placeholder="Select Month"
                                onChange={(value) => setSelectedMonth(value)}
                                className="select-w-140"
                                value={selectedMonth}
                              >
                                {Array.from(
                                  { length: 12 },
                                  (_, index) => index + 1
                                ).map((item) => (
                                  <Select.Option value={item}>
                                    {item}
                                  </Select.Option>
                                ))}
                              </Select>
                              </Form.Item>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              {propertyAction != "pg" &&
                propertyType &&
                propertyType !== "plot" &&
                isActiveBtn !== "commercial" && (
                  <div className="sell-rent-inputDivs">
                    <span className="sell-rent-input-label">
                      Property Features
                    </span>
                    <>
                      <div className="property-features">
                        {features.map((item, index) => (
                          <div key={item.key} className="featureinputs">
                            <span className="input-spn-label">
                              {item.label}
                            </span>
                            <div className="inc-dec-input">
                              <Button
                                className="decrementBtn"
                                onClick={() => {
                                  if (item.value === 0) return;
                                  handleDecrement(index, item.key);
                                }}
                              >
                                -
                              </Button>
                              <InputNumber
                                className="placeholder_change input-incdec"
                                value={item.value}
                                controls={false}
                                // required
                                type="number"
                                onChange={(e) => {
                                  let newData = [...features];
                                  if (e > 20) {
                                    newData[index]["value"] = 20;
                                  } else {
                                    newData[index]["value"] = e;
                                  }
                                  setFeatures((prevState) => [...newData]);
                                }}
                              />
                              <Button
                                className="incrementBtn"
                                onClick={() => handleIncrement(index, item.key)}
                              >
                                +
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="prop-feature-second-row">
                        {propertyType === "flat" && (
                          <div className="floor-no-sec">
                            <span className="input-spn-label">
                              Total Number of Flats in Society
                            </span>
                            <Select
                              value={totalNumberOfFlatsInSociety}
                              onChange={(value) =>
                                setTotalNumberOfFlatsInSociety(value)
                              }
                              placeholder="Select"
                              className="flat-in-society"
                            >
                              <Select.Option value="10">&lt; 10</Select.Option>
                              <Select.Option value="25">&lt; 25</Select.Option>
                              <Select.Option value="26">&gt;= 26</Select.Option>
                            </Select>
                          </div>
                        )}
                        {propertyType !== "villa" && (
                          <>
                            <div className="total-floor">
                              <span className="input-spn-label">
                                Total Floors (In Flat)
                              </span>
                              <div className="inc-dec-input inc-dec-input-res">
                                <Button
                                  className="decrementBtn"
                                  onClick={() => {
                                    if (totalFloors === 0) return;
                                    setTotalFloors((prevState) => {
                                      return totalFloors - 1;
                                    });
                                  }}
                                >
                                  -
                                </Button>
                                <InputNumber
                                  className="input-incdec placeholder_change responsive"
                                  // required
                                  onChange={(e) => {
                                    if (e > 20) {
                                      setTotalFloors((prevState) => 20);
                                    } else {
                                      setTotalFloors((prevState) => e);
                                    }
                                  }}
                                  value={totalFloors}
                                  type="number"
                                  controls={false}
                                />
                                <Button
                                  className="incrementBtn"
                                  onClick={() => {
                                    setTotalFloors((prevState) => {
                                      if (totalFloors < 20) {
                                        return totalFloors + 1;
                                      } else {
                                        return totalFloors;
                                      }
                                    });
                                  }}
                                >
                                  +
                                </Button>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </>
                  </div>
                )}
              {propertyAction != "pg" && propertyType === "flat" && (
                <div className="subfeatureinput">
                  <span className="input-spn-label">Flat Floor No</span>
                  <Select
                    placeholder="Select Floor"
                    onChange={(value) => setFlatFloor(value)}
                    className="select-w-140"
                    value={flatFloor}
                  >
                    {Array.from(
                      { length: totalFloors },
                      (_, index) => index + 1
                    ).map((item) => (
                      <Select.Option value={item} key={item}>
                        {item}
                      </Select.Option>
                    ))}
                  </Select>
                </div>
              )}
              {propertyAction != "pg" && propertyType !== "plot" && (
                <div className="furnish-details">
                  <span className="sell-rent-input-label">
                    Furnished Status
                  </span>
                  <div className="furnish-btns">
                    {furnishedStatus.map((status) => (
                      <Button
                        key={status.key}
                        className={
                          status.key === furnished
                            ? "isActiveFurnishBtn"
                            : "singleBtn"
                        }
                        onClick={() => setFurnished(status.key)}
                      >
                        {status.label}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
              {propertyAction != "pg" && (
                <div className="furnish-details">
                  <span className="sell-rent-input-label">Facing</span>
                  <Item
                    rules={[
                      {
                        validator: (_, value) => {
                          if (value == null) {
                            return Promise.reject(
                              new Error("Please Select Property Facing")
                            );
                          }
                          return Promise.resolve();
                        },
                      },
                    ]}
                    name={"propertyFacing"}
                  >
                    <Select
                      value={propertyFacing}
                      placeholder="Select"
                      onChange={(value) => setPropertyFacing(value)}
                      className="select-w-140"
                      style={{ width: 140 }}
                    >
                      <Select.Option value="north">North</Select.Option>
                      <Select.Option value="east">East</Select.Option>
                      <Select.Option value="west">West</Select.Option>
                      <Select.Option value="south">South</Select.Option>
                      <Select.Option value="north_east">
                        North East
                      </Select.Option>
                      <Select.Option value="south_east">
                        South East
                      </Select.Option>
                      <Select.Option value="south_west">
                        South West
                      </Select.Option>
                      <Select.Option value="north_west">
                        North West
                      </Select.Option>
                    </Select>
                  </Item>
                </div>
              )}
              {propertyAction != "pg" && (
                <div className="sell-rent-inputDivs">
                  <span className="sell-rent-input-label">
                    Area{" "}
                    <span className="sell-rent-input-sub-desc">
                      {propertyType !== "plot"
                        ? `(Provide Carpet Area and Super Area)`
                        : `(Provide Super Area)`}
                    </span>
                  </span>
                  {propertyType !== "plot" && (
                    <div>
                      <span className="input-spn-label">Carpet Area</span>
                      <Item
                        rules={[
                          {
                            validator: (_, e) => {
                              if (e == null) {
                                return Promise.reject(
                                  new Error("Please Enter Carpet Area")
                                );
                              }
                              return Promise.resolve();
                            },
                          },
                        ]}
                        name={"carpet_area"}
                      >
                        <Input
                          className="placeholder_change select-after-input"
                          placeholder="Enter Carpet Area"
                          addonAfter={selectCarpetAreaAfter}
                          onChange={(e) => setCarpetArea(e.target.value)}
                          controls={false}
                          type="number"
                        />
                      </Item>
                    </div>
                  )}
                  <div>
                    <span className="input-spn-label">Super Area</span>
                    <Item
                      rules={[
                        {
                          validator: (_, e) => {
                            if (e == null) {
                              return Promise.reject(
                                new Error("Please Enter Super Area")
                              );
                            }
                            return Promise.resolve();
                          },
                        },
                      ]}
                      name={"super_area"}
                    >
                      <Input
                        placeholder="Enter Super Area"
                        addonAfter={selectSuperAreaAfter}
                        className="select-after-input"
                        onChange={(e) => setSuperArea(e.target.value)}
                        controls={false}
                        type="number"
                      />
                    </Item>
                  </div>
                </div>
              )}
              {propertyAction != "pg" && (
                <>
                  {isActiveBtn === "commercial" ? (
                    propertyType === "office" ? (
                      <div className="flex-column-25">
                        <div className="featureinputs">
                          <span className="sell-rent-input-label">
                            Cafeteria / Pantry (Optional)
                          </span>
                          <Radio.Group
                            options={options}
                            onChange={onChangePantry}
                            value={pantry}
                          >
                            {options.map((item) => (
                              <Radio
                                value={item.value}
                                className="radio-options"
                                key={item.label}
                              >
                                {item.label}
                              </Radio>
                            ))}
                          </Radio.Group>
                        </div>
                        <div>
                          <span className="sell-rent-input-label">
                            Unit Details
                          </span>
                          <div className="featureinputs">
                            <span className="feature-in-label">Washrooms</span>
                            <Select
                              className="select-100px"
                              value={totalWashroom}
                              placeholder="Select"
                              onChange={(value) => setTotalWashroom(value)}
                            >
                              <Select.Option value="1">1</Select.Option>
                              <Select.Option value="2">2</Select.Option>
                              <Select.Option value="3">3</Select.Option>
                              <Select.Option value="4">4</Select.Option>
                              <Select.Option value="5">5</Select.Option>
                              <Select.Option value="6">6</Select.Option>
                              <Select.Option value="7">7</Select.Option>
                              <Select.Option value="8">8</Select.Option>
                            </Select>
                          </div>
                        </div>
                        <div className="featureinputs">
                          <span className="sell-rent-input-label">
                            Total Number of Floors
                          </span>
                          <Select
                            className="select-100px"
                            placeholder="Select"
                            onChange={(value) =>
                              setTotalNumberofFloorInOffice(value)
                            }
                          >
                            <Select.Option value="1">1</Select.Option>
                            <Select.Option value="2">2</Select.Option>
                            <Select.Option value="3">3</Select.Option>
                            <Select.Option value="4">4</Select.Option>
                            <Select.Option value="5">5</Select.Option>
                            <Select.Option value="6">6</Select.Option>
                            <Select.Option value="7">7</Select.Option>
                            <Select.Option value="8">8</Select.Option>
                            <Select.Option value="9">&gt; 8 </Select.Option>
                          </Select>
                        </div>
                        <div className="featureinputs">
                          <span className="sell-rent-input-label">
                            Office Floor Number
                          </span>
                          {totalNumberOfFloors === "getinput" ? (
                            <Input
                              value={officeFloorNumber}
                              onChange={(value) => setOfficeFloorNumber(value)}
                              // required
                            />
                          ) : (
                            <Select
                              className="select-100px"
                              placeholder="Select"
                              value={officeFloorNumber}
                              onChange={(value) => setOfficeFloorNumber(value)}
                            >
                              {Array.from(
                                { length: totalNumberofFloorInOffice },
                                (_, index) => index + 1
                              ).map((item) => (
                                <Select.Option value={item}>
                                  {item}
                                </Select.Option>
                              ))}
                            </Select>
                          )}
                        </div>
                      </div>
                    ) : propertyType === "shop" ? (
                      <div className="flex-column-25">
                        <div className="featureinputs">
                          <span className="sell-rent-input-label">
                            Cafeteria / Pantry
                          </span>
                          <Radio.Group
                            options={options}
                            onChange={onChangePantry}
                            value={pantry}
                          >
                            {options.map((item) => (
                              <Radio
                                value={item.value}
                                className="radio-options"
                                key={item.label}
                              >
                                {item.label}
                              </Radio>
                            ))}
                          </Radio.Group>
                        </div>
                        <div className="featureinputs">
                          <span className="sell-rent-input-label">
                            Personal Washroom
                          </span>

                          <Select
                            className="select-100px"
                            placeholder="Select"
                            value={hasPersonalWashroom}
                            onChange={(value) => setHasPersonalWashroom(value)}
                          >
                            <Select.Option value="yes">Yes</Select.Option>
                            <Select.Option value="no">No</Select.Option>
                          </Select>
                        </div>
                        <div className="featureinputs">
                          <span className="sell-rent-input-label">
                            Is Main Road Facing
                            <span className="sell-rent-input-sub-desc">
                              (Optional)
                            </span>
                          </span>
                          <Select
                            className="select-100px"
                            placeholder="Select"
                            value={isMainRoadFacing}
                            onChange={(value) => setIsMainRoadFacing(value)}
                          >
                            <Select.Option value="yes">Yes</Select.Option>
                            <Select.Option value="no">No</Select.Option>
                          </Select>
                        </div>
                        <div className="featureinputs">
                          <span className="sell-rent-input-label">
                            Corner Shop{" "}
                            <span className="sell-rent-input-sub-desc">
                              (Optional)
                            </span>
                          </span>

                          <Select
                            className="select-100px"
                            placeholder="Select"
                            value={isCornerShop}
                            onChange={(value) => setIsCornerShop(value)}
                          >
                            <Select.Option value="yes">Yes</Select.Option>
                            <Select.Option value="no">No</Select.Option>
                          </Select>
                        </div>
                        <div className="featureinputs">
                          <span className="sell-rent-input-label">
                            Total Number of Floors
                          </span>
                          <Select
                            className="select-100px"
                            placeholder="Select"
                            onChange={(value) =>
                              setTotalNumberofFloorInOffice(value)
                            }
                          >
                            <Select.Option value="1">1</Select.Option>
                            <Select.Option value="2">2</Select.Option>
                            <Select.Option value="3">3</Select.Option>
                            <Select.Option value="4">4</Select.Option>
                            <Select.Option value="5">5</Select.Option>
                            <Select.Option value="6">6</Select.Option>
                            <Select.Option value="7">7</Select.Option>
                            <Select.Option value="8">8</Select.Option>
                            <Select.Option value="9">&gt; 8 </Select.Option>
                          </Select>
                        </div>
                        <div className="featureinputs">
                          <span className="sell-rent-input-label">
                            Office Floor Number
                          </span>
                          {totalNumberOfFloors === "getinput" ? (
                            <Input
                              value={officeFloorNumber}
                              onChange={(e) =>
                                setOfficeFloorNumber(e.target.value)
                              }
                              // required
                            />
                          ) : (
                            <Select
                              className="select-100px"
                              placeholder="Select"
                              value={officeFloorNumber}
                              onChange={(value) => setOfficeFloorNumber(value)}
                              // required
                            >
                              {Array.from(
                                { length: totalNumberofFloorInOffice },
                                (_, index) => index + 1
                              ).map((item) => (
                                <Select.Option value={item}>
                                  {item}
                                </Select.Option>
                              ))}
                            </Select>
                          )}
                        </div>
                      </div>
                    ) : (
                      <></>
                    )
                  ) : (
                    <></>
                  )}
                </>
              )}
              {propertyAction != "pg" &&
                propertyAction != "rent" &&
                propertyType !== "plot" && (
                  <div className="sell-rent-inputDivs">
                    <span className="sell-rent-input-label">
                      Property Availability , Age Of Construction{" "}
                      <span className="sell-rent-input-sub-desc">
                        (Possession Status)
                      </span>
                    </span>
                    <div className="transaction-type">
                      <Radio.Group
                        value={availability}
                        onChange={(e) => setAvailability(e.target.value)}
                      >
                        <Radio
                          value={"under_construction"}
                          className="radio-opt-text"
                        >
                          Under Construction
                        </Radio>
                        <Radio
                          value={"ready_to_move"}
                          className="radio-opt-text"
                        >
                          Ready To Move
                        </Radio>
                      </Radio.Group>
                    </div>
                    {availability === "under_construction" && (
                      <div className="flex-20">
                        <Select
                          placeholder="Select Years"
                          onChange={(value) => setSelectedYears(value)}
                          className="select-w-140"
                        >
                          {Array.from(
                            { length: 10 },
                            (_, index) => index + 1
                          ).map((item) => (
                            <Select.Option value={item}>{item}</Select.Option>
                          ))}
                        </Select>
                        <Select
                          placeholder="Select Month"
                          onChange={(value) => setSelectedMonth(value)}
                          className="select-w-140"
                        >
                          {Array.from(
                            { length: 12 },
                            (_, index) => index + 1
                          ).map((item) => (
                            <Select.Option value={item}>{item}</Select.Option>
                          ))}
                        </Select>
                      </div>
                    )}
                    {availability === "ready_to_move" && (
                      <div className="age-of-construction">
                        <span className="input-spn-label">
                          Age of Construction{" "}
                          <span className="sell-rent-input-sub-desc">
                            (In Years)
                          </span>
                        </span>
                        <Select
                          className="age-of-construction-select"
                          value={propertyAge}
                          placeholder="Select"
                          onChange={(value) => setPropertyAge(value)}
                        >
                          <Select.Option value="0">New</Select.Option>
                          <Select.Option value="2">&gt; 2</Select.Option>
                          <Select.Option value="5">&gt; 5</Select.Option>
                          <Select.Option value="8">&gt; 8</Select.Option>
                          <Select.Option value="10">&gt; 10</Select.Option>
                        </Select>
                      </div>
                    )}
                  </div>
                )}
              {propertyAction != "pg" && (
                <div className="sell-rent-inputDivs">
                  <span className="sell-rent-input-label">Price Details</span>
                  <div className="price-details-row">
                    <div className="inputCol">
                      <span className="input-spn-label">
                        {propertyAction !== "rent"
                          ? "Expected Price"
                          : "Monthly Rent"}
                      </span>
                      <Item
                        rules={[
                          {
                            validator: (_, e) => {
                              if (e == null) {
                                return Promise.reject(
                                  new Error("Please Enter Expected Price")
                                );
                              }
                              return Promise.resolve();
                            },
                          },
                        ]}
                        name={"expectedPrice"}
                      >
                        <InputNumber
                          className="price-input placeholder_change"
                          placeholder="Enter Total Price"
                          addonBefore="&#x20B9;"
                          formatter={(value) =>
                            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                          }
                          parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                          onChange={(e) => setExpectedPrice(e)}
                          maxLength={20}
                          controls={false}
                        />
                      </Item>
                    </div>
                    <div className="inputCol">
                      <span className="input-spn-label">
                        Booking / Advance Amount <span>(Optional)</span>
                      </span>
                      <InputNumber
                        placeholder="Enter Booking / Advance Amount (Optional)"
                        addonBefore="&#x20B9;"
                        formatter={(value) =>
                          `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        }
                        parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                        onChange={(e) => setTokenAmount(e)}
                        maxLength={20}
                        controls={false}
                        className="price-input placeholder_change"
                      />
                    </div>
                  </div>
                </div>
              )}
              {propertyAction != "pg" && (
                <div className="nearby-amenities-section">
                  {propertyType !== "plot" && (
                    <>
                      <span className="sell-rent-input-label">
                        Nearby Amenities{" "}
                        <span className="sell-rent-input-sub-desc">
                          (Select Nearby Amenities)
                        </span>
                      </span>
                      <div className="amenities-grid">
                        {amenitiesList.map((amenity, index) => (
                          <Tag
                            onClick={() => handleTagClick(index)}
                            className={`${
                              amenity.isSelected
                                ? "isActiveTag"
                                : "isInActiveTag"
                            } amenity-tag`}
                            key={index}
                          >
                            {amenity.isSelected ? (
                              <CheckOutlined className="themecolor" />
                            ) : (
                              <PlusOutlined className="secondarycolor" />
                            )}
                            <span>{amenity.label}</span>
                          </Tag>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )}
              {propertyAction != "pg" && propertyType === "commercial" && (
                <div className="sell-rent-inputDivs">
                  <span className="sell-rent-input-label">
                    Commercial Property Details
                  </span>
                  <span className="input-spn-label">
                    Total Number of Floors
                  </span>
                  <Select
                    placeholder="Select"
                    className="age-of-construction-select"
                    value={totalNumberOfFloors}
                    onChange={(value) => setTotalNumberOfFloors(value)}
                  >
                    <Select.Option value="1">1</Select.Option>
                    <Select.Option value="2">2</Select.Option>
                    <Select.Option value="3">3</Select.Option>
                    <Select.Option value="4">4</Select.Option>
                    <Select.Option value="5">5</Select.Option>
                    <Select.Option value="6">6</Select.Option>
                    <Select.Option value="getinput">&gt; 6</Select.Option>
                  </Select>
                  <span className="input-spn-label">Floor Number</span>
                  {totalNumberOfFloors === "getinput" ? (
                    <Input />
                  ) : (
                    <Select placeholder="Select" className="select-w-140">
                      {Array.from(
                        { length: totalNumberOfFloors },
                        (_, index) => index + 1
                      ).map((item) => (
                        <Select.Option value={item}>{item}</Select.Option>
                      ))}
                    </Select>
                  )}
                </div>
              )}
              <div className="authority-postproperty">
                <span className="authority-postproperty-span-text">
                  Do you have all the authority to post this property?
                </span>
                <Select
                  placeholder="Select"
                  className="select-w-120"
                  onChange={(value) => setHaveNecessaryDocuments(value)}
                >
                  <Select.Option value="yes">Yes</Select.Option>
                  <Select.Option value="no">No</Select.Option>
                </Select>
              </div>
              {propertyAction != "pg" && (
                <div className="sell-rent-inputDivs">
                  <label>Enter Rera Id</label>
                  <Input
                    placeholder="Enter Rera Id"
                    value={reraId}
                    onChange={(e) => {
                      if (e.target.value == "") {
                        setReraId((prevState) => undefined);
                      } else {
                        setReraId((prevState) => e.target.value);
                      }
                    }}
                  />
                </div>
              )}
              <div className="user-needs-checkbox">
                <Checkbox
                  className="checkbox"
                  value={allInclusivePrice}
                  onChange={() => setAllInclusivePrice(!allInclusivePrice)}
                >
                  All Inclusive Price
                </Checkbox>
              </div>
              <div className="user-needs-checkbox">
                <Checkbox
                  className="checkbox"
                  value={priceNegotiable}
                  onChange={() => setPriceNegotiable(!priceNegotiable)}
                >
                  Property Price Negotiable
                </Checkbox>
              </div>
              <div className="user-needs-checkbox">
                <Checkbox
                  className="checkbox"
                  value={govTaxInclusive}
                  onChange={() => setGovTaxInclusive(!govTaxInclusive)}
                >
                  Tax & Govt. Charges Included
                </Checkbox>
              </div>
              <div className="user-needs-checkbox">
                <Checkbox
                  className="checkbox"
                  value={postAgreement}
                  onChange={() => setPostAgreement(!postAgreement)}
                >
                  I am posting this property 'exclusively' on Albion Property
                  Hub
                </Checkbox>
              </div>
              <Button
                htmlType="submit"
                className={`${
                  validateUserInputs(propertyAction) ? "disabled-submit" : ""
                } add-imageBtn`}
                onSubmit={() => {
                  if (!getUserMobileNumber() || getUserMobileNumber() == "0") {
                    notification.warning({
                      message: "Please Update Your Profile",
                      description: (
                        <span>
                          Update Your Profile By Clicking{" "}
                          <a href="/profile">here</a>
                        </span>
                      ),
                    });
                  } else {
                    if (fileList.length === 0) {
                      setShowImagesNotUploadedModal((prevState) => true);
                    } else {
                      handlePostPropertySubmit();
                    }
                  }
                }}
                // disabled={
                //   !propertyType
                //     ? propertyAction == "pg"
                //       ? validatePgInputs()
                //       : true
                //     : validateUserInputs(propertyAction)
                // }
                loading={isApiCall}
              >
                Post Property
              </Button>
              <Button
                className="post_property_mobile"
                disabled={
                  propertyType == null
                    ? true
                    : validateUserInputs(propertyAction)
                }
                onClick={() => {
                  if (!getUserMobileNumber() || getUserMobileNumber() == "0") {
                    notification.warning({
                      message: "Please Update Your Profile",
                      description: (
                        <span>
                          Update Your Profile By Clicking{" "}
                          <a href="/profile">here</a>
                        </span>
                      ),
                    });
                  } else {
                    if (!mainImage) {
                      setShowImagesNotUploadedModal((prevState) => true);
                    } else {
                      handlePostPropertySubmit();
                    }
                  }
                }}
              >
                Post Property
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostProperty;
