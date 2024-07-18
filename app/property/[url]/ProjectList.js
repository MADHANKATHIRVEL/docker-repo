"use client";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import "./project-list.css";
import topAgentImg from "@/assets/ta_banner.webp";
import newMobilePromotion from "@/assets/mobileadbeforefilter.webp";
import FilterCard, {
  postedByOptions,
  propertyStatusArr,
} from "@/components/filter-section/FilterCard";
import axios from "axios";
import playStoreImage from "@/assets/play-store-albion-propertyhub.webp";
import appStoreImage from "@/assets/app-store-albion-propertyhub.webp";
import fetchingProperties from "@/assets/fetchingproperties.gif";
import {
  FilterOutlined,
  LeftCircleOutlined,
  RightOutlined,
} from "@/utils/icons";
import { Button, List, Select } from "@/utils/antd-component";
import noDataImg from "@/assets/no-home.webp";
import {
  capitalizeFirstLetter,
  capitalizeWords,
  formatText,
} from "@/utils/helpers";
import fetchingInProgress from "@/assets/fetching-in-progress.gif";
import { AppContext, Loader } from "@/context/Context";
import {
  APP_BASE_URL,
  propertyActions,
  propertyTypes,
} from "@/constants/Constant";
import { getUserId } from "@/utils/userUtils";
import { getDistricts } from "@/utils/apiHelpers";
import { useRouter, useSearchParams } from "next/navigation";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Cookies from "js-cookie";
import InfiniteScroll from "react-infinite-scroll-component";
import dynamic from "next/dynamic";

const MobileAppAd = dynamic(() => import("@/components/common/MobileAppAd"), {
  ssr : false
});
const LandscapePropertyCard = dynamic(() =>
  import("@/components/LandscapePropertyCard"), {
    ssr : false
  }
);
const FilterModal = dynamic(() =>
  import("@/components/filtermodal/FilterModal"), {
    ssr : false
  }
);

const propertyFeaturesList = [
  {
    key: "flat",
    label: "Flat",
    isSelected: false,
  },
  {
    key: "villa",
    label: "Villa",
    isSelected: false,
  },
  {
    key: "pg",
    label: "PG",
    isSelected: false,
  },
  {
    key: "house",
    label: "House",
    isSelected: false,
  },
  {
    key: "plot",
    label: "Plot",
    isSelected: false,
  },
  {
    key: "shop",
    label: "Shop",
    isSelected: false,
  },
  {
    key: "office",
    label: "Office Space",
    isSelected: false,
  },
];

const bhkArr = [
  {
    key: 1,
    label: "1 BHK",
    isSelected: false,
  },
  {
    key: 2,
    label: "2 BHK",
    isSelected: false,
  },
  {
    key: 3,
    label: "3 BHK",
    isSelected: false,
  },
  {
    key: 4,
    label: "4 BHK",
    isSelected: false,
  },
  {
    key: 5,
    label: "5 BHK",
    isSelected: false,
  },
  {
    key: 6,
    label: "5+ BHK",
    isSelected: false,
  },
];

