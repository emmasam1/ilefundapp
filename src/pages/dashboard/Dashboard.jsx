import React from "react";
import { Link } from "react-router";
import ri_funds_line from "../../assets/ri_funds-line.png";
import hugeicons_savings from "../../assets/hugeicons_savings.png";
import fluent_savings from "../../assets/fluent_savings.png";
import arrow_long from "../../assets/arrow_long.png";
import img1 from "../../assets/light_icon_1.png";
import img2 from "../../assets/light_icon_2.png";
import house from "../../assets/house.png";
import pin from "../../assets/pin.svg";
import button from "../../assets/button.png";
import { Progress } from "antd";
import greaterthan from "../../assets/angle-right-small-blue.png";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Dashboard = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-5 p-2">
        {/* Left side - bigger */}
        <div className="w-full md:w-[650px]">
          <div className="flex justify-between items-center text-lg px-2">
            <h1 className="text-[#B0B2C3] font-bold">Wallets</h1>
            <div className="flex items-center gap-3">
              <h1 className="font-bold">Fund Wallets</h1>
              <img src={arrow_long} alt="" className="w-8" />
            </div>
          </div>
          <div className="w-full lg:overflow-x-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:min-w-[900px] pb-4">
              {/* Item 1 */}
              <div className="bg-[#658FFB] p-6 rounded-lg flex items-center gap-4 py-8">
                <div>
                  <img src={ri_funds_line} alt="" className="w-11" />
                </div>
                <div>
                  <h1 className="text-white text-lg">Home Fund</h1>
                  <h1 className="font-bold text-white text-2xl">₦45,000.00</h1>
                </div>
              </div>

              {/* Item 2 */}
              <div className="bg-[#FF9500] p-6 rounded-lg flex items-center gap-4 py-8">
                <div>
                  <img src={hugeicons_savings} alt="" className="w-11" />
                </div>
                <div>
                  <h1 className="text-white text-lg">Balling</h1>
                  <h1 className="font-bold text-white text-2xl">₦3,500.00</h1>
                </div>
              </div>

              {/* Item 3 */}
              <div className="bg-[#9157EF] p-6 rounded-lg flex items-center gap-4 py-8">
                <div>
                  <img src={fluent_savings} alt="" className="w-11" />
                </div>
                <div>
                  <h1 className="text-white text-lg">Rainy Day</h1>
                  <h1 className="font-bold text-white text-2xl">₦3,500.00</h1>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 p-3">
            {/* <!-- Left Column --> */}
            <div className="">
              <div className=" bg-white rounded-2xl">
                {/* Header */}
                <div className="flex justify-between items-center mb-5 pt-5">
                  <h2 className="text-lg font-bold text-[#B0B2C3]">
                    Recent Transactions
                  </h2>
                  <Link
                    to="#"
                    className="text-sm text-blue-600 font-bold hover:underline"
                  >
                    <div className="flex items-center text-[#0047FF] cursor-pointer">
                      <p className="font-bold">See all</p>
                      <img src={greaterthan} alt="" className="w-6" />
                    </div>
                  </Link>
                </div>

                {/* Transactions List */}
                <div className="space-y-5">
                  {/* Transaction Row */}
                  <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-2">
                      <img
                        src={img1}
                        className="w-8 h-8 rounded-lg"
                        alt="icon"
                      />
                      <div>
                        <p className="text-gray-800">
                          Savings used to start a{" "}
                          <span className="font-bold">new goal</span>.
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          22 Days Ago
                        </p>
                      </div>
                    </div>
                    <span className="flex text-[#0047FF] bg-[#E2E3FF] px-5 py-2 text-xs font-semibold rounded-lg">
                      -₦250,000
                    </span>
                  </div>

                  {/* Row 2 */}
                  <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-2">
                      <img
                        src={img2}
                        className="w-8 h-8 rounded-lg"
                        alt="icon"
                      />
                      <div>
                        <p className="text-gray-800">
                          Goal Successful{" "}
                          <span className="font-bold">funded</span>.
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          22 Days Ago
                        </p>
                      </div>
                    </div>
                    <span className="text-[#0047FF] bg-[#E2E3FF] px-5 py-2 text-xs font-semibold rounded-lg">
                      -₦250,000
                    </span>
                  </div>

                  {/* Row 3 */}
                  <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-2">
                      <img
                        src={img1}
                        className="w-8 h-8 rounded-lg"
                        alt="icon"
                      />
                      <div>
                        <p className="text-gray-800 ">
                          Withdrawal <span className="font-bold">Approved</span>
                          .
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Today – 12th Mar 2023
                        </p>
                      </div>
                    </div>
                    <span className="text-[#FF2D55] bg-[#E2E3FF] px-5 py-2 text-xs font-semibold rounded-lg">
                      -₦250,000
                    </span>
                  </div>

                  {/* Row 4 */}
                  <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-2">
                      <img
                        src={img2}
                        className="w-8 h-8 rounded-lg"
                        alt="icon"
                      />
                      <div>
                        <p className="text-gray-800">
                          Naira account{" "}
                          <span className="font-bold">credited</span>.
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          4 Weeks Ago
                        </p>
                      </div>
                    </div>
                    <span className="text-[#34C759] bg-[#E2E3FF] px-5 py-2 text-xs font-semibold rounded-lg">
                      +₦250,000
                    </span>
                  </div>

                  {/* Row 5 */}
                  <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-2">
                      <img
                        src={img1}
                        className="w-8 h-8 rounded-lg"
                        alt="icon"
                      />
                      <div>
                        <p className="text-gray-800">
                          Dollar account{" "}
                          <span className="font-bold">credited</span>.
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          5 Weeks Ago
                        </p>
                      </div>
                    </div>
                    <span className="text-[#34C759] bg-[#E2E3FF] px-5 py-2 text-xs font-semibold rounded-lg">
                      +₦250,000
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - smaller */}
        <div className="w-full md:w-[430px]">
          <div className="flex justify-between items-center text-lg px-2">
            <h1 className="text-[#B0B2C3] font-bold">Active Goals</h1>
            <Link
              to="#"
              className="text-sm text-blue-600 font-bold hover:underline"
            >
              See all &gt;
            </Link>
          </div>

          <Slider {...settings}>
            <div className="h-40 !w-52 rounded-3xl !mr-4 bg-[url(/src/assets/house_bg.png)] bg-cover bg-center p-2">
              <div className="flex items-center">
                <p className="font-bold text-lg text-white">4 Bedroom duplex</p>
              </div>
              <h1 className="font-bold text-white text-2xl">₦36,540.00</h1>
              <p className="text-white font-semibold mt-2">
                out of 2,500,000 (14%){" "}
              </p>

              <div className="mt-3">
                <h1 className="font-bold text-white">
                  ₦2,116,460.00 <span className="font-normal">remaining</span>
                </h1>
                <Progress percent={30} />
              </div>
            </div>
            <div className="h-40 !w-52 rounded-3xl !mr-4 bg-[url(/src/assets/house_bg.png)] bg-cover bg-center p-2">
              <div className="flex items-center">
                <p className="font-bold text-lg text-white">4 Bedroom duplex</p>
              </div>
              <h1 className="font-bold text-white text-2xl">₦36,540.00</h1>
              <p className="text-white font-semibold mt-2">
                out of 2,500,000 (14%){" "}
              </p>

              <div className="mt-3">
                <h1 className="font-bold text-white">
                  ₦2,116,460.00 <span className="font-normal">remaining</span>
                </h1>
                <Progress percent={30} />
              </div>
            </div>
            <div className="h-40 !w-52 rounded-3xl !mr-4 bg-[url(/src/assets/house_bg.png)] bg-cover bg-center p-2">
              <div className="flex items-center">
                <p className="font-bold text-lg text-white">4 Bedroom duplex</p>
              </div>
              <h1 className="font-bold text-white text-2xl">₦36,540.00</h1>
              <p className="text-white font-semibold mt-2">
                out of 2,500,000 (14%){" "}
              </p>

              <div className="mt-3">
                <h1 className="font-bold text-white">
                  ₦2,116,460.00 <span className="font-normal">remaining</span>
                </h1>
                <Progress percent={30} />
              </div>
            </div>
            <div className="h-40 !w-52 rounded-3xl !mr-4 bg-[url(/src/assets/house_bg.png)] bg-cover bg-center p-2">
              <div className="flex items-center">
                <p className="font-bold text-lg text-white">4 Bedroom duplex</p>
              </div>
              <h1 className="font-bold text-white text-2xl">₦36,540.00</h1>
              <p className="text-white font-semibold mt-2">
                out of 2,500,000 (14%){" "}
              </p>

              <div className="mt-3">
                <h1 className="font-bold text-white">
                  ₦2,116,460.00 <span className="font-normal">remaining</span>
                </h1>
                <Progress percent={30} />
              </div>
            </div>
          </Slider>

          <div class=" ">
            <div className="flex justify-between items-center my-7">
              <h2 className="text-lg font-bold text-[#B0B2C3]">
                Listed Properties
              </h2>

              <Link
                to="#"
                className="text-sm text-blue-600 font-bold hover:underline"
              >
                See all &gt;
              </Link>
            </div>
            <div className="flex flex-col gap-3">
              <div className="border rounded-2xl border-gray-400 overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-3 gap">
                  <div
                    className="col-span-1 w-full relative bg-cover bg-center"
                    style={{ backgroundImage: `url(${house})` }}
                  >
                    <div className="absolute bg-[#E2BABA] text-[#C40000] p-1 px-2 flex justify-center items-center text-xs font-bold rounded-md top-4 left-2">
                      50% Discount
                    </div>
                  </div>

                  <div className="p-3 col-span-2">
                    <h2 className="font-bold text-sm">
                      4 Semi detached-duplex with 2 room BQ
                    </h2>

                    <div className="flex items-center py-1">
                      <img src={pin} alt="" />
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
                        <h1 className="font-bold text-xs">₦1,500,000 </h1>
                        <p className="text-[#B0B2C3] text-[.7rem]">
                          Weekly deposit
                        </p>
                      </div>
                      <div>
                        <h1 className="font-bold text-xs">₦1,500,000 </h1>
                        <p className="text-[#B0B2C3] text-[.7rem]">Duration</p>
                      </div>
                    </div>
                    <img
                      src={button}
                      alt=""
                      className="cursor-pointer w-30 mt-2"
                    />
                  </div>
                </div>
              </div>
              <div className="border rounded-2xl border-gray-400 overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-3 gap">
                  <div
                    className="col-span-1 w-full relative bg-cover bg-center"
                    style={{ backgroundImage: `url(${house})` }}
                  >
                    <div className="absolute bg-[#E2BABA] text-[#C40000] p-1 px-2 flex justify-center items-center text-xs font-bold rounded-md top-4 left-2">
                      50% Discount
                    </div>
                  </div>

                  <div className="p-3 col-span-2">
                    <h2 className="font-bold text-sm">
                      4 Semi detached-duplex with 2 room BQ
                    </h2>

                    <div className="flex items-center py-1">
                      <img src={pin} alt="" />
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
                        <h1 className="font-bold text-xs">₦1,500,000 </h1>
                        <p className="text-[#B0B2C3] text-[.7rem]">
                          Weekly deposit
                        </p>
                      </div>
                      <div>
                        <h1 className="font-bold text-xs">₦1,500,000 </h1>
                        <p className="text-[#B0B2C3] text-[.7rem]">Duration</p>
                      </div>
                    </div>
                    <img
                      src={button}
                      alt=""
                      className="cursor-pointer w-30 mt-2"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
