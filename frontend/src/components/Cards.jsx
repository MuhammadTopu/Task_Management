
import { IoMdStar } from "react-icons/io";
import { SiGoogletasks } from "react-icons/si";
import { TfiWrite } from "react-icons/tfi";
import { FiPlusCircle } from "react-icons/fi";


const Cards = ({home , setInputDiv }) => {
    const data = [
        {
            title:"This is card 1",
            dis:"loream ipsum",
            status:"Incompleted"
        },
        {
            title:"This is card 2",
            dis:"loream ipsum2",
            status:"Completed"
        },
        {
            title:"This is card 3",
            dis:"loream ipsum3",
            status:"Incompleted"
        },
        {
            title:"This is card 4",
            dis:"lloream ipsum4sdasdadsfaadadas daaaaaaaaaa aaaaaaaaaaaaaaaaa asdasd",
            status:"Completed"
        },
        {
            title:"This is card 5",
            dis:"loream ipsum5sdasdadsfaadadas daaaaaaaaaa aaaaaaaaaaaaaaaaa asdadsas asdasd adasd asdasd",
            status:"Incompleted",
        },
    ]
  return (
    <div className='grid grid-cols-4 p-4 gap-4 '>
    {data.map((index, key)=>(
        <div key={key} className=' bg-gray-800 rounded-md p-4 hover:bg-gray-700 flex flex-col justify-between'>
        <div key={key} >
            <h3 className='text-xl font-semibold '>{index.title}</h3>
            <p className='text-gray-300 text-sm my-2'>{index.dis}</p>
            
        </div>
            <div className='mt-2 w-full flex items-center'>
                <button className={`${index.status==="Incompleted" ?" bg-red-400" : "bg-green-600" } p-2 rounded `}>
                    {index.status}
                </button>
                <div className='flex justify-between p-2 w-3/6 text-lg font-semibold'>
                    <button className='hover:text-green-600'><SiGoogletasks /></button>
                    <button className='hover:text-red-600'><IoMdStar /></button>
                    <button className='hover:text-gray-900'><TfiWrite /></button>
                </div>
            </div>
        </div>

    ))}
    {home=="false" && <button className=' bg-gray-800 rounded-md p-4 hover:bg-gray-700 flex flex-col justify-center items-center hover:scale-95 transition-all duration-300 hover:text-3xl hover:cursor-pointer' onClick={()=> setInputDiv("fixed")}>
    <FiPlusCircle className='text-2xl' />
    <h2>Add task</h2>
    </button>}
    
    </div>
  )
}

export default Cards
