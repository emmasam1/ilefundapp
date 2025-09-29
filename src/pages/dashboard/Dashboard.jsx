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
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div className="p-2">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left side */}
        <div className="w-full md:w-[65%]">
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
              {/* Item 1 */}
              <div className="bg-[#658FFB] p-5 rounded-lg flex items-center gap-4 bg-[url(/src/assets/card_bg_2.png)] bg-cover bg-center">
                <img src={ri_funds_line} alt="" className="w-10" />
                <div>
                  <h1 className="text-white text-lg">Home Fund</h1>
                  <h1 className="font-bold text-white text-xl sm:text-2xl">₦45,000.00</h1>
                </div>
              </div>

              {/* Item 2 */}
              <div className="bg-[#FF9500] p-5 rounded-lg flex items-center gap-4 bg-[url(/src/assets/card_bg_2.png)] bg-cover bg-center">
                <img src={hugeicons_savings} alt="" className="w-10" />
                <div>
                  <h1 className="text-white text-lg">Balling</h1>
                  <h1 className="font-bold text-white text-xl sm:text-2xl">₦3,500.00</h1>
                </div>
              </div>

              {/* Item 3 */}
              <div className="bg-[#9157EF] p-5 rounded-lg flex items-center gap-4 bg-[url(/src/assets/card_bg_2.png)] bg-cover bg-center">
                <img src={fluent_savings} alt="" className="w-10" />
                <div>
                  <h1 className="text-white text-lg">Rainy Day</h1>
                  <h1 className="font-bold text-white text-xl sm:text-2xl">₦3,500.00</h1>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="mt-4 bg-white rounded-2xl p-4">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-lg font-bold text-[#B0B2C3]">
                Recent Transactions
              </h2>
              <Link to="#" className="text-sm text-blue-600 font-bold flex items-center">
                See all <img src={greaterthan} alt="" className="w-5 ml-1" />
              </Link>
            </div>

            <div className="space-y-5">
              {/* Transaction Rows */}
              {[
                {
                  img: img1,
                  text: <>Savings used to start a <span className="font-bold">new goal</span>.</>,
                  time: "22 Days Ago",
                  amount: "-₦250,000",
                  color: "text-[#0047FF] bg-[#E2E3FF]",
                },
                {
                  img: img2,
                  text: <>Goal Successful <span className="font-bold">funded</span>.</>,
                  time: "22 Days Ago",
                  amount: "-₦250,000",
                  color: "text-[#0047FF] bg-[#E2E3FF]",
                },
                {
                  img: img1,
                  text: <>Withdrawal <span className="font-bold">Approved</span>.</>,
                  time: "Today – 12th Mar 2023",
                  amount: "-₦250,000",
                  color: "text-[#FF2D55] bg-[#E2E3FF]",
                },
                {
                  img: img2,
                  text: <>Naira account <span className="font-bold">credited</span>.</>,
                  time: "4 Weeks Ago",
                  amount: "+₦250,000",
                  color: "text-[#34C759] bg-[#E2E3FF]",
                },
              ].map((t, i) => (
                <div key={i} className="flex justify-between items-start">
                  <div className="flex items-center space-x-2">
                    <img src={t.img} className="w-8 h-8 rounded-lg" alt="icon" />
                    <div>
                      <p className="text-gray-800">{t.text}</p>
                      <p className="text-xs text-gray-500 mt-1">{t.time}</p>
                    </div>
                  </div>
                  <span className={`${t.color} px-4 py-1 text-xs font-semibold rounded-lg`}>
                    {t.amount}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right side */}
        <div className="w-full md:w-[35%]">
          <div className="flex justify-between items-center text-lg px-2">
            <h1 className="text-[#B0B2C3] font-bold">Active Goals</h1>
            <Link to="#" className="text-sm text-blue-600 font-bold">See all &gt;</Link>
          </div>

          {/* Slider */}
          <Slider {...settings}>
            {[1, 2, 3, 4].map((_, i) => (
              <div
                key={i}
                className="h-48 sm:h-52 md:h-56 !w-full sm:!w-64 md:!w-72 rounded-3xl !mr-4 bg-[url(/src/assets/house_bg.png)] bg-cover bg-center p-3"
              >
                <p className="font-bold text-lg text-white">4 Bedroom duplex</p>
                <h1 className="font-bold text-white text-xl sm:text-2xl">₦36,540.00</h1>
                <p className="text-white font-semibold mt-1 text-sm">
                  out of 2,500,000 (14%)
                </p>
                <div className="mt-2">
                  <h1 className="font-bold text-white text-sm sm:text-base">
                    ₦2,116,460.00 <span className="font-normal">remaining</span>
                  </h1>
                  <Progress percent={30} />
                </div>
              </div>
            ))}
          </Slider>

          {/* Listed Properties */}
          <div className="mt-6">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-bold text-[#B0B2C3]">Listed Properties</h2>
              <Link to="#" className="text-sm text-blue-600 font-bold">See all &gt;</Link>
            </div>

            <div className="flex flex-col gap-4">
              {[1, 2].map((_, i) => (
                <div key={i} className="border rounded-2xl border-gray-300 overflow-hidden">
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
                      <h2 className="font-bold text-sm">4 Semi detached-duplex with 2 room BQ</h2>
                      <div className="flex items-center py-1">
                        <img src={pin} alt="" className="w-3 mr-1" />
                        <p className="text-[#B0B2C3] text-xs">Big land city Apo hilltop</p>
                      </div>
                      <div className="flex justify-between items-baseline">
                        <h1 className="font-bold text-sm">₦13,000,000</h1>
                        <p className="font-bold text-xs">500 SQM</p>
                      </div>
                      <div className="flex justify-between items-baseline mt-1">
                        <div>
                          <h1 className="font-bold text-xs">₦1,500,000</h1>
                          <p className="text-[#B0B2C3] text-[0.7rem]">Weekly deposit</p>
                        </div>
                        <div>
                          <h1 className="font-bold text-xs">₦1,500,000</h1>
                          <p className="text-[#B0B2C3] text-[0.7rem]">Duration</p>
                        </div>
                      </div>
                      <img src={button} alt="" className="cursor-pointer w-28 mt-2" />
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
