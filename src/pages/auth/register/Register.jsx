import React, { useState } from "react";
import logo from "../../../assets/logo.png";
import { Form, Input, Button, Modal, Divider } from "antd";
import { useNavigate, Link } from "react-router";
import CustomButton from "../../../components/button/CustomButton";
import { MdArrowRightAlt } from "react-icons/md";
import { CheckCircleFilled } from "@ant-design/icons";
import apple from "../../../assets/Apple.png";
import google from "../../../assets/google.png";
import progress from "../../../assets/progress_terms.png";
import progress_reg from "../../../assets/progress_reg.png";

const Register = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onFinish = () => {
    navigate("/enter-comfrimation-pin");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen p-8">
      {/* Left Side */}
      <div className="flex flex-col justify-center px-8 md:px-16">
        {/* Logo */}
        <div className="mb-6">
          <img src={logo} alt="Logo" className="w-32 md:w-40" />
        </div>
        <img src={progress_reg} alt="" className="w-15 my-5" />
        <Form layout="vertical" className="max-w-lg w-full">
          <h1 className="mt-2 pb-3 text-3xl md:text-4xl font-bold text-gray-900">
            Getting Started
          </h1>

          {/* Form Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please enter your email!" }]}
            >
              <Input
                placeholder="Enter your email"
                type="email"
                className="w-full !bg-gray-100 !rounded-lg !border-none focus:!ring-2 focus:!ring-blue-500"
              />
            </Form.Item>
          </div>

          {/* Forgot Password */}
          <p className="font-medium text-gray-600">
            Already have an account?{" "}
            <Link to="/" className="!text-[#0047FF] hover:!text-[#0047FF]">
              Sign in
            </Link>
          </p>

          {/* Login Button */}
          <Form.Item>
            <CustomButton
              label="Send Code"
              icon={<MdArrowRightAlt />}
              className="mt-6 !bg-blue-600 hover:!bg-blue-700 w-full md:w-auto !text-white"
              type="submit"
              onClick={onFinish}
            />
          </Form.Item>
        </Form>
        {/* <div>
          <p>or Continue with: </p>

          <div className="flex gap-6 mt-3">
            <Button className="!py-6">
              <img src={apple} alt="" className="w-9" />
            </Button>
            <Button className="!py-6">
              <img src={google} alt="" className="w-9" />
            </Button>
          </div>
        </div> */}

        <p className="text-gray-400 mt-4 text-sm">
          By creating an account, you agree <br /> to our{" "}
          <span
            className="!font-bold !text-black cursor-pointer"
            onClick={showModal}
          >
            Terms and Conditions
          </span>
        </p>

        <Modal
          title={
            <div>
              <img src={progress} alt="" className="w-15 my-5" />
              <span className="font-bold text-2xl">Terms of Service</span>
              <p className="text-xs text-gray-500 mt-2 ">
                Last Updated on 12/07/2024
              </p>
            </div>
          }
          closable={{ "aria-label": "Custom Close Button" }}
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
        >
          <Divider />

          <div>
            <h2 className="font-bold text-sm">Clause 1</h2>
            <p className="mt-2 text-sm">
              Contrary to popular belief, Lorem Ipsum is not simply random text.
              It has roots in a piece of classical Latin literature from 45 BC,
              making it over 2000 years old. Richard McClintock, a Latin
              professor at Hampden-Sydney College in Virginia, looked up one of
              the more obscure Latin words, consectetur, from a Lorem Ipsum
              passage, and going through the cites of the word in classical
              literature, discovered the undoubtable source. Lorem Ipsum comes
              from sections 1.10.32 and 1.10.33 of "de Finibus{" "}
            </p>
          </div>
          <div className="mt-5">
            <h2 className="font-bold text-sm">Clause 2</h2>
            <p className="mt-2 text-sm">
              There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteration in some form, by
              injected humour, or randomised words which don't look even
              slightly believable. If you are going to use a passage of Lorem
              Ipsum, you need to be sure there isn't anything embarrassing
              hidden
            </p>
          </div>

          <div className="flex justify-center mt-5">
            <CustomButton label="Scroll to Bottom" className="!text-sm" />
          </div>
        </Modal>
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

export default Register;
