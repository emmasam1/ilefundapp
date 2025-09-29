import { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router";
import greaterthan from "../../assets/angle-right-small-blue.png";
import img1 from "../../assets/light_icon_1.png";
import img2 from "../../assets/light_icon_2.png";

const GoalDetails = () => {
  const sliderImages = [
    "/images/house1.jpg",
    "/images/house2.jpg",
    "/images/house3.jpg",
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <div className="p-4">
      <div className="rounded-2xl overflow-hidden shadow-lg mb-6">
        <Slider {...settings}>
          {sliderImages.map((img, index) => (
            <div key={index}>
              <img
                src={img}
                alt={`property-${index}`}
                className="w-full h-72 md:h-[400px] object-cover"
              />
            </div>
          ))}
        </Slider>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div className="bg-[#0047FF80] p-4 rounded-lg  bg-[url(/src/assets/card_bg_2.png)] bg-cover bg-center">
          <p className="text-sm">Deposited Balance</p>
          <p className="text-xl font-bold">N3,000.00</p>
        </div>

        <div className="bg-[#12033A] p-4 rounded-lg bg-[url(/src/assets/card_bg_2.png)] bg-cover bg-center">
          <p className="text-sm text-white">Outstanding Balance</p>
          <p className="text-xl font-bold text-white">N10,000.000</p>
        </div>

        <div className="bg-[#F2F3FA] p-4 rounded-lg border-[#B0B2C3] border-2">
          <p className="text-sm text-gray-500">Price</p>
          <p className="text-xl font-bold text-[#000]">₦1,300,000.00</p>
        </div>

        <div className="bg-[#F2F3FA] p-4 rounded-lg border-[#B0B2C3] border-2">
          <p className="text-sm text-gray-500">Square meter</p>
          <p className="text-xl font-bold text-[#000]">500</p>
        </div>

        <div className="bg-[#F2F3FA] p-4 rounded-lg border-[#B0B2C3] border-2">
          <p className="text-sm text-gray-500">Weekly Deposit</p>
          <p className="text-xl font-bold text-[#000]">₦183,333.33</p>
        </div>

        <div className="bg-[#F2F3FA] p-4 rounded-lg border-[#B0B2C3] border-2">
          <p className="text-sm text-gray-500">Duration</p>
          <p className="text-xl font-bold text-[#000]">6 months</p>
        </div>
        <div className="bg-[#F2F3FA] p-4 rounded-lg border-[#B0B2C3] border-2">
          <p className="text-sm text-gray-500">Title Document</p>
          <p className="text-xl font-bold text-[#000]">C of O/R Of O</p>
        </div>
        <div className="bg-[#F2F3FA] p-4 rounded-lg border-[#B0B2C3] border-2">
          <p className="text-sm text-gray-500">FCDA Approval</p>
          <p className="text-xl font-bold text-[#000]">Approved/Pending</p>
        </div>
        <div className="bg-[#F2F3FA] p-4 rounded-lg border-[#B0B2C3] border-2">
          <p className="text-sm text-gray-500">Est.Date</p>
          <p className="text-xl font-bold text-[#000]">5 Dec 2026</p>
        </div>
        <div className="bg-[#F2F3FA] p-4 rounded-lg border-[#B0B2C3] border-2">
          <p className="text-sm text-gray-500">Next Payment</p>
          <p className="text-xl font-bold text-[#000]">05/07/2025</p>
        </div>
      </div>


       {/* Recent Transactions */}
          <div className="mt-4 bg-white rounded-2xl">
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
  );
};

export default GoalDetails;
