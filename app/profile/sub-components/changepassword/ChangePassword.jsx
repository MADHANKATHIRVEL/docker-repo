'use client'
import "./change-password.css";
import { Button, Checkbox, Input, notification } from "@/utils/antd-component";
import { useState } from "react";
import axios from "axios";
import { APP_BASE_URL } from "@/constants/Constant";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [getOtp, setGetOtp] = useState();
  const [recoveryInput, setRecoveryInput] = useState()
  const [otpReqSent, setOtpReqSent] = useState()

  async function updatePassword() {
    const response = await axios
      .post(`${APP_BASE_URL}/Profile/change_password`, {
        user_id: 1,
        current_password: currentPassword,
        new_password: newPassword,
        cpwd: confirmPassword
      })
      .catch((err) => {
        notification.error({
          message: err.response.data.message,
        });
      });
    if(response.status === 200) {
      notification.success({
        message : "Password Reset Success"
      })
    }
  }


  return (
    <div className="change-pwd-component">
      <div className="inner_section">
        {
          !getOtp && <section className="update_pwd_row">
            <span>Current Password</span>
            <Input
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="pwd_input"
            />
          </section>
        }
        <Checkbox
          value={getOtp}
          onChange={(value) => setGetOtp(prevState => !prevState)}
        >
          Forgot Current Password
        </Checkbox>
        {
          getOtp && 
          <>
            <section className="update_pwd_row">
              <span>{
                otpReqSent ?  "Enter OTP" : "Recovery Email Or Mobile Number"
              }</span>
              <Input
                value={recoveryInput}
                onChange={(e) => setRecoveryInput(e.target.value)}
                className="pwd_input"
                placeholder={
                  otpReqSent ?  "Enter OTP" : "Enter Mobile Number or Email"
                }
              />
            </section>
            <Button
              className="getotpbtn"
              onClick={() => setOtpReqSent(prevState => true)}
            >
              {
                otpReqSent ?  "Validate OTP" : "Get OTP"
              }
            </Button>
          </>
        }
        <section className="update_pwd_row">
          <span>New Password</span>
          <Input
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="pwd_input"
            placeholder="New Password"
            disabled={false}
          />
        </section>
        <section className="update_pwd_row">
          <span>Confirm Password</span>
          <Input 
            className="pwd_input" 
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            disabled={false}
          />
        </section>
      </div>
      <Button 
        className="updateBtn" 
        onClick={() => updatePassword()}
        disabled={
          !(currentPassword && confirmPassword == newPassword)
        }
      >
        Update
      </Button>
    </div>
  );
};

export default ChangePassword;
