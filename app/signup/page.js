"use client";
import "./signup.css";
import albionLightLogo from "@/assets/light-version_albionapp.webp";
import { CheckCircleFilled } from "@/utils/icons";
import { Button, Checkbox, Form, Input, Select, Tooltip, notification } from "@/utils/antd-component";
import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import { APP_BASE_URL } from "@/constants/Constant";
import Image from "next/image";
import { emailRegex } from "../login/Login";
import { mobileNumberRegex, userNameRegex } from "@/components/common/regex";
import SEO from "@/components/seo/SEO";
import signupintro from "@/assets/introbg.webp";
import apartssection from "@/assets/aparts.webp";
import { useRouter } from "next/navigation";
import Link from "next/link";

const StyledLabel = styled.label`
  font-size: 14px;
  font-weight: 400;
  text-align: left;
  @media (max-width: 1024px) {
    font-size: 12px;
  }
`;

const StyledInput = styled(Input)`
  border-radius: 4px;
  &::placeholder {
    color: #969595 !important;
  }
  @media (max-width: 1024px) {
    height: 30px !important;
    &::placeholder {
      font-size: 12px;
    }
  }
`;

const StyledSelect = styled(Select)`
  width: 18%;
  .ant-select-selection__placeholder {
    color: #969595 !important;
  }
`;

let supportDesc = [
  "Albion Property loans available",
  "Post one Single Property for FREE",
  "Mobile application for both android and ios",
  "24/7 Hrs Customer support",
  "Set property alerts for your requirement",
];

let possibleUsers = [
  {
    id: 1,
    key: "buyer",
    value: "Buyer / Owner",
  },
  {
    id: 2,
    key: "agent",
    value: "Agent",
  },
  {
    id: 3,
    key: "builder",
    value: "Builder",
  },
];

