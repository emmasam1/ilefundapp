import React from "react";
import { Link } from "react-router";
import { Form, Input, Row, Col, Button } from "antd";

import back_arrow from "../../assets/back_arrow.png";
import notifications from "../../assets/notifications-outline.png";
import user_img from "../../assets/user_img.png";
import lock from "../../assets/lock.png";
import arrow_long_right from "../../assets/arrow_long_right.png";

const ChangePassword = () => {
  return (
    <div className="bg-white relative">
      <div className="flex justify-between">
        <div className="p-5">
          <Link to="/dashboard/profile">
            <img src={back_arrow} alt="" className="w-10" />
          </Link>
        </div>
        <div className="hidden md:block h-[400px] w-3/4 bg-[url(/src/assets/profile_bg.png)] bg-cover bg-no-repeat bg-bottom">
          <div>
            <div className="flex items-center justify-end gap-3 p-5">
              <div className="relative">
                <div className="absolute bg-[#FF5050] text-white rounded-full w-5 h-5 flex justify-center items-center -top-1 right-0">
                  0
                </div>
                <img src={notifications} alt="notifications" className="w-8" />
              </div>
              <div className="h-12 w-12 rounded-full">
                <img
                  src={user_img}
                  alt="user avatar"
                  className="rounded-full object-cover h-12 w-12"
                />
              </div>
            </div>
            <div className="flex justify-center flex-col gap-10 w-full items-center">
              <h1 className="!text-white font-extrabold !text-4xl">
                Change Password
              </h1>
              <img src={lock} alt="" className="w-25" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white w-full px-6 md:px-12 py-10">
        <Form layout="vertical" className="w-full max-w-4xl mx-auto">
          {/* Password Fields */}
          <Row gutter={[24, 16]}>
            <Col xs={24} md={8}>
              <Form.Item
                label={
                  <span className="font-semibold text-gray-700">
                    Your current password
                  </span>
                }
                name="currentPassword"
              >
                <Input.Password
                  placeholder="Enter your current password"
                  className="rounded-md py-2"
                />
              </Form.Item>
            </Col>

            <Col xs={24} md={8}>
              <Form.Item
                label={
                  <span className="font-semibold text-gray-700">
                    Enter new password
                  </span>
                }
                name="newPassword"
              >
                <Input.Password
                  placeholder="Enter new password"
                  className="rounded-md py-2"
                />
              </Form.Item>
            </Col>

            <Col xs={24} md={8}>
              <Form.Item
                label={
                  <span className="font-semibold text-gray-700">
                    Confirm new password
                  </span>
                }
                name="confirmPassword"
              >
                <Input.Password
                  placeholder="Confirm new password"
                  className="rounded-md py-2"
                />
              </Form.Item>
            </Col>
          </Row>

          {/* Info Box */}
          <div className="mt-8">
            <h3 className="font-semibold text-gray-800 mb-2">
              What happens now!!
            </h3>
            <div className="border border-gray-300 rounded-md p-4 bg-gray-50 text-gray-700 leading-relaxed text-sm">
              s simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry's standard dummy text ever since
              the 1500s. It has survived not only five centuries, but also the
              leap into electronic typesetting, remaining essentially unchanged.
              Lorem Ipsum has been the industry's standard dummy text ever.
            </div>
          </div>
        </Form>
      </div>

       <div className="flex justify-end pb-19 max-w-5xl">
              <Button type="primary" htmlType="submit" className="!px-10">
                Next
                <img src={arrow_long_right} alt="" className="w-5" />
              </Button>
            </div>
    </div>
  );
};

export default ChangePassword;
