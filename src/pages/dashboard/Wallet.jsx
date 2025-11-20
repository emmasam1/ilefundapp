import React, { useState, useEffect } from "react";
import { RiEyeCloseLine } from "react-icons/ri";
import { PiEye } from "react-icons/pi";
import cross from "../../assets/round_cross.png";
import convert from "../../assets/convert.png";
import withdraw from "../../assets/withdraw.png";
import ri_funds_line from "../../assets/ri_funds-line.png";
import hugeicons_savings from "../../assets/hugeicons_savings.png";
import fluent_savings from "../../assets/fluent_savings.png";
import arrow_long from "../../assets/arrow_long.png";
import { Link } from "react-router-dom";
import { useApp } from "../../context/AppContext.jsx";
import axios from "axios";
import { message, Skeleton } from "antd";

const Wallet = () => {
  const hiddenAmount = "****.00";
  const [isAmountVisible, setIsAmountVisible] = useState(false);

  const toggleAmountVisibility = () => {
    setIsAmountVisible(!isAmountVisible);
  };

  const [messageApi, contextHolder] = message.useMessage();
  const { API_BASE_URL, token } = useApp();
  const [wallets, setWallets] = useState([]);
  const [totalBalance, setTotalBalance] = useState(null);
  const [loadingWallets, setLoadingWallets] = useState(true);
  const [loadingBalance, setLoadingBalance] = useState(true);

  const walletStyles = {
    balling_goal: {
      bg: "bg-[#FF9500]",
      img: hugeicons_savings,
      label: "Balling",
      link: "/dashboard/wallet/balling",
    },
    home_goal: {
      bg: "bg-[#658FFB]",
      img: ri_funds_line,
      label: "Home Fund",
      link: "/dashboard/wallet/home-fund",
    },
    rainy_goal: {
      bg: "bg-[#9157EF]",
      img: fluent_savings,
      label: "Rainy Day",
      link: "/dashboard/wallet/rainy-day",
    },
  };

  const getUserWallet = async () => {
    setLoadingWallets(true);
    try {
      const res = await axios.get(`${API_BASE_URL}/api/v1/my-wallets`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) {
        setWallets(res.data.wallets);
      }
    } catch (error) {
      console.error(error);
      messageApi.error("Failed to fetch wallets");
    } finally {
      setLoadingWallets(false);
    }
  };

  const getAccumulative = async () => {
    setLoadingBalance(true);
    try {
      const res = await axios.get(`${API_BASE_URL}/api/v1/wallets/total-saved`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTotalBalance(res?.data?.totalAmount || 0);
    } catch (error) {
      console.error(error);
      messageApi.error("Failed to fetch balance");
    } finally {
      setLoadingBalance(false);
    }
  };

  useEffect(() => {
    getUserWallet();
    getAccumulative();
  }, []);

  return (
    <div className="p-4">
      {contextHolder}
      <h1 className="font-bold text-2xl">My Funds</h1>

      <div className="border border-gray-200 rounded-lg p-3 mt-3">
        <p className="text-gray-400 text-lg">Accumulative Balance</p>

        <div className="flex justify-between items-center mt-2">
          {loadingBalance ? (
            <Skeleton.Input active size="large" style={{ width: 160 }} />
          ) : (
            <h1 className="font-bold text-4xl">
              ₦{" "}
              {isAmountVisible
                ? totalBalance?.toLocaleString("en-NG", {
                    minimumFractionDigits: 2,
                  })
                : hiddenAmount}
            </h1>
          )}

          <div
            className="p-2 bg-[#12033A] rounded-md cursor-pointer"
            onClick={toggleAmountVisibility}
          >
            {isAmountVisible ? (
              <PiEye size={20} className="text-white" />
            ) : (
              <RiEyeCloseLine size={20} className="text-white" />
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex justify-center items-center gap-10 my-10">
        <Link to="/top-up-account" className="!text-black">
          <div className="flex flex-col justify-center items-center gap-1">
            <img src={cross} alt="" className="w-15 cursor-pointer" />
            <p className="font-semibold text-lg">Quick Save</p>
          </div>
        </Link>

        <div className="flex flex-col justify-center items-center gap-1">
          <img src={withdraw} alt="" className="w-15 cursor-pointer" />
          <p className="font-semibold text-lg">Withdraw</p>
        </div>

        <div className="flex flex-col justify-center items-center gap-1">
          <img src={convert} alt="" className="w-15 cursor-pointer" />
          <p className="font-semibold text-lg">Convert</p>
        </div>
      </div>

      {/* Wallets */}
      <div className="w-full lg:overflow-x-auto">
        <h1 className="mb-5 font-bold text-2xl">ILE Wallets</h1>
        <div className="flex items-center justify-between">
          <p className="text-[#B0B2C3] font-semibold">Wallets</p>
          <div className="flex items-center gap-3">
            <h1 className="font-bold">Fund Wallets</h1>
            <img src={arrow_long} alt="" className="w-8" />
          </div>
        </div>

        <div className="w-full overflow-x-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 min-w-[300px] pb-4">
            {loadingWallets
              ? [1, 2, 3].map((i) => (
                  <Skeleton.Button
                    key={i}
                    active
                    block
                    style={{
                      height: 120,
                      borderRadius: "12px",
                    }}
                  />
                ))
              : wallets.map((wallet) => {
                  const style = walletStyles[wallet.type];
                  if (!style) return null;
                  return (
                    <Link to={style.link} key={wallet._id} state={{ wallet }}>
                      <div
                        className={`${style.bg} p-5 rounded-lg flex items-center gap-4 bg-[url(/src/assets/card_bg_2.png)] bg-cover bg-center shadow-md`}
                      >
                        <img src={style.img} alt="" className="w-10" />
                        <div>
                          <h1 className="text-white text-lg">{style.label}</h1>
                          <h1 className="font-bold text-white text-xl sm:text-2xl">
                            ₦
                            {wallet.balance?.toLocaleString("en-NG", {
                              minimumFractionDigits: 2,
                            })}
                          </h1>
                        </div>
                      </div>
                    </Link>
                  );
                })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
