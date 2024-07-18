'use client';
import { Button, Modal, Select, notification } from "@/utils/antd-component";
import axios from "axios";
import React, { useState } from "react";
import { getUserId } from "../../../../utils/userUtils";
import { APP_BASE_URL } from "@/constants/Constant";

const ReportModal = React.memo(({
  showModal,
  setShowModal,
  propertyId,
  propertyOwnerId,
}) => {
  const [reportReason, setReportReason] = useState();

  async function handleReportProperty() {
    setShowModal(false);
    notification.success({
      message: "Reported Successfully",
    });
    await axios.post(`${APP_BASE_URL}/Reports/create`, {
      p_id: propertyId,
      user_id: propertyOwnerId,
      reporter_id: getUserId(),
      reason: reportReason,
    });
  }

  return (
    <Modal open={showModal} footer={null} onCancel={() => setShowModal(false)}>
      <div
        className="report-modal-container"
      >
        <Select
          className="report-reason-select"
          placeholder="Select"
          onChange={(value) => setReportReason(value)}
        >
          <Select.Option value={"fake"}>Fake Property</Select.Option>
          <Select.Option value={"suspicious"}>
            Suspicious Property
          </Select.Option>
          <Select.Option value={"re-review"}>Re-Review Property</Select.Option>
        </Select>
        <Button
          className="reportProperty"
          onClick={() => {
            handleReportProperty();
          }}
        >
          Report Property
        </Button>
      </div>
    </Modal>
  );
});

export default ReportModal;
