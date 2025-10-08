import React from 'react'
import { Link } from "react-router";
import { Card, Avatar } from "antd";

import back_arrow from "../../assets/back_arrow.png";
import notifications from "../../assets/notifications-outline.png";
import user_img from "../../assets/user_img.png";
import transactions from "../../assets/transactions.png";
import light_icon_2 from "../../assets/light_icon_2.png";
import light_icon_1 from "../../assets/light_icon_1.png";

const TransactionHistory = () => {

    const transaction = [
  {
    month: "June 2025",
    items: [
      {
        title: "Savings used to start a new goal.",
        date: "23 Days Ago",
        icon: light_icon_1,
        amount: "+₦250,000",
        color: "text-green-600",
      },
      {
        title: "Goal Successful funded.",
        date: "22 Days Ago",
        icon: light_icon_2,
        amount: "+₦250,000",
        color: "text-green-600",
      },
      {
        title: "Withdrawal Approved.",
        date: "Today - 12th Mar 2023",
        icon: light_icon_1,
        amount: "-₦250,000",
        color: "text-red-600",
      },
      {
        title: "Naira account credited.",
        date: "4 Weeks Ago",
        icon: light_icon_2,
        amount: "+₦250,000",
        color: "text-green-600",
      },
      {
        title: "Dollar account credited.",
        date: "5 Weeks Ago",
        icon: light_icon_1,
        amount: "+₦250,000",
        color: "text-green-600",
      },
    ],
  },
  {
    month: "May 2025",
    items: [
      {
        title: "Savings used to start a new goal.",
        date: "23 Days Ago",
        icon: light_icon_2,
        amount: "+₦250,000",
        color: "text-green-600",
      },
      {
        title: "Goal Successful funded.",
        date: "22 Days Ago",
        icon: light_icon_1,
        amount: "+₦250,000",
        color: "text-green-600",
      },
      {
        title: "Withdrawal Approved.",
        date: "Today - 12th Mar 2023",
        icon: light_icon_2,
        amount: "-₦250,000",
        color: "text-red-600",
      },
      {
        title: "Naira account credited.",
        date: "4 Weeks Ago",
        icon: light_icon_1,
        amount: "+₦250,000",
        color: "text-green-600",
      },
      {
        title: "Dollar account credited.",
        date: "5 Weeks Ago",
        icon: light_icon_2,
        amount: "+₦250,000",
        color: "text-green-600",
      },
    ],
  },
];


  return (
    <div className="bg-white relative">
         <div className="flex justify-between">
        <div className="p-5">
          <Link to="/dashboard/profile">
            <img src={back_arrow} alt="" className="w-10" />
          </Link>
        </div>
        <div className="hidden md:block h-[400px] w-3/4 bg-[url(/src/assets/profile_bg.png)] bg-cover bg-no-repeat bg-bottom">
          <div>
            <div className="flex items-center justify-end gap-3 p-5">
              <div className="relative">
                <div className="absolute bg-[#FF5050] text-white rounded-full w-5 h-5 flex justify-center items-center -top-1 right-0">
                  0
                </div>
                <img src={notifications} alt="notifications" className="w-8" />
              </div>
              <div className="h-12 w-12 rounded-full">
                <img
                  src={user_img}
                  alt="user avatar"
                  className="rounded-full object-cover h-12 w-12"
                />
              </div>
            </div>
            <div className="flex justify-center flex-col gap-10 w-full items-center">
              <h1 className="!text-white font-extrabold !text-4xl">
                Transaction History
              </h1>
              <img src={transactions} alt="" className="w-25" />
            </div>
          </div>
        </div>
      </div>

      <div className="px-9">
      {transaction.map((section) => (
        <div key={section.month} className="mb-15">
          <div className='flex items-center gap-4'>
            <h2 className="text-gray-700 font-semibold mb-4">{section.month}</h2>
            <hr className='w-5/6 -mt-4 border-gray-300'/>
          </div>
          <div className="space-y-4">
            {section.items.map((item, index) => (
              <div
                key={index}
                className='flex justify-between items-center'
              
              >
                <div className="flex items-start gap-3">
                  <img
                    src={item.icon}
                    className="w-10"
                    
                  />
                  <div>
                    <p className="text-gray-800 text-sm font-medium">
                      {item.title}
                    </p>
                    <p className="text-gray-400 text-xs">{item.date}</p>
                  </div>
                </div>

                <span
                  className={`text-sm font-semibold ${item.color} bg-gray-50 px-3 py-1 rounded-lg`}
                >
                  {item.amount}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
    </div>
  )
}

export default TransactionHistory