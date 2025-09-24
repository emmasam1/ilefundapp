import { Card } from "antd";
import icon4 from "../../../assets/login_icon.png";
import CustomButton from "../../../components/button/CustomButton";
import { useNavigate } from "react-router";


const Template = () => {
    const navigate = useNavigate()

    const onFinish = () => {
    navigate("/enter-pin");
  };
  return (
    <div className="h-screen w-full bg-no-repeat bg-center bg-[url(/src/assets/Dashboard.png)]">
      <div className="bg-[#000000a1] h-screen w-full flex justify-center items-center">
        <Card className="">
          <div className="flex justify-center">
            <img src={icon4} alt="" className="w-40" />
          </div>
          <h1 className="font-bold text-2xl">
            Continue other signin with your pin?
          </h1>
          <p className="text-center mt-4">
            You can use your pin to sing in next time <br />
            you come back.
          </p>

          <div className="flex justify-center my-6">
            <CustomButton label="Confirm" className='!px-10' onClick={onFinish}/>
          </div>

          <p className="text-center text-[#0047FF] cursor-pointer">Skip, I'll do this later</p>
        </Card>
      </div>
    </div>
  );
};

export default Template;
