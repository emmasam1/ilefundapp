
import { CheckCircleFilled } from "@ant-design/icons";

const AuthRightSide = () => {
  return (
    <div className='hidden md:flex items-center justify-center bg-[#0047FF] rounded-3xl'>
      <div className='text-white p-8 md:p-12 max-w-md'>
        <h1 className='text-2xl md:text-3xl font-bold leading-snug'>
          <i>ile’ means home —</i>
        </h1>
        <p> ileFund helps you save toward owning one.</p>
        <br />

        <div className='space-y-6'>
          <div>
            <p className='flex items-center gap-2 font-bold text-lg'>
              <CheckCircleFilled className='text-white' />
              Build your savings
            </p>
            <p className='text-sm text-gray-100'>
              Consistently automate your savings while setting realistic goals
            </p>
          </div>

          <div>
            <p className='flex items-center gap-2 font-bold text-lg'>
              <CheckCircleFilled className='text-white' />
              Set a target.
            </p>
            <p className='text-sm text-gray-100'>
              Explore our wide range of properties and choose a savings plan
              that works for you.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
export default AuthRightSide
