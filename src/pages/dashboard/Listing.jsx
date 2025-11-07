import React, { useState, useEffect } from "react";
import { FaMapMarkerAlt, FaCheck } from "react-icons/fa";
import house from "../../assets/house.png";
import image1 from "../../assets/prop-img.png";
import { useApp } from "../../context/AppContext.jsx";
import axios from "axios";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router";

const Listing = () => {
  const { API_BASE_URL, token } = useApp();
  const [listing, setListing] = useState([]);
  const [loading, setLoading] = useState(false);
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
  };

  const getListing = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`https://ilefund-wallet.onrender.com/api/estate/prototypes`, {
        headers: {
          Authorization: `Bearer ${token}`,
           "x-service-key": "super_secret_service_key"
        },
      });

      console.log("Response:", res.data);
    } catch (error) {
      console.error("Error fetching listing:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getListing();
  }, []);

  const savingsGoals = [
    {
      id: 1,
      title: "4 Bedroom Duplex",
      total: 2500000,
      paid: 365400,
      weeklyDeposit: 150000,
      estDate: "Dec 2026",
      image: "/images/house1.jpg",
    },
    {
      id: 2,
      title: "3 Bedroom Bungalow",
      total: 1800000,
      paid: 450000,
      weeklyDeposit: 120000,
      estDate: "Aug 2026",
      image: "/images/house2.jpg",
    },
    {
      id: 3,
      title: "2 Bedroom Apartment",
      total: 1200000,
      paid: 300000,
      weeklyDeposit: 100000,
      estDate: "Jan 2027",
      image: "/images/house3.jpg",
    },
    {
      id: 4,
      title: "Luxury Penthouse",
      total: 5000000,
      paid: 1250000,
      weeklyDeposit: 250000,
      estDate: "Nov 2027",
      image: "/images/house4.jpg",
    },
    {
      id: 5,
      title: "Semi-Detached Duplex",
      total: 3500000,
      paid: 875000,
      weeklyDeposit: 175000,
      estDate: "Mar 2026",
      image: "/images/house5.jpg",
    },
    {
      id: 6,
      title: "Smart Home Villa",
      total: 4500000,
      paid: 2250000,
      weeklyDeposit: 200000,
      estDate: "Jul 2027",
      image: "/images/house6.jpg",
    },
    {
      id: 7,
      title: "Beachfront Apartment",
      total: 2800000,
      paid: 840000,
      weeklyDeposit: 160000,
      estDate: "Oct 2026",
      image: "/images/house7.jpg",
    },
    {
      id: 8,
      title: "Mini Flat",
      total: 1000000,
      paid: 200000,
      weeklyDeposit: 80000,
      estDate: "Feb 2026",
      image: "/images/house8.jpg",
    },
    {
      id: 9,
      title: "Mansion Estate",
      total: 8000000,
      paid: 3200000,
      weeklyDeposit: 400000,
      estDate: "May 2028",
      image: "/images/house9.jpg",
    },
    {
      id: 10,
      title: "Townhouse",
      total: 2200000,
      paid: 660000,
      weeklyDeposit: 110000,
      estDate: "Sep 2026",
      image: "/images/house10.jpg",
    },
  ];

  const goalsWithProgress = savingsGoals.map((goal) => ({
    ...goal,
    progress: ((goal.paid / goal.total) * 100).toFixed(1), // % completed
    remaining: goal.total - goal.paid,
  }));

  return (
    <div className="p-4">
      <h1 className="font-bold text-2xl">Property Listing</h1>

      <div className="my-10">
        <h1 className="font-bold text-lg mb-4">Active Goals</h1>

        <Slider {...settings}>
          {goalsWithProgress.map((goal) => (
            <div key={goal.id} className="px-2">
              {" "}
              {/* Add spacing between slides */}
              <div className="relative bg-[url(/src/assets/house_bg.png)] bg-cover bg-no-repeat bg-center text-white rounded-2xl overflow-hidden p-3">
                <div className="relative z-10">
                  <div className="flex gap-2.5">
                    <div className="bg-white rounded-md w-20 flex gap-2 items-center px-2">
                      <img src={image1} alt="" className="w-5" />
                      <h1 className="text-[#0047FF]">Goal</h1>
                    </div>
                    <h2 className="text-lg font-bold">{goal.title}</h2>
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-extrabold mt-2">
                        ₦{goal.paid.toLocaleString()}
                      </h3>
                      <p className="text-sm text-gray-200">
                        out of ₦{goal.total.toLocaleString()} ({goal.progress}%)
                      </p>
                    </div>
                    <div className="mt-2">
                      <p className="text-gray-300 text-sm text-right">
                        Weekly deposit
                      </p>
                      <h4 className="font-bold text-right">
                        ₦{goal.weeklyDeposit.toLocaleString()}
                      </h4>
                    </div>
                  </div>

                  <div className="flex justify-between mt-2">
                    <div>
                      <p className="text-gray-300 text-sm">Remaining</p>
                      <h4 className="font-bold">
                        ₦{goal.remaining.toLocaleString()}
                      </h4>
                    </div>
                    <div>
                      <p className="text-gray-300 text-sm text-right">
                        Est. Date
                      </p>
                      <h4 className="font-bold text-right">{goal.estDate}</h4>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-gray-700 h-2 rounded-full mt-4">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${goal.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      <div className="my-10">
        <h1 className="font-bold text-xl mb-5">Listed Properties</h1>
        <div className="grid md:grid-cols-3 gap-6">
          <Link
            to="/dashboard/listing/details"
            className="no-underline !text-black"
          >
            <div className="bg-white rounded-3xl overflow-hidden flex flex-col sm:flex-row border border-gray-200">
              {/* Left Image */}
              <div className="relative w-full sm:w-1/3">
                <img
                  src={house}
                  alt="property"
                  className="w-full h-28 object-cover"
                />
                <span className="absolute top-3 left-3 bg-red-200 text-red-600 font-bold px-3 py-1 rounded-md text-[10px]">
                  50% Discount
                </span>
              </div>

              {/* Right Details */}
              <div className="flex flex-col justify-between p-4 w-full sm:w-2/3">
                {/* Title */}
                <h2 className="text-md font-bold leading-tight">
                  4 Semi detached-duplex <br /> with 2 room BQ
                </h2>

                {/* Location */}
                <p className="text-gray-400 flex items-center gap-2 mt-2">
                  <FaMapMarkerAlt className="text-xs" />
                  Big land city Apo hilltop
                </p>

                {/* Price */}
                <div className="flex justify-between items-center mt-2">
                  <h1 className="font-semibold">₦13,000,000</h1>
                  <h3 className="font-bold">500 SQM</h3>
                </div>

                {/* Bottom Info */}
                <div className="flex items-center justify-between mt-4">
                  <div>
                    <h3 className="font-bold text-xs">₦1,500,000</h3>
                    <p className="text-gray-400 text-xs">Weekly deposit</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-xs">6 Months</h3>
                    <p className="text-gray-400 text-xs">Duration</p>
                  </div>
                </div>

                {/* Footer */}
                {/* <div className="flex justify-end mt-4">
                <div className="flex items-center bg-green-600 text-white px-3 py-1 rounded-lg text-xs gap-2">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/7/79/Coat_of_arms_of_Nigeria.svg"
                    alt="Nigeria"
                    className="w-5 h-5"
                  />
                  <span>FCDA approved Allocation</span>
                  <FaCheck />
                </div>
              </div> */}
              </div>
            </div>
          </Link>

          <div className="bg-white rounded-3xl overflow-hidden flex flex-col sm:flex-row border border-gray-200">
            {/* Left Image */}
            <div className="relative w-full sm:w-1/3">
              <img
                src={house}
                alt="property"
                className="w-full h-28 object-cover"
              />
              <span className="absolute top-3 left-3 bg-red-200 text-red-600 font-bold px-3 py-1 rounded-md text-[10px]">
                50% Discount
              </span>
            </div>

            {/* Right Details */}
            <div className="flex flex-col justify-between p-4 w-full sm:w-2/3">
              {/* Title */}
              <h2 className="text-md font-bold leading-tight">
                4 Semi detached-duplex <br /> with 2 room BQ
              </h2>

              {/* Location */}
              <p className="text-gray-400 flex items-center gap-2 mt-2">
                <FaMapMarkerAlt className="text-xs" />
                Big land city Apo hilltop
              </p>

              {/* Price */}
              <div className="flex justify-between items-center mt-2">
                <h1 className="font-semibold">₦13,000,000</h1>
                <h3 className="font-bold">500 SQM</h3>
              </div>

              {/* Bottom Info */}
              <div className="flex items-center justify-between mt-4">
                <div>
                  <h3 className="font-bold text-xs">₦1,500,000</h3>
                  <p className="text-gray-400 text-xs">Weekly deposit</p>
                </div>
                <div>
                  <h3 className="font-bold text-xs">6 Months</h3>
                  <p className="text-gray-400 text-xs">Duration</p>
                </div>
              </div>

              {/* Footer */}
              {/* <div className="flex justify-end mt-4">
                <div className="flex items-center bg-green-600 text-white px-3 py-1 rounded-lg text-xs gap-2">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/7/79/Coat_of_arms_of_Nigeria.svg"
                    alt="Nigeria"
                    className="w-5 h-5"
                  />
                  <span>FCDA approved Allocation</span>
                  <FaCheck />
                </div>
              </div> */}
            </div>
          </div>
          <div className="bg-white rounded-3xl overflow-hidden flex flex-col sm:flex-row border border-gray-200">
            {/* Left Image */}
            <div className="relative w-full sm:w-1/3">
              <img
                src={house}
                alt="property"
                className="w-full h-28 object-cover"
              />
              <span className="absolute top-3 left-3 bg-red-200 text-red-600 font-bold px-3 py-1 rounded-md text-[10px]">
                50% Discount
              </span>
            </div>

            {/* Right Details */}
            <div className="flex flex-col justify-between p-4 w-full sm:w-2/3">
              {/* Title */}
              <h2 className="text-md font-bold leading-tight">
                4 Semi detached-duplex <br /> with 2 room BQ
              </h2>

              {/* Location */}
              <p className="text-gray-400 flex items-center gap-2 mt-2">
                <FaMapMarkerAlt className="text-xs" />
                Big land city Apo hilltop
              </p>

              {/* Price */}
              <div className="flex justify-between items-center mt-2">
                <h1 className="font-semibold">₦13,000,000</h1>
                <h3 className="font-bold">500 SQM</h3>
              </div>

              {/* Bottom Info */}
              <div className="flex items-center justify-between mt-4">
                <div>
                  <h3 className="font-bold text-xs">₦1,500,000</h3>
                  <p className="text-gray-400 text-xs">Weekly deposit</p>
                </div>
                <div>
                  <h3 className="font-bold text-xs">6 Months</h3>
                  <p className="text-gray-400 text-xs">Duration</p>
                </div>
              </div>

              {/* Footer */}
              {/* <div className="flex justify-end mt-4">
                <div className="flex items-center bg-green-600 text-white px-3 py-1 rounded-lg text-xs gap-2">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/7/79/Coat_of_arms_of_Nigeria.svg"
                    alt="Nigeria"
                    className="w-5 h-5"
                  />
                  <span>FCDA approved Allocation</span>
                  <FaCheck />
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Listing;
