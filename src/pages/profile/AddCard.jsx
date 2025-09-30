import React from 'react'
import { Link } from 'react-router';

import back_arrow from "../../assets/back_arrow.png";

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
        <h1 className="font-extrabold text-3xl !mb-7">Edit Profile</h1>
        </div>

    </div>
  )
}

export default AddCard