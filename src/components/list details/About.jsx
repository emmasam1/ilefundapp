import { useState, useEffect } from "react";
import { Button, Input } from "antd";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import axios from "axios";

import blueBall from "../../assets/blue_ball.png";
import grayBall from "../../assets/gray_ball.png";
import download from "../../assets/download.png";
import "leaflet/dist/leaflet.css";

const About = () => {
  const [location, setLocation] = useState("");
  const [coords, setCoords] = useState({ lat: 9.082, lng: 8.6753 });

  useEffect(() => {
    if (!location) return;
    const delayDebounce = setTimeout(() => {
      searchLocation();
    }, 1000); // wait 1s after typing

    return () => clearTimeout(delayDebounce);
  }, [location]);

  const searchLocation = async () => {
    try {
      const res = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          location + ", Nigeria"
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

  const infor = [
    {
      id: 1,
      title: "price",
      amount: "N1,300,000",
    },
    {
      id: 2,
      title: "Square meter",
      amount: "500",
    },
    {
      id: 3,
      title: "Min Initial Deposit",
      amount: "N300,000",
    },
    {
      id: 4,
      title: "Duration",
      amount: "6 months",
    },
    {
      id: 5,
      title: "Title Document",
      amount: "C Of O/R Of O",
    },
    {
      id: 6,
      title: "FCDA Approval",
      amount: "Approved/Pending",
    },
  ];

  return (
    <div>
      {/* <h1 className="font-bold text-2xl">Six (6) Bedroom Flat</h1>

      <p className="my-2 text-sm text-gray-500">
        Lorem Ipsum is simply dummy text of the print and typesetting industry.
        Lorem Ipsum <br />
        has industry's standard dummy text ever since 1500s, whenecimen book. 
      </p>

      <h1 className="font-bold text-2xl mt-6">Property Requirements</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 my-4">
        <Button className="!bg-[#D4D4D4] p-3 !border-none hover:!text-black !rounded-full flex items-center justify-center">
          6 Bedrooms
        </Button>
        <Button className="!bg-[#D4D4D4] p-3 !border-none hover:!text-black !rounded-full flex items-center justify-center">
          Swimming Pool
        </Button>
        <Button className="!bg-[#D4D4D4] p-3 !border-none hover:!text-black !rounded-full flex items-center justify-center">
          7 Bathrooms
        </Button>
        <Button className="!bg-[#D4D4D4] p-3 !border-none hover:!text-black !rounded-full flex items-center justify-center">
          Undercover Parking
        </Button>
        <Button className="!bg-[#D4D4D4] p-3 !border-none hover:!text-black !rounded-full flex items-center justify-center">
          Tennis Court
        </Button>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
        {infor.map((item) => {
          return (
            <div class="bg-[#D9D9D9] py-10 p-6 rounded-lg" key={item.id}>
              <p className="text-gray-500">{item.title}</p>
              <h1 className="!text-black font-semibold text-2xl">
                {item.amount}
              </h1>
            </div>
          );
        })}
      </div>
      <h1 className="font-bold text-2xl mt-8">Get To Know More!!!</h1>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        <div class="aspect-w-16 aspect-h-9">
          <iframe
            class="w-full h-full rounded-lg"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>

        <div class="aspect-w-16 aspect-h-9">
          <iframe
            class="w-full h-full rounded-lg"
            src="https://www.youtube.com/embed/ysz5S6PUM-U"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>

        <div class="aspect-w-16 aspect-h-9">
          <iframe
            class="w-full h-full rounded-lg"
            src="https://www.youtube.com/embed/jNQXAC9IVRw"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      </div>

      <h1 className="font-bold text-2xl mt-8">Payment Method</h1>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-5">
        <div class="p-6 rounded-lg flex justify-between items-center border border-gray-100">
          <p>Outrightly</p>
          <img src={blueBall} alt="" className="w-4" />
        </div>
        <div class="p-6 rounded-lg flex justify-between items-center border border-gray-100">
          <p>Buying to Sales</p>
          <img src={grayBall} alt="" className="w-4" />
        </div>
      </div>

      <h1 className="font-bold text-2xl mt-8">Opportunity Attache ments</h1>
      <p className="text-gray-400 text-sm">
        TBC - Makeen Eastern Fund and Makeen Eastern Fund
      </p>
      <h1 className="font-bold text-2xl mt-8">Files</h1>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-5">
        <div class="p-6 rounded-full flex justify-between items-center bg-[#D9D9D9] h-9">
          <p>Make AI Shares Fund</p>
          <img src={download} alt="" className="w-8" />
        </div>
        <div class="p-6 rounded-full flex justify-between items-center bg-[#D9D9D9] h-9">
          <p>Terms and Condition.....</p>
          <img src={download} alt="" className="w-8" />
        </div>
      </div> */}

      <h1 className="font-bold text-2xl mt-8">Destination</h1>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-5">
        <Input
        placeholder="Insert your Known Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
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
            <Popup>{location || "Nigeria"}</Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default About;
