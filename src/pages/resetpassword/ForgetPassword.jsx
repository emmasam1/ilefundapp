import React, { useState } from "react";
import { Form, Input, message, Button } from "antd";
import { CheckCircleFilled } from "@ant-design/icons";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import logo from "../../assets/ilefund-Logo-long.png";
import { useApp } from "../../context/AppContext.jsx";
import AuthRightSide from "../../components/Auth-Right-Side.jsx";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);
  const { API_BASE_URL } = useApp();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE_URL}/forgot-password`, values);

      if (res?.data?.success) {
        messageApi.success(res?.data?.message || "OTP sent successfully!");

        // ✅ Save email/phone in sessionStorage (for reload safety)
        sessionStorage.setItem("resetEmail", values.emailOrPhone);

        // ✅ Pass it through router state too
        navigate("/reset-password-otp", {
          state: { email: values.emailOrPhone },
        });
      } else {
        messageApi.error(res?.data?.message || "Error sending OTP");
      }
    } catch (error) {
      messageApi.error(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen p-8">
      {contextHolder}

      {/* Left Side */}
      <div className="flex flex-col justify-center px-8 md:px-16">
        <div className="mb-6">
          <img src={logo} alt="Logo" className="w-32 md:w-40" />
        </div>

        <Form layout="vertical" className="max-w-lg w-full" onFinish={onFinish}>
          <h1 className="mt-2 pb-3 text-3xl md:text-4xl font-bold text-gray-900">
            Forgot Password?
          </h1>

          <p className="text-gray-500 font-medium text-base md:text-lg">
            Not to worry, we will send a reset instructions to your registered
            number or email.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <Form.Item
              label="Email"
              name="emailOrPhone"
              rules={[
                {
                  required: true,
                  message: "Please enter your email or phone!",
                },
              ]}
            >
              <Input
                placeholder="Enter your email"
                type="email"
                className="w-full h-12 !bg-gray-300 !rounded-lg !border-none focus:!ring-2 focus:!ring-blue-500"
              />
            </Form.Item>
          </div>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="mt-6 w-full md:w-auto !bg-blue-600 hover:!bg-blue-700 !text-white !border-none"
              loading={loading}
            >
              Send Code
            </Button>
          </Form.Item>
        </Form>
      </div>

      {/* Right Side */}
     <AuthRightSide/>
    </div>
  );
};

export default ForgetPassword;
