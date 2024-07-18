"use client";
import React, { useCallback, useEffect, useState } from "react";
import logogif from "@/assets/logo-gif.gif";
import Image from "next/image";
import Cookies from "js-cookie";
import { removeAllCookies } from "@/utils/helpers";
import { useRouter } from "next/navigation";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { getHasUnSold, getUserId } from "@/utils/userUtils";
import dynamic from "next/dynamic";

const ScammerAlert1 = dynamic(() =>
  import("@/components/alerts/ScammerAlert1")
);
const UpdateProperty = dynamic(() =>
  import("@/components/modals/update-property/UpdateProperty")
);
const QuickFilter = dynamic(() =>
  import("@/components/modals/QuickFilters/QuickFilter")
);

export const AppContext = React.createContext({});

export function Loader() {
  return (
    <Image
      src={logogif}
      loading="lazy"
      alt="Albion Loader"
      style={{ margin: "0 auto", display: "flex" }}
    />
  );
}

const Context = ({ children, cities }) => {
  const router = useRouter();
  const [ShowPreference, setShowPreference] = useState(false);
  const [showUpdateStatusModal, setShowUpdateStatusModal] = useState(true);
  const [showScammerAlert, setShowScammerAlert] = useState(false);

  useEffect(() => {
    if (!Cookies.get("user-data") && Cookies.get("user-data")) {
      Cookies.remove("_user-token");
      router.push("/");
    }
  }, [Cookies]);

  const updateUserLocation = (newLocation, option) => {
    Cookies.set("userLocation", newLocation);
    Cookies.set("city-id", option?.key ?? option?.id);
    setUserLocation((prevState) => newLocation);
  };

  const updateUserQuota = (newUserQuota) => {
    setUserQuota((prevState) => newUserQuota);
  };

  const updateUserInterest = useCallback((obj) => {
    setUserInterest((prevState) => obj);
  }, []);

  const [userLocation, setUserLocation] = useState(
    Cookies.get("userLocation") ?? "Coimbatore"
  );
  const [showPopup, setShowPopup] = useState(false);
  const [userInterest, setUserInterest] = useState();
  const [userQuota, setUserQuota] = useState(null);

  const popupClosed = !!Cookies.get("popupClosed");

  useEffect(() => {
    if (!Cookies.get("userLocation")) {
      Cookies.set("userLocation", "Coimbatore");
      Cookies.set("city-id", "499");
    } else {
      setUserLocation((prevState) => Cookies.get("userLocation"));
    }
  }, [Cookies.get("userLocation")]);

  useEffect(() => {
    const timer = Cookies.get("user-data")
      ? setTimeout(() => {
          if (!popupClosed) {
            setShowPopup(true);
          }
        }, 5000)
      : null;
    return () => clearTimeout(timer);
  }, [popupClosed]);

  useEffect(() => {
    const timer = Cookies?.get("user-alert-popup")
      ? setTimeout(() => {
          if (!JSON.parse(Cookies?.get("user-alert-popup"))) {
            setShowScammerAlert(true);
          }
        }, 100)
      : null;
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!Cookies.get("user-data")) {
      var userLocation = Cookies.get("userLocation");
      var cityId = Cookies.get("city-id");
      removeAllCookies();
      if (userLocation == null || userLocation == "null") {
        Cookies.set("userLocation", "coimbatore");
      }
      if (cityId == null || cityId == "null") {
        Cookies.set("city-id", "499");
      }
      if (!Cookies.get("city-id") && !Cookies.get("userLocation")) {
        Cookies.set("userLocation", userLocation);
        Cookies.set("city-id", cityId);
      }
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (!Cookies.get("preferences")) {
        setShowPreference((prevState) => true);
      }
    }, 20 * 60 * 2000);
  }, []);

  return (
    <AppContext.Provider
      value={{
        userLocation,
        updateUserLocation,
        userInterest,
        updateUserInterest,
        userQuota,
        updateUserQuota,
        cities,
      }}
    >
      <GoogleOAuthProvider clientId="1080007356916-6amrf74qvgd060rprqqeegs06s168dn1.apps.googleusercontent.com">
        {children}
      </GoogleOAuthProvider>
      {ShowPreference && getUserId() && (
        <QuickFilter
          showModal={ShowPreference}
          closePopup={() => setShowPreference((prevState) => false)}
          updateUserInterest={updateUserInterest}
        />
      )}
      {getUserId() && getHasUnSold() && (
        <UpdateProperty
          showUpdateStatusModal={showUpdateStatusModal}
          setShowUpdateStatusModal={setShowUpdateStatusModal}
        />
      )}
      {Cookies.get("user-alert-popup") && (
        <ScammerAlert1
          showModal={showScammerAlert}
          setShowModal={setShowScammerAlert}
        />
      )}
    </AppContext.Provider>
  );
};

export default Context;
