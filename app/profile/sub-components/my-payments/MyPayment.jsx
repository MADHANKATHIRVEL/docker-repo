import { useEffect, useState } from "react";
import "./my-payment.css";
import axios from "axios";
import { APP_BASE_URL } from "@/constants/Constant";
import { getUserId } from "@/utils/userUtils";
import { Button, Table } from "@/utils/antd-component";

function MyPayment() {
  const [myInvoices, setMyInvoices] = useState();

  useEffect(() => {
    async function fetchInvoices() {
      const response = await axios.get(
        `${APP_BASE_URL}/Payments/show?user_id=${getUserId()}`
      );
      setMyInvoices(() =>
        response.data.map((item) => ({
          order_id: item.order_id,
          invoice_no: item.invoice_no,
          invoice_date: item.invoice_date,
          invoice: item.invoice,
        }))
      );
    }
    fetchInvoices();
  }, []);

  let paymentColumns = [
    {
      title: "Order Id",
      dataIndex: "order_id",
      key: "order_id",
    },
    {
      title: "Invoice Number",
      dataIndex: "invoice_no",
      key: "invoice_no",
    },
    {
      title: "Issued Date",
      dataIndex: "invoice_date",
      key: "invoice_date",
    },
    {
      title: "Invoice",
      key: "invoice",
      render: (text, record) => (
        <Button>
          <a href={`${record.invoice}`} download target="_blank">
            Download Invoice
          </a>
        </Button>
      ),
    },
  ];

  return (
    <section className="my-payments">
      <h3>My Invoices</h3>
      <Table
        columns={paymentColumns}
        dataSource={myInvoices}
        pagination={false}
        className="my-invoices-table"
      />
    </section>
  );
}

export default MyPayment;
