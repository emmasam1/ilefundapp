import React, { useState } from "react";
import logo from "../../../assets/logo.png";
import { Form, Button, message } from "antd";
import { useNavigate, Link } from "react-router";
import { CheckCircleFilled } from "@ant-design/icons";
import { RiDeleteBack2Line } from "react-icons/ri";
import axios from "axios";
import { useApp } from "../../../context/AppContext.jsx";

const EnterPin = () => {
  const navigate = useNavigate();
  const { API_BASE_URL, token, user } = useApp();
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const handleClick = (value) => {
    if (value === "del") {
      setPin((prev) => prev.slice(0, -1));
    } else if (value === "reset") {
      setPin("");
    } else if (pin.length < 6) {
      setPin((prev) => prev + value);
    }
  };

  // ✅ Trigger validation when 6 digits are entered
  React.useEffect(() => {
    if (pin.length === 6) {
      verifyPin();
    }
  }, [pin]);

  // ✅ Verify PIN from backend
  const verifyPin = async (values) => {
    const email = user?.email;

    const payload = {
      email,
      pin,
    };

    try {
      setLoading(true);

      const res = await axios.post(`${API_BASE_URL}/pin/login`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log(res);
      messageApi.success(res?.data?.message || "PIN verified successfully!");
      setPin("");
      if (!res?.data?.user?.LinkedCards || res.data.user.LinkedCards.length === 0) {
        setTimeout(() => navigate("/card-details"), 700);
      } else {
        setTimeout(() => navigate("/dashboard"), 700);
      }
    } catch (err) {
      console.error(err);
      messageApi.error(
        err.response?.data?.message || "Something went wrong, try again."
      );
      setPin("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen p-8">
      {contextHolder}

      {/* Left Side */}
      <div className="flex flex-col justify-center items-center px-8 md:px-16">
        <div className="mb-6 max-w-lg w-full">
          <img src={logo} alt="Logo" className="w-32 md:w-40" />
        </div>

        <Form layout="vertical" className="max-w-lg w-full">
          <h1 className="mt-2 pb-3 text-3xl md:text-4xl font-extrabold text-gray-900">
            Enter your PIN
          </h1>

          {/* Dots showing PIN length */}
          <div className="flex my-6 space-x-3 ml-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <span
                key={i}
                className={`h-3 w-3 rounded-full transition-all duration-200 ${
                  i < pin.length ? "bg-blue-500" : "bg-gray-300"
                }`}
              ></span>
            ))}
          </div>

          {/* Keypad */}
          <div className="grid grid-cols-3 gap-6 text-center text-xl font-bold text-gray-900 w-96">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <Button
                key={num}
                type="text"
                disabled={loading}
                className="!text-2xl !font-bold hover:bg-gray-100 !rounded-full !h-12 !w-12"
                onClick={() => handleClick(num.toString())}
              >
                {num}
              </Button>
            ))}

            <div></div>
            <Button
              type="text"
              disabled={loading}
              className="!text-2xl !font-bold hover:bg-gray-100 !rounded-full !h-12 !w-12"
              onClick={() => handleClick("0")}
            >
              0
            </Button>

            <Button
              type="text"
              disabled={loading}
              className="hover:bg-gray-100"
              onClick={() => handleClick("del")}
              icon={<RiDeleteBack2Line size={35} className="mt-4" />}
            />
          </div>

          <div className="flex mt-4">
            <Button
              type="link"
              danger
              onClick={() => handleClick("reset")}
              disabled={loading}
            >
              Reset
            </Button>
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

export default EnterPin;