const SignUp = () => {
  const [userType, setUserType] = useState("buyer");
  const [userName, setUserName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function registerUser() {
    setLoading((prevState) => true);
    await axios
      .post(
        `${APP_BASE_URL}/login/register`,
        {
          user_type: userType,
          username: userName,
          email: emailId,
          mobile_number: mobileNumber,
          password: "",
          cpwd: "",
          // cpwd: confirmPassword.current.input.value,
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          setUserName((prevState) => "");
          setMobileNumber((prevState) => "");
          setEmailId((prevState) => "");
          setIsChecked((prevState) => false);
          notification.success({
            message: "Registered Successfully",
            description: (
              <span>
                Click here to <a href={"/login"}>Login</a>
              </span>
            ),
          });
          router.push("/login");
        }
      })
      .catch((err) => {
        notification.error({
          message: err.response.data.message,
        });
      });
    setLoading((prevState) => false);
  }

  function getTooltipTitle() {
    return (
      <div className="sign-up-tooltip">
        {!userNameRegex.test(userName) && (
          <span>Please Enter Valid User name</span>
        )}
        {!emailRegex.test(emailId) && <span>Please Enter Valid Email</span>}
        {!mobileNumberRegex.test(mobileNumber) && (
          <span>Please Enter Valid Mobile Number</span>
        )}
      </div>
    );
  }

  return (
    <>
      <SEO titleTemplate={"Sign Up"} />
      <div
        className="sign_up-page"
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            if (
              !userName ||
              !emailRegex.test(emailId) ||
              !mobileNumberRegex.test(mobileNumber) ||
              !isChecked
            ) {
              return;
            } else {
              registerUser();
            }
          }
        }}
      >
        <div
          className="sign_up-section"
          style={{
            background: signupintro,
          }}
        >
          <div
            className="left-side"
            style={{
              background: apartssection,
            }}
          >
            <div className="left-side-content">
              <div>
                <Image
                  src={albionLightLogo}
                  onClick={() => router.push("/")}
                  title="Go To Dashboard"
                  alt="Albion app light image"
                  loading="lazy"
                  height={70}
                  width={180}
                />
              </div>
              <div className="details">
                <h2>Create Account</h2>
                <p>
                  Creating an account is a simple and essential step to unlock a
                  world of possibilities. By signing up, you'll gain access to a
                  wide range of features and services tailored to your needs.
                  Whether it's personalized recommendations, exclusive offers,
                  or seamless transactions, our platform is designed to enhance
                  your experience. Join us today and embark on a journey of
                  convenience and customization.
                </p>
                <div>
                  {supportDesc.map((support) => (
                    <p className="checklist" key={support}>
                      <CheckCircleFilled />
                      <span>{support}</span>
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="right-side">
            <div className="signUpDiv">
              <h2 className="signUpText">Sign Up</h2>
              <div className="signUpInputs">
                <div className="inputDiv signup-ml">
                  <StyledLabel>You are</StyledLabel>
                  <div className="you_are_buttons">
                    {possibleUsers.map((user) => (
                      <Button
                        key={user.key}
                        className={
                          user.key === userType
                            ? `ActiveBtn responsiveBtn`
                            : `inActiveBtn responsiveBtn`
                        }
                        onClick={() => setUserType(user.key)}
                      >
                        {user.value}
                      </Button>
                    ))}
                  </div>
                </div>
                <Form onFinish={registerUser}>
                  <div className="inputDiv">
                    <StyledLabel>Enter your Name</StyledLabel>
                    <Form.Item
                      rules={[
                        {
                          validator: (_, e) => {
                            if (!e) {
                              return Promise.reject(
                                new Error("Please Enter Your Name")
                              );
                            }
                            return Promise.resolve();
                          },
                        },
                      ]}
                      name={"userName"}
                    >
                      <StyledInput
                        placeholder="Enter your Name"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                      />
                    </Form.Item>
                  </div>
                  <div className="inputDiv">
                    <StyledLabel>Enter your Email Id </StyledLabel>
                    <Form.Item
                      rules={[
                        {
                          validator: (_, e) => {
                            if (!emailRegex.test(emailId)) {
                              return Promise.reject(
                                new Error("Please Enter Your Email Id")
                              );
                            }
                            return Promise.resolve();
                          },
                        },
                      ]}
                      name={"emailId"}
                    >
                      <StyledInput
                        placeholder="Enter your Email Id"
                        value={emailId}
                        onChange={(e) => {
                          setEmailId(e.target.value);
                        }}
                      />
                    </Form.Item>
                  </div>
                  <div className="inputDiv">
                    <StyledLabel>Mobile Number</StyledLabel>
                    <div className="mobileNumberSelection">
                      <StyledSelect
                        defaultValue={91}
                        className="responsiveSelect"
                      >
                        <Select.Option value={91}>+91</Select.Option>
                      </StyledSelect>
                      <Form.Item
                        rules={[
                          {
                            validator: (_, e) => {
                              if (!mobileNumberRegex.test(mobileNumber)) {
                                return Promise.reject(
                                  new Error("Please Enter Your Mobile Number")
                                );
                              }
                              return Promise.resolve();
                            },
                          },
                        ]}
                        name={"mobileNumber"}
                      >
                        <StyledInput
                          placeholder="Primary Mobile Number"
                          className="mobileNumberInput"
                          value={mobileNumber}
                          onChange={(e) => {
                            setMobileNumber(e.target.value);
                          }}
                          maxLength={10}
                        />
                      </Form.Item>
                    </div>
                  </div>
                  <Checkbox
                    value={isChecked}
                    onChange={() => setIsChecked(!isChecked)}
                    className="checkbox-text"
                  >
                    I agree to Albion{" "}
                    <Link
                      href={{
                        pathname: "/terms-and-conditions",
                      }}
                      className="quickLinks"
                    >
                      Terms and Conditions
                    </Link>{" "}
                    &{" "}
                    <Link
                      href={{
                        pathname: "/privacy-policy",
                      }}
                      className="quickLinks"
                    >
                      Privacy Policy
                    </Link>
                  </Checkbox>
                  <Form.Item>
                    <div className="signUpBtnContainer">
                      <Button
                        className="signUpBtn"
                        htmlType="submit"
                        // disabled={
                        //   !userName ||
                        //   !emailRegex.test(emailId) ||
                        //   !mobileNumberRegex.test(mobileNumber) ||
                        //   !isChecked
                        // }
                        title={
                          !userName ||
                          !emailRegex.test(emailId) ||
                          !mobileNumberRegex.test(mobileNumber) ||
                          !isChecked
                            ? `Please Enter Valid Inputs`
                            : ""
                        }
                        loading={loading}
                      >
                        <Tooltip open={false} title={getTooltipTitle()}>
                          Sign Up
                        </Tooltip>
                      </Button>
                    </div>
                  </Form.Item>
                </Form>
                <span className="login-shrtcut">
                  Already a User ?{" "}
                  <Link
                    href={{
                      pathname: "/login",
                    }}
                    className="login-link"
                  >
                    Login
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
