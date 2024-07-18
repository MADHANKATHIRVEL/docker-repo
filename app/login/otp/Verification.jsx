"use client";
import { useContext, useEffect } from "react";
import "./verification.css";
import { Button, notification } from "@/utils/antd-component";
import OtpInput from "react-otp-input";
import { useState } from "react";
import axios from "axios";
import Timer from "./Timer";
import { APP_BASE_URL } from "@/constants/Constant";
import Cookies from "js-cookie";
import {
  LeftOutlined
} from "@/utils/icons";
import { AppContext } from "@/context/Context";
import { encrypt, getUserId } from "@/utils/userUtils";
import { useRouter } from "next/navigation";

const verificationStyles = {
  mainDiv: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
  },
  timerText: {
    color: "#737373",
    fontSize: "12px",
  },
  resendCode: {
    color: "#737373",
    fontSize: "12px",
    textDecoration: "underline",
    cursor: "pointer",
  },
  verificationTimeExceed: {
    fontWeight: "400",
    cursor: "pointer",
    fontSize: "14px",
    width: "100%",
    textAlign: "left",
  },
  onCallVerification: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    fontSize: "12px",
    gap: "10px",
    width: "100%",
  },
};

const Verification = ({ userInput, setSuccess, prevPath = null }) => {
  const [otp, setOtp] = useState();
  const { updateUserQuota } = useContext(AppContext);
  const [isBtnLoading, setIsBtnLoading] = useState(false);
  const router = useRouter();
  const [timerCompleted, setTimerCompleted] = useState(false);

  let data = {};

  async function getUserQuota() {
    await axios
      .get(`${APP_BASE_URL}/Users/check_quota?user_id=${getUserId()}`)
      .then((res) => updateUserQuota(res.data));
  }

  async function handleOtpSubmit(otpValue) {
    setIsBtnLoading(true);
    if (userInput.length <= 10) {
      data = {
        mobile_number: userInput,
        otp: otpValue,
      };
    } else {
      data = {
        email: userInput,
        otp: otpValue,
      };
    }
    // await getFirebaseToken()
    //   .then((firebaseToken) => {
    //     if (firebaseToken) {
    //       data["token"] = firebaseToken;
    //       Cookies.set("token", firebaseToken);
    //     }
    //   })
    //   .catch((err) =>
    //     console.error("An error occured while retrieving firebase token. ", err)
    //   );
    await axios
      .post(`${APP_BASE_URL}/Login/verify_otp`, data)
      .then(async (res) => {
        if (res.status === 200) {
          const encryptedData = encrypt({
            user_id: res.data.data.user_id,
            username: res.data.data.username,
            user_type: res.data.data.user_type_id,
            email: res.data.data.email,
            mobile_number: res.data.data.mobile_number,
            properties_posted: res.data.data.properties_posted,
            has_unsold : res.data.data.has_unsold,
          });
          Cookies.set("user-data", encryptedData);
          Cookies.set("_user-token", res.data.data.token_id, { expires: 1 });
          Cookies.set("preference", JSON.stringify(res.data.data.preference));
          Cookies.set("profile_image", res.data.data.profile);
          Cookies.set("phone_plan_id", res.data.data.get_phone_plan_id);
          Cookies.set("post_plan_id", res.data.data.post_plan_id);
          Cookies.set("is_contact_verified" , !!JSON.parse(res.data.data.is_contact_verified))
          await getUserQuota();
          router.push("/", { scroll: true });
        }
      })
      .catch((err) => {
        if (err?.response?.data?.message === "Invalid OTP ") {
          setOtp((prevState) => "");
          notification.error({
            message: "Enter Valid OTP",
            description: "Please Enter The OTP You have received",
            placement : "bottomRight"
          });
        }
      })
      .finally(() => setIsBtnLoading(false));
  }

  function createVerificationPayload() {
    if (userInput.length <= 10) {
      return {
        mobile_number: userInput,
        otp: otp,
      };
    } else {
      return {
        email: userInput,
        otp: otp,
      };
    }
  }

  async function resendCode() {
    await axios
      .post(
        `${APP_BASE_URL}/Login/login_with_otp`,
        createVerificationPayload(),
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
      .then((res) => {
        if (res.status) {
          notification.success({
            message: res.data.message === "Success" && "OTP Sent Successfully",
            placement : "bottomRight"
          });
        }
      })
      .catch((err) => {
        console.log("error when resending otp", err);
        notification.error({
          message: "Something Went Wrong",
          description: "Please Check After Sometime",
          placement : "bottomRight"
        });
      });
  }

  const handleChange = (otpValue) => {
    setOtp((prevState) => otpValue);
    if (otpValue?.length === 4) {
      handleOtpSubmit(otpValue);
    }
  };

  return (
    <div
      className="otp_section"
      onKeyPress={(e) => {
        if (e.key === "Enter") {
          handleOtpSubmit();
        }
      }}
    >
      <h2>Verify Code</h2>
      <span className="emailText">
        Enter 4 digit verification code send to
        <span
        >
          &nbsp;{userInput}
        </span>
      </span>
      <OtpInput
        shouldAutoFocus={true}
        value={otp}
        onChange={handleChange}
        numInputs={4}
        renderInput={(props) => <input {...props} />}
        containerStyle={{
          display: "flex",
          gap: "20px",
          height: "80px",
          fontFamily: "Poppins",
        }}
        inputStyle={{
          height: "40px",
          width: "40px",
          border: "1px solid #8C193F",
          fontFamily: "Poppins",
          fontSize: "18px",
        }}
      />
      <Button
        className="submitOtpBtn"
        onClick={handleOtpSubmit}
        loading={isBtnLoading}
      >
        Submit
      </Button>
      <span
        className="goBackBtn"
        onClick={() => setSuccess(false)}
      >
        <LeftOutlined />
        <span>Go Back</span>
      </span>
      <div style={verificationStyles.mainDiv}>
        <span style={verificationStyles.timerText}>
          <Timer setTimerCompleted={setTimerCompleted} />
        </span>
        {timerCompleted && (
          <span
            style={verificationStyles.resendCode}
            onClick={() => resendCode()}
          >
            Resend Code
          </span>
        )}
      </div>
    </div>
  );
};

export default Verification;
