import React, { useState, useRef, useEffect } from "react";
import { Modal, Button } from "antd";
import Webcam from "react-webcam";
import { motion } from "framer-motion";
import logo from "../../../assets/new_logo.png";
import cross from "../../../assets/plus_blue.png";
import check from "../../../assets/check.png";
import arrow from "../../../assets/angle-right.png";
import { Link } from "react-router";

const VerifyIdentity = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [captureOpen, setCaptureOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null); // "Driver’s License" | "National ID" | "Passport" | "Selfie"
  const [step, setStep] = useState("front"); // front | back | done | selfie
  const [showGuide, setShowGuide] = useState(true);

  const webcamRef = useRef(null);
  const [frontPhoto, setFrontPhoto] = useState(null);
  const [backPhoto, setBackPhoto] = useState(null);
  const [selfiePhoto, setSelfiePhoto] = useState(null);

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);

  const handleSelect = (idType) => {
    setSelectedId(idType);
    setIsModalOpen(false);
    setCaptureOpen(true);
    setShowGuide(true);

    if (idType === "Selfie") {
      setStep("selfie");
      setSelfiePhoto(null);
    } else {
      setStep("front");
      setFrontPhoto(null);
      setBackPhoto(null);
    }
  };

  const takePhoto = () => {
    const screenshot = webcamRef.current.getScreenshot();
    if (step === "front") {
      setFrontPhoto(screenshot);
      setStep("back");
      setShowGuide(true);
    } else if (step === "back") {
      setBackPhoto(screenshot);
      setCaptureOpen(false);
      setStep("done");
    } else if (step === "selfie") {
      setSelfiePhoto(screenshot);
      setCaptureOpen(false);
      setStep("done");
    }
  };

  // Auto-hide dummy guide after 3s
  useEffect(() => {
    if (showGuide) {
      const timer = setTimeout(() => setShowGuide(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showGuide]);

  // ✅ Only enable verification if BOTH ID (front+back) and Selfie are captured
  const isVerifyReady = frontPhoto && backPhoto && selfiePhoto;

  return (
    <div className="p-10">
      <img src={logo} alt="" className="w-35" />

      <div className="mt-30">
        <h1 className="font-bold text-3xl">Verify Identity</h1>

        <div className="flex gap-10 mt-9">
          {/* Government ID */}
          <div className="bg-[#EAEAEA] rounded-3xl flex justify-center items-center flex-col p-10">
            <h2 className="font-bold text-2xl mb-5">Government ID</h2>
            <p className="text-center">
              Take a driver’s license,
              <br />
              national identity card or a passport photo
            </p>

            <div
              className="flex gap-4 items-center mt-5 cursor-pointer"
              onClick={showModal}
            >
              <div className="h-12 w-12 rounded-full bg-[#C7CDDE] flex justify-center items-center">
                <img
                  src={frontPhoto && backPhoto ? check : cross}
                  alt=""
                  className="w-8"
                />
              </div>
              <p className="font-extrabold text-[#0047FF]">Select</p>
            </div>
          </div>

          {/* Selfie */}
          <div
            className="bg-[#EAEAEA] rounded-3xl flex justify-center items-center flex-col p-10"
            onClick={() => handleSelect("Selfie")}
          >
            <h2 className="font-bold text-2xl mb-5">Selfie Photo</h2>
            <p className="text-center">
              It is required by law
              <br />
              to verify your identity as a new user
            </p>

            <div className="flex gap-4 items-center mt-5 cursor-pointer">
              <div className="h-12 w-12 rounded-full bg-[#C7CDDE] flex justify-center items-center">
                <img src={selfiePhoto ? check : cross} alt="" className="w-8" />
              </div>
              <p className="font-extrabold text-[#0047FF]">Select</p>
            </div>
          </div>
        </div>

        {/* ✅ Show button ONLY when both Government ID + Selfie are done */}
        {isVerifyReady && (
          <Button className="mt-10 !bg-[#0047FF] !text-white !border-none !px-10 !rounded-lg">
            <Link to="/register-completed">Confirm Verification</Link>
          </Button>
        )}
      </div>

      {/* Select ID Modal */}
      <Modal
        title={
          <h1 className="font-bold text-lg">
            Which photo ID would you like to use
          </h1>
        }
        open={isModalOpen}
        footer={null}
        onCancel={handleCancel}
      >
        <div
          className="flex justify-between items-center cursor-pointer hover:bg-gray-100 p-2"
          onClick={() => handleSelect("Driver’s License")}
        >
          <h1 className="font-bold text-lg">Driver’s License</h1>
          <img src={arrow} alt="" className="w-5" />
        </div>
        <div
          className="flex justify-between items-center cursor-pointer hover:bg-gray-100 p-2"
          onClick={() => handleSelect("National ID")}
        >
          <h1 className="font-bold text-lg">National Identity card</h1>
          <img src={arrow} alt="" className="w-5" />
        </div>
        <div
          className="flex justify-between items-center cursor-pointer hover:bg-gray-100 p-2"
          onClick={() => handleSelect("Passport")}
        >
          <h1 className="font-bold text-lg">Passport</h1>
          <img src={arrow} alt="" className="w-5" />
        </div>
      </Modal>

      {/* Camera Capture Screen */}
      {captureOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-90 flex flex-col justify-center items-center z-50">
          {step === "selfie" ? (
            <>
              <h2 className="text-white text-2xl font-bold mb-2">Selfie</h2>
              <p className="text-white mb-4 text-center">
                Align your face to the center of the <br />
                area and then take a photo
              </p>
            </>
          ) : (
            <>
              <h2 className="text-white text-xl mb-4">
                Capture {selectedId} (
                {step === "front" ? "Front of Card" : "Back of Card"})
              </h2>
            </>
          )}

          <div className="relative w-96 h-72">
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/png"
              className="rounded-lg w-96 h-72 object-cover"
              videoConstraints={{
                facingMode: step === "selfie" ? "user" : "environment",
              }}
            />

            {/* Dummy ID overlay with flip animation - disappears after 3s */}
            {step !== "selfie" && showGuide && (
              <motion.div
                key={step}
                initial={{ rotateY: 0 }}
                animate={{ rotateY: step === "back" ? 180 : 0 }}
                transition={{ duration: 1 }}
                className="absolute inset-0 flex justify-center items-center pointer-events-none"
              >
                <div className="w-60 h-36 bg-white bg-opacity-20 border-2 border-dashed border-white rounded-md flex items-center justify-center text-white font-bold">
                  {step === "front" ? "Align Front of ID" : "Align Back of ID"}
                </div>
              </motion.div>
            )}
          </div>

          <div className="flex gap-4 mt-5">
            <Button onClick={takePhoto} type="primary">
              {step === "front"
                ? "Take Front Photo"
                : step === "back"
                ? "Take Back Photo"
                : "Take Selfie"}
            </Button>
            <Button onClick={() => setCaptureOpen(false)}>Cancel</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerifyIdentity;
