'use client'
import { useEffect, useState } from "react";
import "./my-responses.css";
import axios from "axios";
import { Avatar, Button, Modal, Select, notification } from "@/utils/antd-component";
import {
  PhoneOutlined,
  UserOutlined,
  InfoCircleOutlined,
  DeleteOutlined
} from "@/utils/icons";
import zeroResponses from "@/assets/nomessages.webp";
import { getUrlString } from "../../../../utils/helpers";
import { getUserId } from "../../../../utils/userUtils";
import DynamicImageBanner from "@/components/common/reusable-component/no-data/DynamicImageBanner";
import { APP_BASE_URL } from "@/constants/Constant";
import { useRouter } from "next/navigation";

export const reportReasons = [
  'Spam / Fake User',
  'Seems Suspicious',
  'Unwanted Solicitation'
];

const MyReponseCard = ({ item, setSelectedTab }) => {
  const router = useRouter()
  const [reportUser, setReportUser] = useState(false);
  const [reportReason, setReportReason] = useState();
  const [showDeleteResponseModal, setShowDeleteResponseModal] = useState(false);

  async function reportUserApi(userId) {
    await axios.post(`${APP_BASE_URL}/Reports/create`, {
      reporter_id: getUserId(),
      user_id: item.user.user_id,
      reason: reportReason,
    }).then(res => {
      notification.success({
        message: "User Reported Successfully",
      });
      setReportUser((prevState) => false);
    })
  }

  async function deleteUserFromList(contactId) {
    await axios
      .post(`${APP_BASE_URL}/Contacted/update`, {
        contact_id: contactId,
        status: 2,
      })
      .then((res) => {
        notification.success({
          message: "User Deleted Successfully",
        });
        setShowDeleteResponseModal((prevState) => false);
      });
  }
  
  return (
    <div className="my-response-card" key={item.contact_id}>
      {showDeleteResponseModal && (
        <Modal
          footer={null}
          onCancel={() => setShowDeleteResponseModal((prevState) => false)}
          open={showDeleteResponseModal}
        >
          <div
            className="delete-lead-container"
          >
            <h2>Delete Lead</h2>
            <span>Do you want to delete this user from your list?</span>
            <Button
              className="deleteresponseuser"
              onClick={() => deleteUserFromList(item.contact_id)}
            >
              Delete User
            </Button>
          </div>
        </Modal>
      )}
      {reportUser && (
        <Modal
          open={reportUser}
          footer={
            <Button onClick={() => reportUserApi(item.contact_id)}>
              <InfoCircleOutlined />
              Report
            </Button>
          }
          onCancel={() => setReportUser(false)}
        >
          <Select
            onChange={(value) => {
              setReportReason(prevState => value);
            }}
            placeholder="Select Report Reason"
            value={reportReason}
            className="report-reason-select"
          >
            {reportReasons.map((item, index) => (
              <Select.Option value={item?.toLowerCase()} key={index}>
                {item}
              </Select.Option>
            ))}
          </Select>
        </Modal>
      )}
      <DeleteOutlined
        title="Remove Response"
        className="removeresponsebtn"
        onClick={() => setShowDeleteResponseModal(true)}
      />
      <div className="user_and_property">
        <Avatar
          icon={<UserOutlined />}
          className="user-avatar"
          shape="circle"
          size={"large"}
        />
        <div className="data__user">
          <span>{item?.user?.username}</span>
          <span>{item?.user?.email}</span>
          <span>{item?.user?.mobile_number == "0" ? 'User Not Specified Any Mobile Number' : item?.user?.mobile_number}</span>
        </div>
        <div className="data__property">
          <a href = {`/propertydetails/${getUrlString(item?.property)}-${item?.property?.p_id}`}>
            Property Id : {item?.property?.p_id}
          </a>
          <span>{item?.property?.property_name}</span>
        </div>
      </div>
      <div className="action_btns">
        <Button
          className="contactPersonBtn"
          href={`tel:${item?.user?.mobile_number}`}
        >
          <PhoneOutlined
            className="phone-icon"
          />
          Contact
        </Button>
        <Button
          className="reportBtn"
          onClick={() => setReportUser((prevState) => true)}
        >
          <InfoCircleOutlined />
          Report
        </Button>
      </div>
    </div>
  );
};

const MyResponses = ({ setSelectedTab }) => {
  const [myResponses, setMyResponses] = useState([]);

  let reponseStatus = [
    {
      key: 1,
      value: "Not Contacted",
    },
    {
      key: 2,
      value: "Follow Up Done",
    },
    {
      key: 3,
      value: "Different Interest",
    },
    {
      key: 4,
      value: "Closed",
    },
  ];

  useEffect(() => {
    async function fetchMyResponses() {
      await axios
        .get(
          `${APP_BASE_URL}/Contacted/show?seller_id=${getUserId()}`
        )
        .then((res) => setMyResponses(res.data))
        .catch((err) => setMyResponses([]));
    }
    fetchMyResponses();
  }, []);

  return (
    <div className="my-responses-page">
      {myResponses.length === 0 ? (
        <>
          <DynamicImageBanner image={zeroResponses} text="NO RESPONSES YET" />
        </>
      ) : (
        <div className="cards-section">
          {myResponses?.map((item) => (
            <MyReponseCard item={item} setSelectedTab={setSelectedTab} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyResponses;
