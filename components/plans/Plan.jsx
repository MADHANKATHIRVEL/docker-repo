"use client";
import { useState } from "react";
import "./plan.css";
import { capitalizeWords, formatText } from "../../utils/helpers";
import { Button, Input, Modal, Table, Tag, notification } from "@/utils/antd-component";
import axios from "axios";
import { useEffect } from "react";
import { numberToWords } from "amount-to-words";
import useRazorpay from "react-razorpay";
import Cookies from "js-cookie";
import { getUserId, getUserMobileNumber, getUserType, getUsername } from "../../utils/userUtils";
import { APP_BASE_URL, paymentCard } from "@/constants/Constant";
import albionBankLogo from "@/assets/footlogo.webp";
import { View, Text, Image as PdfImage, Document, Page, pdf } from "@react-pdf/renderer";
import { getUserTypeText } from "@/components/common/reusable-component/propertyimageslider/PropertyImagesSlider";
import { useRouter } from "next/navigation";
import { Loader } from "@/context/Context";
import Correct from "./Correct";
import Wrong from "./Wrong";
import dynamic from "next/dynamic";

const ResponsivePlan = dynamic(() => import("./responsivePlan"), {
  ssr : false
});
const SEO = dynamic(() => import("@/components/seo/SEO"), {
  ssr : false
});

const invoiceStyles = {
  body: {
    fontFamily: "Poppins", // Using the imported Google Font
  },
  page: {
    fontFamily: "Helvetica",
    paddingHorizontal: 30,
    paddingVertical: 20,
    lineHeight: 1.3,
    border: "1px solid black",
  },
  headingContainer: {
    marginTop: 20,
    lineHeight: 1.4,
    alignItems: "center",
    borderBottom: "1px solid black",
  },
  headingText: {
    fontSize: 12,
    fontWeight: "extrabold",
  },
  bodyContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  tableContainer: {
    width: "100%",
    border: "1px solid black",
    borderCollapse: "collapse",
    marginTop: 10,
  },
  tableHeader: {
    paddingVertical: 10,
    flexDirection: "row",
    fontWeight: "bold",
    alignItems: "center",
  },
  tableHeaderText: {
    width: "33%",
    textAlign: "center",
    borderBottom: "1px solid black",
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  tableRow: {
    paddingVertical: 10,
    flexDirection: "row",
  },
  tableRowText: {
    width: "33%",
    textAlign: "center",
    borderBottom: "1px solid black",
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  footerContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  invoiceDetailsText: {
    fontSize: 14,
    marginBottom: "5px",
  },
  invoiceDetailsTextSmall: {
    fontSize: 10,
    marginBottom: 2,
  },
  gstDetailsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    marginBottom: 5,
  },
  gstDetailsText: {
    fontSize: 12,
    fontWeight: 800,
  },
  addressAndInvoice: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    border: "1px solid #000000",
    width: "100%",
  },
  addressColumn: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
    border: "1px solid #000000",
    width: "60%",
    boxSizing: "border-box",
    padding: "5px",
  },
  invoiceColumn: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
    border: "1px solid #000000",
    width: "40%",
    boxSizing: "border-box",
    padding: "5px",
  },
  column1: {
    width: "25%",
    fontSize: 12,
    color: "#fff",
  },
  column1Val: {
    color: "#000",
    fontSize: 12,
    width: "25%",
    border: "1px solid #000",
    boxSizing: "border-box",
    padding: "5px",
  },
  column2: {
    width: "50%",
    fontSize: 12,
    color: "#fff",
  },
  column2Val: {
    width: "50%",
    fontSize: 12,
    color: "#000",
    border: "1px solid #000",
    boxSizing: "border-box",
    padding: "5px",
  },
  column3: {
    width: "25%",
    fontSize: 12,
    color: "#fff",
  },
  column3Val: {
    width: "25%",
    fontSize: 12,
    color: "#000",
    border: "1px solid #000",
    boxSizing: "border-box",
    padding: "5px",
  },
  priceBreakRow: {
    display: "flex",
    flexDirection: "row",
    width: "50%",
    justifyContent: "space-between",
    gap: "5px",
  },
  priceBreakupLabel: {
    fontSize: 12,
    fontWeight: "extrabold",
  },
  priceBreakupValue: {
    fontSize: 12,
    fontWeight: 400,
  },
  amountInWords: {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
    marginTop: 20,
  },
  amountInWordsLabel: {
    fontSize: 14,
    fontWeight: 600,
  },
  amountInWordsValue: {
    fontSize: 12,
    fontWeight: 400,
  },
  termsAndConditionSection: {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
    width: "100%",
    marginTop: 20,
  },
  termsAndConditionLabel: {
    fontSize: 14,
    fontWeight: 600,
  },
};

