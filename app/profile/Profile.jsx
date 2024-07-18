"use client";
import { useState, useEffect } from "react";
import "./profile.css";
import { Avatar, Button } from "@/utils/antd-component";
import userDefault from "@/assets/user-default.webp";
import phoneLight from "@/assets/phonelight.webp";
import emailLight from "@/assets/emaillight.webp";
import locationLight from "@/assets/locationlight.webp";
import { EditProfile } from "./sub-components/editprofile/EditProfile";
import { capitalizeFirstLetter } from "../../utils/helpers";
import Image from "next/image";
import {
  getUsername,
  getUserType as getTypeOfUser,
  getUserMobileNumber,
  getEmail,
} from "../../utils/userUtils";
import {
  UserOutlined
} from "@/utils/icons";
import Cookies from "js-cookie";
import SEO from "@/components/seo/SEO";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import dynamic from "next/dynamic";

const MyPayment = dynamic(() =>
  import("./sub-components/my-payments/MyPayment"), {
    ssr : false
  }
);
const MyContacts = dynamic(() =>
  import("./sub-components/my-contacts/MyContacts"), {
    ssr : false
  }
);
const MyResponses = dynamic(() =>
  import("./sub-components/my-responses/MyResponses"), {
    ssr : false
  }
);
const ChangePassword = dynamic(() =>
  import("./sub-components/changepassword/ChangePassword"), {
    ssr : false
  }
);
const AccountSummary = dynamic(() =>
  import("./sub-components/account-summary/AccountSummary"), {
    ssr : false
  }
);
const MyProperties = dynamic(() =>
  import("./sub-components/my-properties/MyProperties"), {
    ssr : false
  }
);

export function getUserType(userTypeId) {
  switch (userTypeId) {
    case "1":
      return "Buyer";
    case "2":
      return "Agent";
    case "3":
      return "Builder";
  }
}

const Profile = () => {
  const router = useRouter();
  const params = useSearchParams();
  const state = null;
  const [selectedTab, setSelectedTab] = useState(
    !!params?.get("setState") ? params?.get("setState") : "account_summary"
  );

  useEffect(() => {
    if (!Cookies.get("user-data")) {
      router.push("/login", { scroll: true });
      return;
    }
  }, []);

  useEffect(() => {
    if (params?.get("setState")) {
      setSelectedTab((prevState) => params?.get("setState"));
    }
  }, [params?.get("setState")]);

  useEffect(() => {
    if (params?.get("setState")) {
      setSelectedTab((prevState) => params?.get("setState"));
    }
  }, [params?.get("setState")]);

  let profileTabs = [
    {
      key: "account_summary",
      label: "Account Summary",
    },
    {
      key: "my_properties",
      label: "My Properties",
    },
    {
      key: "my_responses",
      label: "My Responses",
    },
    {
      key: "my_contacts",
      label: "My Contacts",
    },
    {
      key: "edit_profile",
      label: "Edit Profile",
    },
    {
      key: "my_payments",
      label: "My Payments",
    },
  ];

  function getProfileSubTabContent() {
    switch (selectedTab) {
      case "account_summary":
        return <AccountSummary setSelectedTab={setSelectedTab} />;
      case "change_password":
        return <ChangePassword />;
      case "edit_profile":
        return <EditProfile />;
      case "my_properties":
        return <MyProperties />;
      case "my_contacts":
        return <MyContacts />;
      case "my_responses":
        return <MyResponses setSelectedTab={setSelectedTab} />;
      case "my_payments":
        return <MyPayment />;
    }
  }

  return (
    <>
      <SEO titleTemplate={"Profile Page"} />
      <div className="profile-page">
        <div className="user-details">
          <div className="user-primary-data">
            {Cookies.get("profile_image") == null ? (
              <Avatar
                size={"medium"}
                icon={<UserOutlined />}
                className="profile-avatar"
              />
            ) : (
              <div
                className="profile-image-container"
              >
                <Image
                    placeholder="blur"
                    src={Cookies.get("profile_image") ?? userDefault}
                    alt="Profile Image"
                    height={50}
                    width={50}
                    blurDataURL={Cookies.get("profile_image")}
                  />
              </div>
            )}
            <div className="name-and-type">
              <span className="user__name">{getUsername()}</span>
              <span className="user__type">{getUserType(getTypeOfUser())}</span>
            </div>
          </div>
          <div className="user-personal-data">
            <div className="user-data-row">
              <div className="lightIconContainer">
                <Image
                  placeholder="blur"
                  src={phoneLight}
                  className="lightIcon"
                  loading="lazy"
                  alt="Albion Phone"
                  height={50}
                  width={50}
                />
              </div>
              <span className="user-span">
                Phone :{" "}
                {getUserMobileNumber() == 0 ? (
                  <span
                    onClick={() => setSelectedTab(() => "edit_profile")}
                    className="update_mobile_number_link"
                    title="Link To Update Mobile Number"
                  >
                    Update Mobile Number Here
                  </span>
                ) : (
                  getUserMobileNumber()
                )}
              </span>
            </div>
            <div className="user-data-row">
              <div className="lightIconContainer">
                <Image
                  placeholder="blur"
                  src={emailLight}
                  className="lightIcon"
                  alt="Albion Email"
                  height={50}
                  width={50}
                />
              </div>
              <span className="user-span">Email : {getEmail()}</span>
            </div>
            {!(Cookies.get("userLocation") == null) && (
              <div className="user-data-row">
                <div className="lightIconContainer">
                  <Image
                    placeholder="blur"
                    src={locationLight}
                    className="lightIcon"
                    alt="Albion Location"
                    height={50}
                    width={50}
                  />
                </div>
                <span className="user-span">
                  Location :{" "}
                  {capitalizeFirstLetter(Cookies.get("userLocation"))}
                </span>
              </div>
            )}
          </div>
        </div>
        <div className="profile-tabs">
          {profileTabs.map((tab) => (
            <Button
              key={tab.key}
              className={`${
                selectedTab === tab.key ? "isActiveBtn" : "isInActiveBtn"
              }`}
              onClick={() => setSelectedTab((prevState) => tab.key)}
            >
              <Link
                href={{
                  pathname: "/profile",
                  query: {
                    setState: tab.key,
                  },
                }}
              >
                {tab.label}
              </Link>
            </Button>
          ))}
        </div>
        <div className="tab-contents">{getProfileSubTabContent()}</div>
      </div>
    </>
  );
};

export default Profile;
