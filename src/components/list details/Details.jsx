import { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion, AnimatePresence } from "framer-motion";
import { Button, Input, Skeleton, Modal, Divider } from "antd";
import download from "../../assets/download.png";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import axios from "axios";
import { Link, useLocation } from "react-router";
import angle_right_black from "../../assets/angle-right-black.png";
import { useApp } from "../../context/AppContext.jsx";

const Details = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [coords, setCoords] = useState({ lat: 9.082, lng: 8.6753 });
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentPlanModal, setPaymentPlanModal] = useState(false);
  const [paymentPlans, setPaymentPlans] = useState([]);
  const [planLoading, setPlanLoading] = useState(false);
  const { API_BASE_URL, token } = useApp();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [nextModal, setNextModal] = useState(false);

  const location = useLocation();
  const { property } = location.state || {};
  // console.log(property);

  useEffect(() => {
    if (property) setLoading(false);
  }, [property]);

  useEffect(() => {
    if (!property?.neighborhood?.name) return;
    const delayDebounce = setTimeout(() => {
      searchLocation(property.neighborhood.name);
    }, 1000);
    return () => clearTimeout(delayDebounce);
  }, [property]);

  const getPaymentPlans = async () => {
    try {
      setPlanLoading(true);
      const res = await axios.get(
        `${API_BASE_URL}/api/estate/payment-plans/${property?._id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.success) setPaymentPlans(res.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setPlanLoading(false);
    }
  };

  const searchLocation = async (place) => {
    try {
      const res = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          place + ", Nigeria"
        )}`
      );
      if (res.data.length > 0) {
        const { lat, lon } = res.data[0];
        setCoords({ lat: parseFloat(lat), lng: parseFloat(lon) });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);

  const openPaymentPlanModal = () => {
    setPaymentPlanModal(true);
    setIsModalOpen(false);
    getPaymentPlans();
  };

  const closePaymentPlanModal = () => setPaymentPlanModal(false);

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
    closePaymentPlanModal();
    setNextModal(true);
    console.log(plan);
  };

  const tabs = [
    { key: 1, label: "About", content: "About" },
    { key: 2, label: "Details", content: "Details" },
    { key: 3, label: "Documents", content: "Attached documents go here." },
    { key: 4, label: "Location", content: "Map and location details here." },
  ];

  const activeContent = tabs.find((tab) => tab.key === activeTab)?.content;

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
  };

  const imageFiles = property?.files?.filter(
    (file) => file.fileType === "image"
  );

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto">
      {loading ? (
        <div className="mt-10">
          <Skeleton active paragraph={{ rows: 15 }} />
        </div>
      ) : (
        <>
          {/* Image Slider */}
          <div className="rounded-2xl overflow-hidden shadow-lg mb-6">
            {imageFiles?.length > 0 ? (
              <Slider {...settings}>
                {imageFiles.map((file) => (
                  <div key={file._id}>
                    <img
                      src={file.url}
                      alt={file.title || "property image"}
                      className="w-full h-72 md:h-[400px] object-cover"
                    />
                  </div>
                ))}
              </Slider>
            ) : (
              <img
                src="/images/house_placeholder.jpg"
                alt="No property images"
                className="w-full h-72 md:h-[400px] object-cover"
              />
            )}
          </div>

          {/* Property Title */}
          <div className="flex justify-between items-center sticky top-16 bg-white z-50 py-2">
            <h1 className="text-2xl font-bold">{property?.title}</h1>
            <Button
              type="primary"
              onClick={showModal}
              className="!bg-[#0047FF] !rounded-full !text-white !border-none"
            >
              Buy Now
            </Button>
          </div>

          {/* Tabs */}
          <div className="flex space-x-10 rounded-full w-fit mt-4">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.key;
              return (
                <motion.div
                  key={tab.key}
                  whileTap={{ scale: 0.95 }}
                  className="relative"
                >
                  <Button
                    onClick={() => setActiveTab(tab.key)}
                    type="text"
                    className={`px-6 py-2 !rounded-full font-medium transition-colors duration-300 ${
                      isActive ? "!text-white" : "text-white/60"
                    }`}
                    style={{
                      backgroundColor: isActive ? "#14003C" : "transparent",
                    }}
                  >
                    {tab.label}
                  </Button>
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 rounded-full"
                      style={{ backgroundColor: "#14003C", zIndex: -1 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 35,
                        mass: 1.2,
                      }}
                    />
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Tab Content */}
          <div className="mt-6 min-h-[120px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {activeContent}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Description */}
          <div className="mt-6">
            <h2 className="text-xl font-bold">Six (6) Bedroom Flat</h2>
            <p className="text-gray-600 mt-2">{property?.description}</p>
          </div>

          {/* Property Features */}
          <div className="mt-6">
            <h2 className="text-lg font-bold mb-3">Property Requirements</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 my-4">
              {property?.features?.map((e, i) => (
                <Button
                  key={i}
                  className="!bg-[#D4D4D4] p-3 !border-none hover:!text-black !rounded-full flex items-center justify-center"
                >
                  {e.quantity} {e.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Property Info Grid */}
          <div className="grid md:grid-cols-3 gap-4 mt-6">
            <div className="p-4 bg-[#D9D9D9] rounded-lg">
              <p className="text-gray-600">Price</p>
              <h3 className="font-bold">
                ₦{Number(property?.price)?.toLocaleString()}
              </h3>
            </div>
            <div className="p-4 bg-[#D9D9D9] rounded-lg">
              <p className="text-gray-600">Square meter</p>
              <h3 className="font-bold">{property?.sizeValue}</h3>
            </div>
            <div className="p-4 bg-[#D9D9D9] rounded-lg">
              <p className="text-gray-600">Title Document</p>
              <h3 className="font-bold">{property?.landTitle?.shortCode}</h3>
            </div>
            <div className="p-4 bg-[#D9D9D9] rounded-lg">
              <p className="text-gray-600">FCDA Approval</p>
              <h3 className="font-bold">{property?.landTitle?.status}</h3>
            </div>
          </div>

          {/* Map */}
          <div className="mt-9">
            <h2>Location</h2>
            <MapContainer
              center={[coords.lat, coords.lng]}
              zoom={13}
              style={{ height: "400px", width: "100%" }}
              key={coords.lat + coords.lng}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={[coords.lat, coords.lng]}>
                <Popup>{property?.neighborhood?.name || "Nigeria"}</Popup>
              </Marker>
            </MapContainer>
          </div>

          {/* Buy Now Modal */}
          <Modal
            closable={{ "aria-label": "Custom Close Button" }}
            open={isModalOpen}
            footer={null}
            width={400}
            onCancel={handleCancel}
          >
            <div className="mt-6">
              <p className="text-center font-bold text-lg">
                How do you want to start
              </p>
              <div className="flex flex-col">
                <Link
                  to="/dashboard/listing/pay-now"
                  state={{ property, text: "Pay Outright" }}
                  className="!text-black text-lg flex items-center justify-between py-3 cursor-pointer"
                >
                  <span>Pay Outright</span>
                  <img src={angle_right_black} alt="" />
                </Link>
                <Divider className="!m-0" />
                <div
                  onClick={openPaymentPlanModal}
                  className="!text-black text-lg flex items-center justify-between py-3 cursor-pointer"
                >
                  <span>Pay Installmental</span>
                  <img src={angle_right_black} alt="" />
                </div>
                <Divider className="!m-0" />
                <Link
                  to="/dashboard/listing/pay-now"
                  state={{ property, text: "Co-Ownership" }}
                  className="!text-black text-lg flex items-center justify-between py-3 cursor-pointer"
                >
                  <span>Co-Ownership</span>
                  <img src={angle_right_black} alt="" />
                </Link>
                <Divider className="!m-0" />
              </div>
            </div>
          </Modal>

          {/* Payment Plan Modal */}
          <Modal
            title="Select a Payment Plan"
            closable={{ "aria-label": "Custom Close Button" }}
            open={paymentPlanModal}
            footer={null}
            width={700}
            onCancel={closePaymentPlanModal}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {planLoading
                ? [...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="p-5 bg-white shadow-sm rounded-2xl border border-gray-200 flex flex-col space-y-3 animate-pulse"
                    >
                      <Skeleton.Input
                        active
                        size="small"
                        className="!w-full !h-6 !rounded-md"
                      />
                      <Skeleton.Input
                        active
                        size="small"
                        className="!w-3/4 !h-4 !rounded-md"
                      />
                      <Skeleton.Input
                        active
                        size="small"
                        className="!w-1/2 !h-4 !rounded-md"
                      />
                    </div>
                  ))
                : paymentPlans
                    .filter((plan) => plan.planType !== "one-time")
                    .map((plan) => (
                      <div
                        key={plan._id}
                        className="p-5 bg-white shadow-sm hover:shadow-md transition rounded-2xl border border-gray-200 cursor-pointer flex flex-col justify-between h-full"
                      >
                        <h1 className="font-semibold text-[17px] text-gray-900 group-hover:text-[#0047FF] transition">
                          {plan.title}
                        </h1>
                        <div className="border-t border-gray-100 my-3" />
                        <p className="text-gray-500 text-sm mt-1">
                          Duration:{" "}
                          <span className="font-medium">
                            {plan.durationLabel}
                          </span>
                        </p>
                        <div className="flex items-center gap-2">
                          <p className="text-[#0047FF] font-bold text-lg">
                            {plan.initialPayment?.percentage}%
                          </p>
                          <p className="text-gray-600 text-sm">
                            Initial Deposit
                          </p>
                        </div>
                        <Button
                          onClick={() => handleSelectPlan(plan)}
                          className="!bg-[#0047FF] !text-white !rounded-full !w-full !py-5 !mt-4 hover:!opacity-90 transition"
                        >
                          Select Plan
                        </Button>
                      </div>
                    ))}
            </div>
          </Modal>

          {/* Selected Plan Details Modal */}
          <Modal
            title="Plan Details"
            open={nextModal}
            footer={null}
            onCancel={() => setNextModal(false)}
            width={500}
          >
            {selectedPlan && (
              <div className="space-y-3">
                <h1 className="font-bold text-xl">{selectedPlan.title}</h1>

                {/* Price, Interest, Default */}
                <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 gap-4 p-2 my-3">
                  <div className="border-r">
                    <p className="text-gray-500 text-center">Price</p>
                    <p className="font-bold text-center">
                      ₦{Number(property?.price).toLocaleString()}
                    </p>
                  </div>
                  <div className="border-r">
                    <p className="text-gray-500 text-center">Interest</p>
                    <p className="font-bold text-center">
                      {selectedPlan?.interestPercentage}%
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-center">Default</p>
                    <p className="font-bold text-center">
                      {selectedPlan?.defaultPenaltyPercentage}%
                    </p>
                  </div>
                </div>

                {/* Payment Breakdown */}
                {(() => {
                  const price = Number(property?.price || 0);
                  const initialPercentage =
                    selectedPlan?.initialPayment?.percentage || 0;
                  const initialPayment = (price * initialPercentage) / 100;

                  // Remaining balance
                  const remainingAmount = price - initialPayment;

                  // Subtract 1 because initial payment is already counted
                  const numberOfRemainingInstallments = Math.max(
                    (selectedPlan?.installments || 1) - 1,
                    0
                  );

                  const installmentAmount =
                    numberOfRemainingInstallments > 0
                      ? remainingAmount / numberOfRemainingInstallments
                      : 0;

                  return (
                    <div className="space-y-2">
                      {/* Initial Payment */}
                      <div className="bg-gray-100 px-4 py-2 rounded-full flex justify-between items-center">
                        <h1 className="font-semibold text-sm">1 Installment</h1>
                        <p className="text-gray-900 font-bold text-sm">
                          ₦{initialPayment.toLocaleString()}
                        </p>
                      </div>

                      {/* Remaining Installments */}
                      {Array.from(
                        { length: numberOfRemainingInstallments },
                        (_, i) => (
                          <div
                            key={i}
                            className="bg-gray-100 px-4 py-2 rounded-full flex justify-between items-center"
                          >
                            <h1 className="font-semibold text-sm">
                              {i + 2} Installment
                            </h1>
                            <p className="text-gray-900 font-bold text-sm">
                              ₦{installmentAmount.toLocaleString()}
                            </p>
                          </div>
                        )
                      )}

                      {/* Continue Button */}
                      <Link
                        to="/dashboard/listing/pay-now"
                        state={{
                          plan: selectedPlan,
                          property,
                          initialPayment, // first installment
                          text: "Pay installment",
                        }}
                      >
                        <Button className="!bg-[#0047FF] !text-white !rounded-full !w-full !py-5 !mt-6 hover:!opacity-90 transition">
                          Continue
                        </Button>
                      </Link>
                    </div>
                  );
                })()}
              </div>
            )}
          </Modal>
        </>
      )}
    </div>
  );
};

export default Details;