const MyDocument = (props) => (
  <Document>
    <Page size="A4" style={invoiceStyles.page}>
      <View style={invoiceStyles.headingContainer}>
        <Text style={{ fontSize: 10, fontWeight: "light" }}>TAX INVOICE</Text>
      </View>
      <View style={{ boxSizing: "border-box", padding: "20px" }}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text style={invoiceStyles.invoiceDetailsText}>Albion Investments & Holdings Private Limited</Text>
            <Text style={invoiceStyles.invoiceDetailsTextSmall}>LEVEL 5, TAMARAI TECH PARK, S.P.PLOT</Text>
            <Text style={invoiceStyles.invoiceDetailsTextSmall}>
              NO.16-19 & 20-A, Thiru Vi Ka Industrial Estate
            </Text>
            <Text style={invoiceStyles.invoiceDetailsTextSmall}>Guindy, Chennai – 600032</Text>
            <Text style={invoiceStyles.invoiceDetailsTextSmall}>Tamil Nadu, India</Text>
            <Text style={invoiceStyles.invoiceDetailsTextSmall}>Website - www.albionpropertyhub.com</Text>
            <Text style={invoiceStyles.invoiceDetailsTextSmall}>
              Email Id- <Text style={invoiceStyles.emailId}>support@albionpropertyhub.com</Text>
            </Text>
          </View>
          <View>
            <PdfImage src={albionBankLogo} style={{width: 120}}/>
          </View>
        </View>
        <View style={invoiceStyles.gstDetailsContainer}>
          <Text style={invoiceStyles.gstDetailsText}>GST No : 33AATCA0202A1ZI</Text>
          <Text style={invoiceStyles.gstDetailsText}>PAN No : AATCA0202A</Text>
          <Text style={invoiceStyles.gstDetailsText}>CIN No : U6100TN2019PTC133007</Text>
        </View>
      </View>
      <View style={invoiceStyles.addressAndInvoice}>
        <View style={invoiceStyles.addressColumn}>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <Text style={{ fontSize: 12, fontWeight: 600 }}>Addressed To : </Text>
            <Text style={{ fontSize: 12, fontWeight: 400 }}>{getUsername()}</Text>
          </View>
          <Text style={{ fontSize: 12, fontWeight: 400 }}>{props.billing_address}</Text>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <Text style={{ fontSize: 12, fontWeight: 600 }}>Contact Number: </Text>
            <Text style={{ fontSize: 12, fontWeight: 400 }}>{getUserMobileNumber()}</Text>
          </View>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <Text style={{ fontSize: 12, fontWeight: 600 }}>PAN : </Text>
            <Text style={{ fontSize: 12, fontWeight: 400 }}>{props.PAN ?? "-"}</Text>
          </View>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <Text style={{ fontSize: 12, fontWeight: 600 }}>GSTIN : </Text>
            <Text style={{ fontSize: 12, fontWeight: 400 }}>{props.GSTIN ?? "-"}</Text>
          </View>
        </View>
        <View style={invoiceStyles.invoiceColumn}>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <Text style={{ fontSize: 12, fontWeight: 600 }}>Invoice No : </Text>
            <Text style={{ fontSize: 12, fontWeight: 400 }}>{props.invoice_no}</Text>
          </View>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <Text style={{ fontSize: 12, fontWeight: 600 }}>Invoice Date : </Text>
            <Text style={{ fontSize: 12, fontWeight: 400 }}>{props.invoice_date}</Text>
          </View>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <Text style={{ fontSize: 12, fontWeight: 600 }}>Invoice Time : </Text>
            <Text style={{ fontSize: 12, fontWeight: 400 }}>{props.invoice_time}</Text>
          </View>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <Text style={{ fontSize: 12, fontWeight: 600 }}>Order Date : </Text>
            <Text style={{ fontSize: 12, fontWeight: 400 }}>{props.order_date}</Text>
          </View>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <Text style={{ fontSize: 12, fontWeight: 600 }}>Supplier Type : </Text>
            <Text style={{ fontSize: 12, fontWeight: 400 }}>{props.supplier_type}</Text>
          </View>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <Text style={{ fontSize: 12, fontWeight: 600 }}>Place Of Supply : </Text>
            <Text style={{ fontSize: 12, fontWeight: 400 }}>{props.place_of_supply}</Text>
          </View>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <Text style={{ fontSize: 12, fontWeight: 600 }}>Currency : </Text>
            <Text style={{ fontSize: 12, fontWeight: 400 }}>INR</Text>
          </View>
        </View>
      </View>
      <View
        style={{
          backgroundColor: "#8c193f",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          boxSizing: "border-box",
          padding: "5px",
        }}
      >
        <Text style={invoiceStyles.column1}>S.No</Text>
        <Text style={invoiceStyles.column2}>Description</Text>
        <Text style={invoiceStyles.column3}>Unit</Text>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={invoiceStyles.column1Val}>1</Text>
        <Text style={invoiceStyles.column2Val}>
          Albion {props.selectedPlan?.toUpperCase()} {props.isContact ? "Contact" : "Listing"} Plan - {getUserTypeText(getUserType())} 
        </Text>
        <Text style={invoiceStyles.column3Val}>1</Text>
      </View>
      <View
        style={{
          marginTop: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "2px",
          border: "1px solid #000000",
          boxSizing: "border-box",
          paddingTop: "5px",
          alignItems: "flex-end",
          justifyContent: "flex-end",
          width: "100%",
        }}
      >
        <View style={invoiceStyles.priceBreakRow}>
          <Text style={invoiceStyles.priceBreakupLabel}>Total Gross Amount </Text>
          <Text style={invoiceStyles.priceBreakupValue}>{parseInt(props.planPrice).toFixed(2)}</Text>
        </View>
        <View style={invoiceStyles.priceBreakRow}>
          <Text style={invoiceStyles.priceBreakupLabel}>Discount / Abatement </Text>
          <Text style={invoiceStyles.priceBreakupValue}>0.00</Text>
        </View>
        <View style={invoiceStyles.priceBreakRow}>
          <Text style={invoiceStyles.priceBreakupLabel}>Total Taxable Amount </Text>
          <Text style={invoiceStyles.priceBreakupValue}>{parseInt(props.planPrice).toFixed(2)}</Text>
        </View>
        <View style={invoiceStyles.priceBreakRow}>
          <Text style={invoiceStyles.priceBreakupLabel}>GST@ 18.00 % </Text>
          <Text style={invoiceStyles.priceBreakupValue}>{parseInt(props.planPrice) * (18 / 100)}</Text>
        </View>
        <View style={invoiceStyles.priceBreakRow}>
          <Text style={invoiceStyles.priceBreakupLabel}>Rounding Off </Text>
          <Text style={invoiceStyles.priceBreakupValue}>0.00</Text>
        </View>
        <View
          style={{
            borderTop: "1px solid #000000",
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            gap: "5px",
            width: "50%",
          }}
        >
          <Text style={{ fontSize: 12 }}>Total amount payable </Text>
          <Text style={{ fontSize: 12 }}>
            {(parseInt(props.planPrice) + (parseInt(props.planPrice) * 18) / 100).toFixed(2)}
          </Text>
        </View>
      </View>
      <View style={invoiceStyles.amountInWords}>
        <Text style={invoiceStyles.amountInWordsLabel}>Amount in words: (INR)</Text>
        <Text style={invoiceStyles.amountInWordsValue}>
          {numberToWords(parseInt(props.planPrice) + (parseInt(props.planPrice) * 18) / 100)}.
        </Text>
      </View>
      <View style={invoiceStyles.termsAndConditionSection}>
        <Text style={invoiceStyles.termsAndConditionLabel}>Terms and conditions:</Text>
        <Text
          style={{
            fontSize: 12,
            fontWeight: 400,
          }}
        >
          In case of any dispute/discrepancy against this invoice for claiming of GST Input, kindly intimate within
          30 days from the date of receipt of this invoice for necessary correction. No such request will be
          entertained after 30 days.
        </Text>
      </View>
      <View
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          marginTop: "5%",
        }}
      >
        <Text style={{ textAlign: "center", fontSize: 8 }}>This is a computer generated Invoice</Text>
      </View>
    </Page>
  </Document>
);

