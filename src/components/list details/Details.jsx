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
  const [loadingPaymentPlan, setLoadingPaymentPlan] = useState(false);
  const [paymentPlan, setPaymentPlan] = useState([]);
  const { token } = useApp();

  const location = useLocation();
  const { property } = location.state || {};
  console.log(property);

  //   {
  //   "estateCompanyId": "68f20cbbdd001ae54b1a13fb",
  //   "estateId": "68f20e0cdd001ae54b1a141e",
  //   "prototypeId": "68fb55b4d5dee6d7ec5daf68",
  //   "paymentPlanId": "68fb78915cd541d48ae20c0a",
  //   "paymentMethod": "card",
  //   "cardId": "683431c0c38218c6bfa9b1de",
  //   "totalAmount": 800000,
  //   "balance": 800000
  // }

  const initiatePaypent = async () => {
    const payload = {
      estateCompanyId: property?.company?._id,
      estateId: property?.estate?._id,
      prototypeId: property?._id,
      paymentPlanId: property?.paymentPlan?._id,
    };
  };

  // ✅ Simulate loading delay if property is not yet ready
  useEffect(() => {
    if (property) {
      setLoading(false);
    }
  }, [property]);

  useEffect(() => {
    if (!property?.neighborhood?.name) return;
    const delayDebounce = setTimeout(() => {
      searchLocation(property.neighborhood.name);
    }, 1000);
    return () => clearTimeout(delayDebounce);
  }, [property]);

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

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
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
    autoplay: true, // ✅ Auto-slide
    autoplaySpeed: 3000, // ✅ Every 3 seconds
    pauseOnHover: true, // ✅ Pause on hover
  };

  // ✅ Filter image files
  const imageFiles = property?.files?.filter(
    (file) => file.fileType === "image"
  );

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto">
      {loading ? (
        // ✅ Skeleton Loader
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
                    className={`px-6 py-2 !rounded-full font-medium transition-colors duration-300
                    ${isActive ? "!text-white" : "text-white/60"}`}
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

          {/* ✅ Animated Tab Content */}
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

          {/* Property Requirements */}
          <div className="mt-6">
            <h2 className="text-lg font-bold mb-3">Property Requirements</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 my-4">
              {property?.features?.map((e) => {
                return (
                  <Button className="!bg-[#D4D4D4] p-3 !border-none hover:!text-black !rounded-full flex items-center justify-center">
                    {e.quantity} {e.label}
                  </Button>
                );
              })}
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
            {/* <div className="p-4 bg-[#D9D9D9] rounded-lg">
              <p className="text-gray-600">Initial Deposit</p>
              <h3 className="font-bold">₦1,300,000</h3>
            </div>
            <div className="p-4 bg-[#D9D9D9] rounded-lg">
              <p className="text-gray-600">Duration</p>
              <h3 className="font-bold">months</h3>
            </div> */}
            <div className="p-4 bg-[#D9D9D9] rounded-lg">
              <p className="text-gray-600">Title Document</p>
              <h3 className="font-bold">{property?.landTitle?.shortCode}</h3>
            </div>
            <div className="p-4 bg-[#D9D9D9] rounded-lg">
              <p className="text-gray-600">FCDA Approval</p>
              <h3 className="font-bold">{property?.landTitle?.status}</h3>
            </div>
          </div>

          {/* Get To Know More Section */}
          <div className="mt-10">
            <h2 className="text-xl font-bold mb-4">Get To Know More!!!</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="relative rounded-xl overflow-hidden">
                <img
                  src="/images/property1.jpg"
                  alt="Journey View"
                  className="w-full h-32 object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white font-bold">
                  Journey View of the Property
                </div>
              </div>
              <div className="relative rounded-xl overflow-hidden">
                <img
                  src="/images/property2.jpg"
                  alt="Area View"
                  className="w-full h-32 object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white font-bold">
                  Area View of the Property
                </div>
              </div>
              <div className="relative rounded-xl overflow-hidden">
                <img
                  src="/images/property3.jpg"
                  alt="Detailed View"
                  className="w-full h-32 object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white font-bold">
                  Detailed View of the Property
                </div>
              </div>
            </div>
          </div>

          <h1 className="font-bold text-2xl mt-8">Opportunity Attachments</h1>
          <p className="text-gray-400 text-sm">
            TBC - Makeen Eastern Fund and Makeen Eastern Fund
          </p>

          <h1 className="font-bold text-2xl mt-8">Files</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-5">
            <div className="p-6 rounded-full flex justify-between items-center bg-[#D9D9D9] h-9">
              <p>Make AI Shares Fund</p>
              <img src={download} alt="" className="w-8" />
            </div>
            <div className="p-6 rounded-full flex justify-between items-center bg-[#D9D9D9] h-9">
              <p>Terms and Condition.....</p>
              <img src={download} alt="" className="w-8" />
            </div>
          </div>

          <h1 className="font-bold text-2xl mt-8">Destination</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-5">
            <Input
              placeholder="Insert your Known Location"
              className="!bg-[#b0b2c3] !border-none !outline-none !py-3 placeholder:!text-black mb-4"
            />
          </div>

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

          <Modal
            closable={{ "aria-label": "Custom Close Button" }}
            open={isModalOpen}
            footer={null}
            width={400}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <div className="mt-6">
              <p className="text-center font-bold text-lg">
                How do you want to start
              </p>

              <div className="flex flex-col">
                {/* Pay Outright */}
                <Link
                  to="/dashboard/listing/pay-now"
                  state={{ property, text: "Pay Outright" }}
                  className="!text-black text-lg flex items-center justify-between py-3 cursor-pointer"
                >
                  <span>Pay Outright</span>
                  <img src={angle_right_black} alt="" />
                </Link>
                <Divider className="!m-0" />

                {/* Installment */}
                <Link
                  to="/dashboard/listing/pay-now"
                  state={{ property, text: "Pay Installmental" }}
                  className="!text-black text-lg flex items-center justify-between py-3 cursor-pointer"
                >
                  <span>Pay Installmental</span>
                  <img src={angle_right_black} alt="" />
                </Link>
                <Divider className="!m-0" />

                {/* Co-Ownership */}
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

          {/* <div className="flex justify-between items-center mt-11">
            <Link to="/dashboard/listing/pay-outright">
              <Button className="!bg-[#0047FF] !text-white !px-10 !rounded-lg !border-none !py-5">
                Pay Outright
              </Button>
            </Link>

            <Link to="/dashboard/listing/initial-deposit">
              <Button className="!bg-[#12033A] !text-white !px-10 !rounded-lg !border-none !py-5">
                Pay Installment
              </Button>
            </Link>
          </div> */}
        </>
      )}
    </div>
  );
};

export default Details;
