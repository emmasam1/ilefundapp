import { useState } from "react";
import { Form, Input, Row, Col, Select, Button, Modal } from "antd";
import { Link } from "react-router";

const { Option } = Select;

import back_arrow from "../../assets/back_arrow.png";
import arrow_long_right from "../../assets/arrow_long_right.png";
import success from "../../assets/success.png";

const EditProfile = () => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const onFinish = (values) => {
    console.log("Form Values:", values);
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle initialValue="+234">
      <Select style={{ width: 90 }}>
        <Option value="+234">🇳🇬 +234</Option>
        <Option value="+1">🇺🇸 +1</Option>
        <Option value="+44">🇬🇧 +44</Option>
        <Option value="+91">🇮🇳 +91</Option>
      </Select>
    </Form.Item>
  );

  return (
    <div className="bg-white h-screen">
      <div className="">
        <div className="p-5">
          <Link to="/dashboard/profile/personal">
            <img src={back_arrow} alt="" className="w-10" />
          </Link>
        </div>
      </div>

      <Modal open={isModalOpen} footer={null} closable={false}>
        <div className="flex justify-center items-center">
          <div className="w-full max-w-lg">
            <div className="flex justify-center items-center flex-col mt-10">
              <img src={success} alt="" className="w-30" />

              <h1 className="font-bold text-3xl text-center">
                Update Successful!
              </h1>
              <p className="text-center mt-2 text-[#12033A]">
                Your Profile was Updated Successfully!!!
              </p>

              <Link to="/dashboard/profile/personal">
                <Button
                  onClick={onFinish}
                  className="!bg-[#12033A] !text-white !border-none !px-10 my-8 !rounded-lg"
                >
                  Got it
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Modal>

      <div className="mt-10 w-4/5 mx-auto">
        <h1 className="font-extrabold text-3xl !mb-7">Edit Profile</h1>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            fullName: "",
            phone: "",
            email: "",
            occupation: "",
            address: "",
            prefix: "+234",
          }}
        >
          <Row gutter={20}>
            {/* Full Name */}
            <Col xs={24} md={12}>
              <Form.Item
                label="Full Name"
                name="fullName"
                rules={[{ required: true, message: "Please enter full name" }]}
              >
                <Input placeholder="Full Name" />
              </Form.Item>
            </Col>

            {/* Phone Number */}
            <Col xs={24} md={12}>
              <Form.Item
                label="Phone Number"
                name="phone"
                rules={[
                  { required: true, message: "Please enter phone number" },
                ]}
              >
                <Input
                  addonBefore={prefixSelector}
                  placeholder="000 000 0000"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={20}>
            {/* Email */}
            <Col xs={24} md={12}>
              <Form.Item
                label="Email Address"
                name="email"
                rules={[
                  { required: true, message: "Please enter email address" },
                  { type: "email", message: "Enter a valid email" },
                ]}
              >
                <Input placeholder="Email Address" />
              </Form.Item>
            </Col>

            {/* Occupation */}
            <Col xs={24} md={12}>
              <Form.Item
                label="Occupation"
                name="occupation"
                rules={[{ required: true, message: "Please enter occupation" }]}
              >
                <Input placeholder="Occupation" />
              </Form.Item>
            </Col>
          </Row>

          {/* Address */}
          <Row gutter={20}>
            <Col xs={24} md={12}>
              <Form.Item
                label="Address"
                name="address"
                rules={[{ required: true, message: "Please enter address" }]}
              >
                <Input placeholder="Address" />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <div className="flex justify-end mt-7">
                <Button
                  type="primary"
                  htmlType="submit"
                  className="px-8"
                  onClick={openModal}
                >
                  Next
                  <img src={arrow_long_right} alt="" className="w-5" />
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default EditProfile;