function ProjectList({}) {
  const url = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  let urlArr = url.substring(url.lastIndexOf("/") + 1).split("-");
  console.log(urlArr , "urlArr12")
  if (urlArr.includes("for")) {
    urlArr.splice(urlArr.indexOf("for"), 1);
  }
  if (urlArr.includes("in")) {
    urlArr.splice(urlArr.indexOf("in"), 1);
  }
  if (urlArr.includes("properties")) {
    urlArr.splice(urlArr.indexOf("properties"), 1);
  }
  if (urlArr.includes("residential")) {
    urlArr.splice(urlArr.indexOf("residential"), 1);
  }
  if (urlArr.includes("apartment")) {
    urlArr.splice(urlArr.indexOf("apartment"), 1);
  }
  if (urlArr.includes("independent")) {
    urlArr.splice(urlArr.indexOf("independent"), 1);
  }
  if (urlArr.includes("commercial")) {
    urlArr.splice(urlArr.indexOf("commercial"), 1);
  }
  if (urlArr.includes("space")) {
    urlArr.splice(urlArr.indexOf("space"), 1);
  }
  if (urlArr.includes("land")) {
    urlArr.splice(urlArr.indexOf("land"), 1);
  }
  const [fetchingMoreProperties, setFetchingMoreProperties] = useState(true);
  const location = null;
  const projectCardsRef = useRef(null);
  const initialState = useMemo(() => {
    if (location) {
      const storedState = JSON.parse(Cookies.get("locState"));
      if (!storedState) {
        Cookies.set("locState", JSON.stringify(location.state));
        return location.state;
      }
      return storedState;
    }
  }, []);

  const { userLocation, updateUserLocation } = useContext(AppContext);
  const [properties, setProperties] = useState([]);
  const [page, setPage] = useState(1);
  const [end, setEnd] = useState(false);
  const [noData, setNoData] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [state, setState] = useState(initialState);
  const [isApiCallDone, setIsApiCallDone] = useState(true);
  const cancelTokenSourceRef = useRef(null);
  const [selectedFilters, setselectedFilters] = useState({
    locality: [],
    budget: [],
    property_type: [],
    bedroom: [],
    postedByArr: [],
    amenitiesArr: [],
    property_action: "",
    real_estate: "",
    availability: "",
    superarea: [],
    builtuparea: [],
  });

  useEffect(() => {
    let localityV2 = !!searchParams.get("selectedLocality")
      ? searchParams.get("selectedLocality")
      : [];
    let budgetV2 = [1, 10000000];
    let property_typeV2 = [];
    let property_actionV2 = "";
    let real_estate = "";
    let bedroom = []

    if (searchParams.get("selectedLocality")) {
      localityV2 = [...searchParams.get("selectedLocality")];
    }
    if (searchParams.get("min_budget")) {
      budgetV2[0] = searchParams.get("min_budget");
    }
    if (parseInt(searchParams.get("min_budget")) > 10000000) {
      budgetV2[1] = 200000000;
    }
    if (searchParams.get("max_budget")) {
      budgetV2[1] = searchParams.get("max_budget");
    }
    if (searchParams.get("category")) {
      property_actionV2 = searchParams.get("category");
    }
    if(searchParams.get("property_action")){
      property_actionV2 = searchParams.get("property_action")
    }
    if (searchParams.get("type_of_property")) {
      property_typeV2 = [...searchParams.get("type_of_property")?.split(',')];
    }
    if (searchParams.get("bedroom")) {
      bedroom = [...searchParams.get("bedroom")?.split(',')];
    }
    if (searchParams.get("real_estate")) {
      real_estate = searchParams.get("real_estate");
    }
    if(urlArr.includes("pg")){
      property_typeV2 = ["pg"]
    }
    setselectedFilters((prevState) => ({
      ...prevState,
      locality: localityV2,
      budget: budgetV2,
      property_action: property_actionV2,
      property_type: property_typeV2,
      bedroom : bedroom,
      real_estate : real_estate
    }));
  }, []);

  useEffect(() => {
    const minBudget = searchParams.get("min_budget");
    const maxBudget = searchParams.get("max_budget");
    if (!(minBudget == null && maxBudget == null)) {
      urlArr.splice(
        urlArr.length - 1,
        0,
        parseInt(minBudget),
        parseInt(maxBudget)
      );
    }
    const availability = searchParams.get("availability");
    if (!!availability && availability.length > 0) {
      setselectedFilters((prevState) => ({
        ...prevState,
        availability: availability,
      }));
    }
  }, []);
  useEffect(() => {
    let locality = urlArr[urlArr.length - 2];
    async function updateLocality() {
      const response = await axios.get(
        `${APP_BASE_URL}/Location/getLocation?location=locality&city=${
          Cookies.get("city-id") ?? 499
        }`
      );
      const res = response.data.locality;
      if (typeof urlArr[urlArr.length - 2] == "string") {
        locality = urlArr[urlArr.length - 2]
          ?.replace(/%20/g, " ")
          .toLowerCase();
      }
      const data = res.find((item) => item.toLowerCase() == locality);
      if (!!data && data.length > 0) {
        setselectedFilters((prevState) => ({
          ...prevState,
          locality: [data],
        }));
      }
    }
    updateLocality();
  }, []);

  useEffect(() => {
    if (typeof urlArr[1] == "string") {
      const action = urlArr[1]?.toLowerCase();
      if (["rent", "sell", "sale"].includes(action)) {
        setselectedFilters((prevState) => ({
          ...prevState,
          property_action: [
            action == "sale" || action == "sell" ? "sell" : "rent",
          ],
        }));
      }
    }
  }, []);

  useEffect(() => {
    const propertyType = searchParams.get("property_type");
    if (propertyType) {
      setselectedFilters((prevState) => ({
        ...prevState,
        property_type: [propertyType],
      }));
    }
  }, []);

  useEffect(() => {
    let budgetValue = [];
    if (searchParams.get("min_budget")) {
      budgetValue = [
        parseInt(searchParams.get("min_budget") ?? 1),
        searchParams.get("min_budget") > 10000000
          ? 200000000
          : searchParams.get("max_budget") ?? 10000000,
      ];
    }
    if (searchParams.get("max_budget")) {
      budgetValue = [
        parseInt(searchParams.get("min_budget") ?? 1),
        parseInt(
          searchParams.get("min_budget") > 10000000
            ? 200000000
            : searchParams.get("max_budget") ?? 10000000
        ),
      ];
    }
    setselectedFilters((prevState) => ({
      ...prevState,
      budget: budgetValue,
    }));
  }, [searchParams.get("min_budget"), searchParams.get("max_budget")]);

  useEffect(() => {
    setIsLoading((prevState) => true);
    const fetchStateValues = async () => {
      if (location?.state) {
        if (location.state.fromMenu) {
          setselectedFilters((prevState) => ({
            locality: [],
            budget: [],
            property_type: [],
            bedroom: [],
            postedByArr: [],
            amenitiesArr: [],
            property_action: "",
            real_estate: "",
            availability: "",
            superarea: [],
            builtuparea: [],
          }));
          if (location.pathname == "all-property-in-coimbatore") {
            setselectedFilters((prevState) => ({
              locality: [],
              budget: [],
              property_type: [],
              bedroom: [],
              postedByArr: [],
              amenitiesArr: [],
              property_action: "",
              real_estate: "",
              availability: "",
              superarea: [],
              builtuparea: [],
            }));
            return;
          }
          if (location?.state?.filters?.availability) {
            setselectedFilters((prevState) => ({
              ...prevState,
              availability: "ready_to_move",
            }));
          }

          if (location?.state?.filters?.property_action) {
            setselectedFilters((prevState) => ({
              ...prevState,
              property_action: location.state.filters.property_action,
            }));
          }
        } else {
          if (location?.state?.selectedLocality) {
            setselectedFilters((prevState) => ({
              ...prevState,
              locality: [location.state.selectedLocality],
            }));
          }
          if (
            location?.state?.category === "buy" ||
            location?.state?.category === "rent"
          ) {
            setselectedFilters((prevState) => ({
              ...prevState,
              property_action: [
                location.state.category === "buy" ? "sell" : "rent",
              ],
            }));
          }
          if (
            location?.state?.property_action &&
            location?.state?.property_action.length > 0
          ) {
            setselectedFilters((prevState) => ({
              ...prevState,
              property_action:
                location.state.property_action === "buy" ? "sell" : "rent",
            }));
          }
          if (location.state.category == "pg") {
            setselectedFilters((prevState) => ({
              ...prevState,
              property_type: ["pg"],
            }));
          }
        }
      }
    };
    if (!url.includes("results")) {
      fetchStateValues();
    }
    if (
      searchParams.get("selectedLocality") &&
      searchParams.get("selectedLocality").toLowerCase != "all"
    ) {
      setselectedFilters((prevState) => ({
        ...prevState,
        locality: [capitalizeWords(searchParams.get("selectedLocality"))],
      }));
    }
  }, [location, userLocation]);

  useEffect(() => {
    setIsLoading((prevState) => true);
    if (!url.includes("results")) {
      if (location?.state == null) {
        urlArr.map((item, index) => {
          if ("123456789".includes(urlArr[0])) {
            setselectedFilters((prevState) => ({
              ...prevState,
              bedroom: [parseInt(urlArr[0])],
            }));
          }
          if (
            !"123456789".includes(urlArr[0]) &&
            propertyTypes.includes(urlArr[0])
          ) {
            setselectedFilters((prevState) => ({
              ...prevState,
              property_type: [urlArr[0]],
            }));
          } else if (propertyActions.includes(item)) {
            setselectedFilters((prevState) => ({
              ...prevState,
              property_action: item,
            }));
          } else if (typeof item === "number") {
            if (index === 1) {
            }
          } else {
            if (
              userLocation?.toLowerCase() !== urlArr[urlArr.length - 1] &&
              urlArr[urlArr.length - 1]?.toLowerCase() == "all"
            ) {
              setselectedFilters((prevState) => ({
                ...prevState,
                locality: [
                  capitalizeWords(
                    urlArr[urlArr.length - 1].replace(/%20/g, " ")
                  ),
                ],
              }));
            }
          }
        });
      }
    }
  }, []);

  async function fetchProperties() {
    setFetchingMoreProperties(() => true);
    setNoData(() => false);
    if (cancelTokenSourceRef.current) {
      cancelTokenSourceRef.current.cancel(
        "Operation canceled due to new request."
      );
    }
    cancelTokenSourceRef.current = axios.CancelToken.source();
    try {
      let apiUrl = await getShowUrl();
      const res = await axios.get(apiUrl, {
        cancelToken: cancelTokenSourceRef.current.token,
      });
      if (res?.data) {
        if (res?.data?.message === "Running out of Properties") {
          setEnd((prevState) => true);
        } else if (res?.data?.message === "No Properties found") {
          setProperties((prevState) => new Array(0));
          setNoData((prevState) => true);
        } else {
          setNoData((prevState) => false);
          setEnd((prevState) => false);
          setProperties((prevState) => {
            if (page > 1) {
              return [...prevState, ...res.data];
            } else {
              return [...res.data];
            }
          });
        }
      }
    } catch (error) {
      if (error.code == "ERR_CANCELED") {
        setPage(1);
      }
      console.error("Error fetching data:", error);
    } finally {
      setIsApiCallDone((prevState) => false);
      setFetchingMoreProperties(() => false);
    }
  }

  function onIntersection(entries) {
    for (const entry of entries) {
      if (entry) {
        setPage((prevPage) => prevPage + 1);
      }
    }
  }

  useEffect(() => {
    if (cancelTokenSourceRef.current) {
      const observer = new IntersectionObserver(onIntersection, {
        rootMargin: "-500px",
      });
      observer.observe(projectCardsRef.current);
    }
  }, []);

  useEffect(() => {
    setTimeout(() => fetchProperties() , 500);
    return () => {
      if (cancelTokenSourceRef.current) {
        cancelTokenSourceRef.current.cancel(
          "Operation canceled due to component unmount."
        );
      }
    };
  }, [page, selectedFilters]);

  useEffect(() => {
    setPage(1);
  }, [selectedFilters]);

  useEffect(() => {
    async function validateDistrict() {
      const locations = await getDistricts();
      let locData = locations.find(
        (item) => item.city.toLowerCase() == urlArr[urlArr.length - 1]
      );
      if (
        locData.city?.toLowerCase() != Cookies.get("userLocation").toLowerCase()
      ) {
        updateUserLocation(locData.city, {
          name: locData.city,
          key: locData.city_id,
        });
      }
    }
    validateDistrict();
  }, []);

  useEffect(() => {
    setIsLoading((prevState) => true);
    propertyFeaturesList.map((item) => {
      if (selectedFilters.property_type.includes(item.key)) {
        item.isSelected = true;
      }
    });
    bhkArr.map((item) => {
      if (selectedFilters.bedroom.includes(item.key)) {
        item.isSelected = true;
      }
    });
  }, [selectedFilters]);

  async function getShowUrl() {
    const paramsArray = [];
    for (const key in selectedFilters) {
      if (selectedFilters[key]?.length > 0) {
        switch (key) {
          case "budget":
            if (selectedFilters[key][1] && selectedFilters[key][0]) {
              paramsArray.push(`max_budget=${selectedFilters[key][1]}`);
              paramsArray.push(`min_budget=${selectedFilters[key][0]}`);
            }
            break;
          case "property_action":
          case "availability":
          case "real_estate":
          case "postedByArr":
            if (selectedFilters[key]) {
              paramsArray.push(`${key}=${selectedFilters[key]}`);
            }
            break;
          case "superarea":
            if (selectedFilters[key]) {
              paramsArray.push(
                `super_area=${selectedFilters[key][0]},${selectedFilters[key][1]}`
              );
            }
            break;
          case "builtuparea":
            if (selectedFilters[key]) {
              paramsArray.push(
                `carpet_area=${selectedFilters[key][0]},${selectedFilters[key][1]}`
              );
            }
            break;
          case "amenitiesArr":
            if (selectedFilters[key]?.length > 0) {
              paramsArray.push(
                `amenities=${selectedFilters[key]
                  .map((value) => encodeURIComponent(value))
                  .join(",")}`
              );
            }
            break;
          default:
            if (selectedFilters[key]?.length > 0) {
              paramsArray.push(
                `${key}=${selectedFilters[key]
                  .map((value) => encodeURIComponent(value))
                  .join(",")}`
              );
            }
            break;
        }
      }
    }

    let apiUrl = `${APP_BASE_URL}/Properties/show?${paramsArray.join("&")}`;
    if (userLocation) {
      apiUrl += `&location=${userLocation}`;
    }
    if (getUserId()) {
      apiUrl += `&user_id=${getUserId()}`;
    }
    if (page > 1) {
      apiUrl += `&page_number=${page}`;
    }
    return apiUrl;
  }
  

  var selectedLocality, type_of_property, budget, category;

  function getPath() {
    if (state === null) {
      return "";
    } else {
      selectedLocality = location?.state?.selectedLocality;
      type_of_property = location?.state?.type_of_property;
      budget = location?.state?.budget;
      category = location?.state?.category;
    }
    if (!state) {
      return "";
    }
    if (!!state && !!selectedLocality && !!type_of_property && !!budget) {
      return (
        <>
          {capitalizeWords(selectedLocality) ? <RightOutlined /> : ""}{" "}
          {selectedLocality ? capitalizeWords(selectedLocality) : ""}{" "}
          {capitalizeWords(type_of_property) ? <RightOutlined /> : ""}{" "}
          {category ? formatText(category) : ""}{" "}
          {category ? <RightOutlined /> : ""}{" "}
          {type_of_property ? formatText(type_of_property) : ""}
          {budget ? <RightOutlined /> : ""}
          <span>{budget ? `${budget[0]} to ${budget[1]}` : ""} </span>
        </>
      );
    } else {
      return "";
    }
  }

  return (
    <>
      <div className="mobile_screen_project_list">
        <div className="mobile-filter-scroll">
          <FilterOutlined
            className="filter-outline-icon"
            onClick={() => setShowFilterModal((prevState) => true)}
          />
          <Select
            className="mobile-screen-filter-select"
            placeholder="Select Property Type"
            mode="multiple"
            allowClear
            value={selectedFilters.property_type}
            onChange={(value) => {
              setselectedFilters((prevState) => ({
                ...prevState,
                property_type: value,
              }));
            }}
            options={propertyTypes.map((item) => ({
              label: capitalizeFirstLetter(item),
              value: item.toLowerCase(),
            }))}
          />
          <Select
            className="mobile-screen-filter-select"
            placeholder="Select BHK"
            mode="multiple"
            allowClear
            value={selectedFilters.bedroom}
            onChange={(value) => {
              setselectedFilters((prevState) => ({
                ...prevState,
                bedroom: value,
              }));
            }}
            options={bhkArr.map((item) => ({
              label: item.label,
              value: item.key,
            }))}
          />
          <Select
            className="mobile-screen-filter-select"
            mode="multiple"
            allowClear
            value={selectedFilters.postedByArr}
            placeholder="Select Posted By"
            onChange={(value) => {
              setselectedFilters((prevState) => ({
                ...prevState,
                postedByArr: value,
              }));
            }}
            options={postedByOptions.map((item) => ({
              label: item.label,
              value: item.key,
            }))}
          />
          <Select
            className="mobile-screen-filter-select"
            placeholder="Select Property Status"
            mode="multiple"
            allowClear
            value={
              selectedFilters?.availability?.length > 0
                ? selectedFilters?.availability
                : null
            }
            onChange={(value) => {
              setselectedFilters((prevState) => ({
                ...prevState,
                availability: value,
              }));
            }}
            options={propertyStatusArr.map((item) => ({
              label: item.label,
              value: item.key,
            }))}
          />
          <Select
            className="mobile-screen-filter-select"
            mode="multiple"
            allowClear
            placeholder="Select Property Action"
            value={
              selectedFilters?.property_action?.length > 0
                ? selectedFilters?.property_action
                : null
            }
            onChange={(value) => {
              setselectedFilters((prevState) => ({
                ...prevState,
                property_action: value,
              }));
            }}
            options={propertyActions.map((item) => ({
              label: capitalizeFirstLetter(
                item == "sell" || item == "sale" ? "buy" : "rent"
              ),
              value: item.toLowerCase(),
            }))}
          />
        </div>
        {showFilterModal && (
          <FilterModal
            showModal={showFilterModal}
            setShowModal={setShowFilterModal}
            selectedFilters={selectedFilters}
            setSelectedFilters={setselectedFilters}
          />
        )}
        {noData ? (
          <div className="flex-w-90">
            <div className="flex-col-w-100">
              <Image
                placeholder="blur"
                src={noDataImg}
                alt="NO DATA FOUND"
                width={200}
                height={200}
                loading="lazy"
              />
              <h6>No Properties Found</h6>
            </div>
          </div>
        ) : (
          <>
            {properties.length === 0 ? (
              <div className="flex-col-center">
                <Image
                  src={fetchingProperties}
                  height={35}
                  width={35}
                  alt="Fetching Properties Gif"
                />
                <p>Fetching Properties</p>
              </div>
            ) : (
              <InfiniteScroll
                dataLength={properties.length}
                next={() => setPage((prev) => prev + 1)}
                hasMore={!(properties.length < 10)}
                loader={
                  <Image
                    src={fetchingInProgress}
                    alt="Fetching Properties"
                    height={35}
                    width={35}
                    className="center-class"
                  />
                }
                endMessage={
                  <span className="no-more-properties-text">
                    -No More Properties-
                  </span>
                }
                className="mobile-infinite-scroll"
                scrollableTarget="scrollableDiv"
              >
                <List
                  className="flex-col-center"
                  dataSource={properties}
                  renderItem={(property) => (
                    <List.Item key={property.p_id}>
                      <LandscapePropertyCard
                        key={property.p_id}
                        property={property}
                      />
                    </List.Item>
                  )}
                />
              </InfiniteScroll>
            )}
          </>
        )}
      </div>
      <div className="project-list_page">
        <div className="list-item-section">
          <div className="results-page_filter-card">
            <div className="recent-filters">
              <LeftCircleOutlined onClick={() => router.back()} />
              <span> Home </span>
              {getPath()}
            </div>
            <div className="agent-ad">
              <div className="agentImageContainer">
                <Image
                  placeholder="blur"
                  src={topAgentImg}
                  className="agentAdImg"
                  loading="lazy"
                  alt="Top Agent"
                />
              </div>
              <Button className="contact-top-agent-btn" href="/top-agents">
                Contact Agent
              </Button>
            </div>
            <div className="sticky-container">
              <div className="filter-section">
                  <FilterCard
                    selectedFilters={selectedFilters}
                    setselectedFilters={setselectedFilters}
                    selectedLocality={searchParams.get("selectedLocality")}
                    realEstate={location?.state?.realEstate}
                    setPage={setPage}
                    setIsApiCallDone={setIsApiCallDone}
                  />
              </div>
              <div className="full-screen-container">
                <Image
                  placeholder="blur"
                  src={newMobilePromotion}
                  loading="lazy"
                  alt="Mobile Banner"
                />
                <div className="app-download-btns">
                  <div className="platform-img">
                    <Image
                      placeholder="blur"
                      src={playStoreImage}
                      loading="lazy"
                      alt="Play Store Link"
                      className="store-image"
                      onClick={() => {
                        if (typeof window != undefined) {
                          window.open(
                            "https://play.google.com/store/apps/details?id=com.albionNew&pcampaignid=web_share"
                          );
                        }
                      }}
                    />
                  </div>
                  <div className="platform-img">
                    <Image
                      placeholder="blur"
                      src={appStoreImage}
                      loading="lazy"
                      alt="App Store Link"
                      className="store-image"
                      onClick={() => {
                        if (typeof window != undefined) {
                          window.open(
                            "https://apps.apple.com/us/app/albion-property-hub/id6476275094"
                          );
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="project-cards" ref={projectCardsRef}>
            <>
              <MobileAppAd />
              {isApiCallDone ? (
                <Loader />
              ) : (
                <>
                  {noData ? (
                    <div className="no-data-container">
                      <Image
                        placeholder="blur"
                        src={noDataImg}
                        alt="No Data Found"
                        width={200}
                        height={200}
                        loading="lazy"
                      />
                      <span>No Properties Found</span>
                    </div>
                  ) : (
                    <>
                      <div className="property__card">
                        {properties.length > 0 && (
                          <>
                            {properties.map((project) => {
                              return (
                                <LandscapePropertyCard
                                  key={project.p_id}
                                  property={project}
                                />
                              );
                            })}
                          </>
                        )}
                      </div>
                      <div className="show-more">
                        {!end ? (
                          fetchingMoreProperties && (
                            <Image
                              src={fetchingProperties}
                              height={40}
                              width={40}
                              alt="Fetching Properties"
                              className="fetchingPropertiesImg"
                            />
                          )
                        ) : (
                          <span className="no-more-properties-text">
                            -No More Properties-
                          </span>
                        )}
                      </div>
                    </>
                  )}
                </>
              )}
            </>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProjectList;
