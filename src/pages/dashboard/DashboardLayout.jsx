import React, { useState, useEffect } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme, Divider, Grid } from "antd";
import { Outlet, Link, useLocation } from "react-router"; // still using react-router
import logo from "../../assets/logo.png";
import user from "../../assets/User.png";
import wallet from "../../assets/wallet.png";
import listing from "../../assets/listing.png";
import goals from "../../assets/goals.png";
import credit from "../../assets/credit.png";
import notifications from "../../assets/notifications.png";
import user_img from "../../assets/user_img.png";

const { Header, Sider, Content } = Layout;
const { useBreakpoint } = Grid;

const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { borderRadiusLG },
  } = theme.useToken();

  const location = useLocation();
  const screens = useBreakpoint();

  // ✅ Greeting state
  const [greeting, setGreeting] = useState("");

  const computeGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  useEffect(() => {
    // set initial greeting
    setGreeting(computeGreeting());

    // update every minute so it changes if user leaves page open
    const id = setInterval(() => {
      setGreeting(computeGreeting());
    }, 60 * 1000);

    return () => clearInterval(id);
  }, []);

  // collapse sidebar automatically on small screens
  useEffect(() => {
    if (!screens.lg) {
      setCollapsed(true);
    } else {
      setCollapsed(false);
    }
  }, [screens]);

  // map route paths to menu keys
  const menuKeyMap = {
    "/dashboard": "1",
    "/dashboard/invest": "2",
    "/dashboard/wallet": "3",
    "/dashboard/listing": "4",
    "/dashboard/goals": "5",
    "/dashboard/profile": "6",
  };

  // ensure wallet stays active on nested routes like /dashboard/wallet/home-fund
  const getSelectedKey = () => {
    if (location.pathname.startsWith("/dashboard/wallet")) return "3";
    if (location.pathname.startsWith("/dashboard/listing")) return "4";
    return menuKeyMap[location.pathname] || "1";
  };

  return (
    <Layout hasSider>
      {/* Fixed Sidebar */}
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        className="!bg-[#EAEAEA] !fixed left-0 top-0 !h-screen z-50 "
        width={220}
      >
        {/* Logo + Toggle */}
        <div className="flex items-center justify-center">
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
            className="mt-3"
          />
          <img
            src={logo}
            alt="logo"
            className={`${collapsed ? "hidden" : "w-30"}`}
          />
        </div>

        <Divider />

        {/* Sidebar Menu */}
        <Menu
          className="!bg-[#EAEAEA]"
          mode="inline"
          selectedKeys={[getSelectedKey()]}
          items={[
            {
              key: "1",
              icon: <UserOutlined />,
              label: <Link to="/dashboard">Home</Link>,
            },
            {
              key: "2",
              icon: <img src={credit} alt="" className="w-7" />,
              label: <Link to="/dashboard/invest">Invest</Link>,
            },
            {
              key: "3",
              icon: <img src={wallet} alt="" className="w-7" />,
              label: <Link to="/dashboard/wallet">Wallet</Link>,
            },
            {
              key: "4",
              icon: <img src={listing} alt="" className="w-7" />,
              label: <Link to="/dashboard/listing">Listing</Link>,
            },
            {
              key: "5",
              icon: <img src={goals} alt="" className="w-7" />,
              label: <Link to="/dashboard/goals">Goals</Link>,
            },
            {
              key: "6",
              icon: <img src={user} alt="" className="w-7" />,
              label: <Link to="/dashboard/profile">Profile</Link>,
            },
          ]}
        />

        <Divider />
      </Sider>

      <Layout
        style={{
          marginLeft: collapsed ? 80 : 220,
          transition: "margin-left 0.2s",
          minHeight: "100vh",
        }}
      >
        {/* Fixed Header */}
        <Header className="!bg-white flex justify-between items-center sticky top-0 z-40 shadow-sm px-6">
          <div>
            <h1 className="font-bold text-2xl/7">Hello Rachael,</h1>
            {/* ✅ Now uses state */}
            <p className="text-gray-400 mt-3">{greeting}</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute bg-[#FF5050] text-white rounded-full w-5 h-5 flex justify-center items-center -top-1 right-0">
                0
              </div>
              <img src={notifications} alt="notifications" className="w-7" />
            </div>
            <div className="h-12 w-12 rounded-full">
              <img
                src={user_img}
                alt="user avatar"
                className="rounded-full object-cover h-12 w-12"
              />
            </div>
          </div>
        </Header>

        {/* Main Content */}
        <Content
          style={{
            margin: "24px 16px",
            minHeight: 280,
            background: "white",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
