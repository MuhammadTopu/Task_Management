
import { BiTask } from "react-icons/bi";
import { IoMdStar } from "react-icons/io";
import { SiGoogletasks } from "react-icons/si";
import { BiTaskX } from "react-icons/bi";
import { Link } from 'react-router-dom';

const Sideber = () => {
    const data = [
        {
            title : "All tasks",
            icon:<BiTask />,
            link:"/"
        },
        {
             title : "Important Tasks",
             icon:<IoMdStar />,
             link:"/important_tasks"
        },
        {
            title : "Completed Tasks",
            icon:<SiGoogletasks />,
            link:"/completed_tasks"
       },
       {
        title : "Incompleted Tasks",
        icon:<BiTaskX />,
        link:"/incompleted_tasks"

   },
    ]
  return (
    <>
     <div>
        <h2 className='text-xl font-semibold' >Kamran Hossain Topu</h2>
        <h4 className=' mb-1 text-gray-500 '>hossainarman953@gmail.com</h4>
        <hr />
     </div>
     <div>
        {data.map((items, key)=>(
            <Link to={items.link} className='my-2 flex items-center gap-1 hover:bg-gray-500 rounded-sm 
            transition-all duration-300 p-4 text-lg ' 
            key={key}>{items.icon}{items.title}</Link>
        ))}
     </div>
     <div className='w-full bg-gray-500 p-2 text-center
      rounded-sm hover:bg-red-500 transition-all duration-300'>
        <button>Log out</button>
     </div>
     </>
  )
}

export default Sideber
