import React, { useState } from 'react';
import Slider from 'react-slick';
import { Button } from 'antd';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import pimage from "../../assets/party_img.png";
import rainy from "../../assets/Rainy_day.png";
import { Link } from 'react-router';

const goals = [
  {
    title: 'Rainy Day Fund',
    percentage: '15%',
    description:
      'Put some cash away for unexpected events. We recommend 15% from your monthly income.',
    image: rainy,
    bg: '#9559F6', 
  },
  {
    title: 'Chilling/Balling Fund',
    percentage: '35%',
    description: 'You did not come to this life to suffer, Use this one to ball without limit.',
    image: pimage,
    bg: '#FF9500', 
  },
  {
    title: 'Home Fund',
    percentage: '45%',
    description:
      'Plan for the long term. Contribute regularly for your future.',
    image: '🏖️',
    bg: '#6691FF',
  },
];

const ChoosePlan = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    centerMode: true,
    centerPadding: '60px',
    slidesToShow: 1,
    arrows: false,
    dotsClass: 'slick-dots custom-dots',
    afterChange: (index) => setCurrentSlide(index),
  };

  return (
    <div
      className="h-screen flex flex-col items-center justify-center transition-colors duration-700 ease-in-out"
      style={{ backgroundColor: goals[currentSlide].bg }}
    >
      <h1 className="text-3xl font-bold mb-8 text-white">Choose a Goal</h1>
      <div className="w-full max-w-lg">
        <Slider {...settings}>
          {goals.map((goal, index) => (
            <div key={index} className="px-3">
              <div
                className={`shadow-lg p-8 flex flex-col items-center transform transition-all duration-500 ease-in-out ${
                  currentSlide === index
                    ? 'bg-white text-black scale-105 h-[420px] opacity-100 rounded-2xl'
                    : 'bg-white/60 text-gray-700 scale-90 h-[360px] opacity-70 rounded-xl'
                }`}
              >
                <p className="text-gray-500 text-sm mb-2">Following with our</p>
                <p className="text-lg font-semibold mb-4">
                  45 / 35 / 15 / 5 ...<span className="text-black font-bold"> Rule</span>
                </p>

                <img src={goal.image} alt="" className='w-20'/>
                {/* <div className="text-6xl mb-4">{goal.icon}</div> */}
                <h2 className="text-2xl font-bold mb-4">{goal.title}</h2>
                <p className="text-center text-sm mb-6 flex-1">
                  {goal.description}
                </p>
                <Button
                  type="primary"
                  className="!bg-[#12033A] rounded-full px-6 py-2"
                >
                  <Link to='/choose-savings-method'>Start with this</Link>
                </Button>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default ChoosePlan;
