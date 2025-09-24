import React, { useState, useEffect } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Button,
  Layout,
  Menu,
  theme,
  Divider,
  Modal,
  DatePicker,
  Progress,
  Input,
  Form,
} from "antd";
import { HiArrowLongRight } from "react-icons/hi2";
import { useNavigate } from "react-router";

import logo from "../../../assets/new_logo.png";
import user from "../../../assets/User.png";
import wallet from "../../../assets/wallet.png";
import listing from "../../../assets/listing.png";
import goals from "../../../assets/goals.png";
import credit from "../../../assets/credit.png";
import dark1 from "../../../assets/dark1.png";
import dark2 from "../../../assets/dark2.png";
import dark3 from "../../../assets/dark3.png";
import notifications from "../../../assets/notifications.png";
import arrow_long from "../../../assets/arrow_long.png";
import bars from "../../../assets/bars.png";
import plus from "../../../assets/plus.png";
import home from "../../../assets/home.png";
import success from "../../../assets/success.png";

import {} from "antd";

const { Header, Sider, Content } = Layout;
const Congrats = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;

  const navigate = useNavigate();

  const onFinish = () => {
    navigate("/card-details");
  };

  // Store form values
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: null,
    occupation: "",
    street: "",
    apt: "",
    city: "",
    state: "",
    zip: "",
  });

  const [form] = Form.useForm();
  const percent = (currentStep / totalSteps) * 100;

  const editStep = (step) => {
    setCurrentStep(step);
    setIsModalOpen(true);
  };

  const onChange = (text) => {
    console.log("onChange:", text);
  };

  const onInput = (value) => {
    console.log("onInput:", value);
  };

  const sharedProps = {
    onChange,
    onInput,
    formatter: (str) => str.replace(/\D/g, ""), // numbers only
    inputMode: "numeric", // mobile numeric keypad
    pattern: "[0-9]*", // enforce digits
  };

  const nextStep = async () => {
    try {
      const values = await form.validateFields();

      if (values.fullName) {
        const [firstName, ...lastParts] = values.fullName.trim().split(" ");
        values.firstName = firstName;
        values.lastName = lastParts.join(" ");
      }

      setFormData({ ...formData, ...values });

      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);

        if (currentStep < 3) {
          form.resetFields();
        }
      } else {
        // ✅ Final step reached -> redirect
        console.log("Form submitted:", { ...formData, ...values });
        navigate("/registration-success"); // change to your target route
      }
    } catch (error) {
      console.log("Validation failed:", error);
    }
  };

  useEffect(() => {
    if (currentStep === 3) {
      const first = form.getFieldValue("firstName") || formData.firstName || "";
      const last = form.getFieldValue("lastName") || formData.lastName || "";
      form.setFieldsValue({
        fullName: `${first} ${last}`.trim(),
        ...formData,
      });
      console.log(fullName.value);
    }
  }, [currentStep, formData, form]);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  // const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <Layout>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        className="h-screen !bg-[#EAEAEA]"
      >
        <div className="flex items-center justify-center">
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
            className="mt-3"
          />
          <img
            src={logo}
            alt=""
            className={`${collapsed ? "hidden" : "w-30"}`}
          />
        </div>
        <div className="demo-logo-vertical" />
        <Divider />
        <Menu
          //   theme="dark"
          className="!bg-[#EAEAEA]"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <UserOutlined />,
              label: "Home",
            },
            {
              key: "2",
              icon: <img src={credit} alt="" className="w-7" />,
              label: "Invest",
            },
            {
              key: "3",
              icon: <img src={wallet} alt="" className="w-7" />,
              label: "Wallet",
            },
            {
              key: "4",
              icon: <img src={listing} alt="" className="w-7" />,
              label: "Listing",
            },
            {
              key: "5",
              icon: <img src={goals} alt="" className="w-7" />,
              label: "Goals",
            },
            {
              key: "6",
              icon: <img src={user} alt="" className="w-7" />,
              label: "Profile",
            },
          ]}
        />
        <Divider />
      </Sider>
      <Layout>
        <Header className="!bg-white flex justify-between items-center ">
          <div className="">
            <h1 className="font-bold text-2xl/7">Welcome</h1>
          </div>
          <div className=" flex items-center gap-3">
            <div className="relative">
              <div className="absolute bg-[#FF5050] text-white rounded-full w-5 h-5 flex justify-center items-center -top-1 right-0">
                0
              </div>
              <img src={notifications} alt="" className="w-7" />
            </div>
            {/* <div className="h-12 w-12 rounded-full">
              <img src={user_img} alt="" className="rounded-full object-cover h-12 w-12" />
            </div> */}
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            // padding: 24,
            minHeight: 280,
            background: "white",
            borderRadius: borderRadiusLG,
          }}
        >
          {currentStep > totalSteps && (
            <div className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3 border rounded-lg">
                  <p className="text-gray-500 text-sm">Full name</p>
                  <p className="font-bold">
                    {formData.firstName} {formData.lastName}
                  </p>
                  <Button type="link" onClick={() => editStep(1)}>
                    Edit
                  </Button>
                </div>
                <div className="p-3 border rounded-lg">
                  <p className="text-gray-500 text-sm">Date of birth</p>
                  <p className="font-bold">
                    {formData.dob ? formData.dob.format("MM/DD/YYYY") : ""}
                  </p>
                  <Button type="link" onClick={() => editStep(1)}>
                    Edit
                  </Button>
                </div>
                <div className="p-3 border rounded-lg col-span-2">
                  <p className="text-gray-500 text-sm">Residential address</p>
                  <p className="font-bold">
                    {formData.street}, {formData.apt && formData.apt + ", "}{" "}
                    {formData.city}, {formData.state} {formData.zip}
                  </p>
                  <Button type="link" onClick={() => editStep(2)}>
                    Edit
                  </Button>
                </div>
              </div>
            </div>
          )}

          <Modal open={isModalOpen} footer={null} closable={false}>
            <div className="flex justify-center items-center">
              <div className="w-full max-w-lg">
                <div className="flex justify-center items-center flex-col mt-10">
                  <img src={success} alt="" className="w-30" />

                  <h1 className="font-bold text-3xl text-center">Congrats!</h1>
                  <p className="text-center mt-2 text-[#12033A]">
                    Your account will be activated in three
                    <br />
                    business days.
                  </p>

                  <Button
                    onClick={onFinish}
                    className="!bg-[#12033A] !text-white !border-none !px-10 my-8 !rounded-lg"
                  >
                    Got it
                  </Button>
                </div>
              </div>
            </div>
          </Modal>

          <div className="flex flex-col md:flex-row gap-5 p-2">
            {/* Left side - bigger */}
            <div className="w-full md:w-[650px]">
              <div className="flex justify-between items-center text-lg px-2">
                <h1 className="text-[#B0B2C3] font-bold">Wallets</h1>
                <div className="flex items-center gap-3">
                  <h1 className="font-bold">Fund Wallets</h1>
                  <img src={arrow_long} alt="" className="w-8" />
                </div>
              </div>
              <div className="w-full lg:overflow-x-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:min-w-[900px] pb-4">
                  {/* Item 1 */}
                  <div className="bg-[url(/src/assets/bg.png)] h-30 bg-center bg-cover gap-2 flex justify-center items-center">
                    <div>
                      <img src={dark1} alt="" className="w-11" />
                    </div>
                    <div>
                      <h1 className="font-semibold text-lg">Home Fund</h1>
                      <h1 className="font-bold text-2xl">₦0.00</h1>
                    </div>
                  </div>
                  <div className="bg-[url(/src/assets/bg.png)] h-30 bg-center bg-cover gap-2 flex justify-center items-center">
                    <div>
                      <img src={dark2} alt="" className="w-11" />
                    </div>
                    <div>
                      <h1 className="font-semibold text-lg">Balling</h1>
                      <h1 className="font-bold text-2xl">₦0.00</h1>
                    </div>
                  </div>
                  <div className="bg-[url(/src/assets/bg.png)] h-30 bg-center bg-cover gap-2 flex justify-center items-center">
                    <div>
                      <img src={dark3} alt="" className="w-11" />
                    </div>
                    <div>
                      <h1 className="font-semibold text-lg">Ra</h1>
                      <h1 className="font-bold text-2xl">₦0.00</h1>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 p-3">
                {/* <!-- Left Column --> */}
                <div className="">
                  <h1 className="font-bold text-[#B0B2C3] text-lg mb-3">
                    Recent Transactions
                  </h1>

                  <div className="rounded-md border-1 border-gray-300 flex-col gap-2 flex justify-center items-center h-96">
                    <img src={bars} alt="" />
                    <p>No Recent Transaction</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - smaller */}
            <div className="w-full md:w-[430px]">
              <div className="flex justify-between items-center text-lg px-2 mb-3">
                <h1 className="text-[#B0B2C3] font-bold">Active Goals</h1>
              </div>

              <div class=" ">
                <div className="flex flex-col gap-3">
                  <div className="border rounded-2xl border-gray-300 overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-3 p-2">
                      <div className="col-span-1 h-30 w-full border rounded-2xl border-gray-300 flex justify-center items-center">
                        <img src={plus} alt="" className="w-10" />
                      </div>

                      <div className="p-3 col-span-2">
                        <p className="text-[#B0B2C3] text-lg">
                          Verify Account to <br />
                          view your Active
                          <br /> Goals
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border rounded-2xl px-5 border-gray-300 mt-10 py-4 flex justify-center items-center gap-4 flex-col">
                <div className="border rounded-2xl border-gray-300 w-full flex justify-center items-center py-10">
                  <img src={home} alt="" className="w-20" />
                </div>
                <img src={bars} alt="" />
                <p className="text-[#B0B2C3] text-lg text-center">
                  Verify Account to <br /> enjoy listed properties
                  <br /> on ILEFUND
                </p>
              </div>
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Congrats;
