// src/pages/CardDetails.jsx
import React, { useEffect, useState } from "react";
import { Form, Input, Progress, Modal, Button, Select } from "antd";
import { useNavigate } from "react-router";
import { MdArrowRightAlt } from "react-icons/md";
import { CheckCircleFilled } from "@ant-design/icons";
import CustomButton from "../../components/button/CustomButton";
import logo from "../../assets/ilefund-Logo-long.png";
import Deposit from "../../assets/Deposit.png";
import lightIcon from "../../assets/light_icon_1.png";
import "./style.css";

const { Option } = Select;

const CardDetails = () => {
  const navigate = useNavigate();
  const totalSteps = 4;
  const [currentStep, setCurrentStep] = useState(1);
  const [form] = Form.useForm();
  const [showStep2Modal, setShowStep2Modal] = useState(false);
  const [showStep4Modal, setShowStep4Modal] = useState(false);

  const percent = Math.round((currentStep / totalSteps) * 100);

  // Watch bankName to show account fields only after bank is selected
  const bankSelected = Form.useWatch("bankName", form);

  // Auto-open/close modals when reaching step 2 or step 4
  useEffect(() => {
    setShowStep2Modal(currentStep === 2);
    setShowStep4Modal(currentStep === 4);
  }, [currentStep]);

  // Format expiry as MM/YY while typing
  const handleExpiryChange = (e) => {
    let v = e.target.value.replace(/\D/g, "");
    if (v.length > 4) v = v.slice(0, 4);
    if (v.length >= 3) v = v.slice(0, 2) + "/" + v.slice(2);
    e.target.value = v;
  };

  // Validate only fields relevant to the current step before moving next
  const next = async () => {
    try {
      if (currentStep === 1) {
        // validate card inputs
        await form.validateFields([
          "cardNumber",
          "expiryDate",
          "cvv",
          "cardPin",
        ]);
        setCurrentStep(2); // show step 2 modal
      } else if (currentStep === 3) {
        // validate bank inputs (only when bank selected)
        const fieldsToValidate = ["bankName", "accountNumber", "accountName"];
        await form.validateFields(fieldsToValidate);
        setCurrentStep(4); // show step 4 modal
      } else {
        // Fallback (shouldn't happen in this 4-step flow)
        if (currentStep < totalSteps) setCurrentStep((s) => s + 1);
        else navigate("/choose-plan");
      }
    } catch (err) {
      // validation failed — AntD will show messages
      // console.log("Validation error", err);
    }
  };

  // Helper to check if step 1 fields are filled (used to change heading + button label)
  const isStepOneComplete = () => {
    const vals = form.getFieldsValue([
      "cardNumber",
      "expiryDate",
      "cvv",
      "cardPin",
    ]);
    return !!(vals.cardNumber && vals.expiryDate && vals.cvv && vals.cardPin);
  };

  // Bank list
  const nigeriaBanks = [
    { name: "Access Bank", code: "044" },
    { name: "Citibank Nigeria", code: "023" },
    { name: "Ecobank Nigeria", code: "050" },
    { name: "Fidelity Bank", code: "070" },
    { name: "First Bank of Nigeria", code: "011" },
    { name: "First City Monument Bank (FCMB)", code: "214" },
    { name: "Globus Bank", code: "00103" },
    { name: "Guaranty Trust Bank (GTBank)", code: "058" },
    { name: "Heritage Bank", code: "030" },
    { name: "Keystone Bank", code: "082" },
    { name: "OptimBank (formerly Union Bank)", code: "032" },
    { name: "Polaris Bank", code: "076" },
    { name: "Providus Bank", code: "101" },
    { name: "Stanbic IBTC Bank", code: "221" },
    { name: "Standard Chartered Bank", code: "068" },
    { name: "Sterling Bank", code: "232" },
    { name: "SunTrust Bank", code: "100" },
    { name: "Titan Trust Bank", code: "102" },
    { name: "Union Bank of Nigeria", code: "032" },
    { name: "United Bank for Africa (UBA)", code: "033" },
    { name: "Unity Bank", code: "215" },
    { name: "Wema Bank", code: "035" },
    { name: "Zenith Bank", code: "057" },
    { name: "Kuda Microfinance Bank", code: "50211" },
    { name: "Opay Digital Services (Opay)", code: "999991" },
    { name: "PalmPay", code: "999992" },
    { name: "Moniepoint Microfinance Bank", code: "50515" },
    { name: "Rubies Bank", code: "125" },
    { name: "VFD Microfinance Bank", code: "566" },
  ];

  // Render current step content
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Form.Item
              label="Enter Card Number"
              name="cardNumber"
              rules={[
                { required: true, message: "Please enter your card number!" },
                { pattern: /^[0-9]{16}$/, message: "Must be 16 digits" },
              ]}
            >
              <Input
                placeholder="e.g 1236872290248242"
                maxLength={16}
                inputMode="numeric"
                onInput={(e) => (e.target.value = e.target.value.replace(/\D/g, ""))}
                className="!bg-gray-100 !rounded-lg !border-none focus:!ring-2 focus:!ring-blue-500"
              />
            </Form.Item>

            <Form.Item
              label="Expiry Date"
              name="expiryDate"
              rules={[
                { required: true, message: "Please enter expiry date!" },
                { pattern: /^(0[1-9]|1[0-2])\/\d{2}$/, message: "Format MM/YY" },
              ]}
            >
              <Input
                placeholder="e.g 09/23"
                maxLength={5}
                inputMode="numeric"
                onInput={handleExpiryChange}
                className="!bg-gray-100 !rounded-lg !border-none focus:!ring-2 focus:!ring-blue-500"
              />
            </Form.Item>

            <Form.Item
              label="CVV Number (3 Digits)"
              name="cvv"
              rules={[
                { required: true, message: "Please enter CVV!" },
                { pattern: /^[0-9]{3}$/, message: "Must be 3 digits" },
              ]}
            >
              <Input
                placeholder="e.g 145"
                maxLength={3}
                inputMode="numeric"
                onInput={(e) => (e.target.value = e.target.value.replace(/\D/g, ""))}
                className="!bg-gray-100 !rounded-lg !border-none focus:!ring-2 focus:!ring-blue-500"
              />
            </Form.Item>

            <Form.Item
              label="Enter Card Pin"
              name="cardPin"
              rules={[
                { required: true, message: "Please enter card PIN!" },
                { pattern: /^[0-9]{4}$/, message: "Must be 4 digits" },
              ]}
            >
              <Input.Password
                placeholder="e.g 1456"
                maxLength={4}
                inputMode="numeric"
                onInput={(e) => (e.target.value = e.target.value.replace(/\D/g, ""))}
                className="!bg-gray-100 !rounded-lg !border-none focus:!ring-2 focus:!ring-blue-500"
              />
            </Form.Item>
          </div>
        );

      case 2:
        // Step 2 content is essentially the modal — keep a light placeholder
        return (
          <div className="text-center py-12">
            {/* <h2 className="text-lg font-semibold">Card successfully added</h2>
            <p className="text-sm text-gray-500 mt-2">Please click "Got it" to continue</p> */}
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <Form.Item
              label="Select Bank Name"
              name="bankName"
              rules={[{ required: true, message: "Please select your bank!" }]}
            >
              <Select
                showSearch
                placeholder="Select Bank Name"
                optionFilterProp="children"
                className="w-full"
                filterOption={(input, option) =>
                  (option?.children ?? "").toLowerCase().includes(input.toLowerCase())
                }
              >
                {nigeriaBanks.map((bank) => (
                  <Option key={bank.code} value={bank.code}>
                    {bank.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            {/* account fields only show after bank is selected */}
            {bankSelected && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Form.Item
                  label="Account Name"
                  name="accountName"
                  rules={[{ required: true, message: "Please enter account name!" }]}
                >
                  <Input placeholder="e.g John Doe" className="w-full" />
                </Form.Item>

                <Form.Item
                  label="Account Number"
                  name="accountNumber"
                  rules={[
                    { required: true, message: "Please enter account number!" },
                    { pattern: /^[0-9]{10}$/, message: "Must be 10 digits" },
                  ]}
                >
                  <Input
                    placeholder="e.g 0734562387"
                    maxLength={10}
                    inputMode="numeric"
                    onInput={(e) => (e.target.value = e.target.value.replace(/\D/g, ""))}
                    className="w-full"
                  />
                </Form.Item>
              </div>
            )}
          </div>
        );

      case 4:
        // Step 4 content is the success modal — show a small placeholder here as well.
        return (
          <div className="text-center py-12">
            {/* <h2 className="text-lg font-semibold">Bank successfully added</h2>
            <p className="text-sm text-gray-500 mt-2">Please click "Got it" to finish</p> */}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen p-8">
      {/* Left Side */}
      <div className="flex flex-col px-8 md:px-16">
        {/* Logo */}
        <div className="mb-6">
          <img src={logo} alt="Logo" className="w-32 md:w-40" />
        </div>

        {/* Progress */}
        <div className="flex">
          <div>
            <Progress percent={percent} showInfo={false} strokeColor="#0047FF" trailColor="#E5E7EB" />
            <p className="text-gray-600 text-sm mt-2 text-center">Step {currentStep} of {totalSteps}</p>
          </div>
        </div>

        {/* Form */}
        <Form layout="vertical" form={form} className="max-w-lg w-full mt-4">
          {/* Header area */}
          <div>
            {currentStep === 1 && (
              <>
                <h1 className="mt-2 pb-3 text-3xl md:text-4xl font-bold text-gray-900">
                  {isStepOneComplete() ? "Verify Card details" : "Securely Link A Card"}
                </h1>
                <p className="text-gray-500 font-medium text-base mb-6">
                  {isStepOneComplete() ? "Verify the details below" : "Fill in your card details below"}
                </p>
              </>
            )}

            {currentStep === 3 && (
              <>
                <h1 className="mt-2 pb-3 text-3xl md:text-4xl font-bold text-gray-900">Securely Add Your Bank</h1>
                <p className="text-gray-500 font-medium text-base mb-6">Fill in your bank details below</p>
              </>
            )}
          </div>

          {/* Step content */}
          {renderStepContent()}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-6">
            {/* hide Next on Step 2 and Step 4 */}
            {currentStep !== 2 && currentStep !== 4 && (
              <CustomButton
                label={currentStep === 1 && isStepOneComplete() ? "Submit" : currentStep === totalSteps ? "Submit" : "Next"}
                icon={<MdArrowRightAlt />}
                className="!bg-blue-600 !text-white"
                onClick={next}
              />
            )}
          </div>
        </Form>

        {/* Informational card */}
        <div className="bg-[#F2F3FA] rounded-md p-3 mt-5">
          <h1 className="font-bold text-2xl">How safe is this?</h1>
          <p className="font-semibold mt-2">
            Your card details (Number, Pin, Date, CVV) are not stored on our servers.
          </p>
          <p className="text-xs my-3">
            They are <b>securely passed</b> to your bank for verification and processing.
          </p>
        </div>
      </div>

      {/* Right Side (unchanged) */}
      <div className="hidden md:flex items-center justify-center bg-[#0047FF]">
        <div className="text-white p-8 md:p-12 max-w-md">
          <h1 className="text-2xl md:text-3xl font-bold leading-snug">
            <i>Ile’ means home —</i> 
          </h1>
          <p> ileFund helps you save toward owning one.</p>
          <br />

          <div className="space-y-6">
            <div>
              <p className="flex items-center gap-2 font-bold text-lg">
                <CheckCircleFilled className="text-white" />
                Build your savings
              </p>
              <p className="text-sm text-gray-100">
                Consistently automate your savings while setting realistic goals
              </p>
            </div>

            <div>
              <p className="flex items-center gap-2 font-bold text-lg">
                <CheckCircleFilled className="text-white" />
                Set a target.
              </p>
              <p className="text-sm text-gray-100">
               Explore our wide range of properties and choose a savings plan that works for you. 
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Step 2 Modal (Card Added Successfully) */}
      <Modal open={showStep2Modal} footer={null} closable={false} centered>
        <div className="flex flex-col items-center p-6">
          <img src={Deposit} alt="Deposit" className="w-36 mb-4" />
          <h2 className="text-2xl font-bold text-[#12033A]">Card Added Successfully</h2>
          <p className="text-center mt-3">
            Congratulations — we have successfully verified and added your card.
          </p>

          <Button
            type="primary"
            className="!bg-[#12033A] !rounded-full !px-10 !py-2 mt-6"
            onClick={() => {
              setShowStep2Modal(false);
              setCurrentStep(3); // go to step 3
            }}
          >
            Got it
          </Button>
        </div>
      </Modal>

      {/* Step 4 Modal (Bank Added Successfully) */}
      <Modal open={showStep4Modal} footer={null} closable={false} centered>
        <div className="flex flex-col items-center p-6">
          <img src={lightIcon} alt="Success" className="w-36 mb-4" />
          <h2 className="text-2xl font-bold text-[#12033A]">Bank Added Successfully</h2>
          <p className="text-center mt-3">
            Congratulations — we have successfully verified and added your withdrawal bank.
          </p>

          <Button
            type="primary"
            className="!bg-[#12033A] !rounded-full !px-10 !py-2 mt-6"
            onClick={() => {
              setShowStep4Modal(false);
              navigate("/choose-plan");
            }}
          >
            Got it
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default CardDetails;
