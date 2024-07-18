'use client'
import { useEffect, useState } from "react";
import "./my-properties.css";
import {
  DeleteOutlined,
  ShareAltOutlined
} from "@/utils/icons";
import {
  Button, Modal,
  Select,
  Tag, notification
} from "@/utils/antd-component";
import axios from "axios";
import {
  capitalizeFirstLetter, formatPrice,
  formatText,
  getPropertyStatus,
  getStatusColor,
  getUrlString
} from "../../../../utils/helpers";
import noDataFound from "@/assets/zero_my_properties.webp";
import noImageFound from "@/assets/no-image-found.webp";
import PropertyEditModal from "./modal/PropertyEditModal";
import fetching from '@/assets/fetching-in-progress.gif'
import { getUserId } from "../../../../utils/userUtils";
import DynamicImageBanner from "@/components/common/reusable-component/no-data/DynamicImageBanner";
import ShareProperty from "@/components/common/reusable-component/share-property/ShareProperty";
import { APP_BASE_URL } from "@/constants/Constant";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];


function MyPropertyCard({ item }) {
  const router = useRouter()
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteReason, setDeleteReason] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showMarkAsSold, setShowMarkAsSold] = useState(false)

  function getPostedDate(dateString) {
    let date = new Date(dateString);
    let month = monthNames[date.getMonth()];
    let day = date.getDate();
    let year = date.getFullYear();

    return month + " " + day + ", " + year;
  }

  async function updatePost(propertyId , statusId) {
    await axios
      .put(`${APP_BASE_URL}/Properties/update`, {
        p_id: propertyId,
        status: statusId,
      })
      .then((res) => {
        notification.success({
          message: "Deleted Successfully",
        });
        if(typeof window != undefined){
          window.location.reload(true);
        }
      })
      .catch((err) => {
        notification.error({
          message: "Someting Went Wrong",
        });
      });
    setShowDeleteModal((prevState) => false);
  }

  function getArea(item) {
    switch (item?.property_action?.toLowerCase()) {
      case "sell":
        return;
      default:
        break;
    }
  }

  function getTopLabel(item){
    switch(item.property_type.pt_name?.toLowerCase()){
      case "shop":
        return <>
          {item.area.super_area}{" "}
          {capitalizeFirstLetter(item.area.super_area_unit)}{" "}Shop
        </>;
      case 'plot':
        return <>
            {item.area.super_area}{" "}
            {capitalizeFirstLetter(item.area.super_area_unit)}{" "}Plot 
        </>;
      case 'villa':
        return <>
          {item.features[0].value}{" "}BHK Villa | {item.area.carpet_area}{" "}{item.area.carpet_area_unit}
        </>;
      case 'flat':
        return <>
          {item.features[0].value}{" "}BHK Flat | {item.area.carpet_area}{" "}{item.area.carpet_area_unit}
        </>;
      case 'office':
        return <>
          {item.area.super_area}{" "}
          {capitalizeFirstLetter(item.area.super_area_unit)}{" "}Office
        </>
    }
  }

  return (
    <div className="myproperty__card">
      {showMarkAsSold && (
        <Modal
          open={showMarkAsSold}
          onCancel={() => setShowMarkAsSold((prevState) => false)}
          footer={null}
        >
          <div
            className="flex-col-10"
          >
            <p>Mark As Sold</p>
            <span>Do you want to Mark this Property as Sold ?</span>
            <Button
              className="markassoldbtn"
              onClick={() => updatePost(item.p_id, "3")}
            >
              Mark As Sold
            </Button>
          </div>
        </Modal>
      )}
      {showDeleteModal && (
        <Modal
          open={showDeleteModal}
          footer={null}
          onCancel={() => setShowDeleteModal(false)}
        >
          <div
            className="delete-reason-properties"
          >
            <Select
              onChange={(value) => setDeleteReason(value)}
              className="select-delete-reason"
              placeholder="Select Reason"
            >
              <Select.Option value="sold_via_albion">
                Already Sold Via Albion
              </Select.Option>
              <Select.Option value="sold_via_broker">
                Already Sold Via Other Broker
              </Select.Option>
              <Select.Option value="not_interested">
                Not Intreated In listing
              </Select.Option>
              <Select.Option value="other">Other</Select.Option>
            </Select>
            <Button
              type="primary"
              onClick={() => updatePost(item.p_id, "4")}
              danger
            >
              Delete Post
            </Button>
          </div>
        </Modal>
      )}
      {showEditModal && (
        <PropertyEditModal
          showModal={showEditModal}
          setShowModal={setShowEditModal}
          propertyId={item.p_id}
        />
      )}
      <div className="mypropertycard__left">
        <div className="property_image__container">
          <img
            src={item?.images[0]?.image_url ?? noImageFound}
            alt="NO IMAGE FOUND"
          />
        </div>
        <div className="edit-section">
          <Button
            className="editPropertyBtn"
            onClick={() => setShowEditModal((prevState) => true)}
            disabled={
              item.status === "4" || item.status === "3" || item.status === "0"
            }
          >
            Edit Property
          </Button>
          <ShareAltOutlined
            onClick={() => setShowShareModal((prevState) => true)}
            title="Share Property"
          />
          {item.status !== "4" && (
            <DeleteOutlined
              onClick={() => setShowDeleteModal((prevState) => true)}
              title="Delete Property"
            />
          )}
          {showShareModal && item.status !== "4" && (
            <ShareProperty
              showShareModal={showShareModal}
              setShowShareModal={setShowShareModal}
              propertyId={item.p_id}
              property={item}
            />
          )}
        </div>
      </div>
      <div className="my-property_description">
        <span className="duetotag-container">
          <Tag className="status-tag" color={getStatusColor[item.status]}>
            {getPropertyStatus[item.status]}
          </Tag>
          {item.status === "0" && (
            <Tag
              className="dueToTag"
            >
              Due to : {item.remarks}
            </Tag>
          )}
        </span>
        <a
          href={`/propertydetails/${getUrlString(item)}-${item.p_id}`}
          className="propertyId"
        >
          Property ID : {item?.p_id}
        </a>
        <>{getTopLabel(item)}</>
        <span className="propertyPostedLocation">
          {formatText(item.locality)}&nbsp;{formatText(item.location)}
        </span>
        <span className="propertyPostedTimeline">
          Posted by | {getPostedDate(new Date(item.created_at))}
        </span>
      </div>
      <div className="myproperty_price-details">
        <span className="property_totalPrice">
          ₹ {formatPrice(item.expected_price)}
        </span>
        {item?.pt_name === "plot" && (
          <span className="breakUp">&#x20B9;{getArea(item)}</span>
        )}
        {item.status !== "0" && item.status !== "4" && (
          <Button
            className="viewPostBtn"
            href={`/propertydetails/${getUrlString(item)}-${item.p_id}`}
          >
            View Post
          </Button>
        )}
        {item.status === "1" && (
          <Button
            className="deletePostBtn"
            disabled={item.status === "4"}
            onClick={() => {
              setShowMarkAsSold(true);
            }}
          >
            Mark As Sold
          </Button>
        )}
      </div>
    </div>
  );
}

