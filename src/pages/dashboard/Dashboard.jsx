import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { Progress, message, Skeleton, Pagination, Empty } from "antd";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import ri_funds_line from "../../assets/ri_funds-line.png";
import hugeicons_savings from "../../assets/hugeicons_savings.png";
import fluent_savings from "../../assets/fluent_savings.png";
import arrow_long from "../../assets/arrow_long.png";
import img1 from "../../assets/light_icon_1.png";
import img2 from "../../assets/light_icon_2.png";
import house from "../../assets/house.png";
import pin from "../../assets/pin.svg";
import button from "../../assets/button.png";
import greaterthan from "../../assets/angle-right-small-blue.png";
import { useApp } from "../../context/AppContext.jsx";

const Dashboard = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  const items = [1, 2, 3, 4];

  const [messageApi, contextHolder] = message.useMessage();
  const { API_BASE_URL, token } = useApp();

  const [loading, setLoading] = useState(false);
  const [wallets, setWallets] = useState([]);

  const [txnLoading, setTxnLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  const walletStyles = {
    balling_goal: {
      bg: "bg-[#FF9500]",
      img: hugeicons_savings,
      label: "Balling",
    },
    home_goal: {
      bg: "bg-[#658FFB]",
      img: ri_funds_line,
      label: "Home Fund",
    },
    rainy_goal: {
      bg: "bg-[#9157EF]",
      img: fluent_savings,
      label: "Rainy Day",
    },
  };

  // === Fetch User Wallets ===
  const getUserWallet = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE_URL}/my-wallets`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.success) {
        setWallets(res.data.wallets);
      }
    } catch (error) {
      console.log(error);
      messageApi.error("Failed to fetch wallets");
    } finally {
      setLoading(false);
    }
  };

  // === Fetch Transaction History ===
  const getTransactionHistory = async (page = 1) => {
    setTxnLoading(true);
    try {
      const res = await axios.get(
        `${API_BASE_URL}/transaction/history?page=${page}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.data.success) {
        setTransactions(res.data.transactions || []);
        setCurrentPage(res.data.currentPage || 1);
        setTotalPages(res.data.totalPages || 1);
        setTotal(res.data.total || 0); // capture total transactions count
      }
    } catch (error) {
      console.log(error);
      messageApi.error("Failed to fetch transactions");
    } finally {
      setTxnLoading(false);
    }
  };

  useEffect(() => {
    getUserWallet();
    getTransactionHistory();
  }, []);

  // === Handle Pagination ===
  const handlePageChange = (page) => {
    setCurrentPage(page);
    getTransactionHistory(page);
  };

  return (
    <div className="p-2">
      {contextHolder}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left side */}
        <div className="w-full md:w-[65%]">
          {/* Wallet Section */}
          <div className="flex justify-between items-center text-lg px-2">
            <h1 className="text-[#B0B2C3] font-bold">Wallets</h1>
            <div className="flex items-center gap-3">
              <h1 className="font-bold">Fund Wallets</h1>
              <img src={arrow_long} alt="" className="w-6 sm:w-8" />
            </div>
          </div>

          {/* Wallets Grid */}
          <div className="w-full overflow-x-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 min-w-[300px] pb-4">
              {loading
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
                      <div
                        key={wallet._id}
                        className={`${style.bg} py-5 px-2 rounded-lg flex items-center gap-4 bg-[url(/src/assets/card_bg_2.png)] bg-cover bg-center`}
                      >
                        <img src={style.img} alt="" className="w-10" />
                        <div>
                          <h1 className="text-white text-lg">{style.label}</h1>
                          <h1 className="font-bold text-white text-sm sm:text-lg">
                            ₦
                            {wallet.balance?.toLocaleString("en-NG", {
                              minimumFractionDigits: 2,
                            })}
                          </h1>
                        </div>
                      </div>
                    );
                  })}
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="mt-4 bg-white rounded-2xl p-4">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-lg font-bold text-[#B0B2C3]">
                Recent Transactions
              </h2>
              <Link
                to="#"
                className="text-sm text-blue-600 font-bold flex items-center"
              >
                See all <img src={greaterthan} alt="" className="w-5 ml-1" />
              </Link>
            </div>

            {txnLoading ? (
              <div className="space-y-5">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex justify-between">
                    <Skeleton.Avatar active size="large" />
                    <Skeleton.Input active block style={{ width: "70%" }} />
                  </div>
                ))}
              </div>
            ) : transactions.length === 0 ? (
              <Empty description="No transaction history yet" />
            ) : (
              <>
                <div className="space-y-5">
                  {transactions.map((txn, i) => (
                    <div
                      key={i}
                      className="flex justify-between items-start border-b border-gray-100 pb-2"
                    >
                      <div className="flex items-center space-x-2">
                        <img
                          src={txn.type === "credit" ? img2 : img1}
                          className="w-8 h-8 rounded-lg"
                          alt="icon"
                        />
                        <div>
                          <p className="text-gray-800 font-medium">
                            {txn.description || "Transaction"}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(txn.createdAt).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`${
                          txn.description?.toLowerCase().includes("funded")
                            ? "text-[#34C759]"
                            : "text-[#FF2D55]"
                        } bg-[#E2E3FF] px-5 py-2 text-xs font-semibold rounded-lg`}
                      >
                        {txn.type === "credit" ? "+" : "-"}₦
                        {Number(txn.amount).toLocaleString("en-NG", {
                          minimumFractionDigits: 2,
                        })}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center mt-4">
                    <Pagination
                      current={currentPage}
                      total={total} // ✅ Correct total number of items
                      pageSize={Math.ceil(total / totalPages) || 10} // ✅ dynamically calculate
                      onChange={handlePageChange}
                      showSizeChanger={false}
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Right side (Active Goals + Properties) */}
        <div className="w-full md:w-[35%]">
          <div className="flex justify-between items-center text-lg px-2">
            <h1 className="text-[#B0B2C3] font-bold">Active Goals</h1>
            <Link to="#" className="text-sm text-blue-600 font-bold">
              See all &gt;
            </Link>
          </div>

     <Slider {...settings}>
  {items.map((item, i) => (
    <div key={i} className="px-2">
      <div className="h-48 w-full rounded-3xl bg-[url('/src/assets/house_bg.png')] bg-cover bg-center p-4 flex flex-col justify-between">
        
        {/* Title */}
        <div>
          <p className="text-white font-bold sm:text-lg !text-sm">
            4 Bedroom duplex
          </p>

          <h1 className="text-white font-extrabold text-lg sm:text-2xl mt-1">
            ₦36,540.00
          </h1>

          <p className="text-white font-medium text-xs sm:text-sm mt-1">
            out of 2,500,000 (14%)
          </p>
        </div>

        {/* Bottom Section */}
        <div>
          <h1 className="text-white font-bold text-sm sm:text-base">
            ₦2,116,460.00{" "}
            <span className="font-normal">remaining</span>
          </h1>

          {/* Progress bar */}
          <Progress
            percent={30}
            strokeColor="#ffffff"
            trailColor="rgba(255,255,255,0.3)"
            size="small"
            className="[&_.ant-progress-text]:text-white [&_.ant-progress-text]:!font-bold mt-1"
          />
        </div>
      </div>
    </div>
  ))}
</Slider>


          {/* Listed Properties */}
          <div className="mt-6">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-bold text-[#B0B2C3]">
                Listed Properties
              </h2>
              <Link to="#" className="text-sm text-blue-600 font-bold">
                See all &gt;
              </Link>
            </div>

            <div className="flex flex-col gap-4">
              {[1, 2].map((_, i) => (
                <div
                  key={i}
                  className="border rounded-2xl border-gray-300 overflow-hidden"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3">
                    <div
                      className="col-span-1 relative h-32 md:h-auto bg-cover bg-center"
                      style={{ backgroundImage: `url(${house})` }}
                    >
                      <div className="absolute bg-[#E2BABA] text-[#C40000] px-2 py-1 text-xs font-bold rounded-md top-2 left-2">
                        50% Discount
                      </div>
                    </div>
                    <div className="p-3 col-span-2">
                      <h2 className="font-bold text-sm">
                        4 Semi detached-duplex with 2 room BQ
                      </h2>
                      <div className="flex items-center py-1">
                        <img src={pin} alt="" className="w-3 mr-1" />
                        <p className="text-[#B0B2C3] text-xs">
                          Big land city Apo hilltop
                        </p>
                      </div>
                      <div className="flex justify-between items-baseline">
                        <h1 className="font-bold text-sm">₦13,000,000</h1>
                        <p className="font-bold text-xs">500 SQM</p>
                      </div>
                      <div className="flex justify-between items-baseline mt-1">
                        <div>
                          <h1 className="font-bold text-xs">₦1,500,000</h1>
                          <p className="text-[#B0B2C3] text-[0.7rem]">
                            Weekly deposit
                          </p>
                        </div>
                        <div>
                          <h1 className="font-bold text-xs">₦1,500,000</h1>
                          <p className="text-[#B0B2C3] text-[0.7rem]">
                            Duration
                          </p>
                        </div>
                      </div>
                      <img
                        src={button}
                        alt=""
                        className="cursor-pointer w-28 mt-2"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
