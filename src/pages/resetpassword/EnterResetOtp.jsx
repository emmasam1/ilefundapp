import React, { useState, useEffect } from "react";
import logo from "../../assets/ilefund-Logo-long.png";
import { Form, Button, Input, message } from "antd";
import { useNavigate, Link, useLocation } from "react-router";
import { CheckCircleFilled } from "@ant-design/icons";
import progress_reg from "../../assets/progress_reg.png";
import { useApp } from "../../context/AppContext.jsx";
import axios from "axios";
import AuthRightSide from "../../components/Auth-Right-Side.jsx";

const EnterResetOtp = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes
  const [canResend, setCanResend] = useState(false);
  const [loading, setLoading] = useState(false);
  const { API_BASE_URL } = useApp();
  const [messageApi, contextHolder] = message.useMessage();

  const location = useLocation();
  const email =
    location.state?.email || sessionStorage.getItem("resetEmail") || "";

  // 🧠 Mask email for privacy
  const maskEmail = (email) => {
    if (!email.includes("@")) return email; // in case it's a phone number
    const [name, domain] = email.split("@");
    const visiblePart = name.slice(-2); // show last 2 letters
    return `****${visiblePart}@${domain}`;
  };

  const maskedEmail = maskEmail(email);

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
        `${API_BASE_URL}/resend-forgot-password-code`,
        { emailOrPhone: email }
      );
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
    if (value.length === 6) {
      try {
        setLoading(true);
        const response = await axios.post(`${API_BASE_URL}/verify-reset-code`, {
          emailOrPhone: email,
          code: value,
        });

        if (response.data.success) {
          messageApi.success(response.data.message || "Account verified!");
          setTimeout(() => navigate("/enter-new-password"), 1000);
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
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen p-8">
      {contextHolder}

      {/* Left Side */}
      <div className="flex flex-col justify-center items-center px-8 md:px-16">
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

          <p className="text-gray-600 leading-relaxed">
            We’ve sent a verification code to{" "}
            <b className="text-gray-800">{maskedEmail}</b>
          </p>

          <p className="my-4 text-gray-400 text-sm">Verification Code</p>
          <div className="flex flex-col space-y-3">
            <Input.OTP
              length={6}
              formatter={(str) => str.toUpperCase()}
              onChange={onChange}
              size="large"
              disabled={loading}
            />

            <div className="flex items-center space-x-2 text-sm">
              <Button
                type="link"
                onClick={handleResend}
                disabled={!canResend}
                className="p-0"
              >
                Resend
              </Button>
              <span className="text-gray-500">{formatTime(timeLeft)}</span>
            </div>
          </div>
        </Form>
      </div>

      {/* Right Side */}
      <AuthRightSide/>
    </div>
  );
};

export default EnterResetOtp;
