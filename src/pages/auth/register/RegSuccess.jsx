import React from "react";
import success_icon from "../../../assets/success_icon.png";
import { Button } from "antd";
import { useNavigate } from "react-router";


const RegSuccess = () => {

    const navigate = useNavigate()

    const onFinish =() => {
        navigate('/register-face-id')
    }

  return (
    <div className="flex justify-center items-center flex-col h-screen">
      <img src={success_icon} alt="" className="w-50" />

      <h1 className="font-bold text-3xl">
        You have Successfully created your Pin
      </h1>
      <p className="text-center mt-2 text-[#12033A]">
        You will be required to login with your
        <br />
        pin after your first login
      </p>

      <Button onClick={onFinish} className="!bg-[#0047FF] !text-white !border-none !px-10 mt-4 !rounded-lg">Finish</Button>
    </div>
  );
};

export default RegSuccess;
