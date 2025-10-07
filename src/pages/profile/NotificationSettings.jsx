import React from "react";
import { Button, Switch } from "antd";
import { Link } from "react-router";

import logout from "../../assets/logout_blue.png";
import deposit_notification from "../../assets/deposit_notification.png";
import withdrawal_notification from "../../assets/withdrawal_notification.png";
import otp_2_email from "../../assets/otp_2_email.png";
import bonus from "../../assets/bonus.png";
import milestone from "../../assets/milestone.png";
import opportunity from "../../assets/opportunity.png";
import back_arrow from "../../assets/back_arrow.png";
import arrow_long_right from "../../assets/arrow_long_right.png";
import notifications from "../../assets/notifications-outline.png";
import user_img from "../../assets/user_img.png";
import big_bell from "../../assets/big_bell.png";

const NotificationSettings = () => {
  const menuItems = [
    {
      label: "Login notifications",
      icon: <img src={logout} className="w-10" />,
    },
    {
      label: "Deposit notifications",
      icon: <img src={deposit_notification} className="w-10" />,
    },
    {
      label: "Withdrawal notifications",
      icon: <img src={withdrawal_notification} className="w-10" />,
      link: "/dashboard/profile/notifications-settings",
    },
    {
      label: "OTP to email",
      icon: <img src={otp_2_email} className="w-10" />,
    },
    {
      label: "OTP to message",
      icon: <img src={otp_2_email} className="w-10" />,
    },
    {
      label: "OTP to WhatApp",
      icon: <img src={otp_2_email} className="w-10" />,
    },
    {
      label: "Bonus Notifications",
      icon: <img src={bonus} className="w-10" />,
    },
    {
      label: "Milestones Notifications",
      icon: <img src={milestone} className="w-10" />,
    },
    {
      label: "Opportunity Notifications",
      icon: <img src={opportunity} className="w-10" />,
    },
  ];
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
                Security Settings
              </h1>
              <img src={big_bell} alt="" className="w-25" />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10 w-11/12 mx-auto pb-20">
        {menuItems.map((item, idx) => (
          <div className="flex items-center justify-between py-3 border-b border-gray-200 hover:bg-gray-50">
            <div className="flex items-center gap-3">
              <div className="text-blue-500 text-lg">{item.icon}</div>
              <div className="font-semibold text-sm text-gray-800">
                <p className="!text-black font-semibold"> {item.label}</p>
              </div>
            </div>
            <Switch />
          </div>
        ))}
      </div>

      <div className="flex justify-center pb-19">
        <Button type="primary" htmlType="submit" className="!px-10">
          Next
          <img src={arrow_long_right} alt="" className="w-5" />
        </Button>
      </div>
    </div>
  );
};

export default NotificationSettings;
