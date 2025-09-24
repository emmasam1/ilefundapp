import React, { useState, useEffect } from "react";
import logo from "../../../assets/logo.png";
import { Form, Button, Input } from "antd";
import { useNavigate, Link } from "react-router";
import { CheckCircleFilled } from "@ant-design/icons";
import progress_reg from "../../../assets/progress_reg.png";

const Pin = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes
  const [canResend, setCanResend] = useState(false);

  // countdown logic
  useEffect(() => {
    if (timeLeft <= 0) {
      setCanResend(true);
      return;
    }
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleResend = () => {
    setTimeLeft(120);
    setCanResend(false);
    // 🔥 call your resend API here
  };

  // format mm:ss
  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(1, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  // ✅ OTP onChange
  const onChange = (value) => {
    console.log("OTP:", value);
    if (value.length === 6) {
      // 🔥 Here you can also call API to verify OTP before navigating
      navigate("/continue-to-select-country");
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen p-8">
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
            We’ve just sent an email verification code to you <br />
            <Link to="#">Wrong Email</Link>
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
            //   style={{ width: "100px", height: "50px" }}
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
      <div className="hidden md:flex items-center justify-center bg-[#0047FF]">
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
