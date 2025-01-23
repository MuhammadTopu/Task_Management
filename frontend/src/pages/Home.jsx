
import Sideber from '../components/Sideber'
import { Outlet } from 'react-router-dom'

const home = () => {
  return (
    <div className='flex h-[98vh] gap-2'>
        <div className=' border border-gray-400 rounded-md w-1.5/6 p-[2.5vh] flex flex-col justify-between'> <Sideber/> </div>
        <div className=' w-5/6 border border-gray-400 rounded-md p-[2.5vh]'><Outlet /></div>
    </div>
  )
}

export default home
