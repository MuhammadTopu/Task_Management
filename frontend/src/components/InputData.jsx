
import { RxCross2 } from "react-icons/rx";
import PropTypes from 'prop-types'; // Import PropTypes

const InputData = ({setInputDiv}) => {
  return (
    <>
    <div className={`fixed left-0 top-0 bg-slate-800 opacity-80 h-screen w-full`}></div>
    <div className={`fixed left-0 top-0 flex items-center justify-center  h-screen w-full`}>
    
      <div className='w-2/6 bg-gray-900 p-4 rounded text-black'>
      <div className='flex justify-end text-2xl hover:text-white' onClick={()=> setInputDiv("hidden")}><RxCross2 className="hover:cursor-pointer" /></div>
     <input type="text" placeholder='Title' name='title' className='p-2 rounded w-full my-3'/>
     <textarea name="disc" id="" cols={10} rows={5}  placeholder='Enter the discription' className='p-2 rounded w-full my-3 resize-none' ></textarea>
     <button className='p-2 rounded bg-blue-400 hover:bg-blue-700 transition-all duration-300 hover:text-white'>Submit</button>
      </div>
    </div>
    </>
  )
}
InputData.propTypes = {
  setInputDiv: PropTypes.func.isRequired,
};

export default InputData

