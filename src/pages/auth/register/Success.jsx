import React from "react";
import { useNavigate } from "react-router";
import success_img from "../../../assets/success.png";
import CustomButton from "../../../components/button/CustomButton";

const Success = () => {
  const navigate = useNavigate();

  const onFinish = () => {
    navigate("/personal-information");
  };
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <img src={success_img} alt="" className="w-50" />

      <h1 className="text-5xl font-bold my-4">Successful</h1>

      <CustomButton label="Finish" onClick={onFinish} />
    </div>
  );
};

export default Success;
