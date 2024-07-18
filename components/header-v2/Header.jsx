"use client";
import { useContext, useEffect, useState } from "react";
import "./header.css";
import Image from "next/image";
import albionDarkLogo from "@/assets/footlogo.webp";
import albiobnLogoMobile from "./assets/mobile-v-logo.png";
import {
  Button, Dropdown, Menu, Select, Skeleton, notification
} from "@/utils/antd-component";
import { AppContext } from "@/context/Context";
import albionPrimeCrown from "./assets/albion-prime-crown.webp";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Cookies from "js-cookie";
import menuHamBurger from "./assets/hamburger.png";
import {
  capitalizeFirstLetter
} from "@/utils/helpers";
import { getUserType } from "@/utils/userUtils";
import dynamic from "next/dynamic";
import DownloadButton from "../download/DownloadButton";

const DynamicProfileDrawer = dynamic(() => import("@/app/servercomponent/ProfileDrawer"));
const DynamicQuickLink = dynamic(() => import('@/app/servercomponent/QuickLink'))

const ArrowSvgDown = ({color = '#fff'}) => {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 18 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.4139 2.2501L8.99994 10.6641L0.585938 2.2501L1.99994 0.836102L8.99994 7.8361L15.9999 0.836102L17.4139 2.2501Z"
        fill={color}
      />
    </svg>
  );
};
const ArrowSvgUp = () => {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 18 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        transform: "rotate(180deg)",
      }}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.4139 2.2501L8.99994 10.6641L0.585938 2.2501L1.99994 0.836102L8.99994 7.8361L15.9999 0.836102L17.4139 2.2501Z"
        fill="#8c193f"
      />
    </svg>
  );
};

