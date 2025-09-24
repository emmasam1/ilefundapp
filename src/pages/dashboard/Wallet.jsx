import React from "react";
import { RiEyeCloseLine } from "react-icons/ri";
import { PiEye } from "react-icons/pi";
import cross from "../../assets/round_cross.png";
import convert from "../../assets/convert.png";
import withdraw from "../../assets/withdraw.png";
import ri_funds_line from "../../assets/ri_funds-line.png";
import hugeicons_savings from "../../assets/hugeicons_savings.png";
import fluent_savings from "../../assets/fluent_savings.png";
import arrow_long from "../../assets/arrow_long.png";
import { Link } from "react-router";

const Wallet = () => {
  const amount = "12,854,886.00";
  const hiddenAmount = "****.00";
  const [isAmountVisible, setIsAmountVisible] = React.useState(false);

  const toggleAmountVisibility = () => {
    setIsAmountVisible(!isAmountVisible);
  };

  return (
    <div className="p-4">
      <h1 className="font-bold text-2xl">My Funds</h1>

      <div className="border border-gray-200 rounded-lg p-3 mt-3">
        <p className="text-gray-400 text-lg">Accumulative Balance</p>

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

      <div className="flex justify-center items-center gap-10 my-15">
        <Link to="/top-up-account" className="!text-black">
          <div className="flex flex-col justify-center items-center gap-1">
            <img src={cross} alt="" className="w-15 cursor-pointer" />
            <p className="font-semibold text-lg ">Quick Save</p>
          </div>
        </Link>
        <div className="flex flex-col justify-center items-center gap-1">
          <img src={withdraw} alt="" className="w-15 cursor-pointer" />
          <p className="font-semibold text-lg ">Withdraw</p>
        </div>
        <div className="flex flex-col justify-center items-center gap-1">
          <img src={convert} alt="" className="w-15 cursor-pointer" />
          <p className="font-semibold text-lg ">Convert</p>
        </div>
      </div>

      <div>
        <div className="w-full lg:overflow-x-auto">
          <h1 className="mb-5 font-bold text-2xl">ILE Wallets</h1>
          <div className="flex items-center justify-between">
            <p className="text-[#B0B2C3] font-semibold">Wallets</p>
            <div className="flex items-center gap-3">
              <h1 className="font-bold">Fund Wallets</h1>
              <img src={arrow_long} alt="" className="w-8" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:min-w-[900px] pb-4">
            {/* Item 1 */}
            <Link to="/dashboard/wallet/home-fund">
              <div className="bg-[#658FFB] p-6 rounded-lg flex items-center gap-4 py-8 cursor-pointer">
                <div>
                  <img src={ri_funds_line} alt="" className="w-11" />
                </div>
                <div>
                  <h1 className="text-white text-lg">Home Fund</h1>
                  <h1 className="font-bold text-white text-2xl">₦45,000.00</h1>
                </div>
              </div>
            </Link>

            {/* Item 2 */}
            <Link to="/dashboard/wallet/balling">
              <div className="bg-[#FF9500] p-6 rounded-lg flex items-center gap-4 py-8 cursor-pointer">
                <div>
                  <img src={hugeicons_savings} alt="" className="w-11" />
                </div>
                <div>
                  <h1 className="text-white text-lg">Balling</h1>
                  <h1 className="font-bold text-white text-2xl">₦3,500.00</h1>
                </div>
              </div>
            </Link>

            {/* Item 3 */}
            <Link to="/dashboard/wallet/rainy-day">
              <div className="bg-[#9157EF] p-6 rounded-lg flex items-center gap-4 py-8 cursor-pointer">
                <div>
                  <img src={fluent_savings} alt="" className="w-11" />
                </div>
                <div>
                  <h1 className="text-white text-lg">Rainy Day</h1>
                  <h1 className="font-bold text-white text-2xl">₦3,500.00</h1>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
