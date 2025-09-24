import React, { useState } from "react";
import { Button, Input, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import checked from "../../assets/check-circle.png";
import image1 from "../../assets/fluent_savings.png";
import image2 from "../../assets/hugeicons_savings.png";
import successImg from "../../assets/success.png";

const Withdrawal = () => {
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [selectedBank, setSelectedBank] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [withdrawalSuccess, setWithdrawalSuccess] = useState(false);
  const [amount, setAmount] = useState("");

  const wallets = [
    {
      id: 1,
      name: "Rainy Day",
      balance: "₦3,500.00",
      color: "bg-purple-400",
      image: image1,
    },
    {
      id: 2,
      name: "Balling",
      balance: "₦3,500.00",
      color: "bg-orange-400",
      image: image2,
    },
  ];

  const banks = [
    { id: 1, name: "GTB", number: "****87322" },
    { id: 2, name: "Opay", number: "****45768" },
  ];

  const handleAmountChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // only digits
    setAmount(value);
  };

  const showModal = () => {
    // Basic validation
    if (selectedWallet && selectedBank && Number(amount) > 0) {
      setWithdrawalSuccess(true);
    } else {
      setWithdrawalSuccess(false);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setAmount("");
    setSelectedWallet(null);
    setSelectedBank(null);
  };

  return (
    <div className="p-6">
      {/* Modal */}
      <Modal open={isModalOpen} footer={null} closable={false}>
        {withdrawalSuccess ? (
          <div className="flex flex-col justify-center items-center gap-5 p-5">
            <img src={successImg} alt="success" className="w-40" />
            <h1 className="font-bold text-2xl text-center text-[#12033A]">
              Congrats!
            </h1>
            <p className="text-center text-lg">
              Your Withdrawal was Successful
            </p>
            <Button
              onClick={closeModal}
              className="!bg-[#12033A] !px-10 !border-none !text-white !rounded-lg mt-5"
            >
              Got it
            </Button>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center gap-5 p-5">
            <h1 className="font-bold text-2xl text-center text-red-600">
              Oops!!!
            </h1>
            <p className="text-center text-lg">
             Your withdrawal has failed, due to insufficient funds, please try again.
            </p>
            <Button
              onClick={() => setIsModalOpen(false)}
              className="!bg-[#12033A] !px-10 !border-none !text-white !rounded-lg mt-5"
            >
              Try Again
            </Button>
          </div>
        )}
      </Modal>

      {/* Title */}
      <h1 className="font-bold text-3xl mb-6">Withdrawal</h1>

      {/* Wallet Selection */}
      <p className="text-gray-500 mb-3">
        Choose which wallet you want to withdraw from?
      </p>
      <div className="flex gap-7 mb-8">
        {wallets.map((wallet) => (
          <div
            key={wallet.id}
            onClick={() => setSelectedWallet(wallet.id)}
            className={`relative p-6 rounded-xl text-white font-bold cursor-pointer gap-5 flex items-center transition-all w-86 bg-[url('/src/assets/card_bg_2.png')] bg-no-repeat bg-cover bg-center
              ${wallet.color} ${
              selectedWallet === wallet.id ? null : "hover:opacity-90"
            }`}
          >
            {/* Checked icon */}
            {selectedWallet === wallet.id && (
              <img
                src={checked}
                alt="checked"
                className="absolute -top-3 -right-3 w-6 h-6"
              />
            )}
            {wallet.image && (
              <img src={wallet.image} alt={wallet.name} className="mb-4 w-10" />
            )}
            <div>
              <p>{wallet.name}</p>
              <h2 className="text-2xl mt-2">{wallet.balance}</h2>
            </div>
          </div>
        ))}
      </div>

      {/* Amount Input */}
      <p className="font-bold mb-2">How much do you want to withdraw</p>
      <div className="flex items-center gap-2 mb-8">
        <Input
          placeholder="0.00"
          value={amount}
          onChange={handleAmountChange}
          type="number"
          className="!w-48 !text-3xl !font-bold !text-gray-800 text-center !border-none !outline-none"
        />
        <span className="text-gray-400">MAX</span>
      </div>

      {/* Bank Selection */}
      <p className="text-gray-500 mb-3">Destination of Funds</p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
        {banks.map((bank) => (
          <div
            key={bank.id}
            onClick={() => setSelectedBank(bank.id)}
            className="relative p-6 rounded-xl text-white cursor-pointer transition-all bg-blue-400 bg-[url('/src/assets/card_bg_2.png')] bg-no-repeat bg-cover bg-center"
          >
            {/* Checked icon */}
            {selectedBank === bank.id && (
              <img
                src={checked}
                alt="checked"
                className="absolute -top-3 -left-3 w-6 h-6"
              />
            )}
            <p className="font-bold">{bank.name}</p>
            <p className="mt-2 text-lg">{bank.number}</p>
          </div>
        ))}

        {/* Add Bank */}
        <div
          onClick={() => alert("Add Bank functionality")}
          className="p-6 rounded-xl bg-[#0B0033] text-white flex flex-col items-center justify-center cursor-pointer hover:opacity-90"
        >
          <p className="font-bold">Add Bank</p>
          <PlusOutlined className="text-2xl mt-2" />
        </div>
      </div>

      {/* Next Button */}
      <div className="flex justify-end">
        <Button
          type="primary"
          onClick={showModal}
          className="!bg-blue-600 !rounded-full !text-white !px-10 py-6 !text-lg"
        >
          Next →
        </Button>
      </div>
    </div>
  );
};

export default Withdrawal;
