'use client';
import { useEffect } from "react";
import "./loan-calculator.css";
import { Button, Input, Slider } from "@/utils/antd-component";
import customerService from "@/assets/customer-service.webp";
import { useState } from "react";
import Image from "next/image";

const LoanCalculator = () => {
  const [principal, setPrincipal] = useState(0);
  const [interestRate, setInterestRate] = useState(0.1);
  const [loanTenure, setLoanTenure] = useState(1);
  const [emi, setEMI] = useState();
  const [totalPayable, setTotalPayable] = useState();
  const [totalInterest, setTotalInterest] = useState();
  const [principalAmount, setPrincipalAmount] = useState();

  useEffect(() => {
    function calculateEMI() {
      const p = parseFloat(principal);
      const r = parseFloat(interestRate) / (12 * 100);
      const n = parseFloat(loanTenure * 12);
  
      const emiValue = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      const totalPayableValue = emiValue * n;
      const totalInterestValue = totalPayableValue - p;
      const totalPayment = totalInterestValue + p
  
      setEMI(Math.ceil(emiValue));
      setTotalPayable(Math.ceil(totalPayment));
      setTotalInterest(Math.ceil(totalInterestValue));
      setPrincipalAmount(p);
    }
    calculateEMI();
  }, [principal, interestRate, loanTenure]);

  return (
    <div className="loan-calculator-section">
      <div className="calculator-card">
        <div className="emi-range-select">
          <div className="emi-input-col">
            <div className="input__head">
              <span className="input__label">Loan Amount</span>
              <Input
                className="principal-input"
                prefix={<span>&#x20B9;</span>}
                value={principal?.toLocaleString("en-IN")}
                onChange={(e) =>
                  setPrincipal(e.target.value?.toLocaleString("en-IN"))
                }
              />
            </div>
            <Slider
              min={1}
              max={10000000}
              value={principal}
              onChange={(value) => setPrincipal(value)}
            />
          </div>
          <div className="emi-input-col">
            <div className="input__head">
              <span className="input__label">Tenure (Years)</span>
              <Input
                className="section__input"
                value={loanTenure}
                onChange={(e) => setLoanTenure(e.target.value)}
              />
            </div>
            <Slider
              min={1}
              max={30}
              value={loanTenure}
              onChange={(value) => setLoanTenure(value)}
            />
          </div>
          <div className="emi-input-col">
            <div className="input__head">
              <span className="input__label">Interest Rate (% P.A.)</span>
              <Input
                className="section__input"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
              />
            </div>
            <Slider
              min={0.1}
              max={15}
              step={0.01}
              value={interestRate}
              onChange={(value) => setInterestRate(value)}
            />
          </div>
        </div>
        <div className="center-content">
          <div className="calculation-sec">
            <span className="breakup_label">Monthly Home Loan EMI</span>
            <span className="amount_details monthly__amount">
              ₹ {isNaN(emi) ? 0 : parseInt(emi).toLocaleString("en-IN")}
            </span>
          </div>
          <div className="calculation-sec">
            <span className="breakup_label">Principal Amount</span>
            <span className="amount_details">
              ₹{" "}
              {isNaN(principalAmount)
                ? 0
                : parseInt(principalAmount).toLocaleString("en-IN")}
            </span>
          </div>
          <div className="calculation-sec">
            <span className="breakup_label">Interest Amount</span>
            <span className="amount_details">
              ₹{" "}
              {isNaN(totalInterest)
                ? 0
                : parseInt(totalInterest).toLocaleString("en-IN")}
            </span>
          </div>
          <div className="calculation-sec">
            <span className="breakup_label">Total Amount Payable</span>
            <span className="amount_details">
              ₹{" "}
              {isNaN(totalPayable)
                ? 0
                : parseInt(totalPayable).toLocaleString("en-IN")}
            </span>
          </div>
        </div>
        <div className="right-content">
          <div className="need-more-info">
            <span className="info-text">Need more information?</span>
            <Button
              className="reqBtn"
              href="mailto:support@albionpropertyhub.com"
            >
              <Image
                placeholder="blur"
                src={customerService}
                className="customer-service"
                loading="lazy"
                alt="Customer Service"
                height={30}
                width={30}
              />
              Talk To Our Expert
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanCalculator;


