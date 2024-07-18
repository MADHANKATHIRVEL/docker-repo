'use client';
import React, { useEffect, useState } from "react";
import "./mycontact.css";
import axios from "axios";
import { APP_BASE_URL } from "@/constants/Constant";
import { Button, Table } from "@/utils/antd-component";
import { getUserId } from "@/utils/userUtils";

const MyContacts = () => {
  const [myContactData, setMyContactData] = useState([]);

  useEffect(() => {
    async function getMyContacts() {
      const response = await axios.get(`${APP_BASE_URL}/Contacted/show?user_id=${getUserId()}`);
      setMyContactData(() => response.data.length > 0 ? response.data.map(item => item.property.seller_details) : []);
    }
    getMyContacts();
  }, []);

  let myContactColumns = [
    {
        title : "Name",
        dataIndex : "username",
        key : "username"
    },
    {
        title : "Email",
        dataIndex : "email",
        key : "email"
    },
    {
        title : "Mobile Number",
        dataIndex : "mobile_number",
        key : "mobile_number"
    },
    {
        title: "Action",
        key: "action",
        render: (text, record) => (
          <Button href={`tel:${record?.mobile_number}`}>Contact</Button>
        )
      }
  ]


  return <div className="my-contact">
    <Table
        columns={myContactColumns}
        dataSource={myContactData}
    />
  </div>
};

export default MyContacts;
