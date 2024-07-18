'use client'
import { Modal } from "@/utils/antd-component";
import { useState, useEffect } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import Cookies from "js-cookie";
import google from "../../../assets/google_light.webp";
import './login-modal.css';
import { encrypt } from "../../../utils/userUtils";
import { APP_BASE_URL } from "@/constants/Constant";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const LoginModal = ({ showModal, setShowModal }) => {
  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      axios
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
          await axios
            .post(`${APP_BASE_URL}/Login/login_with_gmail`, {
              email: res.data.email,
              username: res.data.given_name,
            })
            .then((res) => {
              if (res.status === 200) {
                Cookies.set("_user-token", user.access_token);
                const encryptedData = encrypt({
                  "user_id" : res.data.users.user_id,
                  "username" : res.data.users.username,
                  "user_type" : res.data.users.user_type_id,
                  "email" : res.data.users.email,
                  "mobile_number" : res.data.users.mobile_number,
                  "properties_posted" : res.data.users.properties_posted
                })
                Cookies.set("user-data",encryptedData)
                router.push("/" , {scroll : true});
              }
            });
          setProfile(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });

  return (
    <Modal open={showModal} onCancel={() => setShowModal(false)} footer={null}>
      <div className="login-modal">
        <div>
          <p>Sign in with</p>
          <div onClick={login} className="googleIcon">
            <Image placeholder="blur" src={google} alt="Google Icon" loading="lazy" />
            <span>or</span>
          </div>
        </div>
        <div>
          Prefer an alternative way for login?{" "}
          <Link
            href={{
              pathname: "/login",
            }}
          >
            Login
          </Link>
        </div>
        <div>
          You don’t have account?{" "}
          <a  href={"/signup"}>Sign Up</a>
        </div>
      </div>
    </Modal>
  );
};

export default LoginModal;
