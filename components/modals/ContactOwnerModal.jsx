'use client';
import {
  Button,
  Checkbox, Input,
  Modal, notification
} from "@/utils/antd-component";
import { useState } from "react";
import "./contact-modal.css";
import { getUserId, getUserMobileNumber } from "@/utils/userUtils";
import {
  ExclamationCircleOutlined,
  SendOutlined,
} from "@/utils/icons";
import whatsappIcon from "../../assets/whatsapp-share.webp";
import Image from "next/image";
import styled from "styled-components";
import { mobileNumberRegex } from "../common/regex";
import axios from "axios";
import { APP_BASE_URL } from "@/constants/Constant";
import Cookies from "js-cookie";

const StyledLabel = styled.label(`
  font-size: 14px;
  font-weight: 500;
  text-align: left;
  width:fit-content;
  @media (max-width: 1024px) {
    font-size: 12px !important;
  }
`);
const StyledInput = styled(Input)`
  &::placeholder {
    font-weight: 400;
    font-size: 14px;
  }
  &:hover {
    cursor: pointer;
  }
  &:focus {
    border-color: transparent !important;
    cursor: pointer;
  }
`;

const ContactOwnerModal = ({
  showModal,
  setShowModal
}) => {
  const [data, setData] = useState({});
  const [component, setComponent] = useState(1);
  const [checked, setChecked] = useState(false);

  const handleSubmit = async () => {
        const response = await axios.post(
          APP_BASE_URL + `/ContactInfo/contact`,
          { user_id: getUserId(), ...data }
        );
        setComponent(2);
        notification.success({
          message: "OTP sent to whatsapp. Kindly check and Verify",
        });
      }
  const handleSubmitOTP = async () => {
    if (!data.otp) {
      notification.error({
        message: "MisSING otp values, enter correctly",
      });
    } else {
      try {
        const response = await axios.post(
          APP_BASE_URL + `/ContactInfo/verifyOtp`,
          { user_id: getUserId(), ...data }
        );
        Cookies.set("is_contact_verified" , true)
        notification.success({
          message: "OTP verified successfully",
        });
        setShowModal(false);
        setComponent(null);
      } catch (error) {
        notification.error({
          message : "Something Went Wrong",
          description : "Please Contact Us For Any Support"
        })
      }
    }
  };

  const checkMobileNoExists = () => {
    if (getUserMobileNumber() == 0) {
      notification.error({
        message: "User logged-in with email. Enter whatsapp number",
      });
    } else {
      setData((prev) => ({ ...prev, whatsapp_no: getUserMobileNumber() }));
      setChecked(true);
    }
  };

  const switchComponent = () => {
    switch (component) {
      case 1:
        return (
          <>
            <div className="contactOwner-header">
              <b>
                Get an offer from Albion Propertyhub by <br />
                entering your{" "}
                <Image placeholder="blur"
                  src={whatsappIcon}
                  alt="Whatsapp Icon"
                  height={15}
                  width={15}
                />{" "}
                Whatsapp number{" "}
                <ExclamationCircleOutlined
                  size={20}
                  title="You will get details on whatsapp via notification by verifying"
                />
              </b>
            </div>
            <div>
              <form
                className="contactOwner-getOTP"
                onKeyDown={(e) =>
                  e.key === "Enter" && mobileNumberRegex.test(data?.whatsapp_no)
                    ? handleSubmit(data)
                    : null
                }
              >
                <div className="contactOwner-input">
                  <StyledLabel>Enter Name</StyledLabel>
                  <StyledInput
                    type="text"
                    name="name"
                    value={data?.name}
                    onChange={(e) =>
                      setData((prev) => ({
                        ...prev,
                        [e.target.name]: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="contactOwner-input">
                  <StyledLabel>Enter Email</StyledLabel>
                  <StyledInput
                    type="email"
                    name="email"
                    value={data?.email}
                    onChange={(e) =>
                      setData((prev) => ({
                        ...prev,
                        [e.target.name]: e.target.value,
                      }))
                    }
                  />
                </div>

                <div>
                  <StyledLabel>
                    <Checkbox checked={checked} onClick={checkMobileNoExists} />{" "}
                    Use login registered number
                  </StyledLabel>
                </div>

                <div className="contactOwner-input">
                  <StyledLabel>
                    Enter{" "}
                    <Image placeholder="blur"
                      src={whatsappIcon}
                      alt="Whatsapp Icon"
                      height={15}
                      width={15}
                    />{" "}
                    Whatsapp number
                  </StyledLabel>
                  <StyledInput
                    type="number"
                    value={data?.whatsapp_no || ""}
                    name="whatsapp_no"
                    required={true}
                    addonAfter={
                      <Button
                        className="send-outline"
                        disabled={!mobileNumberRegex.test(data?.whatsapp_no)}
                        onClick={() => handleSubmit(data)}
                      >
                        <SendOutlined
                          title="Send OTP"
                        />
                      </Button>
                    }
                    onChange={(e) => {
                      setData((prev) => ({
                        ...prev,
                        [e.target.name]: e.target.value,
                      }));
                    }}
                  />
                </div>
              </form>
              <section></section>
            </div>
          </>
        );

      case 2:
        return (
          <>
            <div className="contactOwner-header">
              <b>
                Get an offer from Albion Propertyhub by <br />
                entering OTP received on your{" "}
                <Image
                  placeholder="blur"
                  src={whatsappIcon}
                  alt="Whatsapp Icon"
                  height={15}
                  width={15}
                />{" "}
                Whatsapp number{" "}
              </b>
            </div>
            <div className="contactOwner-input">
              <StyledLabel>Enter OTP</StyledLabel>
              <StyledInput
                type="number"
                value={data?.otp || ""}
                name="otp"
                required={true}
                addonAfter={
                  <Button
                    disabled={!data?.otp?.length === 3}
                    onClick={() => handleSubmitOTP(data)}
                    className="send-outline"
                  >
                    <SendOutlined title="Submit OTP" />
                  </Button>
                }
                onChange={(e) => {
                  setData((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }));
                }}
              />
            </div>
          </>
        );
      default:
        break;
    }
  };

  return (
    <Modal
      open={showModal}
      onCancel={() => {
        setShowModal(false);
        setChecked(false);
        setComponent(1);
        setData({});
      }}
      footer={false}
    >
      {switchComponent()}
    </Modal>
  );
};

export default ContactOwnerModal;
