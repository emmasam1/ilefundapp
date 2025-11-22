import { useState, useEffect } from "react";
import { Button, Switch, Modal } from "antd";
import { FaArrowRight } from "react-icons/fa";
import success from "../../assets/success.png";
import homeImg from "../../assets/home_img.png";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useApp } from "../../context/AppContext";

const Summary = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const { API_BASE_URL, token } = useApp();
  const [loading, setLoading] = useState(false);
  const [formattedCollectionDate, setFormattedCollectionDate] = useState("");
  const navigate = useNavigate();

  const location = useLocation();
  const { payment, property } = location.state || {};

  const paymentDate = new Date(payment?.createdAt); // e.g., "2025-11-20T00:00:00Z"
  const collectionDate = new Date(paymentDate);
  collectionDate.setDate(collectionDate.getDate() + 14); // Add 14 days

  // Format the date (DD/MM/YYYY)
  // console.log("Payment data:", payment);
  // console.log("Payment data:", API_BASE_URL);
  // console.log("property data:", property);

  // console.log(payment);

  useEffect(() => {
    if (payment?.payment?.createdAt) {
      const date = new Date(payment?.payment?.createdAt);
      const collection = new Date(date);
      collection.setDate(date.getDate() + 14);

      const formatted = collection.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });

      setFormattedCollectionDate(formatted);
    }
  }, [payment]);

  useEffect(() => {
    if (!token) return;
  }, [token]);


  const showModal = () => {
    setIsModalOpen(true);
  };

  const onChange = (value) => {
    setChecked(value);
    console.log(`switch to ${value}`);
  };

 const makePayment = async () => {
  const paymentId = payment?.payment?._id;

  if (!paymentId || !token) {
    console.log("Payment ID missing or token missing!", paymentId, token);
    return;
  }

  try {
    setLoading(true);

    const res = await axios.post(
      `${API_BASE_URL}/api/wallet/user-payments/${paymentId}/commitment`,
      {}, // <-- empty body
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // console.log("Payment Response:", res.data);
    showModal();
    
    setTimeout(() => {
      setIsModalOpen(false);
    }, 10000);
    navigate("/dashboard/listing");
  } catch (error) {
    console.log("Payment error:", error.response?.data || error.message);
  } finally {
    setLoading(false);
  }
};



  return (
    <div className="p-4">
      <h1 className="font-bold text-2xl mb-3">Summary</h1>
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

      <p className="text-center mb-10">Purchase Summary</p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div className="bg-[#0047FF] p-4 rounded-lg  bg-[url(/src/assets/card_bg_2.png)] bg-cover bg-center">
          <p className="text-sm text-white">Current Deposit</p>
          <p className="text-xl font-bold text-white">
            ₦{payment?.payment?.totalAmount.toLocaleString()}
          </p>
        </div>

        {payment?.planSnapshot?.planType !== "one-time" && (
          <div className="bg-[#12033A] p-4 rounded-lg bg-[url(/src/assets/card_bg_2.png)] bg-cover bg-center">
            <p className="text-sm text-white">Outstanding Amount</p>
            <p className="text-xl font-bold text-white">₦{payment?.payment?.balance?.toLocaleString()}</p>
          </div>
        )}

        <div className="bg-[#F2F3FA] p-4 rounded-lg border-[#B0B2C3] border-2">
          <p className="text-sm text-gray-500">Property Value</p>
          <p className="text-xl font-bold text-[#000]">
            ₦{property?.price?.toLocaleString()}
          </p>
        </div>

        {payment?.planSnapshot?.planType !== "one-time" && (
          <div className="bg-[#F2F3FA] p-4 rounded-lg border-[#B0B2C3] border-2">
            <p className="text-sm text-gray-500">Cumulative Amount</p>
            <p className="text-xl font-bold text-[#000]">₦1,400,000.00</p>
          </div>
        )}

        {payment?.planSnapshot?.planType !== "one-time" && (
          <div className="bg-[#F2F3FA] p-4 rounded-lg border-[#B0B2C3] border-2">
            <p className="text-sm text-gray-500">Payment interval</p>
            <div className="flex items-center justify-between">
              <p className="text-xl font-bold text-[#000]">₦183,333.33</p>
              <p className="text-[#0047FF] font-bold">Monthly</p>
            </div>
          </div>
        )}

        {payment?.planSnapshot?.planType !== "one-time" && (
          <div className="bg-[#F2F3FA] p-4 rounded-lg border-[#B0B2C3] border-2">
            <p className="text-sm text-gray-500">Duration</p>
            <p className="text-xl font-bold text-[#000]">{payment?.payment?.planSnapshot?.durationLabel}</p>
          </div>
        )}

        <div className="bg-[#F2F3FA] p-4 rounded-lg border-[#B0B2C3] border-2">
          <div className="flex items-center justify-between">
            {/* <p className="text-sm text-gray-500">Duration</p> */}
            <p className="text-sm text-gray-500">Percentage</p>
          </div>
          <div className="flex items-center justify-between gap-2">
            {/* <p className="text-sm font-bold text-[#000]">
              ₦{payment?.estimatedCommitment?.toLocaleString()}
            </p> */}
            <p className="text-[#0047FF] text-sm font-bold">
              {payment?.planSnapshot?.initialPayment?.percentage}%
            </p>
          </div>
        </div>
        <div className="bg-[#F2F3FA] p-4 rounded-lg border-[#B0B2C3] border-2">
          <p className="text-sm text-gray-500">Collection Date</p>
          <p className="text-xl font-bold text-[#000]">
            {formattedCollectionDate || "N/A"}
          </p>
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
          onClick={makePayment}
          loading={loading}
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
