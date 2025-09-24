import { Button, Input, Modal } from "antd";
import React, { useState } from "react";
import { useLocation } from "react-router";
import arrow_right from "../../assets/arrow_long_right.png";
import Baloom from "../../assets/Baloom.png";

const TopUp = () => {
  const [amount, setAmount] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();

  const accountName = location.state?.accountName || "";

  const handleChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // only digits
    setAmount(value);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="flex justify-center items-center h-screen flex-col gap-10">
      <Modal open={isModalOpen} footer={null} closable={false}>
        <div className="flex flex-col justify-center items-center gap-5 p-5">
          <img src={Baloom} alt="" className="w-40" />
          <h1 className="font-bold text-2xl text-center text-[#12033A]">
            We Hail ooo, Minister Of
            <br />
            Enjoyment🫡🙌🏻
          </h1>

          <p className="text-center text-lg">
            Your <b>Top Up</b> was successful.
            <br />
            Please wait while we update your wallets
            <br /> with the funds you just saved.
          </p>

          <Button className="!bg-[#12033A] !border-none !text-white !rounded-lg mt-5">
            Intercontinental
          </Button>
        </div>
      </Modal>
      <h1 className="font-bold text-2xl">Top Up Account</h1>

      <Button className="!bg-black !rounded-full !text-white !border-none !text-lg px-10 py-5 flex justify-center items-center gap-3">
        <span className="text-xs">Balance:</span>{" "}
        <p className="font-bold">₦10,000</p>
      </Button>

      <h1 className="font-bold text-3xl text-center">
        How much do you
        <br />
        want to topup?
      </h1>

      <Input
        placeholder="₦0.00"
        value={amount}
        onChange={handleChange}
        type="number"
        className="!w-48 placeholder:font-extrabold placeholder:text-4xl !text-4xl !border-none !outline-none text-center no-arrows"
      />

      <p className="text-[#B0B2C3] text-center">
        Set the amount you want to start saving for your home{" "}
        {accountName && (
          <span className="font-bold text-black">{accountName}</span>
        )}
        .
      </p>

      {/* 👇 Show Save button only if input has a value */}
      {amount && (
        <Button
          onClick={showModal}
          className="!bg-[#0047FF] !rounded-full !text-white !border-none !text-lg !px-15 py-5"
        >
          Next <img src={arrow_right} alt="" className="w-5" />
        </Button>
      )}
    </div>
  );
};

export default TopUp;
