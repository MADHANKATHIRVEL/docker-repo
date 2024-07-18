import { Button, Modal } from "@/utils/antd-component";
import React from "react";
import "./alert.scss";
import Cookies from "js-cookie";

const ScammerAlert1 = ({ showModal, setShowModal }) => {
  return (
    <Modal
      open={showModal}
      footer={null}
      onCancel={() => {
        setShowModal(false);
        Cookies.setItem("user-alert-popup", true);
      }}
      width={"70%"}
    >
      <section className="scammer-alert-1">
        <p>
          This page's content is provided purely for informational reasons; no
          explicit or implied representations or warranties regarding its
          reliability are offered. You should not base any investment decision
          you make only on data that can be downloaded or viewed from the
          website. This material is not intended to be legal advice, a
          solicitation, or an offer to purchase from the developer, builder, or
          any other party.
        </p>
        <Button
          className="acceptance-btn"
          onClick={() => {
            setShowModal(false);
            Cookies.setItem("user-alert-popup", true);
          }}
        >
          Understood
        </Button>
      </section>
    </Modal>
  );
};

export default ScammerAlert1;
