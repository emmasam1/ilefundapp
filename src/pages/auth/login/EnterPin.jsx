import React, { useState } from "react";
import logo from "../../../assets/logo.png";
import { Form, Button } from "antd";
import { useNavigate, Link } from "react-router";
import CustomButton from "../../../components/button/CustomButton";
import { MdArrowRightAlt } from "react-icons/md";
import { CheckCircleFilled } from "@ant-design/icons";
import { DeleteOutlined } from "@ant-design/icons";
import { RiDeleteBack2Line } from "react-icons/ri";

const EnterPin = () => {
  const navigate = useNavigate();

  const [pin, setPin] = useState("");

  const handleClick = (value) => {
    if (value === "del") {
      setPin(pin.slice(0, -1));
    } else if (value === "reset") {
      setPin("");
    } else if (pin.length < 6) {
      setPin(pin + value);
    }
  };

  const onFinish = () => {
    navigate("/continue-to-signin");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen p-8">
      {/* Left Side */}

      <div className="flex flex-col justify-center items-center px-8 md:px-16">
        {/* Logo */}
        <div className="mb-6  max-w-lg w-full">
          <img src={logo} alt="Logo" className="w-32 md:w-40" />
        </div>

        <Form layout="vertical" className="max-w-lg w-full">
          <h1 className="mt-2 pb-3 text-3xl md:text-4xl font-extrabold text-gray-900">
            Enter your Pin
          </h1>

          {/* Form Inputs */}
          <div className="flex my-6 space-x-3 ml-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <span
                key={i}
                className={`h-3 w-3 rounded-full ${
                  i < pin.length ? "bg-blue-500" : "bg-gray-300"
                }`}
              ></span>
            ))}
          </div>

          {/* ✅ Keypad */}
          <div className="grid grid-cols-3 gap-6 text-center text-xl font-bold text-gray-900 w-96">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <Button
                key={num}
                type="text"
                className="!text-2xl !font-bold hover:bg-gray-100 !rounded-full hover:!rounded-full !h-12 !w-12 "
                onClick={() => handleClick(num.toString())}
              >
                {num}
              </Button>
            ))}

            {/* Empty placeholder */}
            <div></div>

            {/* 0 */}
            <Button
              type="text"
              className="!text-2xl !font-bold hover:bg-gray-100 !rounded-full hover:!rounded-full !h-12 !w-12 "
              onClick={() => handleClick("0")}
            >
              0
            </Button>

            {/* Delete */}
            <Button
              type="text"
              className="hover:bg-gray-100"
              onClick={() => handleClick("del")}
              icon={<RiDeleteBack2Line size={35} className="mt-4"/>}
            />
          </div>

          {/* ✅ Reset */}
          <div className="flex mt-4">
            <Button type="link" danger onClick={() => handleClick("reset")}>
              Reset
            </Button>
          </div>

          {/* Login Button */}
          {/* <Form.Item>
            <CustomButton
              label="Continue"
              //   icon={<MdArrowRightAlt />}
              className="mt-6 !bg-blue-600 hover:!bg-blue-700 w-full md:w-auto !text-white"
              type="submit"
              onClick={onFinish}
            />
          </Form.Item> */}

          {/* Create Account */}
          {/* <p className="font-medium mt-6 text-gray-600">
            New Here?{" "}
            <Link to="#" className="!text-[#0047FF] hover:!text-[#0047FF]">
              Create Account
            </Link>
          </p> */}
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
