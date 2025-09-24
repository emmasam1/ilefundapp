import React, { useState } from "react";
import { Button, Input, Modal } from "antd";
import line from "../../assets/progress_reg.png";
import check from "../../assets/check-circle.png";
import arrow from "../../assets/arrow_long_right.png";
import baloom from "../../assets/Baloom.png";
import { Link } from "react-router";

const wallets = [
  { id: 1, name: "Home Fund", amount: "****87322", color: "bg-blue-500" },
  { id: 2, name: "Balling", amount: "₦3,500.00", color: "bg-orange-500" },
  { id: 3, name: "Rainy Day", amount: "₦3,500.00", color: "bg-purple-500" },
];

const sources = [
  { id: 1, name: "Debit Card", amount: "₦45,000.00", color: "bg-blue-500" },
  { id: 2, name: "Rainy Day", amount: "₦3,500.00", color: "bg-purple-500" },
  { id: 3, name: "Balling", amount: "₦3,500.00", color: "bg-orange-500" },
];

const SavePlanForm = () => {
  const [amount, setAmount] = useState("");
  const [selectedFrequency, setSelectedFrequency] = useState(null);
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [selectedSource, setSelectedSource] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  // Form completion check
  const isFormComplete =
    selectedFrequency && selectedWallet && selectedSource && amount;

  return (
    <div className="w-full max-w-4xl mx-auto py-10 px-4">
      {/* Progress bar (fake) */}
      <div className="flex justify-center mb-6">
        <img src={line} alt="progress" className="w-20" />
      </div>

      {/* Amount Input & Frequency */}
      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold my-10">
          How much do you want to save?
        </h2>

        {/* Amount Input */}
        <Input
          size="large"
          type="text" // not number, only digits allowed
          value={amount}
          onChange={(e) => setAmount(e.target.value.replace(/\D/g, ""))}
          placeholder="0.00"
          prefix="₦"
          className="text-center !text-3xl font-bold !w-60 !mb-6 !border-none !shadow-none focus:!ring-0"
        />
        <p className="text-gray-500 mb-4 text-sm">
          Set the amount you want to start saving for your home.
        </p>

        {/* Frequency Buttons */}
        <div className="flex gap-3 justify-center mb-6">
          {["Once", "Daily", "Weekly", "Monthly"].map((f, i) => (
            <button
              key={i}
              onClick={() => setSelectedFrequency(f)}
              className={`px-4 py-1 border border-gray-300 rounded-md cursor-pointer transition-all ${
                selectedFrequency === f
                  ? "!bg-[#12033A] text-white border-blue-500"
                  : "hover:bg-blue-50"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <p className="text-gray-500 mb-4 text-sm">
          A perfect start Your can reach your goal by{" "}
          <span className="text-[#0047FF]">23rd May 2028</span>
        </p>
      </div>

      {/* Wallet Selection */}
      <div className="mb-10">
        <h3 className="mb-4 text-gray-500">
          Choose which wallet you want to top up
        </h3>
        <div className="grid grid-cols-3 gap-4">
          {wallets.map((w) => (
            <div
              key={w.id}
              onClick={() => setSelectedWallet(w.id)}
              className={`${
                w.color
              } relative text-white text-center rounded-xl cursor-pointer h-32 p-4 transition-all flex justify-center items-center flex-col ${
                selectedWallet === w.id
                  ? "ring-4 ring-white scale-105 brightness-110"
                  : "opacity-80 hover:opacity-100"
              }`}
            >
              <p className="font-semibold">{w.name}</p>
              <p className="text-lg">{w.amount}</p>
              {selectedWallet === w.id && (
                <img
                  src={check}
                  alt="check"
                  className="absolute -top-3 -right-3 w-6"
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Source Selection */}
      <div className="mb-10">
        <h3 className="mb-2 text-gray-500">
          Where do you want to secure the funds from
        </h3>
        <div className="grid grid-cols-3 gap-4">
          {sources.map((s) => (
            <div
              key={s.id}
              onClick={() => setSelectedSource(s.id)}
              className={`${
                s.color
              } relative text-white text-center h-32 rounded-xl cursor-pointer p-4 transition-all flex justify-center items-center flex-col ${
                selectedSource === s.id
                  ? "ring-4 ring-white scale-105 brightness-110"
                  : "opacity-80 hover:opacity-100"
              }`}
            >
              <p className="font-semibold">{s.name}</p>
              <p className="text-lg">{s.amount}</p>
              {selectedSource === s.id && (
                <img
                  src={check}
                  alt="check"
                  className="absolute -top-3 -right-3 w-6"
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Continue Button */}
      {isFormComplete && (
        <div className="text-center mt-10 flex justify-end">
          <button
            className="bg-blue-600 cursor-pointer gap-5 flex items-center text-white px-8 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
            onClick={showModal}
          >
            Next <img src={arrow} alt="" className="w-5" />
          </button>
        </div>
      )}

      <Modal
        // title="Basic Modal"
        open={isModalOpen}
        footer={null}
        closable={false}
        className="!max-w-fit"
      >
        <div className="flex justify-center items-center flex-col gap-5 ">
          <img src={baloom} alt="" className="w-40" />
          <h1 className="font-bold text-2xl text-center">
            We Hail ooo, Minister Of
            <br />
            Enjoyment <span className="-ml-3">🫡</span>{" "}
            <span className="-ml-4">🙌🏻</span>
          </h1>

          <p className="text-center text-lg">
            Your <b>Top Up</b> was successful.
            <br />
            Please wait while we update your wallets
            <br />
            with the funds you just saved.
          </p>
          <Button className="!bg-[#12033A] !px-6 !text-white !rounded-lg">
            <Link to='/dashboard/wallet'>Got it 🤑🤑</Link>
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default SavePlanForm;
