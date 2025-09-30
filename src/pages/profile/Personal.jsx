import React from "react";
import profilePic from "../../assets/profile_bg.png";
import notifications from "../../assets/notifications-outline.png";
import user_img from "../../assets/user_img.png";
import profile_camera from "../../assets/profile_camera.png";
import profile_user_img from "../../assets/profile_user_img.png";

import angle_right from "../../assets/angle-right-gray.png";
import profile_user from "../../assets/profile_user.png";
import phone from "../../assets/phone.png";
import email from "../../assets/email.png";
import occupation from "../../assets/occupation.png";
import flag from "../../assets/flag.png";
import cake from "../../assets/cake.png";
import office from "../../assets/office.png";
import nextofkin from "../../assets/nextofkin.png";
import copy_light from "../../assets/copy-light.png";

import { CiEdit } from "react-icons/ci";
import { Link } from "react-router";

const Personal = () => {
  const menuItems = [
    {
      label: "Full Name",
      details: "Mr. Afolabi Obi",
      icon: <img src={profile_user} className="w-10" />,
    },
    {
      label: "Active Goals",
      details: "09088123456",
      icon: <img src={phone} className="w-10" />,
    },
    {
      label: "Email Address",
      details: "Email: Obiafolabi@gmail.com",
      icon: <img src={email} className="w-10" />,
    },
    {
      label: "Occupation",
      details: "Civil servant",
      icon: <img src={occupation} className="w-10" />,
    },
    {
      label: "Country of Residence",
      details: "Nigeria",
      icon: <img src={flag} className="w-10" />,
    },
    {
      label: "Birthday",
      details: "14/****",
      icon: <img src={cake} className="w-10" />,
    },
    {
      label: "Office Address",
      details: "127 avenue, road 1256",
      sub_details: "Medina, SA",
      icon: <img src={office} className="w-10" />,
    },
    {
      label: "Next of kin",
      details: "Young Bat",
      icon: <img src={nextofkin} className="w-10" />,
    },
    {
      label: "Referral Link",
      details: "Ref8765-fgdfsd",
      icon: <img src={nextofkin} className="w-10" />,
    },
  ];
  return (
    <div className="bg-white">
      <div className="h-[450px] relative">
        <img src={profilePic} alt="" className="w-full h-full object-fill" />
        <div className="absolute -top-4 gap-3.5 flex flex-col justify-center items-center w-full h-full ">
          <div className="flex justify-end w-full px-8 gap-2">
            <div className="flex items-center gap-3">
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
          </div>
          <h1 className="!text-white font-semibold !text-2xl">Profile</h1>
          <div className="relative rounded-full h-45 w-45">
            <img
              src={profile_user_img}
              alt=""
              className="w-full h-full rounded-full"
            />
            <img
              src={profile_camera}
              alt=""
              className="w-10 absolute top-0 -right-2"
            />
          </div>
          <h1 className="!text-white font-bold !text-2xl">Obi Afolabi</h1>
          <p className="text-[#B0B2C3] mt-3 text-lg">
            Email: Obiafolabi@gmail.com
          </p>
        </div>
      </div>

      <div className="flex justify-end p-6">
        <Link to="/dashboard/profile/edit-profile">
        <div className="rounded-full w-10 h-10 bg-[#F3CEF2] flex justify-center items-center cursor-pointer">
          <CiEdit size={20} />
        </div>
        </Link>
      </div>

      {/* Menu */}
      <div className="mt-10 w-11/12 mx-auto pb-20">
        {menuItems.map((item, idx) => (
          <div className="flex items-center justify-between py-3 border-b border-gray-200 hover:bg-gray-50">
            <div className="flex items-center gap-3">
              <div className="text-blue-500 text-lg">{item.icon}</div>
              <div className="font-semibold text-sm text-gray-800">
                <p className="!text-[#B0B2C3] font-semibold"> {item.label}</p>
                <h1
                  className={`${
                    item.label === "Referral Link"
                      ? "text-blue-500 font-bold"
                      : "text-gray-800"
                  }`}
                >
                  {item.details}
                </h1>
                <p className="text-xs">{item.sub_details}</p>
              </div>
            </div>
            {item.label === "Next of kin" ? (
              <img src={angle_right} alt="" className="w-6" />
            ) : null}
            {item.label === "Referral Link" ? (
              <img src={copy_light} alt="" className="w-6" />
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Personal;
