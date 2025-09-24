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

import logo from "../../assets/logo.png";
import user from "../../assets/User.png";
import wallet from "../../assets/wallet.png";
import listing from "../../assets/listing.png";
import goals from "../../assets/goals.png";
import credit from "../../assets/credit.png";
import dark1 from "../../assets/dark1.png";
import dark2 from "../../assets/dark2.png";
import dark3 from "../../assets/dark3.png";
import notifications from "../../assets/notifications.png";
import arrow_long from "../../assets/arrow_long.png";
import bars from "../../assets/bars.png";
import plus from "../../assets/plus.png";
import home from "../../assets/home.png";
import check from "../../assets/check-circle.png";

import {} from "antd";

const { Header, Sider, Content } = Layout;
const InactiveDashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;

  const navigate = useNavigate();

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
      console.log(fullName.value)
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
                {/* Progress */}
                <div className="flex justify-center items-center">
                  <div className="mb-6 w-24">
                    <Progress
                      percent={percent}
                      showInfo={false}
                      strokeColor="#0047FF"
                      trailColor="#E5E7EB"
                    />
                  </div>
                </div>

                {/* Step Title */}
                <h2 className="text-xl font-bold text-center mb-8">
                  {currentStep === 1 && "Personal Information"}
                  {currentStep === 2 && "Home Address"}
                  {currentStep === 3 && "Check Point"}
                  {currentStep === 4 && "Set Password"}
                  {currentStep === 5 && ""}
                </h2>

                <Form
                  form={form}
                  layout="vertical"
                  initialValues={formData}
                  preserve={false}
                  onValuesChange={(changed, all) =>
                    setFormData((prev) => ({ ...prev, ...all }))
                  }
                >
                  {/* Step 1: Personal Info */}
                  {currentStep === 1 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Form.Item
                        label="First name"
                        name="firstName"
                        rules={[
                          {
                            required: true,
                            message: "Please enter your first name",
                          },
                        ]}
                      >
                        <Input placeholder="Enter first name" />
                      </Form.Item>

                      <Form.Item
                        label="Last name"
                        name="lastName"
                        rules={[
                          {
                            required: true,
                            message: "Please enter your last name",
                          },
                        ]}
                      >
                        <Input placeholder="Enter last name" />
                      </Form.Item>

                      <Form.Item
                        label="Date of birth"
                        name="dob"
                        rules={[
                          {
                            required: true,
                            message: "Please select your date of birth",
                          },
                        ]}
                      >
                        <DatePicker
                          placeholder="MM/DD/YYYY"
                          className="w-full"
                          format="MM/DD/YYYY"
                        />
                      </Form.Item>

                      <Form.Item label="Occupation" name="occupation">
                        <Input placeholder="Enter occupation" />
                      </Form.Item>
                    </div>
                  )}

                  {/* Step 2: Address Info */}
                  {currentStep === 2 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Form.Item
                        label="Street Address"
                        name="street"
                        rules={[
                          {
                            required: true,
                            message: "Please enter your street address",
                          },
                        ]}
                      >
                        <Input placeholder="Enter street address" />
                      </Form.Item>

                      <Form.Item label="Apt/Suite Number" name="apt">
                        <Input placeholder="Enter apartment or suite number" />
                      </Form.Item>

                      <Form.Item
                        label="City"
                        name="city"
                        rules={[
                          { required: true, message: "Please enter your city" },
                        ]}
                      >
                        <Input placeholder="Enter city" />
                      </Form.Item>

                      <Form.Item
                        label="State"
                        name="state"
                        rules={[
                          {
                            required: true,
                            message: "Please enter your state",
                          },
                        ]}
                      >
                        <Input placeholder="Enter state" />
                      </Form.Item>

                      <Form.Item
                        label="Zip Code"
                        name="zip"
                        rules={[
                          {
                            required: true,
                            message: "Please enter your zip code",
                          },
                        ]}
                      >
                        <Input placeholder="Enter zip code" />
                      </Form.Item>
                    </div>
                  )}

                  {/* Step 3: Review / Check Point (with labels + Edit) */}
                  {currentStep === 3 && (
                    <div>
                      <p className="mb-4">
                        You are almost done. Take a moment to ensure that your
                        provided information is correct before proceeding.
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Full Name */}
                        <Form.Item
                          label="Full Name"
                          name="fullName"
                          rules={[
                            {
                              required: true,
                              message: "Please enter your full name",
                            },
                          ]}
                        >
                          <Input
                            placeholder="Enter full name"
                            suffix={
                              <Button
                                type="link"
                                size="small"
                                onClick={() => editStep(1)}
                              >
                                Edit
                              </Button>
                            }
                          />
                        </Form.Item>

                        {/* DOB */}
                        <Form.Item
                          label="Date of Birth"
                          name="dob"
                          rules={[
                            {
                              required: true,
                              message: "Please select your date of birth",
                            },
                          ]}
                        >
                          <DatePicker
                            className="w-full"
                            format="MM/DD/YYYY"
                            suffixIcon={
                              <Button
                                type="link"
                                size="small"
                                onClick={() => editStep(1)}
                              >
                                Edit
                              </Button>
                            }
                          />
                        </Form.Item>

                        {/* Street Address */}
                        <Form.Item
                          label="Street Address"
                          name="street"
                          rules={[
                            {
                              required: true,
                              message: "Please enter your street address",
                            },
                          ]}
                          className="sm:col-span-2"
                        >
                          <Input
                            placeholder="Enter street address"
                            suffix={
                              <Button
                                type="link"
                                size="small"
                                onClick={() => editStep(2)}
                              >
                                Edit
                              </Button>
                            }
                          />
                        </Form.Item>
                      </div>
                    </div>
                  )}

                  {/* Step 4: Password Setup */}
                  {currentStep === 4 && (
                    <div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Password */}
                        <Form.Item
                          label="Password"
                          name="password"
                          rules={[
                            {
                              required: true,
                              message: "Please enter your password",
                            },
                            {
                              validator: (_, value) => {
                                if (!value) return Promise.resolve();

                                // 1. Length check
                                if (value.length < 9) {
                                  return Promise.reject(
                                    new Error(
                                      "Password must be at least 9 characters long"
                                    )
                                  );
                                }

                                // 2. Must contain symbol or number
                                if (!/[0-9!@#$%^&*(),.?":{}|<>]/.test(value)) {
                                  return Promise.reject(
                                    new Error(
                                      "Password must contain a symbol or a number"
                                    )
                                  );
                                }

                                // 3. Must not be exactly equal to name or email
                                const userName =
                                  formData.firstName + formData.lastName;
                                const userEmail = formData.email;

                                if (
                                  userName &&
                                  value.toLowerCase() === userName.toLowerCase()
                                ) {
                                  return Promise.reject(
                                    new Error(
                                      "Password must not be exactly your name"
                                    )
                                  );
                                }

                                if (
                                  userEmail &&
                                  value.toLowerCase() ===
                                    userEmail.split("@")[0].toLowerCase()
                                ) {
                                  return Promise.reject(
                                    new Error(
                                      "Password must not be exactly your email"
                                    )
                                  );
                                }

                                return Promise.resolve();
                              },
                            },
                          ]}
                          hasFeedback
                        >
                          <Input.Password placeholder="Enter password" />
                        </Form.Item>

                        {/* Confirm Password */}
                        <Form.Item
                          label="Confirm Password"
                          name="confirmPassword"
                          dependencies={["password"]}
                          hasFeedback
                          rules={[
                            {
                              required: true,
                              message: "Please confirm your password",
                            },
                            ({ getFieldValue }) => ({
                              validator(_, value) {
                                if (
                                  !value ||
                                  getFieldValue("password") === value
                                ) {
                                  return Promise.resolve();
                                }
                                return Promise.reject(
                                  new Error("Passwords do not match")
                                );
                              },
                            }),
                          ]}
                        >
                          <Input.Password placeholder="Confirm password" />
                        </Form.Item>
                      </div>

                      {/* Checklist */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                        <div className="flex items-center gap-2">
                          <img src={check} alt="" className="w-4" />
                          <p className="text-xs">
                            Must not contain your name or email
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <img src={check} alt="" className="w-4" />
                          <p className="text-xs">At least 9 characters</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <img src={check} alt="" className="w-4" />
                          <p className="text-xs">
                            Must contain a symbol or a number
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {currentStep === 5 && (
                    <div>
                        <img src={logo} alt="" className="w-40"/>
                      <h1 className="font-bold text-3xl my-7">Create Login Pin</h1>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Form.Item
                          label="Enter PIN"
                          name="pin"
                          rules={[
                            {
                              required: true,
                              message: "Please enter your PIN",
                            },
                            {
                              len: 6, // set pin length (4 or 6)
                              message: "PIN must be 6 digits",
                            },
                          ]}
                        >
                          <Input.OTP length={6} {...sharedProps} />
                        </Form.Item>

                        {/* Confirm PIN */}
                        <Form.Item
                          label="Confirm PIN"
                          name="confirmPin"
                          dependencies={["pin"]}
                          rules={[
                            {
                              required: true,
                              message: "Please confirm your PIN",
                            },
                            ({ getFieldValue }) => ({
                              validator(_, value) {
                                if (!value || getFieldValue("pin") === value) {
                                  return Promise.resolve();
                                }
                                return Promise.reject(
                                  new Error("PINs do not match")
                                );
                              },
                            }),
                          ]}
                        >
                          <Input.OTP length={6} {...sharedProps} />
                        </Form.Item>
                      </div>
                    </div>
                  )}
                  {/* Buttons (unchanged) */}
                  <div className="flex justify-center mt-8">
                    <Button
                      type="primary"
                      className="!bg-[#0047FF] !px-12 !py-4 rounded-lg flex items-center gap-2"
                      onClick={nextStep}
                    >
                      {currentStep === totalSteps ? "Submit" : "Next"}
                      <HiArrowLongRight size={20} />
                    </Button>
                  </div>
                </Form>
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
export default InactiveDashboard;
