'use client'
import { useEffect } from "react";
import "./edit-profile.css";
import { useState } from "react";
import {
  Button,
  Input,
  Modal,
  Select,
  Tooltip,
  Upload,
  notification,
} from "@/utils/antd-component";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import { APP_BASE_URL } from "@/constants/Constant";
import {
  EditOutlined,
  InfoCircleOutlined,
  PlusOutlined
} from "@/utils/icons";
import {
  getUserType,
  getUsername,
  getEmail,
  getUserMobileNumber,
  getUserId,
  encrypt,
} from "../../../../utils/userUtils";
import Cookies from "js-cookie";

const OTPVerifyModal = ({
  selectedInput,
  showOtpModal,
  setShowOtpModal,
  setEmail,
  setMobileNumber,
}) => {
  const [input, setInput] = useState(selectedInput);
  const [requestedOtp, setRequestedOtp] = useState(false);
  const [otp, setOtp] = useState();
  const [otpValidated, setOtpValidated] = useState(false);

  let data = {
    user_id: getUserId(),
  };

  let verifyData = {
    user_id: getUserId(),
    user_data: otp,
  };

  if (selectedInput?.includes("@")) {
    data["email"] = input;
  } else {
    data["mobile_number"] = input;
  }

  async function getOTP() {
    try {
      await axios
        .post(`${APP_BASE_URL}/login/update_contact`, data)
        .then((res) => {
          setRequestedOtp((prevState) => true);
          notification.success({
            message: "OTP Sent Successfully",
            placement: "top",
          });
        });
    } catch (error) {
      if (error.response.data.message === "mobile_number Already Exists ") {
        notification.error({
          message: "Mobile Number Already Exists",
        });
        return;
      }
      if(error.response.data.message === "email Already Exists "){
        notification.error({
          message : "Email Alreaady Exists"
        })
        return;
      }
      notification.error({
        message: "Something Went Wrong",
      });
    }
  }

  async function verifyOtp() {
    await axios
      .post(`${APP_BASE_URL}/login/contact_verify`, verifyData)
      .then((res) => {
        if (res.status === 200) {
          setOtpValidated((prevState) => true);
          notification.success({
            message: "OTP Validated Successfully",
            placement: "top",
          });
        }
      });
  }

  function handleUpate() {
    if (input.includes("@")) {
      setEmail((prevState) => input);
    } else {
      setMobileNumber((prevState) => input);
    }
    setShowOtpModal((prevState) => false);
  }

  return (
    <Modal
      open={showOtpModal}
      footer={null}
      onCancel={() => setShowOtpModal(false)}
    >
      <div className="changeDataModal">
        <h2>Verify OTP</h2>
        <Input value={input} onChange={(e) => setInput(e.target.value)} />
        {selectedInput !== input && (
          <Button
            onClick={() => {
              getOTP();
            }}
            className="getOtpBtn"
          >
            Get OTP
          </Button>
        )}
        {requestedOtp && (
          <div className="final-step">
            <Input
              minLength={4}
              maxLength={4}
              onChange={(e) => setOtp(e.target.value)}
            />
            <Button
              className="validateOtp"
              onClick={() => {
                verifyOtp();
              }}
            >
              Validate OTP
            </Button>
            <Button
              className="updateInput"
              disabled={!otpValidated}
              onClick={() => handleUpate()}
            >
              Update
            </Button>
          </div>
        )}
      </div>
    </Modal>
  );
};

