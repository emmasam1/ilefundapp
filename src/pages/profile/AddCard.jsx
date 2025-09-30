import React from "react";
import { Link } from "react-router";

import back_arrow from "../../assets/back_arrow.png";
import ri_funds_line from "../../assets/ri_funds-line.png";
import round_cross from "../../assets/round_cross.png";
import fluent_savings from "../../assets/fluent_savings.png";

const AddCard = () => {
  return (
    <div className="bg-white h-screen">
      <div className="">
        <div className="p-5">
          <Link to="/dashboard/profile">
            <img src={back_arrow} alt="" className="w-10" />
          </Link>
        </div>
      </div>

      <div className="mt-10 w-4/5 mx-auto">
        <h1 className="font-extrabold text-3xl !mb-7">Debit Cards</h1>
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-4">
            <div className="border border-gray-200 rounded-lg p-4 py-8">
                <h1 className="text-[#0047FF] font-semibold !text-lg">Link Debit Card +</h1>
                <p className="text-[#B0B2C3] mt-1">Click here to link your debit card</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4 py-8">
                <h1 className="text-[#0047FF] font-semibold !text-lg">Link Bank Account +</h1>
                <p className="text-[#B0B2C3] mt-1">Click here to link your bank account</p>
            </div>
      
         </div>

        <h1 className="font-extrabold text-3xl !mb-7">Accounts</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-4">
          {/* Item 1 */}

          <div className="bg-[#658FFB] p-6 rounded-lg flex flex-col items-center gap-4 py-8 cursor-pointer bg-[url(/src/assets/card_bg_2.png)] bg-cover bg-center">
            <h1 className="text-white text-2xl ">GTB</h1>
            <h1 className="font-bold text-white text-2xl">****87322</h1>
          </div>

          {/* Item 2 */}
          <div className="bg-[#658FFB] p-6 rounded-lg flex flex-col items-center gap-4 py-8 cursor-pointer bg-[url(/src/assets/card_bg_2.png)] bg-cover bg-center">
            <h1 className="text-white text-2xl ">Opay</h1>
            <h1 className="font-bold text-white text-2xl">****45768</h1>
          </div>

          {/* Item 3 */}
           <div className="bg-[#12033A] p-6 rounded-lg flex flex-col items-center gap-4 py-8 cursor-pointer">
            <h1 className="text-white text-2xl ">Add Card</h1>
            <img src={round_cross} alt="" className="w-15"/>
          </div>
         
        </div>
      </div>
    </div>
  );
};

export default AddCard;
