import * as CryptoJS from "crypto-js";
import Cookies from "js-cookie";

const secret_key = "albion_web_app";

export const encrypt = (userData) => {
  const cipherText = CryptoJS.AES.encrypt(
    JSON.stringify(userData),
    secret_key
  ).toString();
  return cipherText;
};

export const decrypt = (cipherText) => {
  if (cipherText == null) {
    return null;
  }
  const decryptedData = CryptoJS.AES.decrypt(cipherText, secret_key);
  const plainText = decryptedData.toString(CryptoJS.enc.Utf8);
  return plainText;
};

function getUserData() {
  const encryptedText = Cookies.get("user-data");
  if (decrypt(encryptedText) == null) {
    return;
  }
  return JSON.parse(decrypt(encryptedText));
}

export function getUserId() {
  const userDetails = getUserData();
  if (userDetails == null) return;
  return userDetails.user_id;
}

export function getUsername() {
  const userDetails = getUserData();
  if (userDetails == null) return;
  return userDetails.username;
}

export function getUserType() {
  const userDetails = getUserData();
  if (userDetails == null) return;
  return userDetails.user_type;
}

export function getEmail() {
  const userDetails = getUserData();
  if (userDetails == null) return;
  return userDetails.email;
}

export function getUserMobileNumber() {
  const userDetails = getUserData();
  if (userDetails == null) return;
  return userDetails.mobile_number;
}

export function getPropertiesPostedByUser() {
  const userDetails = getUserData();
  if (userDetails == null) return 0;
  return userDetails.properties_posted;
}

export function getHasUnSold() {
  const userDetails = getUserData();
  if (userDetails == null) return false;
  return userDetails.has_unsold;
}

export function getFCMToken() {
  if (Cookies.get("token")) {
    if (decrypt(Cookies.get("token")) == null) {
      return;
    }
    return JSON.parse(decrypt(Cookies.get("token")));
  }
}

export const getIsUserVerified = () => {
  if (JSON.parse(Cookies.get("is_contact_verified"))) {
    return true;
  } else {
    return false;
  }
};
