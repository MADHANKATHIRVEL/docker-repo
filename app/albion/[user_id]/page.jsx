"use client";

import { useState } from "react";
import style from "./page.module.css";
import axios from "axios";

const Albion_UserId = ({ params: { user_id } }) => {
  const [newData, setNewData] = useState(false);

  const deleteOne = (id) => {
    axios
      .post(`https://backend.albionpropertyhub.com/api/users/delete`, {
        user_id: user_id,
      })
      .then((res) => {
        setNewData(true);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      {newData ? (
        <div className={style.albion_userId}>
          <h1>User Deleted Successfully</h1>
        </div>
      ) : (
        <div className={style.albion_userId}>
          <h1>Are you sure you want delete</h1>
          <div className={style.albion_user_button}>
            <span className={style.albion_btn_} onClick={() => deleteOne()}>
              Yes
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Albion_UserId;
