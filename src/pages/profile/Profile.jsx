import { useState } from "react";
import { Switch, Button } from "antd";
import { Link, Outlet, useNavigate } from "react-router"; // ✅ Outlet added
import profilePic from "../../assets/profile_bg.png";

import angle_right from "../../assets/angle-right-gray.png";
import profile_user from "../../assets/profile_user.png";
import active from "../../assets/active.png";
import withdrawal from "../../assets/withdrawal.png";
import history from "../../assets/history.png";
import bank_card from "../../assets/bank_card.png";
import help_support from "../../assets/help_support.png";
import privacy from "../../assets/privacy.png";
import nextofkin from "../../assets/nextofkin.png";
import logout from "../../assets/logout.png";
import notifications from "../../assets/notifications-outline.png";
import user_img from "../../assets/user_img.png";
import copy_light_gray from "../../assets/copy-light-gray.png";
import baloom from "../../assets/baloom2.png";

const menuItems = [
  {
    label: "Personal",
    icon: <img src={profile_user} className="w-10" />,
    path: "/dashboard/profile/personal",
  },
  {
    label: "Active Goals",
    icon: <img src={active} className="w-10" />,
    path: "/dashboard/profile/goals",
  },
  {
    label: "Withdrawals",
    icon: <img src={withdrawal} className="w-10" />,
    path: "/dashboard/profile/withdrawals",
  },
  {
    label: "Transaction history",
    icon: <img src={history} className="w-10" />,
    path: "/dashboard/profile/history",
  },
  {
    label: "Banks & Cards",
    icon: <img src={bank_card} className="w-10" />,
    path: "/dashboard/profile/banks",
  },
  {
    label: "Help & Support",
    icon: <img src={help_support} className="w-10" />,
    path: "/dashboard/profile/support",
  },
  {
    label: "Privacy & Security",
    icon: <img src={privacy} className="w-10" />,
    path: "/dashboard/profile/privacy",
  },
  {
    label: "Next of kin",
    icon: <img src={nextofkin} className="w-10" />,
    path: "/dashboard/profile/nextofkin",
  },
];

const Profile = () => {
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();

  const onChange = (value) => {
    setChecked(value);
    console.log(`switch to ${value}`);
  };

  const handleLogout = () => {
    console.log("Logging out...");
    navigate("/login");
  };

  return (
    <div className="bg-white pb-20 ">
      {/* Profile Banner */}
      <div className="h-[450px] relative">
        <img src={profilePic} alt="" className="w-full h-full object-fill" />

        <div className="absolute top-0 flex flex-col justify-center items-center w-full h-full ">
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
          <h1 className="!text-white font-extrabold !text-5xl">Obi Afolabi</h1>
          <h1 className="!text-white font-extrabold !text-4xl mt-3">
            ₦0.
            <span className="font-extrabold !text-4xl text-gray-400">00</span>
          </h1>
          <p className="text-[#B0B2C3] mt-3 text-lg">Your account value</p>

          <div className="flex flex-col gap-3 mt-6 h-20 w-100">
            <div className="flex justify-between items-center w-full">
              <p className="text-white font-bold text-lg">
                Enable Finger Print/Face ID
              </p>
              <Switch checked={checked} onChange={onChange} />
            </div>
            <div className="flex justify-between items-center w-full">
              <p className="text-white font-bold text-lg">
                Show Dashboard Account Balance
              </p>
              <Switch checked={checked} onChange={onChange} />
            </div>
          </div>
        </div>
      </div>

      {/* Menu */}
      <div className="mt-10 w-11/12 mx-auto">
        {menuItems.map((item, idx) => (
          <Link
            to={item.path}
            key={idx}
            className="flex items-center justify-between py-3 border-b border-gray-200 hover:bg-gray-50"
          >
            <div className="flex items-center gap-3">
              <div className="text-blue-500 text-lg">{item.icon}</div>
              <div className="font-semibold text-sm text-gray-800">
                {item.label}
              </div>
            </div>
            <img src={angle_right} alt="" className="w-6" />
          </Link>
        ))}

        {/* Logout */}
        <div
          onClick={handleLogout}
          className="flex items-center justify-between py-3 hover:bg-red-50 cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <img src={logout} alt="" className="w-10" />
            <span className="text-red-600 font-semibold text-sm">Logout</span>
          </div>
        </div>
      </div>

      {/* ✅ Nested page will render here */}
      <div className="">
        <Outlet />
      </div>

      <div className="bg-[#0047FF1A] rounded-3xl mt-10 w-11/12 mx-auto flex p-5 gap-5">
        <div className="bg-[#F3CEF2] w-30 h-30 rounded-4xl flex justify-center items-center">
          <img src={baloom} alt="" className="w-15"/>
        </div>
        <div className="flex justify-between items-center w-full">
          <div className="flex flex-col gap-3">
            <h1 className="font-extrabold text-3xl">Invite Friends</h1>
            <p className="text-[#B0B2C3] font-semibold text-lg">Code LT55786</p>
            <Button className="!bg-[#12033A1A] !text-[#0047FF] !font-bold !border-none w-fit">Earn ₦1,500</Button>
          </div>
          <div>
            <img src={copy_light_gray} alt="" className="w-15"/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