export const EditProfile = () => {
  const [username, setUserName] = useState(getUsername());
  const [email, setEmail] = useState(getEmail());
  const [mobileNumber, setMobileNumber] = useState(getUserMobileNumber());
  const [fileList, setFileList] = useState([]);
  const [userType, setUserType] = useState(getUserType());
  const [address, setAddress] = useState("");
  const [otpValidated, setOtpValidated] = useState(false);
  const [selectedInput, setSelectedInput] = useState();
  const [showModal, setShowModal] = useState(false);
  const newForm = new FormData();

  useEffect(() => {
    async function getUserDetails() {
      await axios
        .get(`${APP_BASE_URL}/Users/show?user_id=${getUserId()}`)
        .then((res) => {
          setMobileNumber((prevState) => res.data.mobile_number);
          setEmail((prevState) => res.data.email);
          setUserName((prevState) => res.data.username);
          setAddress((prevState) => res.data.address);
        });
    }
    getUserDetails();
  }, []);

  async function updateProfile() {
    if (fileList[0]?.originFileObj) {
      newForm.append("image", fileList[0]?.originFileObj);
      newForm.append("user_id", getUserId());
      await axios.post(`${APP_BASE_URL}/Profile/add_profile_img`, newForm, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    }
    const response = await axios
      .post(`${APP_BASE_URL}/Profile/save_profile`, {
        username: username,
        email: email,
        mobile_number: mobileNumber,
        user_type_id: userType,
        address: address,
        user_id: getUserId(),
      })
      .catch((err) => console.log(err));
    if (response.status === 200) {
      const encryptedData = encrypt({
        user_id: response.data.user.user_id,
        username: response.data.user.username,
        user_type: response.data.user.user_type_id,
        email: response.data.user.email,
        mobile_number: response.data.user.mobile_number,
      });
      Cookies.set("user-data", encryptedData);
      Cookies.set("profile_image", response.data.user.profile);
      notification.success({
        message: "Profile Updated Successfully",
      });
      if(typeof window != undefined){
        window.location.reload(true);
      }
    }
  }

  const handleChange = async ({ fileList: newFileList }) => {
    try {
      const updatedFileList = newFileList.map((file) => ({
        ...file,
        status: "done",
      }));
      setFileList((prevState) => updatedFileList);
    } catch (error) {
      console.error("Error during file upload:", error);
      const updatedFileList = newFileList.map((file) => ({
        ...file,
        status: "error",
      }));
      setFileList(updatedFileList);
    }
  };

  const uploadButton = (
    <>
      <PlusOutlined />{" "}Upload
    </>
  );

  return (
    <div className="edit-profile">
      <div className="edit-profile_inner-section">
        <div className="profile-image-section">
          <Upload
            listType="picture-circle"
            fileList={fileList}
            customRequest={() => {}}
            onChange={handleChange}
            multiple={false}
            accept=".jpg,.jpeg,.png"
            maxCount={1}
          >
            {fileList.length >= 1 ? null : uploadButton}
          </Upload>
        </div>
        <div className="profile-input-section">
          {showModal && (
            <OTPVerifyModal
              selectedInput={selectedInput}
              showOtpModal={showModal}
              setShowOtpModal={setShowModal}
              setEmail={setEmail}
              setMobileNumber={setMobileNumber}
            />
          )}
          <div className="edit-profile-inputs">
            <span>Username</span>
            <Input
              className="inputComponent"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="edit-profile-inputs">
            <span>Email</span>
            <div className="d-flex-g-5">
              <Input
                className="inputComponent"
                value={email}
                onChange={(e) => setEmail(email)}
              />
              <EditOutlined
                onClick={() => {
                  setSelectedInput((prevState) => email);
                  setShowModal((prevState) => true);
                }}
                title="Edit Email"
              />
            </div>
          </div>
          <div className="edit-profile-inputs">
            <span>Mobile Number</span>
            <div className="d-flex-g-5">
              <Input
                className="inputComponent"
                value={mobileNumber == 0 ? "" : mobileNumber}
                onChange={(e) => setMobileNumber(mobileNumber)}
                maxLength={10}
              />
              <EditOutlined
                onClick={() => {
                  setSelectedInput((prevState) => mobileNumber);
                  setShowModal((prevState) => true);
                }}
                title="Edit Mobile Number"
              />
            </div>
          </div>
          <div className="edit-profile-inputs">
            <div className="account-type-container">
              <span>Your Account Type</span>
              <Tooltip title="Account Type Cannot Be Changed">
                <InfoCircleOutlined className="info-icon" />
              </Tooltip>
            </div>
            <Select
              disabled={!(getUserType() === "1")}
              className="select_persona"
              value={userType}
              placeholder="Select"
              onChange={(value) => setUserType(value)}
            >
              <Select.Option value="1">Buyer / Tenant / Owner</Select.Option>
              <Select.Option value="2">Agent</Select.Option>
              <Select.Option value="3">Builder</Select.Option>
            </Select>
          </div>
          <div className="edit-profile-inputs">
            <span>Address</span>
            <TextArea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="address-textarea"
            />
          </div>
        </div>
      </div>
      <Button className="updateProfileBtn" onClick={() => updateProfile()}>
        Update Profile
      </Button>
    </div>
  );
};
