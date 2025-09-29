import { useState } from "react";
import { Button, Switch, Modal } from "antd";
import { FaArrowRight } from "react-icons/fa";
import success from "../../assets/success.png";
import homeImg from "../../assets/home_img.png";

const Summary = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [checked, setChecked] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const onChange = (value) => {
    setChecked(value);
    console.log(`switch to ${value}`);
  };
  return (
    <div className="p-4">
         <h1 className="font-bold text-2xl mb-3">Summary</h1>
      <div className="flex items-center mb-6 border-b border-gray-200 pb-4">
        <div>
          <img
            src={homeImg}
            alt="home"
            className="w-20 h-20 object-cover rounded-lg mr-4"
          />
        </div>
        <div>
          <p className="font-semibold">4 Semi detached-duplex with 2 room BQ</p>
          <p className="text-[#0047FF] font-semibold">By Domain Shelters</p>
        </div>
      </div>

      <p className="text-center mb-10">Purchase Summary</p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div className="bg-[#0047FF] p-4 rounded-lg  bg-[url(/src/assets/card_bg_2.png)] bg-cover bg-center">
          <p className="text-sm text-white">Current Deposit</p>
          <p className="text-xl font-bold text-white">N3,000.00</p>
        </div>

        <div className="bg-[#12033A] p-4 rounded-lg bg-[url(/src/assets/card_bg_2.png)] bg-cover bg-center">
          <p className="text-sm text-white">Outstanding Amount</p>
          <p className="text-xl font-bold text-white">N10,000.000</p>
        </div>

        <div className="bg-[#F2F3FA] p-4 rounded-lg border-[#B0B2C3] border-2">
          <p className="text-sm text-gray-500">Property Value</p>
          <p className="text-xl font-bold text-[#000]">₦1,300,000.00</p>
        </div>

        <div className="bg-[#F2F3FA] p-4 rounded-lg border-[#B0B2C3] border-2">
          <p className="text-sm text-gray-500">Cumulative Amount</p>
          <p className="text-xl font-bold text-[#000]">₦1,400,000.00</p>
        </div>

        <div className="bg-[#F2F3FA] p-4 rounded-lg border-[#B0B2C3] border-2">
          <p className="text-sm text-gray-500">Payment interval</p>
          <div className="flex items-center justify-between">
            <p className="text-xl font-bold text-[#000]">₦183,333.33</p>
            <p className="text-[#0047FF] font-bold">Monthly</p>
          </div>
        </div>

        <div className="bg-[#F2F3FA] p-4 rounded-lg border-[#B0B2C3] border-2">
          <p className="text-sm text-gray-500">Duration</p>
          <p className="text-xl font-bold text-[#000]">6 months</p>
        </div>
        <div className="bg-[#F2F3FA] p-4 rounded-lg border-[#B0B2C3] border-2">
          <p className="text-sm text-gray-500">Duration</p>
          <p className="text-xl font-bold text-[#000]">6 months</p>
        </div>
        <div className="bg-[#F2F3FA] p-4 rounded-lg border-[#B0B2C3] border-2">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">Duration</p>
            <p className="text-sm text-gray-500">Percentage</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-xl font-bold text-[#000]">₦183,333.33</p>
            <p className="text-[#0047FF] font-bold">10%</p>
          </div>
        </div>
        <div className="bg-[#F2F3FA] p-4 rounded-lg border-[#B0B2C3] border-2">
          <p className="text-sm text-gray-500">Due Date</p>
          <p className="text-xl font-bold text-[#000]">05/07/2025</p>
        </div>
      </div>

      <div className="flex items-center mb-6">
        <Switch checked={checked} onChange={onChange} />
        <label htmlFor="terms" className="ml-2 text-sm text-gray-700">
          I have read the{" "}
          <a href="#" className="text-blue-600 underline">
            Terms and Conditions.
          </a>
        </label>
      </div>

      <div className="flex justify-end">
        <Button
          disabled={!checked}
          onClick={showModal}
          className={`flex items-center justify-center gap-2 !px-8 py-3 rounded-lg text-white font-medium transition ${
            checked
              ? "!bg-blue-600 !text-white"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Next <FaArrowRight />
        </Button>
      </div>

      <Modal open={isModalOpen} footer={null} closable={false}>
        <div className="flex flex-col justify-center items-center gap-5 p-5">
          <img src={success} alt="" className="w-40" />
          <h1 className="font-bold text-2xl text-center text-[#12033A]">
            Congrats!
          </h1>

          <p className="text-center">
            Your Deposit has been initiated, Wait <br />
            for few minutes while we update your <br />
            Dashboard and ILE Goals.
          </p>

          <Button
            // onClick={() => setIsModalOpen(false)}
            className="!bg-[#12033A] !px-10 !border-none !text-white !rounded-lg mt-5"
          >
            Got it
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default Summary;
