import React, { useState, useEffect } from "react";
import { RiEyeCloseLine } from "react-icons/ri";
import { PiEye } from "react-icons/pi";
import axios from "axios";
import { Link } from "react-router";
import { Skeleton } from "antd";
import { useApp } from "../../context/AppContext";
import image1 from "../../assets/prop-img.png";

const Goals = () => {
  const [isAmountVisible, setIsAmountVisible] = useState(false);
  const { API_BASE_URL, token } = useApp();
  const [loading, setLoading] = useState(false);

  const [portfolio, setPortfolio] = useState({
    active: [],
    completed: [],
    terminated: [],
  });

  const toggleAmountVisibility = () => {
    setIsAmountVisible(!isAmountVisible);
  };

  const getUserPortfolio = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${API_BASE_URL}/api/properties/my-portfolio`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setPortfolio(res.data.data.portfolio);
    } catch (error) {
      console.error("Portfolio error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserPortfolio();
  }, []);

  const amount = "12,854,886.00";
  const hiddenAmount = "****.00";

  const renderPortfolioCards = (items) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Skeleton loader */}
      {loading &&
        Array(6)
          .fill(0)
          .map((_, index) => (
            <div key={index} className="border rounded-xl p-3">
              <Skeleton.Image
                active
                style={{ width: "100%", height: 150 }}
              />
              <Skeleton active paragraph={{ rows: 3 }} />
            </div>
          ))}

      {/* Real data */}
      {!loading &&
        items?.map((item) => (
          <Link
            key={item.refId}
            to={`/dashboard/goals/goal-detail/${item.refId}`}
          >
            <div className="relative bg-[url(/src/assets/house_bg.png)] bg-cover bg-no-repeat bg-center text-white rounded-2xl overflow-hidden p-3">
              <div className="relative z-10">
                <div className="flex gap-2.5">
                  <div className="bg-white rounded-md w-20 flex gap-2 items-center px-2">
                    <img src={image1} alt="" className="w-5" />
                    <h1 className="text-[#0047FF]">Assest</h1>
                  </div>
                  <h2 className="text-lg font-bold">
                    {item.propertyName}
                  </h2>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-extrabold mt-2">
                      ₦{item.amountPaid.toLocaleString()}
                    </h3>
                    <p className="text-sm text-gray-200">
                      out of ₦{item.totalAmount.toLocaleString()} (
                      {item.percentagePaid}%)
                    </p>
                  </div>

                  <div className="mt-2">
                    <p className="text-gray-300 text-sm text-right">
                      Monthly Due
                    </p>
                    <h4 className="font-bold text-right">
                      ₦
                      {item.monthlyDue
                        ? item.monthlyDue.toLocaleString()
                        : 0}
                    </h4>
                  </div>
                </div>

                <div className="flex justify-between mt-2">
                  <div>
                    <p className="text-gray-300 text-sm">Remaining</p>
                    <h4 className="font-bold">
                      ₦{item.balance.toLocaleString()}
                    </h4>
                  </div>
                  <div>
                    <p className="text-gray-300 text-sm text-right">
                      Next Payment
                    </p>
                    <h4 className="font-bold text-right">
                      {item.nextPaymentDate || "—"}
                    </h4>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-700 h-2 rounded-full mt-4">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${item.percentagePaid}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </Link>
        ))}
    </div>
  );

  return (
    <div className="p-4">
      <h1 className="font-bold text-2xl">My Portfolio</h1>

      {/* Top Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {["Accumulative Balance", "Accumulated Capital", "Total Assets"].map(
          (label) => (
            <div
              key={label}
              className="border border-gray-200 rounded-lg p-3 mt-3"
            >
              <p className="text-gray-400 text-lg">{label}</p>

              <div className="flex justify-between items-center mt-2">
                <h1 className="font-bold text-4xl">
                  ₦ {isAmountVisible ? amount : hiddenAmount}
                </h1>

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
          )
        )}
      </div>

      {/* Active */}
      <div className="mt-10">
        <h1 className="font-bold text-lg mb-5">Active Assets</h1>
        {renderPortfolioCards(portfolio.active)}
      </div>

      {/* Completed */}
      {portfolio.completed.length > 0 && (
        <div className="mt-10">
          <h1 className="font-bold text-lg mb-5">Completed Assets</h1>
          {renderPortfolioCards(portfolio.completed)}
        </div>
      )}

      {/* Terminated */}
      {portfolio.terminated.length > 0 && (
        <div className="mt-10">
          <h1 className="font-bold text-lg mb-5">Terminated Assets</h1>
          {renderPortfolioCards(portfolio.terminated)}
        </div>
      )}
    </div>
  );
};

export default Goals;
