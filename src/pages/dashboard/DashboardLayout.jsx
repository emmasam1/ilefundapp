import React, { useState, useEffect } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  DownOutlined,
} from "@ant-design/icons";
import {
  Button,
  Layout,
  Menu,
  theme,
  Divider,
  Grid,
  Dropdown,
  Space,
  Skeleton,
  message,
} from "antd";
import { Outlet, Link, useLocation, useNavigate } from "react-router";
import logo from "../../assets/logo.png";
import userIcon from "../../assets/User.png";
import wallet from "../../assets/wallet.png";
import listing from "../../assets/listing.png";
import goals from "../../assets/goals.png";
import credit from "../../assets/credit.png";
import notifications from "../../assets/notifications.png";
import user_img from "../../assets/user_img.png";
import axios from "axios";
import { useApp } from "../../context/AppContext";

const { Header, Sider, Content } = Layout;
const { useBreakpoint } = Grid;

const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [userName, setUserName] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  const {
    token: { borderRadiusLG },
  } = theme.useToken();

  const { API_BASE_URL, token, logout } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const screens = useBreakpoint();

  // Fetch user profile
  const getUserProfile = async () => {
    try {
      setLoadingUser(true);
      const res = await axios.get(`${API_BASE_URL}/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const firstName = res?.data?.user?.firstName;
      const lastName = res?.data?.user?.lastName;
      setUserName(`${firstName} ${lastName}`);
    } catch (error) {
      console.error(error);
      message.error("Failed to fetch user profile");
    } finally {
      setLoadingUser(false);
    }
  };

  useEffect(() => {
    if (token) getUserProfile();
  }, [token]);

  // Logout handler
  const logUserOut = async () => {
    try {
      await axios.post(
        `${API_BASE_URL}/logout`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      logout(); // from context
      message.success("Logged out successfully");
      navigate("/");
    } catch (error) {
      console.error(error);
      message.error("Logout failed");
    }
  };

  const items = [
    {
      label: (
        <span onClick={logUserOut} style={{ cursor: "pointer" }}>
          Logout
        </span>
      ),
      key: "0",
    },
  ];

  // Greeting message
  const [greeting, setGreeting] = useState("");

  const computeGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  useEffect(() => {
    setGreeting(computeGreeting());
    const id = setInterval(() => setGreeting(computeGreeting()), 60000);
    return () => clearInterval(id);
  }, []);

  // collapse sidebar on small screens
  useEffect(() => {
    setCollapsed(!screens.lg);
  }, [screens]);

  // map routes to menu
  const menuKeyMap = {
    "/dashboard": "1",
    // "/dashboard/invest": "2",
    "/dashboard/wallet": "2",
    "/dashboard/listing": "3",
    "/dashboard/goals": "4",
    "/dashboard/profile": "5",
  };

  const getSelectedKey = () => {
    if (location.pathname.startsWith("/dashboard/wallet")) return "3";
    if (location.pathname.startsWith("/dashboard/listing")) return "4";
    if (location.pathname.startsWith("/dashboard/goals")) return "5";
    if (location.pathname.startsWith("/dashboard/profile")) return "6";
    return menuKeyMap[location.pathname] || "1";
  };

  return (
    <Layout hasSider>
      {/* Sidebar */}
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        className="!bg-[#EAEAEA] !fixed left-0 top-0 !h-screen z-50"
        width={220}
      >
        {/* Logo */}
        <div className="flex items-center justify-center">
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: 16, width: 64, height: 64 }}
            className="mt-3"
          />
          <img
            src={logo}
            alt="logo"
            className={`${collapsed ? "hidden" : "w-30"}`}
          />
        </div>
        <Divider />

        {/* Menu */}
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
              icon: <img src={userIcon} alt="" className="w-7" />,
              label: <Link to="/dashboard/profile">Profile</Link>,
            },
          ]}
        />
        <Divider />
      </Sider>

      {/* Main Layout */}
      <Layout
        style={{
          marginLeft: collapsed ? 80 : 220,
          transition: "margin-left 0.2s",
          minHeight: "100vh",
        }}
      >
        {/* Header */}
        {!location.pathname.startsWith("/dashboard/profile") && (
          <Header className="!bg-white flex justify-between items-center sticky top-0 z-40 shadow-sm px-6">
            <div>
              {loadingUser ? (
                <Skeleton.Input active size="small" style={{ width: 150 }} />
              ) : (
                <h1 className="font-bold text-2xl/7 capitalize">
                  {userName || "User"},
                </h1>
              )}
              <p className="text-gray-400 mt-3">{greeting}</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute bg-[#FF5050] text-white rounded-full w-5 h-5 flex justify-center items-center -top-1 right-0">
                  0
                </div>
                <img src={notifications} alt="notifications" className="w-7" />
              </div>
              <Dropdown menu={{ items }} trigger={["click"]}>
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    <div className="h-12 w-12 rounded-full">
                      <img
                        src={user_img}
                        alt="user avatar"
                        className="rounded-full object-cover h-12 w-12"
                      />
                    </div>
                    <DownOutlined />
                  </Space>
                </a>
              </Dropdown>
            </div>
          </Header>
        )}

        {/* Main Content */}
        <Content
          style={
            location.pathname.includes("/dashboard/profile")
              ? {}
              : {
                  margin: "24px 16px",
                  minHeight: 280,
                  background: "white",
                }
          }
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
