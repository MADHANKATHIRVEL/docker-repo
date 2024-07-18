
'use client';
import React from "react";
import "./share-property.css";
import ShareButton from "../share/Share";
import { Divider, notification,Modal } from "@/utils/antd-component";
import {
  CopyOutlined
} from "@/utils/icons";
import { getUrlString } from "@/utils/helpers";

const ShareProperty = React.memo(
  ({ showShareModal, setShowShareModal, propertyId , property }) => {
    const styles = {
      headerTextStyle: {
        fontSize: "14px",
        fontWeight: 600,
      },
      row: {
        display: "flex",
        flexDirection: "column",
        gap: "5px",
      },
    };

    const handleCopyToClipboard = async () => {
      if(typeof window != undefined){
        try {
          await navigator.clipboard.writeText(
            `${window.location.origin}/propertydetails/${getUrlString(property)}-${propertyId}`
          );
          notification.success({
            message: "URL Copied",
            description: "The URL has been copied to the clipboard.",
            placement: "top",
          });
        } catch (error) {
          notification.error({
            message: "Copy Failed",
            description: "Failed to copy the URL to the clipboard.",
          });
        }
      }
    };

    return (
      <Modal
        open={showShareModal}
        onCancel={() => setShowShareModal(false)}
        footer={null}
      >
        <div>
          <h4>Share This Property</h4>
          <div style={styles.row}>
            <span style={styles.headerTextStyle}>On Social Media</span>
            <ShareButton url={`${window.location.origin}/propertydetails/${getUrlString(property)}-${propertyId}`} />
          </div>
          <Divider />
          <div style={styles.row}>
            <span style={styles.headerTextStyle}>Copy Link</span>
            <div
              className="copy-text-container"
            >
              <span>{`${window.location.origin}/propertydetails/${getUrlString(property)}-${propertyId}`}</span>
              <CopyOutlined
                className="copy-outlined"
                onClick={() => handleCopyToClipboard()}
              />
            </div>
          </div>
        </div>
      </Modal>
    );
  }
);

export default ShareProperty;
