// import React, { useRef, useState, useEffect } from "react";
// import camera from "../../../assets/camera.png";
// import { Button } from "antd";
// import { useNavigate } from "react-router";

// const FaceId = () => {
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const [photo, setPhoto] = useState(null);
//   const [streaming, setStreaming] = useState(false);
//   const [stream, setStream] = useState(null);
//   const navigate = useNavigate();

//   // ✅ Start camera
//   const startCamera = async () => {
//     try {
//       const mediaStream = await navigator.mediaDevices.getUserMedia({
//         video: { facingMode: "user" }, // front camera
//         audio: false,
//       });

//       setStream(mediaStream);

//       if (videoRef.current) {
//         videoRef.current.srcObject = mediaStream;

//         // ✅ important: wait for metadata before playing
//         videoRef.current.onloadedmetadata = async () => {
//           try {
//             await videoRef.current.play();
//             setStreaming(true);
//           } catch (err) {
//             console.error("Video play failed:", err);
//           }
//         };
//       }
//     } catch (err) {
//       console.error("Error accessing camera:", err);
//       alert("Please allow camera access in your browser settings.");
//     }
//   };

//   // ✅ Stop camera
//   const stopCamera = () => {
//     if (stream) {
//       stream.getTracks().forEach((track) => track.stop());
//       setStream(null);
//     }
//     if (videoRef.current) {
//       videoRef.current.srcObject = null;
//     }
//     setStreaming(false);
//   };

//   // ✅ Capture snapshot
//   const takePhoto = () => {
//     if (!videoRef.current || !canvasRef.current) return;

//     const width = 400;
//     const height = 300;
//     const context = canvasRef.current.getContext("2d");

//     canvasRef.current.width = width;
//     canvasRef.current.height = height;
//     context.drawImage(videoRef.current, 0, 0, width, height);

//     const imageData = canvasRef.current.toDataURL("image/png");
//     setPhoto(imageData);

//     stopCamera();
//   };

//   const retakePhoto = () => {
//     setPhoto(null);
//     startCamera();
//   };

//   const confirmPhoto = () => {
//     navigate("/next-page", { state: { photo } });
//   };

//   // ✅ Cleanup on unmount
//   useEffect(() => {
//     return () => stopCamera();
//   }, []);

//   return (
//     <div className="flex justify-center items-center flex-col h-screen gap-4">
//       <h1 className="font-bold text-3xl text-[#12033A]">
//         Face ID for Faster Verification
//       </h1>
//       <p className="text-[#B0B2C3] text-center">
//         Enable face ID to let you log in <br /> & proceed with your transactions faster
//       </p>

//       {/* Step 1: Camera icon */}
//       {!photo && !streaming && (
//         <img
//           src={camera}
//           alt="camera"
//           className="w-32 cursor-pointer hover:scale-105 transition-transform"
//           onClick={startCamera}
//         />
//       )}

//       {/* Step 2: Live Camera */}
//       {streaming && (
//         <div className="flex flex-col items-center gap-4">
//           <video
//             ref={videoRef}
//             autoPlay
//             playsInline
//             muted
//             className="rounded-lg border bg-black w-[400px] h-[300px] object-cover"
//           />
//           <canvas ref={canvasRef} className="hidden" />
//           <Button type="primary" onClick={takePhoto}>
//             Capture
//           </Button>
//         </div>
//       )}

//       {/* Step 3: Preview */}
//       {photo && (
//         <div className="flex flex-col items-center gap-4">
//           <h2 className="text-xl font-semibold">Check Quality</h2>
//           <p className="text-gray-500 text-sm">
//             Please make sure your face is clear with no blur or glare
//           </p>
//           <img
//             src={photo}
//             alt="snapshot"
//             className="rounded-lg border shadow-md w-[400px] h-[300px] object-cover"
//           />
//           <div className="flex gap-3 mt-4">
//             <Button onClick={retakePhoto}>Retake</Button>
//             <Button type="primary" onClick={confirmPhoto}>
//               Confirm & Continue
//             </Button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FaceId;



import React, { useRef, useState, useEffect } from "react";
import { Button } from "antd";
import { useNavigate } from "react-router";

const FaceId = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [photo, setPhoto] = useState(null);
  const [streaming, setStreaming] = useState(false);

  const navigate = useNavigate()

  const onFinish =() => {
        navigate('/register-verify-identity')
    }

  // Start camera
  useEffect(() => {
    if (!photo) {
      startCamera();
    }
    return () => stopCamera();
  }, [photo]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setStreaming(true);
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      setStreaming(false);
    }
  };

  const takePhoto = () => {
    const width = 400;
    const height = 300;
    const context = canvasRef.current.getContext("2d");
    canvasRef.current.width = width;
    canvasRef.current.height = height;
    context.drawImage(videoRef.current, 0, 0, width, height);
    const dataUrl = canvasRef.current.toDataURL("image/png");
    setPhoto(dataUrl);
    stopCamera();
  };

  const retakePhoto = () => {
    setPhoto(null);
    startCamera();
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white p-6">
      {!photo ? (
        <>
          <h2 className="text-2xl font-bold mb-2">Take a Selfie</h2>
          <p className="text-gray-500 mb-4">
            Please make sure your face is clearly visible with no blur or glare
          </p>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="rounded-xl shadow-md mb-4 w-[400px] h-[300px] object-cover"
          />
          <Button
            type="primary"
            className="bg-blue-600 rounded-lg px-8"
            onClick={takePhoto}
          >
            Capture
          </Button>
          <canvas ref={canvasRef} className="hidden" />
        </>
      ) : (
        <>
          <h2 className="text-2xl font-bold mb-2">Check Quality</h2>
          <p className="text-gray-500 mb-4">
            Please make sure your card details are clear to read with no blur and glare
          </p>
          <img
            src={photo}
            alt="Captured"
            className="rounded-xl shadow-md mb-4 w-[400px] h-[300px] object-cover"
          />
          <div className="flex flex-col items-center space-y-3">
            <Button
              type="primary"
              className="bg-blue-600 rounded-lg px-8"
              onClick={onFinish}
            >
              Finish
            </Button>
            <button
              className="text-blue-600 underline"
              onClick={retakePhoto}
            >
              Take a New Photo
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default FaceId;

