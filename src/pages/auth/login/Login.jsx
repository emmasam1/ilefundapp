import Reac, { useState } from "react";
import logo from "../../../assets/logo.png";
import { Form, Input, message, Button } from "antd";
import { useNavigate, Link } from "react-router";
import { MdArrowRightAlt } from "react-icons/md";
import { CheckCircleFilled } from "@ant-design/icons";
import { useApp } from "../../../context/AppContext.jsx";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const { API_BASE_URL, setAuthData } = useApp();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true)
    try {
      const res = await axios.post(`${API_BASE_URL}/login`, values);
      if (res?.data?.success) {
        await setAuthData(res.data);
        messageApi.success(res?.data?.message || "Login successful!");
        console.log(res)
        navigate("/enter-pin");
      } else {
        messageApi.error(res?.data?.message || "Login failed.");
      }
    } catch (error) {
      messageApi.error(
        error.response?.data?.message || "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen p-8">
      {contextHolder}

      {/* Left Side */}
      <div className="flex flex-col justify-center px-8 md:px-16">
        <div className="mb-6">
          <img src={logo} alt="Logo" className="w-32 md:w-40" />
        </div>

        <Form layout="vertical" className="max-w-lg w-full" onFinish={onFinish}>
          <h1 className="mt-2 pb-3 text-3xl md:text-4xl font-bold text-gray-900">
            Welcome back
          </h1>
          <p className="text-gray-500 font-medium text-base md:text-lg">
            Sign into your account
          </p>

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

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please enter your password!" },
              ]}
            >
              <Input.Password
                placeholder="Enter your password"
                className="w-full !bg-gray-100 !rounded-lg !border-none focus:!ring-2 focus:!ring-blue-500"
              />
            </Form.Item>
          </div>

          <p className="font-medium mt-5 text-gray-600">
            Forgot your password?{" "}
            <Link to="/reset-password" className="!text-[#0047FF] hover:!text-[#0047FF]">
              Click Here
            </Link>
          </p>

          <Form.Item>
            <Button
              className="mt-6 !bg-blue-600 hover:!bg-blue-700 w-full md:w-auto !text-white !border-none"
              loading={loading}
              htmlType="submit"
            >
              Login <MdArrowRightAlt />
            </Button>
            {/* <CustomButton
              label="Login"
              icon={<MdArrowRightAlt />}
              className="mt-6 !bg-blue-600 hover:!bg-blue-700 w-full md:w-auto !text-white"
              htmlType="submit"
              loading={loading}
            /> */}
          </Form.Item>

          <p className="font-medium mt-6 text-gray-600">
            New Here?{" "}
            <Link
              to="register"
              className="!text-[#0047FF] hover:!text-[#0047FF]"
            >
              Create Account
            </Link>
          </p>
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

export default Login;
