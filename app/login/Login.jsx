"use client";
import { useContext, useEffect } from "react";
import "./login.css";
import {
  CheckCircleFilled
} from "@/utils/icons";
import { Button, Divider, Form, Input, notification } from "@/utils/antd-component";
import styled from "styled-components";
import { useState } from "react";
import albionLightLogo from "@/assets/light-version_albionapp.webp";
import google from "@/assets/google_light.webp";
import axios from "axios";
import Image from "next/image";
import { APP_BASE_URL } from "@/constants/Constant";
import { useGoogleLogin } from "@react-oauth/google";
import Cookies from "js-cookie";
import { AppContext } from "@/context/Context";
import { encrypt, getUserId } from "@/utils/userUtils";
import { useRouter } from "next/navigation";
import Link from "next/link";
import dynamic from "next/dynamic";

const SEO = dynamic(() => import("@/components/seo/SEO"))
const Verification = dynamic(() => import("./otp/Verification") , {
  ssr : false
});

const StyledLabel = styled.label`
  font-size: 14px;
  font-weight: 400;
  text-align: left;
  @media (max-width: 1024px) {
    font-size: 12px !important;
  }
`;

const StyledInput = styled(Input)`
  border-radius: 4px;
  &::placeholder {
    font-weight: 400;
    font-size: 14px;
  }
  &:hover {
    border: 1px solid #cccccc !important;
    cursor: pointer;
  }
`;

let supportDesc = [
  "Albion Property loans available",
  "Post one Single Property for FREE",
  "Mobile application for both android and ios",
  "24/7 Hrs Customer support",
  "Set property alerts for your requirement",
];

export const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
export const mobileRegex = /^[0-9]{10}$/;

