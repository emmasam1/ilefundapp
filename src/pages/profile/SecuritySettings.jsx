import React from "react";
import { Link } from "react-router"; 
import profilePic from "../../assets/profile_bg.png";
import user_img from "../../assets/user_img.png";
import notifications from "../../assets/notifications-outline.png";
import profile_privacy from "../../assets/profile_privacy.png";
import password from "../../assets/password.png";
import two_factor from "../../assets/2factor.png";
import bell from "../../assets/profile_bell.png";
import pin from "../../assets/pin.png";
import delete_account from "../../assets/delete_account.png";
import angle_right from "../../assets/angle-right-gray.png";
import { Switch } from "antd";

const SecuritySettings = () => {
  const menuItems = [
    {
      label: "Change Password",
      icon: <img src={password} className="w-10" />,
      link: "/dashboard/profile/change-password"
    },
    {
      label: "2-Factor Authentication",
      icon: <img src={two_factor} className="w-10" />,
    },
    {
      label: "Notification settings",
      icon: <img src={bell} className="w-10" />,
      link: "/dashboard/profile/notifications-settings", 
    },
    {
      label: "Pin/Passcode",
      icon: <img src={pin} className="w-10" />,
    },
    {
      label: "Delete Account",
      icon: <img src={delete_account} className="w-10" />,
    },
  ];

  return (
    <div className="bg-white pb-20">
      {/* Profile Banner */}
      <div className="h-[450px] relative">
        <img src={profilePic} alt="" className="w-full h-full object-fill" />
        <div className="absolute top-0 flex flex-col justify-center items-center w-full h-full">
          <div className="flex justify-end w-full px-8 gap-2 -mt-20">
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
          <h1 className="!text-white font-extrabold !text-5xl">
            Security Settings
          </h1>
          <div>
            <img src={profile_privacy} alt="" className="w-20 mt-10" />
          </div>
        </div>
      </div>

      {/* Settings List */}
      <div className="mt-10 w-11/12 mx-auto pb-20">
        {menuItems.map((item, idx) => {
          const content = (
            <div
              key={idx}
              className="flex items-center justify-between py-3 border-b border-gray-200 hover:bg-gray-50 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="text-blue-500 text-lg">{item.icon}</div>
                <div
                  className={`font-semibold text-sm ${
                    item.label === "Delete Account"
                      ? "text-red-500"
                      : "text-gray-800"
                  }`}
                >
                  <p className="font-semibold">{item.label}</p>
                </div>
              </div>

              {/* Right Side (Switch or Arrow) */}
              {item.label === "2-Factor Authentication" ? (
                <Switch />
              ) : item.label !== "Delete Account" ? (
                <img src={angle_right} alt="" className="w-6" />
              ) : null}
            </div>
          );

          // ✅ Wrap Notification settings in a <Link>
          return item.link ? (
            <Link key={idx} to={item.link}>
              {content}
            </Link>
          ) : (
            <div key={idx}>{content}</div>
          );
        })}
      </div>
    </div>
  );
};

export default SecuritySettings;
