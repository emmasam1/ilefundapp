import { useState, useEffect } from "react";
import { Button, Input, Skeleton } from "antd";
import homeImg from "../../assets/home_img.png";
import arrow from "../../assets/arrow_long_right.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useApp } from "../../context/AppContext";
import ri_funds_line from "../../assets/ri_funds-line.png";

const PayOutright = () => {
  const [amount, setAmount] = useState("");
  const [wallets, setWallets] = useState([]);
  const [cards, setCards] = useState([]);

  const [selectedSource, setSelectedSource] = useState(null); // store wallet ID or card ID
  const [selectedType, setSelectedType] = useState(""); // "wallet" or "card"
  const [paymentPlans, setPaymentPlans] = useState([]);
  const [initiateLoader, setInitiateLoader] = useState(false);

  const [loading, setLoading] = useState(true);

  const { API_BASE_URL, token } = useApp();

  const navigate = useNavigate();

  const location = useLocation();
  const { property, text } = location.state;

  // console.log("property:", property);

  // FETCH ALL DATA
  const getData = async () => {
    setLoading(true);
    try {
      const [walletRes, cardRes] = await Promise.all([
        axios.get(`${API_BASE_URL}/api/v1/my-wallets`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`${API_BASE_URL}/api/v1/cards`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      if (walletRes.data.success) setWallets(walletRes.data.wallets);
      if (cardRes.data.success) setCards(cardRes.data.cards || []);
    } catch (error) {
      console.error("Error fetching:", error);
    } finally {
      setLoading(false);
    }
  };

  const getPaymentPlans = async () => {
    try {
      const res = await axios.get(
        `${API_BASE_URL}/api/estate/payment-plans/${property?._id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // console.log("payment plan", res);
      if (res.data.success) setPaymentPlans(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getPaymentPlans();
    getData();
  }, []);

  const getSelectedPlanId = () => {
    if (!paymentPlans.length) return null;

    if (text === "Pay Outright") {
      // Pick the "one-time" plan
      return paymentPlans.find((plan) => plan.planType === "one-time")?._id;
    } else if (text === "Pay Installmental") {
      // Pick the first "installment" plan
      return paymentPlans.find((plan) => plan.planType === "installment")?._id;
    } else if (text === "Co-Ownership") {
      // Example: you can add custom logic if co-ownership has a separate planType or title
      return paymentPlans.find((plan) =>
        plan.title.toLowerCase().includes("co-ownership")
      )?._id;
    }

    return null;
  };

  const initiatePayment = async () => {
    // Validate payment method
    if (!selectedType || !selectedSource) {
      alert("Please select a payment method (wallet or card).");
      return;
    }

    // Validate amount if not "Pay Outright"
    if (text !== "Pay Outright" && (!amount || Number(amount) <= 0)) {
      alert("Please enter a valid amount to pay.");
      return;
    }

    const selectedPlanId = getSelectedPlanId();

    const payload = {
      estateCompanyId: property?.company?._id,
      estateId: property?.estate?._id,
      prototypeId: selectedSource, // always the selected ID
      paymentPlanId: selectedPlanId, // dynamic plan ID
      paymentMethod: selectedType, // "wallet" or "card"
      ...(selectedType === "wallet"
        ? { walletId: selectedSource } // include only if wallet
        : { cardId: selectedSource }), // include only if card
      totalAmount: text === "Pay Outright" ? property?.price : Number(amount),
      balance: text === "Pay Outright" ? property?.price : Number(amount),
    };

    try {
      setInitiateLoader(true);
      const res = await axios.post(
        `${API_BASE_URL}/api/wallet/user-payments/initiate`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("Payment initiation response:", res);
      navigate("/dashboard/listing/listing-summary", {
        state: { payment: res?.data?.data, property: property, },
      });
    } catch (error) {
      console.error("Payment initiation error:", error);
    } finally {
      setInitiateLoader(false);
    }
  };

  // ===== Wallet style =====
  const walletStyles = {
    home_goal: {
      bg: "bg-[#658FFB]",
      img: ri_funds_line,
      label: "Home Fund",
      link: "/dashboard/wallet/home-fund",
    },
  };

  return (
    <div className="p-4">
      {/* Title */}
      <h1 className="font-bold text-2xl mb-3">{text}</h1>

      {/* Property Header */}
      <div className="flex items-center mb-6 border-b border-gray-200 pb-4">
        <img
          src={property?.banner?.url}
          alt="home"
          className="w-20 h-20 object-cover rounded-lg mr-4"
        />
        <div>
          <p className="font-semibold">{property?.title}</p>
          <p className="text-[#0047FF] font-semibold">
            By {property?.company?.name}
          </p>
        </div>
      </div>

      {/* MAIN BODY */}
      <div className="mt-9 flex flex-col justify-center items-center">
        <h2 className="font-semibold mb-4 text-gray-500 text-lg">
          Amount to pay
        </h2>

        <Input
          size="large"
          value={
            text === "Pay Outright"
              ? property?.price?.toLocaleString() || "0.00"
              : amount
          }
          onChange={(e) => setAmount(e.target.value.replace(/\D/g, ""))}
          placeholder="0.00"
          prefix="₦"
          disabled={text === "Pay Outright"}
          className="text-center !text-3xl !text-black font-bold !w-60 !mb-6 !border-none !shadow-none"
        />

        {/* Source */}
        <h2 className="font-semibold mb-4 text-gray-500 text-lg">
          Choose where to pay from
        </h2>

        <div className="w-full flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-xl w-full">
            {/* LOADING */}
            {loading ? (
              <>
                {[1, 2].map((i) => (
                  <Skeleton.Button
                    key={i}
                    active
                    block
                    style={{
                      height: 130,
                      borderRadius: 16,
                      animationDuration: "1s",
                    }}
                  />
                ))}
              </>
            ) : (
              <>
                {/* HOME FUND WALLET */}
                {wallets
                  .filter((w) => w.type === "home_goal")
                  .map((wallet) => {
                    const style = walletStyles[wallet.type];

                    return (
                      <div
                        key={wallet._id}
                        onClick={() => {
                          setSelectedSource(wallet._id);
                          setSelectedType("wallet");
                        }}
                        className={`
                          ${style.bg} cursor-pointer py-7 px-5 rounded-2xl 
                          flex items-center gap-4 bg-[url(/src/assets/card_bg_2.png)] 
                          bg-cover bg-center shadow-md transition-all hover:scale-105
                          ${
                            selectedSource === wallet._id &&
                            selectedType === "wallet"
                              ? "ring-4 ring-blue-500 scale-105"
                              : "opacity-90 hover:opacity-100"
                          }
                        `}
                      >
                        <img src={style.img} alt="" className="w-10" />
                        <div>
                          <h1 className="text-white text-lg">{style.label}</h1>
                          <h1 className="font-bold text-white text-xl">
                            ₦
                            {wallet.balance?.toLocaleString("en-NG", {
                              minimumFractionDigits: 2,
                            })}
                          </h1>
                        </div>
                      </div>
                    );
                  })}

                {/* CARDS */}
                {cards.length === 0 ? (
                  <p className="text-center text-gray-500 font-medium col-span-2">
                    No cards found.
                  </p>
                ) : (
                  cards.map((card) => (
                    <div
                      key={card._id}
                      onClick={() => {
                        setSelectedSource(card._id);
                        setSelectedType("card");
                      }}
                      className={`
                        cursor-pointer bg-[#658FFB] text-white rounded-2xl p-5 
                        shadow-lg transition-all hover:scale-105
                        ${
                          selectedSource === card._id && selectedType === "card"
                            ? "ring-4 ring-blue-500 scale-105"
                            : "opacity-90 hover:opacity-100"
                        }
                      `}
                    >
                      <span className="text-sm uppercase">{card.brand}</span>

                      <p className="text-lg tracking-widest mt-5">
                        **** **** **** {card.last4}
                      </p>
                    </div>
                  ))
                )}
              </>
            )}
          </div>
        </div>

        {/* NEXT */}
        <div className="flex justify-end w-full max-w-3xl mt-10">
          <Button
            className="!bg-[#0047FF] !text-white !border-none"
            onClick={initiatePayment}
            loading={initiateLoader}
            disabled={
              !selectedSource ||
              (text !== "Pay Outright" && (!amount || Number(amount) <= 0))
            }
          >
            Next <img src={arrow} alt="" className="w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PayOutright;
