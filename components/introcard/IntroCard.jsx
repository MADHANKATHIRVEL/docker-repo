"use client";
import { memo, useContext, useEffect } from "react";
import "./intro-card.css";
import "./intro-card.scss";
import Link from "next/link";
import {
  Button,
  Dropdown,
  Input,
  Menu,
  Select,
  Skeleton,
  Space,
  Tooltip,
} from "@/utils/antd-component";
import { useState } from "react";
import Image from "next/image";
import buyrent from "@/assets/buy-rent.webp";
import typeOfPropertyIcon from "@/assets/home__city.webp";
import budgetIcon from "@/assets/budgetimage.webp";
import mapIcon from "@/assets/albion__map.webp";
import { AppContext } from "@/context/Context";
import { SwiperSlide } from "swiper/react";
import axios from "axios";
import {
  addEllipsis,
  capitalizeWords,
  formatPrice,
  getUrlString,
} from "@/utils/helpers";
import { APP_BASE_URL } from "@/constants/Constant";
import Cookies from "js-cookie";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";

const CommonSwiper = dynamic(() => import("../common/swiper/CommonSwiper") , {
  ssr : false
});

const IntroCard = memo(({ reqLocation  }) => {
  const pathname = usePathname();
  const [contentLoading, setContentLoading] = useState(true);
  const { userLocation, updateUserLocation , cities : districts } = useContext(AppContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const [location, setLocation] = useState();
  const [typeOfProperty, setTypeOfProperty] = useState();
  const [category, setCategory] = useState("buy");
  const [sharing, setSharing] = useState();
  const [recentView, setRecentView] = useState([]);;
  const [commercialPropertyAction, setCommercialPropertyAction] = useState();
  const [min, setMin] = useState(1);
  const [max, setMax] = useState("");
  const [showMin, setShowMin] = useState(true);
  const [fetchingLocations, setFetchingLocations] = useState(false);
  const [showMax, setShowMax] = useState(false);
  const [locationOptions, setLocationOptions] = useState([]);
  const [selectedLocationOption, setSelectedLocationOption] = useState();
  let buyBudgetArray = [
    500000, 1000000, 1500000, 2000000, 3000000, 4000000, 5000000, 6000000,
    7000000, 8000000, 9000000, 10000000, 12000000, 14000000, 16000000, 18000000,
    20000000, 22000000, 24000000, 28000000, 30000000, 50000000, 80000000,
    100000000, 150000000, 10000000,
  ];
  let rentBudgetArray = [
    5000, 10000, 15000, 25000, 40000, 60000, 100000, 150000, 200000, 300000,
    400000, 500000, 800000, 1000000,
  ];

  useEffect(() => {
    async function updateCall() {
      if (pathname === "/") {
        updateUserLocation("Coimbatore", {
          name: "Coimbatore",
          id: "499",
        });
        Cookies.set("userLocation", "Coimbatore");
        Cookies.set("city-id", "499");
      } else {
        const filteredData = districts.filter(
          (item) => item.city?.toLowerCase() == reqLocation?.toLowerCase()
        );
        if (filteredData.length == 0) {
          updateUserLocation("Coimbatore", "499");
          Cookies.set("userLocation", "Coimbatore");
          Cookies.set("city-id", "499");
        } else {
          updateUserLocation(reqLocation, {
            name: filteredData[0].city,
            id: filteredData[0].city_id,
          });
          Cookies.set("userLocation", reqLocation);
          Cookies.set("city-id", filteredData[0]?.city_id);
        }
      }
    }
    if (reqLocation) {
      updateCall();
    }
    setContentLoading(false);
  }, [pathname, reqLocation]);

  useEffect(() => {
    setShowMin(true);
    setShowMax(false);
  }, [location]);

  useEffect(() => {
    setMax("");
  }, [min]);

  useEffect(() => {
    setLocation();
    setTypeOfProperty(null);
    setMin(1);
    setMax("");
  }, [category]);

  useEffect(() => {
    setFetchingLocations((prevState) => true);
    async function getLocationSuggestion() {
      const response = await axios.get(
        `${APP_BASE_URL}/location/search_location?location=${Cookies.get(
          "userLocation"
        )}&like=${location ?? ""}`
      );
      setLocationOptions([
        ...(response.data.city ?? []),
        ...(response.data.locality ?? []),
      ]);
      setFetchingLocations((prevState) => false);
    }
    const dataFetching = setTimeout(() => {
      getLocationSuggestion();
    }, 400);

    return () => {
      clearTimeout(dataFetching);
    };
  }, [location, reqLocation, Cookies.get("city-id")]);

  const menuItems = (() => {
    switch (category?.toLowerCase()) {
      case "buy":
        return buyBudgetArray.map((value, index) => ({
          key: value.toString(),
          label: (
            <div
              onClick={() => {
                setMin((prevState) => value);
                setShowMin((prevState) => false);
                setShowMax((prevState) => true);
              }}
            >
              &#x20B9; {formatPrice(value)}
            </div>
          ),
        }));
      case "rent":
        return rentBudgetArray.map((value, index) => ({
          key: value.toString(),
          label: (
            <div
              onClick={() => {
                setMin((prevState) => value);
                setShowMin((prevState) => false);
                setShowMax((prevState) => true);
              }}
            >
              &#x20B9; {formatPrice(value)}
            </div>
          ),
        }));
      case "plot":
        if (typeOfProperty?.toLowerCase() === "buy") {
          return buyBudgetArray.map((value, index) => ({
            key: value.toString(),
            label: (
              <div
                onClick={() => {
                  setMin((prevState) => value);
                  setShowMin((prevState) => false);
                  setShowMax((prevState) => true);
                }}
              >
                &#x20B9; {formatPrice(value)}
              </div>
            ),
          }));
        } else {
          return rentBudgetArray.map((value, index) => ({
            key: value.toString(),
            label: (
              <div
                onClick={() => {
                  setMin((prevState) => value);
                  setShowMin((prevState) => false);
                  setShowMax((prevState) => true);
                }}
              >
                &#x20B9; {formatPrice(value)}
              </div>
            ),
          }));
        }
      case "commercial":
        if (commercialPropertyAction === "buy") {
          return buyBudgetArray.map((value, index) => ({
            key: value.toString(),
            label: (
              <div
                onClick={() => {
                  setMin((prevState) => value);
                  setShowMin((prevState) => false);
                  setShowMax((prevState) => true);
                }}
              >
                &#x20B9; {formatPrice(value)}
              </div>
            ),
          }));
        } else {
          return rentBudgetArray.map((value, index) => ({
            key: value.toString(), 
            label: (
              <div
                onClick={() => {
                  setMin((prevState) => value);
                  setShowMin((prevState) => false);
                  setShowMax((prevState) => true);
                }}
              >
                &#x20B9; {formatPrice(value)}
              </div>
            ),
          }));
        }
      default:
        return [];
    }
  })();

  const maxMenuItems = (() => {
    switch (category?.toLowerCase()) {
      case "buy":
        return buyBudgetArray
          .filter((value) => value > min)
          .map((value, index) => ({
            key: value.toString(),
            label: (
              <div onClick={() => setMax(value)}>
                &#x20B9; {formatPrice(value)}
              </div>
            ),
          }));
      case "rent":
        return rentBudgetArray
          .filter((value) => value > min)
          .map((value, index) => ({
            key: value.toString(),
            label: (
              <div onClick={() => setMax(value)}>
                &#x20B9; {formatPrice(value)}
              </div>
            ),
          }));
      case "plot":
        if (typeOfProperty?.toLowerCase() === "buy") {
          return buyBudgetArray
            .filter((value) => value > min)
            .map((value, index) => ({
              key: value.toString(),
              label: (
                <div onClick={() => setMax(value)}>
                  &#x20B9; {formatPrice(value)}
                </div>
              ),
            }));
        } else {
          return rentBudgetArray
            .filter((value) => value > min)
            .map((value, index) => ({
              key: value.toString(),
              label: (
                <div onClick={() => setMax(value)}>
                  &#x20B9; {formatPrice(value)}
                </div>
              ),
            }));
        }
      case "commercial":
        if (commercialPropertyAction === "buy") {
          return buyBudgetArray
            .filter((value) => value > min)
            .map((value, index) => ({
              key: value.toString(),
              label: (
                <div onClick={() => setMax(value)}>
                  &#x20B9; {formatPrice(value)}
                </div>
              ),
            }));
        } else {
          return rentBudgetArray
            .filter((value) => value > min)
            .map((value, index) => ({
              key: value.toString(),
              label: (
                <div onClick={() => setMax(value)}>
                  &#x20B9; {formatPrice(value)}
                </div>
              ),
            }));
        }
      default:
        return [];
    }
  })();

  const selectBudgetMenu = (
    <div
      className="budget-select-menu"
      onMouseLeave={() => setShowDropdown(false)}
    >
      <div className="budgetColumn">
        <Input
          placeholder="Min"
          onChange={(e) => {
            setMin(e.target.value);
          }}
          value={min}
          className="range-input-field"
          onClick={() => {
            setShowMin(true);
            setShowMax(false);
            setShowDropdown(true);
          }}
          max={10}
        />
        <Menu
          className={`${showMin ? `budget-menu` : `none`}`}
          style={
            min > 0
              ? {
                  borderRight: "1px solid #cccccc",
                  borderRadius: "0px",
                }
              : {}
          }
          items={menuItems}
        />
      </div>
      {
        <div
          className="budgetColumn"
          style={
            min > 0
              ? {
                  border: "1px solid transparent",
                }
              : {
                  display: "none",
                }
          }
        >
          <Input
            placeholder="Max"
            onChange={(e) => setMax(e.target.value)}
            value={max}
            className="range-input-field"
            onClick={() => {
              setShowMax(true);
              setShowMin(false);
            }}
            max={10}
          />
          <Menu
            onClick={(e) => {
              setMax(e.key);
              setShowDropdown(false);
              setShowMin(true);
              setShowMax(false);
            }}
            className={`${showMax ? `budget-menu` : `none`}`}
            items={maxMenuItems}
          />
        </div>
      }
    </div>
  );

  function createUrl() {
    let str = "";
    if (category == "pg") {
      str += `pg`;
    } else {
      str += `${
        category === "plot"
          ? `plot-for`
          : typeOfProperty
          ? `${typeOfProperty}-for`
          : `properties-for`
      }`;
      str += `-${
        category === "buy" || category === "rent"
          ? category === "buy"
            ? "sell"
            : "rent"
          : category === "commercial"
          ? commercialPropertyAction === "buy"
            ? "sell"
            : "rent"
          : typeOfProperty
      }`;
    }
    if (!(location?.toLowerCase() == userLocation?.toLowerCase()) && location != undefined) {
      str += `-in-${location?.toLowerCase()}`;
      str += `-${userLocation?.toLowerCase()}`;
    } else {
      str += `-in-${userLocation?.toLowerCase()}`;
    }
    return str;
  }

  function getBudgetValue() {
    let val = "";
    if (min > 1 && typeof max != "number") {
      val = `Greater than ${formatPrice(min)}`;
    }
    if (typeof min != "number" && max) {
      val = `Upto ${formatPrice(max)}`;
    }
    if (min && max) {
      val = `${formatPrice(min)} - ${formatPrice(max)}`;
    }
    if (min > 1 && !max) {
      val = `${min} - Select Max`;
    }
    return val;
  }

  return (
    <>
      <section
        className={`intro_card-section`}
      >
        <div className="intro_card-head">
          <center className="main-text">
            Explore, Choose, Property Joy Awaits.
          </center>
          <div className="mobilefiltercard">
            <h1>Find, Pick, Home Happiness Ahead.</h1>
            <ul className="category-list">
              <span
                className={
                  category === "buy"
                    ? "filterBtnActive filterbtn"
                    : "filterBtnInActive filterbtn"
                }
                onClick={() => setCategory("buy")}
              >
                Buy
              </span>
              <span
                className={
                  category === "rent"
                    ? "filterBtnActive filterbtn"
                    : "filterBtnInActive filterbtn"
                }
                onClick={() => setCategory("rent")}
              >
                Rent
              </span>
              <span
                className={
                  category === "plot"
                    ? "filterBtnActive filterbtn"
                    : "filterBtnInActive filterbtn"
                }
                onClick={() => setCategory("plot")}
              >
                Plot
              </span>
              <span
                className={
                  category === "commercial"
                    ? "filterBtnActive filterbtn"
                    : "filterBtnInActive filterbtn"
                }
                onClick={() => setCategory("commercial")}
              >
                Commercial
              </span>
            </ul>
            <div className="mobile-filters">
              <Space className="filter___input">
                <Image
                  placeholder="blur"
                  src={mapIcon}
                  loading="lazy"
                  alt="Map Icon"
                />
                {contentLoading ? (
                  <Skeleton.Input active />
                ) : (
                  <Select
                    showSearch
                    title="Type Location"
                    placeholder="Search Location"
                    value={!!location ? selectedLocationOption : null}
                    onSearch={(e) => {
                      setLocation(e);
                    }}
                    onChange={async (value) => {
                      let splitVal = value.split(",");
                      if (splitVal.length == 1) {
                        const filteredData = await districts.filter(
                          (item) =>
                            item.city?.toLowerCase() == value?.toLowerCase()
                        );
                        updateUserLocation(filteredData[0].city, {
                          name: filteredData[0].city,
                          key: filteredData[0].city_id,
                        });
                        Cookies.set(
                          "userLocation",
                          filteredData[0].city?.toLowerCase()
                        );
                        Cookies.set("city-id", filteredData[0]?.city_id);
                      } else if (splitVal.length == 2) {
                        setLocation(
                          capitalizeWords(splitVal[0].trim().toLowerCase())
                        );
                        const filteredData = await districts.filter((item) => {
                          return (
                            item.city?.toLowerCase() ==
                            splitVal[1]?.trim()?.toLowerCase()
                          );
                        });
                        updateUserLocation(filteredData[0].city, {
                          name: filteredData[0].city,
                          key: filteredData[0].city_id,
                        });
                        Cookies.set(
                          "userLocation",
                          filteredData[0].city?.toLowerCase()
                        );
                        Cookies.set("city-id", filteredData[0]?.city_id);
                      } else {
                        updateUserLocation("Coimbatore", "499");
                        Cookies.set("userLocation", "Coimbatore");
                        Cookies.set("city-id", "499");
                      }
                      setSelectedLocationOption(value);
                    }}
                    loading={fetchingLocations}
                    className="location-dropdown-styled"
                  >
                    {locationOptions.length < 2
                      ? locationOptions.slice(0, 2).map((data) => (
                          <Select.Option
                            value={`${
                              data.locality ? `${data.locality}, ` : ""
                            }${data.city}`}
                            key={`${data.locality ? `${data.locality}, ` : ""}${
                              data.city
                            }`}
                          >
                            {data?.locality ? `${data?.locality}, ` : ""}
                            {data?.city}
                          </Select.Option>
                        ))
                      : locationOptions.slice(1).map((data) => (
                          <Select.Option
                            value={`${
                              data.locality ? `${data.locality}, ` : ""
                            }${data.city}`}
                            key={`${data.locality ? `${data.locality}, ` : ""}${
                              data.city
                            }`}
                          >
                            {data?.locality ? `${data?.locality}, ` : ""}
                            {data?.city}
                          </Select.Option>
                        ))}
                  </Select>
                )}
              </Space>
              <Space className="filter___input">
                {category === "plot" ? (
                  <Image
                    placeholder="blur"
                    src={buyrent}
                    loading="lazy"
                    alt="Property Action"
                  />
                ) : (
                  <Image
                    placeholder="blur"
                    src={typeOfPropertyIcon}
                    loading="lazy"
                    width={20}
                    height={20}
                    alt="Property Type"
                  />
                )}
                {category === "plot" ? (
                  contentLoading ? (
                    <Skeleton.Input active />
                  ) : (
                  <Select
                    showSearch
                    placeholder="Select Property Action"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      (option?.label ?? "")
                        ?.toLowerCase()
                        .includes(input?.toLowerCase())
                    }
                    filterSort={(optionA, optionB) =>
                      (optionA?.label ?? "")
                        ?.toLowerCase()
                        .localeCompare((optionB?.label ?? "")?.toLowerCase())
                    }
                    onChange={(value) => {
                      setTypeOfProperty(value);
                    }}
                    value={typeOfProperty}
                    options={[
                      {
                        key: "buy",
                        value: "buy",
                        label: "Buy",
                      },
                      {
                        key: "rent",
                        value: "rent",
                        label: "Rent",
                      },
                    ]}
                  />)
                ) : (
                  contentLoading ? (
                    <Skeleton.Input active />
                  ) : (
                  <Select
                    showSearch
                    placeholder="Property Type"
                    className="filter-location-selector"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      (option?.label ?? "")
                        ?.toLowerCase()
                        .includes(input?.toLowerCase())
                    }
                    filterSort={(optionA, optionB) =>
                      (optionA?.label ?? "")
                        ?.toLowerCase()
                        .localeCompare((optionB?.label ?? "")?.toLowerCase())
                    }
                    onChange={(value) => {
                      setTypeOfProperty(value);
                    }}
                    value={typeOfProperty}
                    options={
                      category === "commercial"
                        ? [
                            {
                              key: "shop",
                              value: "shop",
                              label: "Shop",
                            },
                            {
                              key: "office",
                              value: "office",
                              label: "Office",
                            },
                            {
                              key: "plot",
                              value: "plot",
                              label: "Land / Plot",
                            },
                          ]
                        : [
                            {
                              key: "flat",
                              value: "flat",
                              label: "Flat",
                            },
                            {
                              key: "villa",
                              value: "villa",
                              label: "Villa",
                            },
                            {
                              key: "house",
                              value: "house",
                              label: "House",
                            },
                            {
                              key: "plot",
                              value: "plot",
                              label: "Land / Plot",
                            },
                          ]
                    }
                  />)
                )}
              </Space>
              {category?.toLowerCase() === "commercial" && (
                <Space className="filter___input">
                  <Image
                    placeholder="blur"
                    src={buyrent}
                    loading="lazy"
                    alt="Albion Property Action"
                    height={25}
                    width={25}
                  />
                  {
                    contentLoading ? (
                      <Skeleton.Input active />
                    ) : ( <Select
                      showSearch
                      placeholder="Select Action"
                      className="filter-location-selector"
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        (option?.label ?? "")
                          ?.toLowerCase()
                          .includes(input?.toLowerCase())
                      }
                      filterSort={(optionA, optionB) =>
                        (optionA?.label ?? "")
                          ?.toLowerCase()
                          .localeCompare((optionB?.label ?? "")?.toLowerCase())
                      }
                      onChange={(value) => {
                        setCommercialPropertyAction(value);
                      }}
                      options={[
                        {
                          key: "buy",
                          value: "buy",
                          label: "Buy",
                        },
                        {
                          key: "rent",
                          value: "rent",
                          label: "Rent",
                        },
                      ]}
                    />)
                  }
                </Space>
              )}
              <Space className="filter___input budget-container">
                <Image
                  placeholder="blur"
                  src={budgetIcon}
                  loading="lazy"
                  alt="Budget"
                />
                <div className="budget-slider-ob">
                  <Dropdown
                    overlay={selectBudgetMenu}
                    overlayClassName="budget-dropdown_menu"
                    trigger={["click"]}
                    getPopupContainer={(triggerNode) =>
                      triggerNode.parentElement
                    }
                    onClick={() => setShowDropdown(true)}
                    open={showDropdown}
                  >
                    {
                      contentLoading ? (
                        <Skeleton.Input active />
                      ) : (<Input
                        placeholder={"Select Budget"}
                        value={getBudgetValue()}
                      />)
                    }
                  </Dropdown>
                </div>
              </Space>
              <Link
                href={{
                  pathname: `/property/${createUrl()}`,
                  query: Object.fromEntries(
                    Object.entries({
                      selectedLocality:
                        location?.toLowerCase() == "all"
                          ? undefined
                          : location?.toLowerCase(),
                      type_of_property:
                        category === "plot"
                          ? "plot"
                          : typeOfProperty?.toLowerCase() == "all"
                          ? undefined
                          : typeOfProperty,
                      min_budget: category === "pg" ? 1 : min,
                      max_budget: category === "pg" ? 20000 : max,
                      category:
                        category?.toLowerCase() == "all" ? undefined : category,
                      property_action:
                        category === "plot"
                          ? typeOfProperty
                          : category?.toLowerCase() === "commercial"
                          ? commercialPropertyAction
                          : category === "pg" ? "rent": "buy",
                    }).filter(([key, value]) => value !== undefined)
                  ),
                }}
                target="_blank"
              >
                <Button
                  className="searchPropertyBtn"
                  onClick={() => {
                    setShowMin(true);
                    setShowMax(false);
                  }}
                >
                  Search Property
                </Button>
              </Link>
            </div>
          </div>
          <div className="filter-card">
            <div className="category-tabs">
              {["Buy", "Rent", "PG", "Commercial"].map((item) => (
                <p
                  className={
                    category.toLowerCase() == item.toLowerCase()
                      ? "categoryActive"
                      : "categoryInActive"
                  }
                  onClick={() => setCategory(item?.toLowerCase())}
                  key={`${category}${Math.random(5)}`}
                >
                  {item}
                </p>
              ))}
            </div>
            <section className="foot_sec">
              <Space className="filter___input">
                <Image
                  placeholder="blur"
                  src={mapIcon}
                  loading="lazy"
                  alt="Map"
                />
                {contentLoading ? (
                  <Skeleton.Input active />
                ) : (
                  <Select
                    showSearch
                    title="Type Location"
                    placeholder="Search Location"
                    value={!!location ? selectedLocationOption : null}
                    onSearch={(e) => {
                      setLocation(e);
                    }}
                    onChange={async (value) => {
                      let splitVal = value.split(",");
                      if (splitVal.length == 1) {
                        const filteredData = await districts.filter(
                          (item) =>
                            item.city?.toLowerCase() == value?.toLowerCase()
                        );
                        updateUserLocation(filteredData[0].city, {
                          name: filteredData[0].city,
                          key: filteredData[0].city_id,
                        });
                        Cookies.set(
                          "userLocation",
                          filteredData[0].city?.toLowerCase()
                        );
                        Cookies.set("city-id", filteredData[0]?.city_id);
                      } else if (splitVal.length == 2) {
                        setLocation(capitalizeWords(splitVal[0].trim()));
                        const filteredData = await districts.filter((item) => {
                          return (
                            item.city?.toLowerCase() ==
                            splitVal[1]?.trim()?.toLowerCase()
                          );
                        });
                        updateUserLocation(filteredData[0]?.city, {
                          name: filteredData[0].city,
                          key: filteredData[0].city_id,
                        });
                        Cookies.set(
                          "userLocation",
                          filteredData[0]?.city?.toLowerCase()
                        );
                        Cookies.set("city-id", filteredData[0]?.city_id);
                      } else {
                        updateUserLocation("Coimbatore", "499");
                        Cookies.set("userLocation", "Coimbatore");
                        Cookies.set("city-id", "499");
                      }
                      setSelectedLocationOption(value);
                    }}
                    loading={fetchingLocations}
                    popupClassName={"location-dropdown-styled"}
                  >
                    {locationOptions.length < 2
                      ? locationOptions.slice(0, 2).map((data) => (
                          <Select.Option
                            value={`${
                              data.locality ? `${data.locality}, ` : ""
                            }${data.city}`}
                            key={`${data.locality ? `${data.locality}, ` : ""}${
                              data.city
                            }`}
                          >
                            {data?.locality ? `${data?.locality}, ` : ""}
                            {data?.city}
                          </Select.Option>
                        ))
                      : locationOptions.slice(1).map((data) => (
                          <Select.Option
                            value={`${
                              data.locality ? `${data.locality}, ` : ""
                            }${data.city}`}
                            key={`${data.locality ? `${data.locality}, ` : ""}${
                              data.city
                            }`}
                          >
                            {data?.locality ? `${data?.locality}, ` : ""}
                            {data?.city}
                          </Select.Option>
                        ))}
                  </Select>
                )}
              </Space>
              {category !== "pg" && (
                <Space className="filter___input">
                  {category === "plot" ? (
                    <Image
                      placeholder="blur"
                      src={buyrent}
                      loading="lazy"
                      alt="Property Action"
                      height={25}
                      width={25}
                    />
                  ) : (
                    <Image
                      placeholder="blur"
                      src={typeOfPropertyIcon}
                      loading="lazy"
                      width={25}
                      height={25}
                      alt="Property Type"
                    />
                  )}
                  {category === "plot" ? (
                    contentLoading ? (
                      <Skeleton.Input active />
                    ) : (
                      <Select
                        showSearch
                        placeholder="Select Property Action"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                          (option?.label ?? "")
                            ?.toLowerCase()
                            .includes(input?.toLowerCase())
                        }
                        filterSort={(optionA, optionB) =>
                          (optionA?.label ?? "")
                            ?.toLowerCase()
                            .localeCompare(
                              (optionB?.label ?? "")?.toLowerCase()
                            )
                        }
                        onChange={(value) => {
                          setTypeOfProperty(value);
                          Cookies.set("selected_type_of_property", value);
                        }}
                        value={typeOfProperty}
                        options={[
                          {
                            key: "buy",
                            value: "buy",
                            label: "Buy",
                          },
                          {
                            key: "rent",
                            value: "rent",
                            label: "Rent",
                          },
                        ]}
                      />
                    )
                  ) : contentLoading ? (
                    <Skeleton.Input active />
                  ) : (
                    <Select
                      showSearch
                      placeholder="Property Type"
                      className="filter-location-selector"
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        (option?.label ?? "")
                          ?.toLowerCase()
                          .includes(input?.toLowerCase())
                      }
                      filterSort={(optionA, optionB) =>
                        (optionA?.label ?? "")
                          ?.toLowerCase()
                          .localeCompare((optionB?.label ?? "")?.toLowerCase())
                      }
                      onChange={(value, option) => {
                        setTypeOfProperty(value);
                        Cookies.set("selected_type_of_property", value);
                      }}
                      value={typeOfProperty}
                      options={
                        category === "commercial"
                          ? [
                              {
                                key: "shop",
                                value: "shop",
                                label: "Shop",
                              },
                              {
                                key: "office",
                                value: "office",
                                label: "Office",
                              },
                              {
                                key: "plot",
                                value: "plot",
                                label: "Plot",
                              },
                            ]
                          : [
                              {
                                key: "flat",
                                value: "flat",
                                label: "Flat",
                              },
                              {
                                key: "villa",
                                value: "villa",
                                label: "Villa",
                              },
                              {
                                key: "house",
                                value: "house",
                                label: "House",
                              },
                              {
                                key: "plot",
                                value: "plot",
                                label: "Plot",
                              },
                            ]
                      }
                    />
                  )}
                </Space>
              )}
              {category !== "pg" &&
                category?.toLowerCase() === "commercial" && (
                  <Space className="filter___input">
                    <Image
                      placeholder="blur"
                      src={buyrent}
                      loading="lazy"
                      alt="Albion Property Action"
                      height={25}
                      width={25}
                    />
                    {contentLoading ? (
                      <Skeleton.Input active />
                    ) : (
                      <Select
                        showSearch
                        placeholder="Select Action"
                        optionFilterProp="children"
                        className="wid-120"
                        filterOption={(input, option) =>
                          (option?.label ?? "")
                            ?.toLowerCase()
                            .includes(input?.toLowerCase())
                        }
                        filterSort={(optionA, optionB) =>
                          (optionA?.label ?? "")
                            ?.toLowerCase()
                            .localeCompare(
                              (optionB?.label ?? "")?.toLowerCase()
                            )
                        }
                        onChange={(value) => {
                          setCommercialPropertyAction(value);
                        }}
                        options={[
                          {
                            key: "buy",
                            value: "buy",
                            label: "Buy",
                          },
                          {
                            key: "rent",
                            value: "rent",
                            label: "Rent",
                          },
                        ]}
                      />
                    )}
                  </Space>
                )}
              {category != "pg" && (
                <Space className="filter___input">
                  <Image
                    placeholder="blur"
                    src={budgetIcon}
                    loading="lazy"
                    alt="Budget Icon"
                    height={20}
                    width={20}
                  />
                  <Dropdown
                    overlay={selectBudgetMenu}
                    overlayClassName="budget-dropdown_menu"
                    trigger={["click"]}
                    overlayStyle={{
                      zIndex: "925",
                    }}
                    getPopupContainer={(triggerNode) =>
                      triggerNode.parentElement
                    }
                    onClick={() => setShowDropdown(true)}
                    open={showDropdown}
                  >
                    {contentLoading ? (
                      <Skeleton.Input active />
                    ) : (
                      <Input
                        placeholder={"Select Budget"}
                        value={getBudgetValue()}
                      />
                    )}
                  </Dropdown>
                </Space>
              )}
              {category == "pg" && (
                <Space className="filter___input">
                  <Image
                    placeholder="blur"
                    src={budgetIcon}
                    loading="lazy"
                    alt="Budget Icon"
                    height={20}
                    width={20}
                  />
                  {contentLoading ? (
                    <Skeleton.Input active />
                  ) : (
                    <Select
                      placeholder="Select Sharing"
                      onChange={(value) => setSharing(value)}
                    >
                      {[
                        {
                          key: "private",
                          value: "private",
                          label: "Private",
                        },
                        {
                          key: "double",
                          value: "double",
                          label: "Double Sharing",
                        },
                        {
                          key: "triple",
                          value: "triple",
                          label: "Triple Sharing",
                        },
                        {
                          key: "four",
                          value: "four",
                          label: "Four Sharing",
                        },
                      ].map((item) => (
                        <Select.Option value={item.value}>
                          {item.label}
                        </Select.Option>
                      ))}
                    </Select>
                  )}
                </Space>
              )}
              <Link
                href={{
                  pathname: `/property/${createUrl()}`,
                  query: Object.fromEntries(
                    Object.entries({
                      selectedLocality:
                        location?.toLowerCase() == "all"
                          ? undefined
                          : location?.toLowerCase(),
                      type_of_property:
                        category === "plot"
                          ? "plot"
                          : typeOfProperty?.toLowerCase() == "all"
                          ? undefined
                          : typeOfProperty,
                      min_budget: category === "pg" ? 1 : min,
                      max_budget: category === "pg" ? 20000 : max,
                      category:
                        category?.toLowerCase() == "all" ? undefined : category,
                      property_action:
                        category === "plot"
                          ? typeOfProperty
                          : category?.toLowerCase() === "commercial"
                          ? commercialPropertyAction
                          : category === "pg" ? "rent": "buy",
                    }).filter(([key, value]) => value !== undefined)
                  ),
                }}
                target="_blank"
              >
                <Tooltip
                  open={
                    min > 0
                      ? max > 0
                        ? min > max
                          ? true
                          : false
                        : false
                      : false
                  }
                  title={"Enter Valid Budget Range"}
                >
                  {contentLoading ? (
                    <Skeleton.Button active />
                  ) : (
                    <Button
                      className="search_button"
                      title={min > max ? "Enter Valid Budget Range" : ""}
                      onClick={() => {
                        setShowMin(true);
                        setShowMax(false);
                      }}
                    >
                      Search Property
                    </Button>
                  )}
                </Tooltip>
              </Link>
            </section>
          </div>
          {recentView.length > 0 && (
            <div className="recently-viewed">
              <div className="swiper-container">
                <b>Recently searched : </b>
                <CommonSwiper
                  slidesPerView={3}
                  navigation={true}
                  loop={true}
                  className="recently-viewed-swiper"
                  breakpoints={{
                    1024: {
                      slidesPerView: 3,
                    },
                    700: {
                      slidesPerView: 2,
                    },
                    320: {
                      slidesPerView: 1,
                    },
                  }}
                >
                  {recentView?.map((item) => (
                    <SwiperSlide className="recently-viewed-card">
                      <Link
                        href={`/propertydetails/${getUrlString(item)}-${
                          item.p_id
                        }`}
                        className="link"
                      >
                        {capitalizeWords(
                          addEllipsis(
                            getUrlString(item).split("-").join(" "),
                            25
                          )
                        )}
                      </Link>
                    </SwiperSlide>
                  ))}
                </CommonSwiper>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
});

export default IntroCard;
