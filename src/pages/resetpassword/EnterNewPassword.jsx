import React, { useState } from "react";
import logo from "../../assets/ilefund-Logo-long.png";
import { Form, Input, message, Button, Modal } from "antd";
import { useNavigate, useLocation } from "react-router";
import { MdArrowRightAlt } from "react-icons/md";
import { CheckCircleFilled } from "@ant-design/icons";
import { useApp } from "../../context/AppContext.jsx";
import success_img from "../../assets/success.png";
import axios from "axios";
import AuthRightSide from "../../components/Auth-Right-Side.jsx";

const EnterNewPassword = () => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { API_BASE_URL } = useApp();
  const [loading, setLoading] = useState(false);

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const location = useLocation();
  const email =
    location.state?.email || sessionStorage.getItem("resetEmail") || "";

  const onFinish = async (values) => {
    setLoading(true);

    const payload = {
      emailOrPhone: email,
      newPassword: values.password,
    };

    try {
      const res = await axios.post(
        `${API_BASE_URL}/reset-password-code`,
        payload
      );

      if (res?.data?.success) {
        messageApi.success(res?.data?.message || "Password reset successful!");
        sessionStorage.removeItem("resetEmail");
        setIsModalOpen(true);
      } else {
        messageApi.error(res?.data?.message || "Password reset failed.");
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
            Reset Password
          </h1>

          <p className="text-gray-500 mb-4">
            Set a new password for <b>{email}</b>
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <Form.Item
              label="New Password"
              name="password"
              rules={[
                { required: true, message: "Please enter your new password!" },
              ]}
            >
              <Input.Password
                placeholder="Enter new password"
                className="w-full h-12 !bg-gray-300 !rounded-lg !border-none focus:!ring-2 focus:!ring-blue-500"
              />
            </Form.Item>

            <Form.Item
              label="Confirm Password"
              name="confirmPassword"
              dependencies={["password"]}
              rules={[
                { required: true, message: "Please confirm your password!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Passwords do not match!"));
                  },
                }),
              ]}
            >
              <Input.Password
                placeholder="Confirm password"
                className="w-full !bg-gray-300 !rounded-lg !border-none focus:!ring-2 focus:!ring-blue-500"
              />
            </Form.Item>
          </div>

          <Form.Item>
            <Button
              className="mt-6 !bg-blue-600 hover:!bg-blue-700 w-full md:w-auto !text-white !border-none flex items-center justify-center gap-2"
              loading={loading}
              htmlType="submit"
            >
              Update Password
            </Button>
          </Form.Item>
        </Form>

        <Modal open={isModalOpen} footer={null} closable={false} centered>
          <div className="flex justify-center items-center flex-col gap-4 py-6">
            <img
              src={success_img}
              alt="Success"
              className="w-24 h-24 object-contain"
            />
            <h1 className="font-bold text-xl text-gray-800">
              Password Updated
            </h1>
            <p className="text-center text-gray-600">
              Your password has been updated <br /> successfully.
            </p>

            <Button
              type="primary"
              className="!bg-blue-600 hover:!bg-blue-700 mt-3 !px-8 rounded-lg"
              onClick={() => {
                setIsModalOpen(false);
                navigate("/");
              }}
            >
              Finish
            </Button>
          </div>
        </Modal>
      </div>

      {/* Right Side */}
     <AuthRightSide/>
    </div>
  );
};

export default EnterNewPassword;
