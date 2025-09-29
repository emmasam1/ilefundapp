import React, { useState } from "react";
import { RiEyeCloseLine } from "react-icons/ri";
import { PiEye } from "react-icons/pi";
import image1 from "../../assets/prop-img.png";
import { Link } from "react-router";

const Goals = () => {
  const amount = "12,854,886.00";
  const hiddenAmount = "****.00";
  const [isAmountVisible, setIsAmountVisible] = useState(false);

  const toggleAmountVisibility = () => {
    setIsAmountVisible(!isAmountVisible);
  };

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
      <h1 className="font-bold text-2xl">My Goals</h1>

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

      <div className="mt-10">
        <h1 className="font-bold text-lg mb-5">Active Goals</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {goalsWithProgress.map((goal) => (
            <Link key={goal.id} to={`/dashboard/goals/goal-detail/${goal.id}`}>
              <div key={goal.id} className="">
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
                          out of ₦{goal.total.toLocaleString()} ({goal.progress}
                          %)
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
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Goals;
