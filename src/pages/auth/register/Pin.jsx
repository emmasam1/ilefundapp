import React, { useState, useEffect } from "react";
import logo from "../../../assets/ilefund-Logo-long.png";
import { Form, Button, Input, message } from "antd";
import { useNavigate, Link, useLocation } from "react-router";
import { CheckCircleFilled } from "@ant-design/icons";
import progress_reg from "../../../assets/progress_reg.png";
import { useApp } from "../../../context/AppContext.jsx";
import axios from "axios";

const Pin = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes
  const [canResend, setCanResend] = useState(false);
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const { API_BASE_URL } = useApp();

  const location = useLocation();
  const email = location.state?.email || "";

  //  useEffect(() => {
  //   if (email) {
  //     localStorage.setItem("email", email);
  //   }
  // }, [email]);

  // countdown logic
  useEffect(() => {
    if (timeLeft <= 0) {
      setCanResend(true);
      return;
    }
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleResend = async () => {
    setTimeLeft(120);
    setCanResend(false);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/resend-verification-code`,
        {
          email,
        }
      );

      console.log("Resend Response:", response.data);
      messageApi.success(
        response?.data?.message || "Verification code resent successfully!"
      );
    } catch (error) {
      console.error("Resend error:", error.response?.data || error.message);
      messageApi.error(
        error.response?.data?.message || "Failed to resend verification code."
      );
    }
  };

  // format mm:ss
  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(1, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  // ✅ OTP onChange + API
  const onChange = async (value) => {
    console.log("OTP:", value);

    if (value.length === 6) {
      try {
        setLoading(true);
        const response = await axios.post(`${API_BASE_URL}/verify-account`, {
          code: value,
        });

        console.log("Verification Response:", response.data);

        if (response.data.success) {
          messageApi.success(response.data.message || "Account verified!");
          setTimeout(() => navigate("/personal-information"), 1000);
        } else {
          messageApi.error(
            response.data.message || "Invalid verification code."
          );
        }
      } catch (error) {
        console.error(
          "Verification Error:",
          error.response?.data || error.message
        );
        messageApi.error(
          error.response?.data?.message ||
            "Verification failed. Please try again."
        );
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen p-8">
      {contextHolder}

      {/* Left Side */}
      <div className="flex flex-col justify-center items-center px-8 md:px-16">
        {/* Logo */}
        <div className="mb-6 max-w-lg w-full">
          <img src={logo} alt="Logo" className="w-32 md:w-40" />
        </div>

        <div className="flex !align-baseline w-full">
          <img src={progress_reg} alt="" className="w-15 my-5" />
        </div>

        <Form layout="vertical" className="max-w-lg w-full">
          <h1 className="mt-2 pb-3 text-3xl md:text-4xl font-bold text-gray-900">
            Enter 6-digit code
          </h1>

          <p>
            We’ve just sent an email verification code to <b>{email}</b> <br />
            <Link to="/register">Wrong Email</Link>
          </p>

          {/* Form Inputs */}
          <p className="my-4 text-gray-400 text-sm">Verification Code</p>
          <div className="flex flex-col space-y-3">
            {/* OTP Input */}
            <Input.OTP
              length={6}
              formatter={(str) => str.toUpperCase()}
              onChange={onChange}
              size="large"
              disabled={loading}
            />

            {/* Resend + Timer */}
            <div className="flex items-center">
              <Button
                type="link"
                onClick={handleResend}
                disabled={!canResend}
                className="p-0"
              >
                Resend
              </Button>
              <span>{formatTime(timeLeft)}</span>
            </div>
          </div>
        </Form>
      </div>

      {/* Right Side */}
      <div className="hidden md:flex items-center justify-center bg-[#0047FF] rounded-3xl">
        <div className="text-white p-8 md:p-12 max-w-md">
          <h1 className="text-2xl md:text-3xl font-extrabold mb-6 leading-snug">
            ILEFUND <br /> Investment and <br /> Land Ownership
          </h1>

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
                Invest deliberately
              </p>
              <p className="text-sm text-gray-100">
                Invest in our diverse range of assets that grow in value over
                time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pin;
