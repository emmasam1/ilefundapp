import { useState } from "react";
import { Switch } from "antd";
import profilePic from "../../assets/profile_bg.png";
import {
  UserOutlined,
  FireOutlined,
  CreditCardOutlined,
  HistoryOutlined,
  BankOutlined,
  QuestionCircleOutlined,
  LockOutlined,
  TeamOutlined,
  LogoutOutlined,
  RightOutlined,
} from "@ant-design/icons";

const menuItems = [
  { label: "Personal", icon: <UserOutlined /> },
  { label: "Active Goals", icon: <FireOutlined /> },
  { label: "Withdrawals", icon: <CreditCardOutlined /> },
  { label: "Transaction history", icon: <HistoryOutlined /> },
  { label: "Banks & Cards", icon: <BankOutlined /> },
  {
    label: "Help & Support",
    icon: <QuestionCircleOutlined />,
    image: "/house-image.jpg",
  },
  { label: "Privacy & Security", icon: <LockOutlined /> },
  { label: "Next of kin", icon: <TeamOutlined /> },
];

const Profile = () => {
  const [checked, setChecked] = useState(false);

  const onChange = (value) => {
    setChecked(value);
    console.log(`switch to ${value}`);
  };
  return (
    <div className="bg-white">
      <div className="h-[350px] relative">
        <img src={profilePic} alt="" className="w-full h-full object-fill" />
        <div className="absolute top-0 flex flex-col justify-center items-center w-full h-full ">
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

      <div className="mt-10">
        {menuItems.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between px-4 py-3 border-b hover:bg-gray-50"
          >
            <div className="flex items-center gap-3">
              <div className="text-blue-500 text-lg">{item.icon}</div>
              <div className="font-semibold text-sm text-gray-800">
                {item.label}
              </div>
            </div>

            {item.image ? (
              <img
                src={item.image}
                alt="item"
                className="w-24 h-16 rounded-md object-cover"
              />
            ) : (
              <RightOutlined className="text-gray-400 text-sm" />
            )}
          </div>
        ))}

        {/* Logout */}
        <div className="flex items-center justify-between px-4 py-3 hover:bg-red-50 cursor-pointer">
          <div className="flex items-center gap-3">
            <LogoutOutlined className="text-red-500 text-lg" />
            <span className="text-red-600 font-semibold text-sm">Logout</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