export const ApplyCouponModal = ({ showModal, setShowModal }) => {
  const [coupon, setCoupon] = useState("");
  const router = useRouter();

  async function applyCoupon() {
    try {
      const response = await axios.post(`${APP_BASE_URL}/Plans/apply_coupon`, {
        coupon: coupon,
        user_id: getUserId(),
      });
      if (response.data.message == "Coupon Applied Successfully") {
        router.push("/");
        if (typeof window != undefined) {
          window.location.reload(true);
        }
      }
    } catch (error) {
      notification.error({
        message: "Something Went Wrong",
      });
    }
  }

  return (
    <Modal open={showModal} onCancel={() => setShowModal(false)} footer={null}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          marginTop: "30px",
        }}
      >
        <Input placeholder="Enter Code" onChange={(e) => setCoupon(e.target.value)} />
        <Button onClick={applyCoupon}>Apply Coupon</Button>
      </div>
    </Modal>
  );
};

const generatePDFAndDownload = async (
  PAN,
  GSTIN,
  planPrice,
  invoice_no,
  invoice_date,
  invoice_time,
  order_date,
  supplier_type,
  place_of_supply,
  selectedPlan,
  billing_address,
  showContactPrice
) => {
  const pdfDoc = (
    <MyDocument
      PAN={PAN}
      GSTIN={GSTIN}
      planPrice={planPrice}
      invoice_no={invoice_no}
      invoice_date={invoice_date}
      invoice_time={invoice_time}
      order_date={order_date}
      supplier_type={supplier_type}
      place_of_supply={place_of_supply}
      selectedPlan={selectedPlan}
      billing_address={billing_address}
      isContact={showContactPrice}
    />
  );
  const generatedBlob = await pdf(pdfDoc).toBlob();
  const pdfBlob = new Blob([generatedBlob], {
    type: "application/pdf"
  });
  const pdfFile = new File([pdfBlob], "my-pdf-file.pdf", {
    type: "application/pdf"
  });
  const pdfUrl = URL.createObjectURL(pdfBlob);
  const link = document.createElement("a");
  link.href = pdfUrl;
  link.download = "invoice.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  return pdfFile;
};
const Plan = ({ searchParams }) => {
  const router = useRouter();
  const show = !!searchParams["show"];
  const [showModal, setShowModal] = useState(false);
  const [Razorpay] = useRazorpay();
  const [paymentPlans, setPaymenPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState("free");
  const [downloadInvoice, setDownloadInvoice] = useState(false);
  const [planPrice, setPlanPrice] = useState(0);
  const [gettingPayload, setGettingPayload] = useState(false);
  const [showContactPrice, setShowContactPrice] = useState(!!show);
  const [GSTIN, setGSTIN] = useState("");
  const [PAN, setPAN] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [showCostBreakupModal, setShowCostBreakupModal] = useState(false);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    if (!Cookies.get("user-data")) {
      router.push("/login");
      return;
    }
  }, []);

  useEffect(() => {
    setShowContactPrice((prevState) => !!searchParams["show"]);
  }, []);

  useEffect(() => {
    if (downloadInvoice) {
      const downloadLink = document.querySelector(".downloadLink");
      if (typeof window != undefined) {
        if (downloadLink) {
          const mouseEvent = new MouseEvent("click", {
            bubbles: true,
            cancelable: true,
            view: window,
          });

          downloadLink.dispatchEvent(mouseEvent);
        }
      }
    }
  }, [downloadInvoice]);

  useEffect(() => {
    setLoader((prevState) => true);
    async function getPaymentPlans() {
      const response = await axios.get(
        `${APP_BASE_URL}/Plans/show?user_type_id=${getUserType()}&plan_group=${showContactPrice ? 1 : 2}`
      );
      if (response.status === 200)
        setPaymenPlans((prevState) =>
          response.data.map((plan, index) => ({
            key: index + 1,
            label: plan?.plan_name?.toLowerCase(),
            price: parseInt(plan?.amount),
            plan_id: plan?.plan_id,
            org_price: parseInt(plan?.amount) * 2,
            benefits: getBenefits(plan),
          }))
        );
      setLoader((prevState) => false);
    }
    getPaymentPlans();
  }, []);


  function getBenefits(plan) {
    switch (getUserType()) {
      case "1":
        if (showContactPrice) {
          return {
            whatsapp_notifications: !!parseInt(plan?.whatsapp_notification),
            dedicated_support: !!parseInt(plan?.dedicated_support),
            get_phone_quota: plan?.get_phone_quota,
          };
        }
        return {
          period: plan?.duration,
          response_rate: plan?.response_rate,
          no_of_listings: plan?.no_of_listings,
          whatsapp_notifications: !!parseInt(plan?.whatsapp_notification),
          improved_property_visibility_in_homepage: !!parseInt(plan?.highlight_in_homepage),
          verified_property_tag: !!parseInt(plan?.verified_tag),
          relationship_manager: !!parseInt(plan?.relationship_manager),
          dedicated_support: !!parseInt(plan?.dedicated_support),
        };
      case "2":
        if (showContactPrice) {
          return {
            whatsapp_notifications: !!parseInt(plan?.whatsapp_notification),
            dedicated_support: !!parseInt(plan?.dedicated_support),
            get_phone_quota: plan?.get_phone_quota,
          };
        }
        return {
          period: plan?.duration,
          response_rate: plan?.response_rate,
          no_of_listings: plan?.no_of_listings,
          whatsapp_notifications: !!parseInt(plan?.whatsapp_notification),
          featured_listing: !!parseInt(plan?.featured_listing),
          urgent_sale_tag: !!parseInt(plan?.urgent_sale),
          certified_agent_tag: !!parseInt(plan?.certified_agent),
          relationship_manager: !!parseInt(plan?.relationship_manager),
          dedicated_support: !!parseInt(plan?.dedicated_support),
        };
      default:
        break;
    }
  }

  async function callPayApi(value = "") {
    if (!(value || selectedPlan).includes("free")) {
      setGettingPayload((prevState) => true);
      const response = await axios.post(`${APP_BASE_URL}/payments/pay`, {
        plan_id: paymentPlans.filter((plan) => plan?.label?.toLowerCase() === (value || selectedPlan))[0]?.plan_id,
        user_id: getUserId(),
      });
      if (response.status === 200) {
        handlePayment(
          response.data,
          paymentPlans.filter((plan) => plan?.label?.toLowerCase() === (value || selectedPlan))[0]?.plan_id
        );
      }
      setGettingPayload((prevState) => false);
    }
  }

  async function handlePayment(payload, planId) {
    let planAmount = "";
    let signature = "";
    payload["handler"] = async function (response) {
      signature = response.razorpay_signature;
      const data = {
        orderCreationId: payload?.order_id,
        razorpayPaymentId: response.razorpay_payment_id,
        razorpayOrderId: response.razorpay_order_id,
        razorpaySignature: response.razorpay_signature,
        plan_id: planId,
        user_id: getUserId(),
        plan_group: location?.state?.plan_group ?? "2",
        pan: PAN,
        gstin: GSTIN,
        supplier_type: "B2B",
        place_of_supply: "Tamil Nadu",
        billing_address: billingAddress,
      };

      const result = await axios.post(`${APP_BASE_URL}/payments/verify_payment`, data);
      if (result.status == 200) {
        const {
          invoice_no,
          invoice_date,
          invoice_time,
          order_date,
          supplier_type,
          place_of_supply,
          billing_address,
          payment_id
        } = result.data.data;
        setDownloadInvoice((prevState) => true);
        const invoiceFile = await generatePDFAndDownload(
          PAN,
          GSTIN,
          planPrice,
          invoice_no,
          invoice_date,
          invoice_time,
          order_date,
          supplier_type,
          place_of_supply,
          selectedPlan,
          billing_address,
          showContactPrice
        );
        const invoiceFormData = new FormData();
        invoiceFormData.append("payment_id", payment_id);
        invoiceFormData.append("invoice", invoiceFile);
        const response = await axios.post(
          `${APP_BASE_URL}/Payments/upload_invoice`,
          invoiceFormData
        );
        notification.success({
          message: "Payment Successful",
          description: "Welcome To Albion Property Hub Membership",
        });
        router.push("/");
      }
    };
    const rzp1 = new Razorpay(payload);
    rzp1.on("payment.failed", function (response) {
      notification.error({
        message: "Payment Failed",
        description: "Please Check After Sometime",
      });
    });

    rzp1.open();
  }

  const paymentModel = (value) => {
    if (!value) {
      notification.error({
        message: "Please Select A Plan",
      });
    } else {
      setShowCostBreakupModal((prevState) => true);
    }
  };

  function getPaymentCards(userPlanId) {
    switch (userPlanId) {
      case "1":
        if (location?.state?.plan == "contact") {
          return;
        } else {
          const columns = [
            {
              title: "",
              dataIndex: "benefit",
              key: "benefit",
            },
            ...paymentPlans?.map((plan) => ({
              title: (
                <Tag
                  style={{
                    background: `${paymentCard[plan.label.toLowerCase()]}70`,
                    border: `1px solid ${paymentCard[plan.label.toLowerCase()]}`,
                    color: "#fff",
                  }}
                >
                  {capitalizeWords(formatText(plan.label))}
                </Tag>
              ),
              dataIndex: plan.key,
              key: plan.key,
            })),
          ];

          const data = Object.keys(paymentPlans[0]?.benefits ?? []).map((benefitKey) => ({
            key: benefitKey,
            benefit: capitalizeWords(formatText(benefitKey == "period" ? "Period (Days)" : benefitKey)),
            ...paymentPlans.reduce((acc, plan) => {
              acc[plan.key] =
                typeof plan.benefits[benefitKey] == "boolean" ? (
                  plan.benefits[benefitKey] ? (
                    <Correct/>
                  ) : (
                    <Wrong/>
                  )
                ) : (
                  plan.benefits[benefitKey]
                );
              return acc;
            }, {}),
          }));

          data.push({
            key: "price",
            benefit: "Price Details",
            ...paymentPlans.reduce((acc, plan) => {
              acc[plan.key] = (
                <div
                  className={
                    plan.label.toLowerCase() == selectedPlan ? "final-paymen-card-active" : "final-paymen-card"
                  }
                  onClick={() => {
                    setPlanPrice(() => plan.price);
                    setSelectedPlan((prevState) => plan.label);
                  }}
                >
                  <span style={{ textDecoration: "line-through" }}>₹{plan.org_price}</span>
                  <span style={{ fontSize: 20, fontWeight: 600 }} className="plan-price-with-tax">
                    ₹{parseInt(plan.price).toLocaleString("en-IN")}
                  </span>
                </div>
              );
              return acc;
            }, {}),
          });

          return (
            <div className="payment-card-table">
              <Table columns={columns} dataSource={data} pagination={false} />
              <Button
                className="continueToPay"
                onClick={() => {
                  if (!selectedPlan) {
                    notification.error({
                      message: "Please Select A Plan",
                    });
                  } else {
                    if (selectedPlan != "free") {
                      setShowCostBreakupModal((prevState) => true);
                    }
                  }
                }}
                disabled={selectedPlan == "free"}
                title={selectedPlan == "free" ? "Please Choose A Plan" : ""}
                loading={gettingPayload}
              >
                {!selectedPlan
                  ? "Select To Pay"
                  : selectedPlan == "free"
                  ? "Already a Free Member"
                  : `Become a ${capitalizeWords(formatText(selectedPlan))} member`}
              </Button>
            </div>
          );
        }
      case "2":
        if (location?.state?.plan == "contact") {
          return;
        } else {
          const columns = [
            {
              title: "",
              dataIndex: "benefit",
              key: "benefit",
            },
            ...paymentPlans?.map((plan) => ({
              title: (
                <Tag
                  style={{
                    background: `${paymentCard[plan.label.toLowerCase()]}70`,
                    border: `1px solid ${paymentCard[plan.label.toLowerCase()]}`,
                    color: "#fff",
                  }}
                >
                  {capitalizeWords(formatText(plan.label))}
                </Tag>
              ),
              dataIndex: plan.key,
              key: plan.key,
            })),
          ];
          const data = Object.keys(paymentPlans[0]?.benefits ?? []).map((benefitKey) => ({
            key: benefitKey,
            benefit: capitalizeWords(formatText(benefitKey == "period" ? "Period (Days)" : benefitKey)),
            ...paymentPlans.reduce((acc, plan) => {
              acc[plan.key] =
                typeof plan.benefits[benefitKey] == "boolean" ? (
                  plan.benefits[benefitKey] ? (
                    <Correct/>
                  ) : (
                    <Wrong/>
                  )
                ) : (
                  plan.benefits[benefitKey]
                );
              return acc;
            }, {}),
          }));
          data.push({
            key: "price",
            benefit: "Price Details",
            ...paymentPlans.reduce((acc, plan) => {
              acc[plan.key] = (
                <div
                  className={
                    plan.label.toLowerCase() == selectedPlan ? "final-paymen-card-active" : "final-paymen-card"
                  }
                  onClick={() => {
                    setPlanPrice(() => plan.price);
                    setSelectedPlan((prevState) => plan.label);
                  }}
                >
                  <span style={{ textDecoration: "line-through" }}>₹{plan.org_price}</span>
                  <span style={{ fontSize: 20, fontWeight: 600 }} className="plan-price-with-tax">
                    ₹{parseInt(plan.price).toLocaleString("en-IN")}
                  </span>
                </div>
              );
              return acc;
            }, {}),
          });

          return (
            <div className="payment-card-table">
              <Table columns={columns} dataSource={data} pagination={false} />
              <div className="coupon-and-apply-section">
                <Button
                  className="continueToPay"
                  onClick={() => {
                    if (!selectedPlan) {
                      notification.error({
                        message: "Please Select A Plan",
                      });
                    } else {
                      if (selectedPlan != "free") {
                        setShowCostBreakupModal((prevState) => true);
                      }
                    }
                  }}
                  loading={gettingPayload}
                >
                  {!selectedPlan
                    ? "Select To Pay"
                    : selectedPlan == "free"
                    ? `Already a Free Member`
                    : `Become A ${capitalizeWords(formatText(selectedPlan))} Member`}
                </Button>
              </div>
            </div>
          );
        }
      default:
        break;
    }
  }

  function getPriceBreakUp() {
    let dataSource = [
      {
        key: "row",
        price: parseInt(planPrice).toLocaleString("en-IN"),
        gst: "18%",
        total_price: parseInt(planPrice + (planPrice * 18) / 100).toLocaleString("en-IN"),
      },
    ];

    let columns = [
      {
        title: "Plan Price",
        dataIndex: "price",
        key: "price",
        render: (price) => <span>&#x20B9; {price}</span>,
      },
      {
        title: "GST",
        dataIndex: "gst",
        key: "gst",
        render: (gst) => <span>&#x20B9; {gst}</span>,
      },
      {
        title: "Total Price",
        dataIndex: "total_price",
        key: "total_price",
        render: (total_price) => <span>&#x20B9; {total_price}</span>,
      },
    ];

    return <Table dataSource={dataSource} columns={columns} pagination={false} />;
  }

  return (
    !!paymentPlans && (
      <>
        <SEO titleTemplate={"Payment Plan"} />
        {loader ? (
          <>
            <Loader />
          </>
        ) : (
          <>
            {showCostBreakupModal && (
              <Modal
                open={showCostBreakupModal}
                onCancel={() => setShowCostBreakupModal(false)}
                footer={null}
                width={"100%"}
              >
                <div className="breakup-modal">
                  {getPriceBreakUp()}
                  <Input
                    placeholder="Enter GSTIN (Optional)"
                    onChange={(e) =>
                      setGSTIN(() => e.target.value.toUpperCase())
                    }
                    value={GSTIN}
                    maxLength={15}
                  />
                  <Input
                    placeholder="Enter PAN (Optional)"
                    onChange={(e) => setPAN(() => e.target.value.toUpperCase())}
                    value={PAN}
                    maxLength={10}
                  />
                  <Input.TextArea
                    placeholder="Billing Address"
                    onChange={(e) =>
                      setBillingAddress(() => e.target.value.trim())
                    }
                    required={true}
                    maxLength={255}
                    showCount={true}
                    autoSize
                  />
                  <Button
                    className="proceedToPayment"
                    onClick={() => callPayApi()}
                    disabled={!billingAddress}
                  >
                    Proceed To Payment
                  </Button>
                </div>
              </Modal>
            )}
            <div
              className="plan-page"
              style={{
                backgroundSize: "cover",
                minHeight: "90vh",
              }}
            >
              <div className="plan-grid">
                {showModal && (
                  <ApplyCouponModal
                    showModal={showModal}
                    setShowModal={setShowModal}
                  />
                )}
                <div className="payment-main-card">
                  <span className="chooseplantitle">Choose your plan</span>
                  <div className="payment-pricing-cards">
                    {getPaymentCards(getUserType())}
                  </div>
                </div>
              </div>
            </div>
            <ResponsivePlan
              setPlanPrice={setPlanPrice}
              plans={[...paymentPlans].reverse()}
              selectedPlan={paymentModel}
              setSelectedPlan={setSelectedPlan}
              setShowCostBreakupModal={setShowCostBreakupModal}
            />
          </>
        )}
      </>
    )
  );
};

export default Plan;