const MyProperties = () => {
  const [myProperties, setMyProperties] = useState([]);
  const [filterStatus, setFilterStatus] = useState();
  const [fetchingMyProperties, setFetchingMyProperties] = useState(false);

  useEffect(() => {
    async function getMyProperties() {
      setFetchingMyProperties(prevState => true)
      await axios
        .get(
          `${APP_BASE_URL}/Properties/show?seller_id=${getUserId()}${
            filterStatus
              ? `&status=${filterStatus}`
              : "&status=in_review,posted,cancelled,rejected,sold"
          }&listAll=true`
        )
        .then((res) => {
          setMyProperties((prevState) => res.data);
        });
      setFetchingMyProperties(prevState => false)
    }
    getMyProperties()
  }, [filterStatus]);

  return (
    <div className="myproperties_column">
      <div className="my-propery-filter">
        <Select
          showSearch
          className="property-status-select"
          onChange={(value) => setFilterStatus(value)}
          placeholder="Select Property Status"
        >
          {["IN_REVIEW", "POSTED", "REJECTED", "SOLD"].map((item) => (
            <Select value={item} key={item?.toLowerCase()}>
              {formatText(item)}
            </Select>
          ))}
        </Select>
      </div>
      <div className="my-properties-tab">
        {fetchingMyProperties ? (
          <Image src={fetching} height={45} width={45} alt="My Properties Tab" className="fetchingsrc"/>
        ) : myProperties.message ? (
          <DynamicImageBanner image={noDataFound} text="NO PROPERTY POSTED" />
        ) : (
          <>
            {myProperties.map((item) => (
              <MyPropertyCard item={item} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default MyProperties;
