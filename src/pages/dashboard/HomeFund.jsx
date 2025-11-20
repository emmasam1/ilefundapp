import React, { useState, useEffect } from "react";
import { Button, message, Empty, Skeleton } from "antd";
import { RiEyeCloseLine } from "react-icons/ri";
import { PiEye } from "react-icons/pi";
import withdraw from "../../assets/withdraw.png";
import cross from "../../assets/round_cross.png";
import cancel from "../../assets/cancel.png";
import greaterthan from "../../assets/angle-right-small-blue.png";
import { Link, useLocation } from "react-router-dom";
import img1 from "../../assets/light_icon_1.png";
import img2 from "../../assets/light_icon_2.png";
import { useApp } from "../../context/AppContext.jsx";
import axios from "axios";

const HomeFund = () => {
  const amount = "12,854,886.00";
  const hiddenAmount = "****.00";
  const [isAmountVisible, setIsAmountVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const { API_BASE_URL, token } = useApp();
  const [transactions, setTransactions] = useState([]);
  const [txnLoading, setTxnLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const { state } = useLocation();
  const wallet = state?.wallet;

  // ✅ Fetch transactions with pagination
  const getTransactionHistory = async (page = 1) => {
    if (!wallet?._id) return;

    setTxnLoading(true);
    try {
      const res = await axios.get(
        `${API_BASE_URL}/api/v1/transaction/wallet/${wallet._id}?page=${page}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        const { transactions, currentPage, totalPages } = res.data;
        setTransactions(transactions || []);
        setCurrentPage(currentPage || 1);
        setTotalPages(totalPages || 1);
      }
    } catch (error) {
      console.error(error);
      messageApi.error("Failed to fetch transactions");
    } finally {
      setTxnLoading(false);
    }
  };

   useEffect(() => {
      getTransactionHistory();
    }, []);

  const toggleAmountVisibility = () => {
    setIsAmountVisible(!isAmountVisible);
  };
  return (
    <div className="p-4">
      <h1 className="font-bold text-2xl">Home Fund</h1>

      <div className="border border-gray-200 rounded-lg p-3 mt-3">
        <p className="text-gray-400 text-lg">Wallet Balance</p>

        <div className="flex justify-between items-center mt-2">
          {loading ? (
            <Skeleton.Input active size="large" style={{ width: 160 }} />
          ) : (
            <h1 className="font-bold text-4xl">
              ₦{" "}
              {isAmountVisible
                ? wallet?.balance?.toLocaleString("en-NG", {
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

      <div className="flex justify-center items-center gap-10 my-15">
        <Link
          to="/top-up-account"
          state={{ accountName: "Home Fund Account", wallet }}
          className="!text-black"
        >
          {" "}
          <div className="flex flex-col justify-center items-center gap-1">
            <img src={cross} alt="" className="w-15 cursor-pointer" />
            <p className="font-semibold text-lg ">Top Up</p>
          </div>
        </Link>
        <div className="flex flex-col justify-center items-center gap-1">
          <img src={withdraw} alt="" className="w-15 cursor-pointer" />
          <p className="font-semibold text-lg ">Withdraw</p>
        </div>
      </div>

      <div className="bg-[#638cf368] rounded-2xl w-2/3 mx-auto p-9">
        <div className="flex justify-between items-center">
          <p className="font-bold mb-3">What is Home Goal?</p>
          <img src={cancel} alt="" className="w-5 -mt-3" />
        </div>
        <p className="text-[#8A8A8A]">
          Contrary to popular belief, Lorem Ipsum is not simply random text. It
          has roots in a piece of classical Latin literature from
        </p>
      </div>

      <div>
        <div className="flex justify-between items-center my-10">
          <h1 className="font-bold text-2xl">Recommendations</h1>
          <div className="flex items-center text-[#0047FF] cursor-pointer">
            <p className="font-bold">More Options</p>
            <img src={greaterthan} alt="" className="w-8 mt-1" />
          </div>
        </div>
        <div className="w-full lg:overflow-x-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:min-w-[900px] pb-4">
            <div className="bg-[#638cf368] rounded-lg p-5">
              <div className="flex justify-end">
                <Button className="!bg-[#0047FF] !rounded-full !text-white !border-none !text-xs">
                  EARN 4,000
                </Button>
              </div>
              <p className="text-2xl mt-3">
                Save ₦20,000 every month for{" "}
               <span className="text-[#0047FF]">Home Goal</span>
              </p>
            </div>
            <div className="bg-[#638cf368] rounded-lg p-5">
              <div className="flex justify-end">
                <Button className="!bg-[#0047FF] !rounded-full !text-white !border-none !text-xs">
                  EARN 4,000
                </Button>
              </div>
              <p className="text-2xl mt-3">
                Save ₦20,000 every month for{" "}
                 <span className="text-[#0047FF]">Home Goal</span>
              </p>
            </div>
            <div className="bg-[#638cf368] rounded-lg p-5">
              <div className="flex justify-end">
                <Button className="!bg-[#0047FF] !rounded-full !text-white !border-none !text-xs">
                  EARN 4,000
                </Button>
              </div>
              <p className="text-2xl mt-3">
                Save ₦20,000 every month for{" "}
                <span className="text-[#0047FF]">Home Goal</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div>
  
          {/* Transactions */}
      <div>
        <div className="flex justify-between items-center mb-5 pt-5">
          <h2 className="text-lg font-bold text-[#B0B2C3]">
            Recent Transactions
          </h2>
          <Link to="#" className="text-sm text-blue-600 font-bold hover:underline">
            <div className="flex items-center text-[#0047FF] cursor-pointer">
              <p className="font-bold">See all</p>
              <img src={greaterthan} alt="" className="w-6" />
            </div>
          </Link>
        </div>

        <div className="space-y-5">
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

              {/* ✅ Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-4">
                  <Pagination
                    current={currentPage}
                    total={totalPages * 10}
                    pageSize={10}
                    onChange={handlePageChange}
                    showSizeChanger={false}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
      </div>
    </div>
  );
};

export default HomeFund;