export default function Header({
  userLoggedIn = Cookies.get("user-data"),
}) {
  const { updateUserLocation, userLocation , cities } = useContext(AppContext);
  const router = useRouter();
  const [showDrawer, setShowDrawer] = useState(false);
  let capitalizedLocation = !!userLocation
    ? capitalizeFirstLetter(userLocation)
    : "Coimbatore";
  const pathname = usePathname();
  const [mouseOverKey, setMouseOverKey] = useState("");
  const [profileDrawer, setProfileDrawer] = useState(false);
  const [showLocationSkeleton, setShowLocationSkeleton] = useState(true);

  useEffect(() => {
    if(cities.length > 0){
      setShowLocationSkeleton(false)
    }
  }, [])

  let quickLinksMenu = [
    {
      key: "buy_quick_link",
      label: <p className="quick-link-category">Buy</p>,
      children: (
        <div
          className="quick-link-card"
          onMouseEnter={() => {
            setMouseOverKey("buy_quick_link");
          }}
          onMouseLeave={() => {
            setMouseOverKey("");
          }}
        >
          {[
            {
              key: "popular_choices",
              label: "Popular Choices",
              sub_children: (
                <div className="quick-link-subchildren">
                  {[
                    {
                      key: "flat-for-sell",
                      label: `Flat for Sale in ${capitalizedLocation}`,
                      url: `/property/residential-flat-apartment-for-sale-in-${capitalizedLocation.toLowerCase()}`,
                    },
                    {
                      key: "villa-for-sell",
                      label: `Villa for Sale in ${capitalizedLocation}`,
                      url: `/property/residential-villa-for-sale-in-${capitalizedLocation.toLowerCase()}`,
                    },
                    {
                      key: "house-for-sell",
                      label: `House for Sale in ${capitalizedLocation}`,
                      url: `/property/residential-independent-house-for-sale-in-${capitalizedLocation.toLowerCase()}`,
                    },
                    {
                      key: "office-for-sell",
                      label: `Office for Sale in ${capitalizedLocation}`,
                      url: `/property/commercial-office-space-for-sale-in-${capitalizedLocation.toLowerCase()}`,
                    },
                    {
                      key: "plot-for-sell",
                      label: `Land / Plot for Sale in ${capitalizedLocation}`,
                      url: `/property/residential-land-plot-for-sale-in-${capitalizedLocation.toLowerCase()}`,
                    },
                    {
                      key: "shop-for-sell",
                      label: `Shop for Sale in ${capitalizedLocation}`,
                      url: `/property/commercial-shop-for-sale-in-${capitalizedLocation.toLowerCase()}`,
                    },
                  ].map((item) => (
                    <a href={item.url} target="_blank" key={item.url}>
                      {item.label}
                    </a>
                  ))}
                </div>
              ),
            },
            {
              key: "buy_properties_by_budget",
              label: "Budget",
              sub_children: (
                <div className="quick-link-subchildren">
                  {[
                    {
                      key: "under-50",
                      label: `Under 50 Lakh`,
                      url: `/property/properties-for-sale-in-${Cookies.get(
                        "userLocation"
                      )?.toLowerCase()}?max_budget=5000000`,
                    },
                    {
                      key: "50-lac-to-1-cr",
                      label: `50 Lakh- 1 Cr`,
                      url: `/property/properties-for-sale-in-${Cookies.get(
                        "userLocation"
                      )?.toLowerCase()}?min_budget=5000000&max_budget=10000000`,
                    },
                    {
                      key: "1-cr-to-1.5-cr",
                      label: `1 Cr - 1.5 Cr`,
                      url: `/property/properties-for-sale-in-${Cookies.get(
                        "userLocation"
                      )?.toLowerCase()}?min_budget=10000000&max_budget=15000000`,
                    },
                    {
                      key: "above-1.5-cr",
                      label: `Above 1.5Cr`,
                      url: `/property/properties-for-sale-in-${Cookies.get(
                        "userLocation"
                      )?.toLowerCase()}?min_budget=15000000`,
                    },
                  ].map((item) => (
                    <a href={item.url} target="_blank" key={item.url}>
                      {item.label}
                    </a>
                  ))}
                </div>
              ),
            },
            {
              key: "property_availabilty",
              label: "Availability",
              sub_children: (
                <div className="quick-link-subchildren">
                  {[
                    {
                      key: "ready_to_move-buy",
                      label: `Ready To Move`,
                      url: `/property/properties-in-${Cookies.get(
                        "userLocation"
                      )?.toLowerCase()}?availability=ready_to_move`,
                    },
                    {
                      key: "ready_to_move-under-construction",
                      label: `Under Construction`,
                      url: `/property/properties-in-${Cookies.get(
                        "userLocation"
                      )?.toLowerCase()}?availability=under_construction`,
                    },
                  ].map((item) => (
                    <a href={item.url} target="_blank" key={item.url}>
                      {item.label}
                    </a>
                  ))}
                </div>
              ),
            },
          ].map((item) => (
            <div key={item.key} className="quick-link-column">
              <p className="ql-column-ht">{item.label}</p>
              {item.sub_children}
            </div>
          ))}
        </div>
      ),
    },
    {
      key: "rent_quick_link",
      label: <p className="quick-link-category">Rent</p>,
      children: (
        <div
          className="quick-link-card"
          onMouseEnter={() => {
            setMouseOverKey("rent_quick_link");
          }}
          onMouseLeave={() => {
            setMouseOverKey("");
          }}
        >
          {[
            {
              key: "property_types",
              label: "Property Types",
              sub_children: (
                <div className="quick-link-subchildren">
                  {[
                    {
                      key: "flat-for-rent",
                      label: `Flat for Rent in ${capitalizedLocation}`,
                      url: `/property/residential-flat-apartment-for-rent-in-${capitalizedLocation.toLowerCase()}`,
                    },
                    {
                      key: "villa-for-rent",
                      label: `Villa for Rent in ${capitalizedLocation}`,
                      url: `/property/residential-villa-for-rent-in-${capitalizedLocation.toLowerCase()}`,
                    },
                    {
                      key: "house-for-rent",
                      label: `House for Rent in ${capitalizedLocation}`,
                      url: `/property/residential-independent-house-for-rent-in-${capitalizedLocation.toLowerCase()}`,
                    },
                    {
                      key: "office-for-rent",
                      label: `Office for Rent in ${capitalizedLocation}`,
                      url: `/property/commercial-office-space-for-rent-in-${capitalizedLocation.toLowerCase()}`,
                    },
                    {
                      key: "plot-for-rent",
                      label: `Land / Plot for Rent in ${capitalizedLocation}`,
                      url: `/property/commercial-land-plot-for-rent-in-${capitalizedLocation.toLowerCase()}`,
                    },
                    {
                      key: "shop-for-rent",
                      label: `Shop for Rent in ${capitalizedLocation}`,
                      url: `/property/commercial-shop-for-rent-in-${capitalizedLocation.toLowerCase()}`,
                    },
                  ].map((item) => (
                    <a href={item.url} target="_blank" key={item.url}>
                      {item.label}
                    </a>
                  ))}
                </div>
              ),
            },
            {
              key: "buy_properties_by_budget",
              label: "Budget",
              sub_children: (
                <div className="quick-link-subchildren">
                  {[
                    {
                      key: "under-5K",
                      label: `Under 5000`,
                      url: `/property/properties-for-rent-in-${Cookies.get(
                        "userLocation"
                      )?.toLowerCase()}?min_budget=1&max_budget=5000`,
                    },
                    {
                      key: "5000-to-10000",
                      label: `5,000 - 10,000`,
                      url: `/property/properties-for-rent-in-${Cookies.get(
                        "userLocation"
                      )?.toLowerCase()}?min_budget=5000&max_budget=10000`,
                    },
                    {
                      key: "10000-to-50000",
                      label: `10,000 - 50,000`,
                      url: `/property/properties-for-rent-in-${Cookies.get(
                        "userLocation"
                      )?.toLowerCase()}?min_budget=10000&max_budget=50000`,
                    },
                    {
                      key: "above-50-k",
                      label: `Above 50,0000`,
                      url: `/property/properties-for-rent-in-${Cookies.get(
                        "userLocation"
                      )?.toLowerCase()}?min_budget=50000`,
                    },
                  ].map((item) => (
                    <a href={item.url} target="_blank" key={item.url}>
                      {item.label}
                    </a>
                  ))}
                </div>
              ),
            },
          ].map((item) => (
            <div key={item.key} className="quick-link-column">
              <p className="ql-column-ht">{item.label}</p>
              {item.sub_children}
            </div>
          ))}
        </div>
      ),
    },
    {
      key: "sell_quick_link",
      label: <p className="quick-link-category">Sell</p>,
      children: (
        <div
          className="quick-link-card"
          onMouseEnter={() => {
            setMouseOverKey("sell_quick_link");
          }}
          onMouseLeave={() => {
            setMouseOverKey("");
          }}
        >
          {[
            {
              key: "user_activity",
              label: "User Activity",
              sub_children: (
                <div className="quick-link-subchildren">
                  {[
                    {
                      key: "my_dashboard",
                      label: "My Dashboard",
                      url: !!Cookies.get("user-data") ? "/profile" : "/login",
                    },
                    {
                      key: "post_property",
                      label: "Post Property ",
                      url: !!Cookies.get("user-data")
                        ? "/post-property"
                        : "/login",
                    },
                  ].map((item) => (
                    <a href={item.url} target="_blank" key={item.url}>
                      {item.label}
                    </a>
                  ))}
                </div>
              ),
            },
            {
              key: "agent_&_builder",
              label: "Agent & Builders",
              sub_children: (
                <div className="quick-link-subchildren">
                  {[
                    {
                      key: "agent_dashboard",
                      label: `Agent Dashboard`,
                      url: `agent-dashboard`,
                    },
                    {
                      key: "contact_top_agent",
                      label: `Contact Top Agent`,
                      url: !!Cookies.get("user-data") ? `/top-agent` : "/login",
                    },
                  ].map((item) =>
                    item.label == "agent_dashboard" ? (
                      getUserType() == "2" ? (
                        <a href={item.url} target="_blank" key={item.url}>
                          {item.label}
                        </a>
                      ) : (
                        <p
                          onClick={() =>
                            notification.error({
                              message: "Please login as Agent",
                            })
                          }
                        >
                          Agent Dashboard
                        </p>
                      )
                    ) : (
                      <a href={item.url} target="_blank" key={item.url}>
                        {item.label}
                      </a>
                    )
                  )}
                </div>
              ),
            },
          ].map((item) => (
            <div key={item.key} className="quick-link-column">
              <p className="ql-column-ht">{item.label}</p>
              {item.sub_children}
            </div>
          ))}
        </div>
      ),
    },
    {
      key: "property_services",
      label: <p className="quick-link-category">Property Services</p>,
      children: (
        <div
          className="quick-link-property-service"
          onMouseEnter={() => {
            setMouseOverKey("property_services");
          }}
          onMouseLeave={() => {
            setMouseOverKey("");
          }}
        >
          {[
            {
              key: "albion_advocate",
              label: "Albion Advocate",
              url: "/albion-advocate",
            },
            {
              key: "package_movers",
              label: "Package Movers",
              url: "/package-movers",
            },
            {
              key: "home_interiors",
              label: "Home Interiors",
              url: "/home-interior",
            },
            {
              key: "free_rent_agreement",
              label: "Free Rent Agreement",
              url: "/free-rent-agreement",
            },
            {
              key: "property_valuation",
              label: "Property Valuation",
              url: "/property-valuation",
            },
            {
              key: "tenant_verification",
              label: "Tenant Verification",
              url: "/tenant-verification",
            },
            {
              key: "property_astrology",
              label: "Property Astrology",
              url: "/property-astrology",
            },
          ].map((item) => (
            <a href={item.url} target="_blank" key={item.url}>
              {item.label}
            </a>
          ))}
        </div>
      ),
    },
    {
      key: "home_loan",
      label: <p className="quick-link-category">Home Loan</p>,
      url: "/home-loan",
    },
  ];

  const menuitems = [
    {
      key: "buy",
      label: "Buy",
      children: [
        {
          key: "flat-for-sell",
          label: `Flat for Sale in ${capitalizedLocation}`,
          url: `/property/residential-flat-apartment-for-sale-in-${capitalizedLocation.toLowerCase()}`,
        },
        {
          key: "villa-for-sell",
          label: `Villa for Sale in ${capitalizedLocation}`,
          url: `/property/residential-villa-for-sale-in-${capitalizedLocation.toLowerCase()}`,
        },
        {
          key: "house-for-sell",
          label: `House for Sale in ${capitalizedLocation}`,
          url: `/property/residential-independent-house-for-sale-in-${capitalizedLocation.toLowerCase()}`,
        },
        {
          key: "office-for-sell",
          label: `Office for Sale in ${capitalizedLocation}`,
          url: `/property/commercial-office-space-for-sale-in-${capitalizedLocation.toLowerCase()}`,
        },
        {
          key: "plot-for-sell",
          label: `Land / Plot for Sale in ${capitalizedLocation}`,
          url: `/property/residential-land-plot-for-sale-in-${capitalizedLocation.toLowerCase()}`,
        },
        {
          key: "shop-for-sell",
          label: `Shop for Sale in ${capitalizedLocation}`,
          url: `/property/commercial-shop-for-sale-in-${capitalizedLocation.toLowerCase()}`,
        },
        {
          key: "under-50",
          label: `Under 50 Lakh`,
          url: `/property/properties-for-rent-in-${Cookies.get(
            "userLocation"
          )?.toLowerCase()}?max_budget=50000`,
        },
        {
          key: "50-lac-to-1-cr",
          label: `50 Lakh- 1 Cr`,
          url: `/property/properties-for-rent-in-${Cookies.get(
            "userLocation"
          )?.toLowerCase()}?min_budget=50000&max_budget=10000000`,
        },
        {
          key: "1-cr-to-1.5-cr",
          label: `1 Cr - 1.5 Cr`,
          url: `/property/properties-for-rent-in-${Cookies.get(
            "userLocation"
          )?.toLowerCase()}?min_budget=10000000&max_budget=15000000`,
        },
        {
          key: "above-1.5-cr",
          label: `Above 1.5Cr`,
          url: `/property/properties-for-rent-in-${Cookies.get(
            "userLocation"
          )?.toLowerCase()}?min_budget=15000000`,
        },
      ],
    },
    {
      key: "sell",
      label: "Sell",
      children: [
        {
          key: "my_dashboard",
          label: "My Dashboard",
          url: !!Cookies.get("user-token") ? "/profile" : "/login",
        },
        {
          key: "post_property",
          label: "Post Property",
          url: !!Cookies.get("user-token") ? "/post-property" : "/login",
        },
        {
          key: "agent_&_builders",
          label: "Agent & Builders",
          children: [
            {
              key: "agent_dashboard",
              label: "Agent Dashboard",
            },
            {
              key: "contact_top_agent",
              label: "Contact Top Agent",
              url: !!Cookies.get("user-token") ? "/top-agents" : "/login",
            },
          ],
        },
      ],
    },
    {
      key: "rent",
      label: "Rent",
      children: [
        {
          key: "flat-for-rent",
          label: `Flat for Rent in ${capitalizedLocation}`,
          url: `/property/residential-flat-apartment-for-rent-in-${capitalizedLocation.toLowerCase()}`,
        },
        {
          key: "villa-for-rent",
          label: `Villa for Rent in ${capitalizedLocation}`,
          url: `/property/residential-villa-for-rent-in-${capitalizedLocation.toLowerCase()}`,
        },
        {
          key: "house-for-rent",
          label: `House for Rent in ${capitalizedLocation}`,
          url: `/property/residential-independent-house-for-rent-in-${capitalizedLocation.toLowerCase()}`,
        },
        {
          key: "office-for-rent",
          label: `Office for Rent in ${capitalizedLocation}`,
          url: `/property/commercial-office-space-for-rent-in-${capitalizedLocation.toLowerCase()}`,
        },
        {
          key: "plot-for-rent",
          label: `Land / Plot for Rent in ${capitalizedLocation}`,
          url: `/property/commercial-land-space-for-rent-in-${capitalizedLocation.toLowerCase()}`,
        },
        {
          key: "shop-for-sell",
          label: `Shop for Rent in ${capitalizedLocation}`,
          url: `/property/commercial-shop-for-rent-in-${capitalizedLocation.toLowerCase()}`,
        },
        {
          key: "under-5000",
          label: `Under ₹ 5,000`,
          url: `/property/properties-for-rent-in-${Cookies.get(
            "userLocation"
          )?.toLowerCase()}?min_budget=1&max_budget=5000`,
        },
        {
          key: "5000-to-10000",
          label: `₹ 5,000 - ₹ 10,000`,
          url: `/property/properties-for-rent-in-${Cookies.get(
            "userLocation"
          )?.toLowerCase()}?min_budget=5000&max_budget=10000`,
        },
        {
          key: "10000-to-50000",
          label: `₹ 10,000 - ₹ 50,000`,
          url: `/property/properties-for-rent-in-${Cookies.get(
            "userLocation"
          )?.toLowerCase()}?min_budget=10000&max_budget=50000`,
        },
        {
          key: "above-50000",
          label: `Above 50,000`,
          url: `/property/properties-for-rent-in-${Cookies.get(
            "userLocation"
          )?.toLowerCase()}?min_budget=50000&max_budget=500000`,
        },
      ],
    },
    {
      key: "property_services",
      label: "Property Services",
      children: [
        {
          key: "albion_advocate",
          label: "Albion Advocate",
          url: "/albion-advocate",
        },
        {
          key: "package_movers",
          label: "Package Movers",
          url: "/package-movers",
        },
        {
          key: "home_interiors",
          label: "Home Interiors",
          url: "/home-interior",
        },
        {
          key: "free_rent_agreement",
          label: "Free Rent Agreement",
          url: "/free-rent-agreement",
        },
        {
          key: "property_valuation",
          label: "Property Valuation",
          url: "/property-valuation",
        },
        {
          key: "tenant_verification",
          label: "Tenant Verification",
          url: "/tenant-verification",
        },
        {
          key: "property_astrology",
          label: "Property Astrology",
          url: "/property-astrology",
        },
      ],
    },
    {
      key: "home_loans",
      label: "Home Loans",
      url: "/home-loan",
    },
  ];

  let headerLocationDropdown = (
    <div className="header-location-dropdown" onMouseEnter={() => setMouseOverKey('location-selection')}
    onMouseLeave={() => setMouseOverKey()}>
      <h3>Nearby Districts</h3>
      <div className="grid-area">
        {cities?.map((city) => (
          <Link
            value={city?.city?.toLowerCase()}
            key={city.city_id}
            href={{
              pathname: `/${city?.city?.toLowerCase()}`,
            }}
            target="_blank"
          >
            {city?.city}
          </Link>
        ))}
      </div>
    </div>
  );


  return (
    !(
      pathname.includes("login") ||
      pathname.includes("signup") ||
      pathname.includes("viewer")
    ) && (
      <header className="header-v2">
        <div className="header-inner-area">
          <div className="header-left">
            <Link
              href={{
                pathname: "/",
              }}
              className="flex-center"
            >
              <Image
                src={albionDarkLogo}
                height={40}
                width={110}
                alt="albionDarkLogo"
              />
            </Link>
            {showLocationSkeleton ? (
              <Skeleton.Input active />
            ) : (
              <>
              {/* <Select
                showSearch
                value={userLocation}
                onChange={(value, option) => {
                  updateUserLocation(value, option);
                  router.push(`/${value}`);
                }}
                className="user-location-selector"
              >
                {cities?.map((city) => (
                  <Select.Option
                    value={city?.city?.toLowerCase()}
                    key={city.city_id}
                  >
                    {city?.city}
                  </Select.Option>
                ))}
              </Select> */}
                <Dropdown
                  overlay={headerLocationDropdown}
                  placement="bottom"
                  className="locaiton-selection-dropdown"
                  onMouseEnter={() => setMouseOverKey('location-selection')}
                  onMouseLeave={() => setMouseOverKey()}
                >
                  <div className="location-selector-container">
                  <span className="header-location-dropdown-placeholder">
                    {userLocation}
                  </span>
                  {mouseOverKey == "location-selection" ? (
                      <span className="arrow-up">
                        <ArrowSvgUp />
                      </span>
                    ) : (
                      <span className="arrow-down">
                        <ArrowSvgDown color="#000"/>
                      </span>
                    )}
                  </div>
                </Dropdown>
              </>
            )}
          </div>
          <div className="header-right">
            <Link
              href={
                userLoggedIn || Cookies.get("user-data") ? "/plans" : "/login"
              }
              className="linkswithicon"
            >
              <Image
                placeholder="blur"
                src={albionPrimeCrown}
                height={25}
                width={25}
                alt="albionPrimeCrown"
              />
              <span className="albionPrimeText">Albion Prime</span>
            </Link>
            <Button
              className="post-property-v2"
              href={
                userLoggedIn || Cookies.get("user-data")
                  ? "/post-property"
                  : "/login"
              }
            >
              Post Property
            </Button>
            <Image
              placeholder="blur"
              src={menuHamBurger}
              height={25}
              width={25}
              onClick={() => setProfileDrawer(() => true)}
              className="profile-hamburger"
              alt="Mobile Menu"
            />
          </div>
        </div>
        <div className="header-latop">
          <div className="main-row">
            <Link
              href={
                userLoggedIn || Cookies.get("user-data") ? "/plans" : "/login"
              }
              className="linkswithicon"
            >
              <Image
                placeholder="blur"
                src={albionPrimeCrown}
                height={25}
                width={25}
                alt="albion-Prime-Crown"
              />
              <span>Albion Prime</span>
            </Link>
            <Button
              className="post-property-v2"
              href={
                userLoggedIn || Cookies.get("user-data")
                  ? "/post-property"
                  : "/login"
              }
            >
              Post Property
            </Button>
          </div>
          <div className="sub-row">
            <Link
              href={{
                pathname: "/",
              }}
            >
              <Image
                placeholder="blur"
                src={albiobnLogoMobile}
                height={35}
                width={35}
                alt="albion-log-mobile"
              />
            </Link>
            <Select
              showSearch
              value={userLocation}
              onChange={(value, option) => {
                router.push(`/${value}`);
                updateUserLocation(value, option);
              }}
              className="user-location-selector"
            >
              {cities?.map((city) => (
                <Select.Option
                  value={city?.city?.toLowerCase()}
                  key={city.city_id}
                >
                  {city?.city}
                </Select.Option>
              ))}
            </Select>
            <Image
              placeholder="blur"
              src={menuHamBurger}
              height={25}
              width={25}
              onClick={() => setProfileDrawer(() => true)}
              className="profile-hamburger"
              alt="Mobile Menu"
            />
          </div>
        </div>
        <div className="mobile-header-inner">
          <div className="main-row">
            <h5>
              Download Our Albion App
            </h5>
            <DownloadButton/>
          </div>
          <div className="sub-row">
            <Link
              href={{
                pathname: "/",
              }}
            >
              <Image
                placeholder="blur"
                src={albiobnLogoMobile}
                height={35}
                width={35}
                alt="Albion Logo Mobile"
              />
            </Link>
            {showLocationSkeleton ? (
              <Skeleton.Input active />
            ) : (
              <>
                <Select
                  showSearch
                  value={userLocation}
                  onChange={(value, option) => {
                    router.push(`/${value}`);
                    updateUserLocation(value, option);
                  }}
                  className="user-location-selector"
                >
                  {cities?.map((city) => (
                    <Select.Option
                      value={city?.city?.toLowerCase()}
                      key={city.city_id}
                    >
                      {city?.city}
                    </Select.Option>
                  ))}
                </Select>
              </>
            )}
            <Image
              placeholder="blur"
              src={menuHamBurger}
              height={25}
              width={25}
              onClick={() => setProfileDrawer(() => true)}
              className="profile-hamburger"
              alt="Mobile Menu"
            />
          </div>
        </div>
        <div className="quick-links-header">
          <div className="quick-link-inner-section">
            {quickLinksMenu.map((item) =>
              !item.url ? (
                <Dropdown
                  key={item.key}
                  overlay={item.children}
                  onMouseEnter={() => {
                    setMouseOverKey(item.key);
                  }}
                  onMouseLeave={() => {
                    setMouseOverKey("");
                  }}
                  overlayClassName={"quick-link-dropdown"}
                  overlayStyle={{
                    transition: "none",
                  }}
                >
                  <p
                    className="menu-main-link"
                    style={
                      mouseOverKey == item.key
                        ? { background: "#fff", color: "#8c193f" }
                        : {}
                    }
                  >
                    {item.label}{" "}
                    {mouseOverKey == item.key ? (
                      <span className="arrow-up">
                        <ArrowSvgUp />
                      </span>
                    ) : (
                      <span className="arrow-down">
                        <ArrowSvgDown />
                      </span>
                    )}
                  </p>
                </Dropdown>
              ) : (
                <a
                  href={item.url}
                  target="_blank"
                  className="home-loan-text"
                  key={item.url}
                >
                  {item.label}
                </a>
              )
            )}
          </div>
        </div>
        {showDrawer && (
          <DynamicQuickLink
            menuitems={menuitems}
            showDrawer={showDrawer}
            setShowDrawer={setShowDrawer}
          />
        )}
        {profileDrawer && (
          <DynamicProfileDrawer
            menuitems={menuitems}
            profileDrawer={profileDrawer}
            setProfileDrawer={setProfileDrawer}
          />
        )}
      </header>
    )
  );
}