const Login = () => {
  const [success, setSuccess] = useState(false);
  const [givenInput, setGivenInput] = useState("");
  const location = null;
  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState([]);
  const { updateUserQuota } = useContext(AppContext);
  const [isBtnLoading, setIsBtnLoading] = useState(false);
  const router = useRouter()

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });

  async function getUserQuota() {
    await axios
      .get(`${APP_BASE_URL}/Users/check_quota?user_id=${getUserId()}`)
      .then((res) => updateUserQuota(res.data));
  }

  useEffect(() => {
    async function googleLogin(){
      if (user?.access_token) {
        await axios
          .get(
            `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
            {
              headers: {
                Authorization: `Bearer ${user.access_token}`,
                Accept: "application/json",
              },
            }
          )
          .then(async (res) => {
            // await getFirebaseToken()
            //   .then((firebaseToken) => {
            //     if (firebaseToken) {
            //       data["token"] = firebaseToken;
            //       Cookies.set("token", firebaseToken);
            //     }
            //   })
            //   .catch((err) =>
            //     console.error(
            //       "An error occured while retrieving firebase token. ",
            //       err
            //     )
            //   );
            await axios
              .post(`${APP_BASE_URL}/Login/login_with_gmail`, {
                email: res.data.email,
                username: res.data.given_name,
              })
              .then((res) => {
                if (res.status === 200) {
                  const encryptedData = encrypt({
                    user_id: res.data.users.user_id,
                    username: res.data.users.username,
                    user_type: res.data.users.user_type_id,
                    email: res.data.users.email,
                    mobile_number: res.data.users.mobile_number,
                    properties_posted: res.data.users.properties_posted,
                    has_unsold : res.data.users.has_unsold,
                  });
                  Cookies.set("user-data", encryptedData);
                  Cookies.set("_user-token", user.access_token);
                  Cookies.set("preference", JSON.stringify(res.data.users.preference));
                  Cookies.set("profile_image", res.data.users.profile);
                  Cookies.set("phone_plan_id", res.data.users.get_phone_plan_id);
                  Cookies.set("post_plan_id", res.data.users.post_plan_id);
                  Cookies.set("is_contact_verified" , !!res.data.users.is_contact_verified)
                }
              });
            setProfile(res.data);
            getUserQuota();
            router.push("/");
          })
          .catch((err) => console.log(err));
      }
    }
    googleLogin()
  }, [user]);

  const onSubmit = async () => {
    setIsBtnLoading((prevState) => true);
    function createVerificationPayload() {
      if (givenInput.includes("@")) {
        return {
          email: givenInput,
          device_id: 1,
        };
      } else {
        {
          return {
            mobile_number: givenInput,
            device_id: 1,
          };
        }
      }
    }
    try {
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
          if (res.status === 200) {
            setSuccess(true);
          }
          if (res.status === 404) {
            notification.error({
              message: (
                <span>
                  User Not Registered Please <Link href={{
                    pathname : "/signup"
                  }}>Register</Link>
                </span>
              ),
              placement : "bottomRight"
            });
          }
        })
        .catch((err) => {
          switch (err.response.data.message) {
            case "Invalid mobile_number":
              return notification.error({
                message: (
                  <>
                    User Not Register , Please <Link href={{
                    pathname : "/signup"
                  }}>Register</Link>
                  </>
                ),
                placement : "bottomRight"
              });
            case "Invalid email":
              return notification.error({
                message: (
                  <>
                    User Not Register , Please <Link href={{
                    pathname : "/signup"
                  }}>Register</Link>
                  </>
                ),
                placement : "bottomRight"
              });
          }
        });
    } catch (err) {
      notification.error({
        message: err.response.data.message,
        placement : "bottomRight"
      });
    } finally {
      setIsBtnLoading((prevState) => false);
    }
  };

  return (
    <>
      <SEO titleTemplate={"Login"} />
      <div
        className="log_in-page"
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            if (!success) {
              onSubmit();
            }
          }
        }}
      >
        <div className="login-section">
          <div className="left-side">
            <div className="left-side-content">
              <div>
                <Image
                  src={albionLightLogo}
                  className="albion_app_light_image"
                  onClick={() => router.push("/")}
                  title="Go To Dashboard"
                  loading="lazy"
                  alt="Albion app light image"
                  height={60}
                  width={150}
                />
              </div>
              <div className="details">
                <h2>Login</h2>
                <p>
                  Logging in to a world of convenience and personalized
                  experiences. Enter your credentials to access your account and
                  enjoy seamless navigation, exclusive content, and secure
                  transactions on our platform.
                </p>
                <div>
                  {supportDesc.map((support) => (
                    <p className="checklist" key={support}>
                      <CheckCircleFilled />
                      {support}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="right-side">
            <div
              className="loginDiv"
              style={
                success
                  ? {
                      height: "auto",
                    }
                  : null
              }
            >
              {success ? (
                <Verification
                  userInput={givenInput}
                  setSuccess={setSuccess}
                  prevPath={location?.state?.prevPath}
                />
              ) : (
                <>
                  <h2 className="loginText">Login</h2>
                  <div className="firstOption">
                    <div className="inputDiv">
                      <Form onFinish={() => onSubmit()}>
                        <StyledLabel>
                          Enter Your Email ID or Mobile Number
                        </StyledLabel>
                        <Form.Item
                          rules={[
                            {
                              validator: (_, value) => {
                                if (!(emailRegex.test(value) || mobileRegex.test(value))) {
                                  return Promise.reject(
                                    new Error("Please Enter Valid Input")
                                  );
                                }
                                return Promise.resolve();
                              },
                              message: "Please Enter Valid Input",
                            },
                          ]}
                          name={"givenInput"}
                        >
                          <StyledInput
                            placeholder="Enter Email or Mobile Number"
                            controls={false}
                            value={givenInput}
                            onChange={(e) => setGivenInput(e.target.value)}
                          />
                        </Form.Item>
                        <Form.Item>
                          <Button
                            className="submit_button submitBtnContainer"
                            htmlType="submit"
                            loading={isBtnLoading}
                          >
                            Submit
                          </Button>
                        </Form.Item>
                        <a
                          className="need_help_text"
                          href="mailto:support@albionproperty.com"
                        >
                          Need help ?
                        </a>
                      </Form>
                    </div>
                  </div>
                  <div className="logInDivider">
                    <Divider plain className="divider">
                      <span>Or</span>
                    </Divider>
                  </div>
                  <div className="logInSocialLink">
                    <div className="links">
                      <div className="social_link" onClick={login}>
                        <p>Sign in with</p>
                        <Image
                          placeholder="blur"
                          src={google}
                          alt="Social Link"
                          loading="lazy"
                        />
                        <span>Google</span>
                      </div>
                    </div>
                    <div className="sign-up-redirection">
                      You don’t have account?{" "}
                      <Link
                        href={{
                          pathname: "/signup",
                        }}
                      >
                        Sign Up
                      </Link>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
