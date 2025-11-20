import React, { useState, useEffect } from "react";
import { FaMapMarkerAlt, FaCheck } from "react-icons/fa";
import house from "../../assets/house.png";
import image1 from "../../assets/prop-img.png";
import { useApp } from "../../context/AppContext.jsx";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router";

const Listing = () => {
  const { API_BASE_URL, token } = useApp();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
  };

  

  const getListing = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${API_BASE_URL}/api/estate/prototypes`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "x-service-key": "super_secret_service_key",
          },
        }
      );

      console.log("Response:", res.data);
      if (res.data.success && Array.isArray(res.data.data)) {
        setListings(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching listing:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getListing();
  }, []);

  // Dummy “Active Goals” data for the top slider (kept same as your formal code)
  // const savingsGoals = [
  //   {
  //     id: 1,
  //     title: "4 Bedroom Duplex",
  //     total: 2500000,
  //     paid: 365400,
  //     weeklyDeposit: 150000,
  //     estDate: "Dec 2026",
  //     image: "/images/house1.jpg",
  //   },
  //   {
  //     id: 2,
  //     title: "3 Bedroom Bungalow",
  //     total: 1800000,
  //     paid: 450000,
  //     weeklyDeposit: 120000,
  //     estDate: "Aug 2026",
  //     image: "/images/house2.jpg",
  //   },
  //   {
  //     id: 3,
  //     title: "2 Bedroom Apartment",
  //     total: 1200000,
  //     paid: 300000,
  //     weeklyDeposit: 100000,
  //     estDate: "Jan 2027",
  //     image: "/images/house3.jpg",
  //   },
  // ];

  // const goalsWithProgress = savingsGoals.map((goal) => ({
  //   ...goal,
  //   progress: ((goal.paid / goal.total) * 100).toFixed(1),
  //   remaining: goal.total - goal.paid,
  // }));

  // Simple skeleton loader
  const SkeletonCard = () => (
    <div className="bg-gray-100 animate-pulse rounded-3xl h-36"></div>
  );

  return (
    <div className="p-4">
      {/* <h1 className="font-bold text-2xl">Property Listing</h1> */}

     

      {/* Listed Properties */}
      <div className="">
        <h1 className="font-bold text-xl mb-5">Listed Properties</h1>

        {loading ? (
          <div className="grid md:grid-cols-3 gap-6">
            {Array(6)
              .fill(0)
              .map((_, i) => (
                <SkeletonCard key={i} />
              ))}
          </div>
        ) : listings.length === 0 ? (
          <p>No properties found.</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {listings.map((item) => {
              const bannerImage = item.files?.find(
                (file) => file.fileCategory === "banner"
              )?.url;

              return (
                <Link
                  key={item._id}
                  to="/dashboard/listing/details"
                  state={{ property: item }}
                  className="no-underline !text-black"
                >
                  <div className="bg-white rounded-lg overflow-hidden flex flex-col sm:flex-row border border-gray-200 hover:shadow-lg transition">
                    {/* Left Image */}
                    <div className="relative h-20 w-full sm:w-1/3">
                      <img
                        src={bannerImage || house}
                        alt={item.title}
                        className="w-full !h-[107px] object-cover"
                      />
                      {item.hasDiscount && (
                        <span className="absolute top-3 left-3 bg-red-200 text-red-600 font-bold px-3 py-1 rounded-md text-[10px]">
                          {Math.round((item.discount / item.price) * 100)}% Discount
                        </span>
                      )}
                    </div>

                    {/* Right Details */}
                    <div className="flex flex-col justify-between p-4 w-full sm:w-2/3">
                      <h2 className="text-md font-bold leading-tight">
                        {item.title || "Untitled Property"}
                      </h2>

                      <p className="text-gray-400 flex items-center gap-2 mt-2 text-sm">
                        <FaMapMarkerAlt className="text-xs" />
                        {item.neighborhood?.name || "No location"}
                      </p>

                      <div className="flex justify-between items-center mt-2">
                        <h1 className="font-semibold">
                          ₦{item.price?.toLocaleString()}
                        </h1>
                        <h3 className="font-bold text-xs uppercase">
                          {item.sizeValue} {item.landSize?.unit || "sqm"}
                        </h3>
                      </div>

                      {/* <div className="flex items-center justify-between mt-4">
                        <div>
                          <h3 className="font-bold text-xs">
                            ₦{item.weeklyDeposit?.toLocaleString() || "N/A"}
                          </h3>
                          <p className="text-gray-400 text-xs">Weekly deposit</p>
                        </div>
                        <div>
                          <h3 className="font-bold text-xs">
                            {item.duration || "6 Months"}
                          </h3>
                          <p className="text-gray-400 text-xs">Duration</p>
                        </div>
                      </div> */}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Listing;
