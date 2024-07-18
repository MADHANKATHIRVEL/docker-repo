'use client'
import { notification } from "@/utils/antd-component";
import axios from "axios";
import { APP_BASE_URL } from "@/constants/Constant";
import { getEmail, getUserId, getUserMobileNumber } from "./userUtils";
import Cookies from "js-cookie";

export async function wishlistProduct(property_id, user_id, action) {
  if (action === "add") {
    const response = await axios.post(
      `${APP_BASE_URL}/WishList/add_to_wishlist`,
      {
        p_id: property_id,
        user_id: user_id,
      }
    );
    if (response.status === 200) {
      return notification.success({
        message: "Added To Favorites Successfully",
        placement : "bottomRight"
      });
    } else {
      return notification.error({
        message: "Something Went Wrong",
        placement : "bottomRight"
      });
    }
  } else {
    const response = await axios.post(
      `${APP_BASE_URL}/WishList/remove_from_wishlist`,
      {
        p_id: property_id,
        user_id: user_id,
      }
    );
    if (response.status === 200) {
      return notification.success({
        message: "Removed From Favorites",
        placement : "bottomRight"
      });
    } else {
      return notification.error({
        message: "Something Went Wrong",
        placement : "bottomRight"
      });
    }
  }
}

export const requestForm = async (payload) => {
  await axios.post(`${APP_BASE_URL}/enquiry`, payload).then((res) =>
    notification.success({
      message: "Success",
      description: "Our Team Will Contact You for Further Details , Thank You",
    })
  );
};

export const getContact = async (payload) => {
  try {
    await axios.post(`${APP_BASE_URL}/Contacted/contact_owner`, payload);
    notification.success({
      message: "You Will Get The Contact Details Via Mail",
    });
  } catch (err) {
    if (err.response?.data?.message) {
      notification.error({
        message: err.response.data.message,
      });
    } else {
      notification.error({
        message: "Something Went Wrong",
      });
    }
    console.error("Error in getContact:", err);
  }
};

export const getContactAgent = async (payload) => {
  try {
    await axios
      .post(`${APP_BASE_URL}/Contacted/contact_agent`, payload)
      .then((res) =>
        notification.success({
          message: "You Will Get The Agent Contact Details Via Mail",
        })
      );
  } catch (error) {
    notification.error({
      message : "Something Went Wrong"
    })
  }
};

export async function getEnquiryAboutService(obj) {
  await axios
    .post(`${APP_BASE_URL}/Forms/upload_form`, {
      form_name: obj.service,
      payload: obj.details,
      email: getEmail(),
      mobile_number: getUserMobileNumber(),
      user_id: getUserId(),
    })
    .then((res) => {
      notification.success({
        message: "Our team will connect with you shortly.",
        description: "We're here to make your move exceptional.",
      });
    })
    .catch((err) => {
      notification.error({
        message: "Something Went Wrong",
      });
    });
}

export async function checkProductWishlisted(proprertyId, setFav) {
  try {
    const response = await axios.get(
      `${APP_BASE_URL}/WishList/show?user_id=${getUserId()}`
    );

    if (response.data.property_data) {
      const isWishlisted = response.data.property_data.some(
        (wishlistItem) => wishlistItem.p_id === proprertyId
      );
      setFav(isWishlisted);
    }
  } catch (error) {
    // Handle error, e.g., display an error message or log it
    console.error("Error while checking product wishlisted:", error);
  }
}

export const checkQuota = async (userId, quota = "") => {
  await axios
    .get(`${APP_BASE_URL}/Users/check_quota?user_id=${userId}`)
    .then((res) => {
      if (quota == "post") {
        return res.data.post_quota;
      } else {
        return res.data.get_phone_quota;
      }
    });
};

export const getUserQuota = async () => {
  const response = await axios.get(
    `${APP_BASE_URL}/Users/check_quota?user_id=${getUserId() ?? 1}`
  )
  return response.data;
}

export const myProperties = async (id) => {
  try {
    const response = await axios.get(
      `${APP_BASE_URL}/Properties/show?seller_id=${getUserId()}&status=in_review,posted,cancelled,rejected,sold&listAll=true`
    );
    const data = response?.data;
    let filteredData;
    if (data.message) {
      filteredData = [];
    } else {
      filteredData = data?.filter((item) => item.p_id === id);
    }
    return filteredData.length;
  } catch (error) {
    console.error("Error fetching properties:", error);
    throw error;
  }
};

export async function contactOwner(propertyId , setShowModal = undefined) {

  if(getUserMobileNumber() == "0"){
    notification.warning({
      message : "Update Your Mobile Number For Faster Response",
      description : <a href="/profile">here</a>
    })
  }
  await axios
    .post(`${APP_BASE_URL}/Contacted/contact_owner`, {
      p_id: propertyId,
      user_id: getUserId(),
    })
    .then((res) => {
      if (res.status === 200) {
        notification.success({
          message : "You Will Get The Property Details In Whatsapp"
        })
      }
    })
    .catch((err) => {
      if (!!err?.response?.data?.message) {
        if(err?.response?.data?.message == "Quota Exceeded"){
          window.open('/plans?show=1')
        }
        else{
          notification.error({
            message : err?.response?.data?.message
          })
        }
      } else {
        notification.error({
          message: "Something Went Wrong",
        });
        return false;
      }
    });
}


export async function getAreas() {
  const response = await axios.get(
    `${APP_BASE_URL}/Location/getLocation?location=locality&city=${
      Cookies.get("city-id") ?? 499
    }`
  );
  return response.data.locality;
}

export async function getDistricts(cancelTokenSourceRef = null) {
  try {
    const response = await axios.get(
      `${APP_BASE_URL}/location/getlocation?location=city&state=31`
    );
    const data = response?.data?.city;
    return data;
  } catch (error) {
    console.error("Error fetching properties:", error);
    throw error;
  }
}


export async function getBanners(){
  try {
    const response = await axios.get(
      `${APP_BASE_URL}/Banner/show`
    )
    return response.data
  } catch (error) {
    console.log(error)
  }
}


export const getPostedCount = async () => {
  try {
    const response = await axios.get(`${APP_BASE_URL}/Properties/show?seller_id=${getUserId()}&status=posted&listAll=true`)
    if(response?.data?.message){
      return 0; 
    }
    else{
      return response?.data?.length;
    }
  } catch (error) {
    console.log(error)
    return 0;
  }
}


export async function getCities(){
  try {
    const response = await axios.get(`${APP_BASE_URL}/Location/getLocation?location=locality&city=${Cookies.get("city_id")}`)
    return response;
  } catch (error) {
    return undefined;
  }
}