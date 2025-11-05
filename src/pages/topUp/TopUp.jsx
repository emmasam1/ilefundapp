import { Button, Input, Modal, Skeleton, Select, message, Spin } from "antd";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import arrow_right from "../../assets/arrow_long_right.png";
import Baloom from "../../assets/Baloom.png";
import { useApp } from "../../context/AppContext.jsx";
import axios from "axios";

const TopUp = () => {
  const [amount, setAmount] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cards, setCards] = useState([]);
  const [loadingCards, setLoadingCards] = useState(true);
  const [frequency, setFrequency] = useState("one-time");
  const [submitting, setSubmitting] = useState(false);
  const [walletReady, setWalletReady] = useState(false);

  const { API_BASE_URL, token } = useApp();
  const location = useLocation();
  const navigate = useNavigate();

  const { accountName, wallet } = location.state || {};

  // ✅ Wait for wallet before rendering
  useEffect(() => {
    if (!wallet) {
      message.warning("No wallet found — redirecting...");
      navigate("/wallet", { replace: true });
    } else {
      setWalletReady(true);
    }
  }, [wallet]);

  const handleChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setAmount(value);
  };

  const topUpWallet = async () => {
    if (!wallet) return message.error("No wallet selected");
    if (!amount || !selectedCard)
      return message.error("Please fill all fields");

    setSubmitting(true);
    const { type } = wallet;
    let endpoint = "";

    if (type === "balling_goal") {
      endpoint = `${API_BASE_URL}/wallets/fund/balling_goal`;
    } else if (type === "home_goal") {
      endpoint = `${API_BASE_URL}/wallets/fund/home_goal`;
    } else if (type === "rainy_goal") {
      endpoint = `${API_BASE_URL}/wallets/fund/rainy_goal`;
    } else {
      message.error("Invalid wallet type");
      setSubmitting(false);
      return;
    }

    try {
      const payload = {
        amount: parseFloat(amount),
        frequency,
        cardId: selectedCard,
      };

      const res = await axios.post(endpoint, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.success) {
        message.success("Top-up successful!");
        setIsModalOpen(true);
        setTimeout(() => {
          setIsModalOpen(false);
          navigate("/dashboard/wallet");
        }, 20000);
      } else {
        message.error(res.data.message || "Top-up failed");
      }
    } catch (error) {
      console.error(error);
      message.error("An error occurred while topping up");
    } finally {
      setSubmitting(false);
    }
  };

  const getBankColor = (bankName = "") => {
    const name = bankName.toLowerCase();
    if (name.includes("zenith")) return "from-[#12033A] to-[#3D2C8D]";
    if (name.includes("gt")) return "from-[#0047FF] to-[#00C6FF]";
    if (name.includes("access")) return "from-[#F7971E] to-[#FFD200]";
    if (name.includes("uba")) return "from-[#7F00FF] to-[#E100FF]";
    if (name.includes("first")) return "from-[#0A2647] to-[#144272]";
    if (name.includes("test")) return "from-[#444] to-[#888]";
    return "from-[#555] to-[#999]";
  };

  const getCards = async () => {
    setLoadingCards(true);
    try {
      const res = await axios.get(`${API_BASE_URL}/cards`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) setCards(res.data.cards || []);
    } catch (error) {
      console.error("Error fetching cards:", error);
    } finally {
      setLoadingCards(false);
    }
  };

  useEffect(() => {
    getCards();
  }, []);

  if (!walletReady)
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <Spin tip="Loading Wallet..." size="large" />
      </div>
    );

  return (
    <div className="flex flex-col justify-center items-center py-10 gap-10">
      {/* ✅ Success Modal */}
      <Modal open={isModalOpen} footer={null} closable={false}>
        <div className="flex flex-col justify-center items-center gap-5 p-5">
          <img src={Baloom} alt="" className="w-40" />
          <h1 className="font-bold text-2xl text-center text-[#12033A]">
            We Hail ooo, Minister Of <br /> Enjoyment🫡🙌🏻
          </h1>
          <p className="text-center text-lg">
            Your <b>{frequency.replace("-", " ")}</b> Top Up was successful.
            <br />
            Please wait while we update your wallet <br /> with the funds you
            just saved.
          </p>
          <Button className="!bg-[#12033A] !border-none !text-white !rounded-lg mt-5">
            Intercontinental
          </Button>
        </div>
      </Modal>

      {/* Title */}
      <h1 className="font-bold text-2xl">
        Top Up Account –{" "}
        <span className="text-[#0047FF]">{accountName || "Wallet"}</span>
      </h1>

      {/* Balance */}
      <Button className="!bg-black !rounded-full !text-white !border-none !text-lg px-10 py-5 flex justify-center items-center gap-3">
        <span className="text-xs">Balance:</span>
        <p className="font-bold">
          ₦{wallet?.balance ? wallet.balance.toLocaleString() : "0.00"}
        </p>
      </Button>

      {/* Select Card Section */}
      <div className="w-full max-w-4xl px-5">
        <h2 className="font-bold text-xl mb-5 text-center">Select Card</h2>

        {loadingCards ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton.Button
                key={i}
                active
                block
                style={{ height: 130, borderRadius: 16 }}
              />
            ))}
          </div>
        ) : cards.length === 0 ? (
          <p className="text-center text-gray-500 font-medium">
            No cards found. Please add a card first.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {cards.map((card) => (
              <div
                key={card._id}
                onClick={() => setSelectedCard(card._id)}
                className={`cursor-pointer bg-gradient-to-r ${getBankColor(
                  card.bank
                )} text-white rounded-2xl p-5 shadow-lg transition-all hover:scale-105 ${
                  selectedCard === card._id
                    ? "ring-4 ring-blue-500 scale-105"
                    : "opacity-90 hover:opacity-100"
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="font-semibold">
                    {card.bank || "Unknown Bank"}
                  </span>
                  <span className="text-sm uppercase">{card.brand}</span>
                </div>
                <p className="text-lg tracking-widest mt-5">
                  **** **** **** {card.last4}
                </p>
                <div className="flex justify-between mt-4 text-xs">
                  <span>
                    Valid Thru {card.expMonth}/{card.expYear?.slice(-2)}
                  </span>
                  <span className="capitalize">{card.cardType || "Debit"}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Step 2: Enter amount */}
      {selectedCard && (
        <div className="flex flex-col items-center gap-6 mt-8">
          <h1 className="font-bold text-3xl text-center">
            How much do you want to top up?
          </h1>

          <Input
            placeholder="₦0.00"
            value={amount}
            onChange={handleChange}
            type="number"
            className="!w-48 placeholder:font-extrabold placeholder:text-4xl !text-4xl !border-none !outline-none text-center no-arrows"
          />

          <div className="flex flex-col items-center mt-4">
            <p className="text-gray-600 font-medium mb-2">Select Frequency</p>
            <Select
              value={frequency}
              onChange={setFrequency}
              className="!w-48 !rounded-full !text-center custom-dropdown"
              popupClassName="!rounded-xl"
              options={[
                { value: "one-time", label: "One-time" },
                { value: "daily", label: "Daily" },
                { value: "weekly", label: "Weekly" },
                { value: "monthly", label: "Monthly" },
              ]}
            />
          </div>

          <p className="text-[#B0B2C3] text-center">
            Set the amount you want to start saving for{" "}
            <span className="font-bold text-black">{accountName}</span>.
          </p>

          {amount && (
            <Button
              onClick={topUpWallet}
              loading={submitting}
              className="!bg-[#0047FF] !rounded-full !text-white !border-none !text-lg !px-15 py-5"
            >
              Next <img src={arrow_right} alt="" className="w-5" />
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default TopUp;
