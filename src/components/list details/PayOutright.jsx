import { useState } from "react";
import { Button, Input } from "antd";
import homeImg from "../../assets/home_img.png";
import plus_icon from "../../assets/plus.png";
import arrow from "../../assets/arrow_long_right.png";
import { Link } from "react-router";

const PayOutright = () => {
  const [amount, setAmount] = useState("");
  const [selectedWallet, setSelectedWallet] = useState(null);

  const wallets = [
    { id: 1, name: "Home Fund", amount: "****87322", color: "bg-blue-500" },
    { id: 2, name: "Debit Card", amount: "₦3,500.00", color: "bg-orange-500" },
  ];

  return (
    <div className="p-4">
      <h1 className="font-bold text-2xl mb-3">Pay Outright</h1>
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

      <div className="mt-9 flex flex-col justify-center items-center">
        <h2 className="font-semibold mb-4 text-gray-500 text-lg">
          Amount to pay
        </h2>

        {/* Amount Input */}
        <Input
          size="large"
          type="text" // not number, only digits allowed
          value={amount}
          onChange={(e) => setAmount(e.target.value.replace(/\D/g, ""))}
          placeholder="0.00"
          prefix="₦"
          className="text-center !text-3xl font-bold ml-30 !w-60 !mb-6 !border-none !shadow-none focus:!ring-0"
        />

        <h2 className="font-semibold mb-4 text-gray-500 text-lg">
          Choose where to pay from
        </h2>

        {/* Wallet Selection */}
        <div className="mb-10 w-full flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-3xl w-full p-6 rounded-2xl">
            {wallets.map((w) => (
              <div
                key={w.id}
                onClick={() => setSelectedWallet(w.id)}
                className={`${
                  w.color
                } bg-[url(/src/assets/card_bg_2.png)] bg-cover bg-center relative text-white text-center rounded-xl cursor-pointer h-36 min-w-[160px] p-4 transition-all flex justify-center items-center flex-col ${
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
            <div className="text-white text-center rounded-xl cursor-pointer h-36 min-w-[160px] p-4 transition-all flex justify-center items-center flex-col !bg-[#12033A]">
              <img src={plus_icon} alt="" className="w-5 mb-3" />
              <p className="font-semibold">Add Card</p>
            </div>
          </div>
        </div>

        <div className="flex justify-end w-full max-w-3xl">
          <Link to="/dashboard/listing/listing-summary">
            <Button className="!bg-[#0047FF] !text-white !border-none">
              Next <img src={arrow} alt="" className="w-5" />{" "}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PayOutright;
