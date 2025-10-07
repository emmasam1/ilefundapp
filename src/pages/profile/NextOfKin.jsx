import React from "react";
import { Link } from "react-router";
import { Form, Input, Row, Col, Button } from "antd";


import notifications from "../../assets/notifications-outline.png";
import user_img from "../../assets/user_img.png";
import next_of_kin from "../../assets/next_of_kin.png";
import arrow_long_right from "../../assets/arrow_long_right.png";

import back_arrow from "../../assets/back_arrow.png";
const NextOfKin = () => {
  return (
    <div className="bg-white relative -top-10 py-10">
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
                Next of Kin
              </h1>
              <img src={next_of_kin} alt="" className="w-25" />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 p-7">
        <h1 className="mb-6 font-bold text-3xl">Next Of Kin</h1>
        <p>
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum is that it has a more-or-less normal distribution of
          letters, as opposed to using 'Content here, content here
        </p>

      <div className="bg-white w-full  py-10">
      <Form
        layout="vertical"
        className="w-full max-w-4xl mx-auto"
      >
        <Row gutter={[24, 16]}>
          {/* Next of Kin */}
          <Col xs={24} md={12}>
            <Form.Item
              label={<span className="font-semibold text-gray-700">Next of Kin</span>}
              name="nextOfKin"
            >
              <Input
                placeholder="Enter Next of Kin"
                className="rounded-md py-2"
              />
            </Form.Item>
          </Col>

          {/* Relationship */}
          <Col xs={24} md={12}>
            <Form.Item
              label={<span className="font-semibold text-gray-700">What is the Relationship</span>}
              name="relationship"
            >
              <Input
                value="Wife"
                readOnly
                className="rounded-md bg-gray-50 font-medium text-gray-800 cursor-not-allowed py-2"
              />
            </Form.Item>
          </Col>

          {/* Email */}
          <Col xs={24} md={12}>
            <Form.Item
              label={<span className="font-semibold text-gray-700">Email address of Next of Kin</span>}
              name="email"
            >
              <Input
                type="email"
                placeholder="Email address of Next of Kin"
                className="rounded-md py-2"
              />
            </Form.Item>
          </Col>

          {/* Phone */}
          <Col xs={24} md={12}>
            <Form.Item
              label={<span className="font-semibold text-gray-700">Phone number of Next of Kin</span>}
              name="phone"
            >
              <Input
                type="tel"
                placeholder="Phone number of Next of Kin"
                className="rounded-md py-2"
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
      </div>

       <div className="flex justify-end pb-19 px-15">
        <Button type="primary" htmlType="submit" className="!px-10">
          Next
          <img src={arrow_long_right} alt="" className="w-5" />
        </Button>
      </div>

    </div>
  );
};

export default NextOfKin;
