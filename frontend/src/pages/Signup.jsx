
import { Link } from 'react-router-dom'
const Signup = () => {
  return (
    <div className='h-[98vh] flex items-center justify-center'>
    <div className='w-2/6 bg-gray-700 rounded p-4'>
      <div className='text-2xl font-semibold'>SignUp</div>
      <input type="username"
       placeholder='username' 
       className='bg-gray-800 p-3 my-3 w-full rounded' 
       required
       />

    <input type="email"
        placeholder='xyz@example.com' 
        className='bg-gray-800 p-3 my-3 w-full rounded'
        name='xyz@example.com'
        required
        />

    <input type="password"
        placeholder='use strong pass' 
        className='bg-gray-800 p-3 my-3 w-full rounded' 
        required
        />

<div className='flex items-center justify-between'>
         <button className='p-2 bg-blue-500 rounded hover:bg-blue-600'>Sign Up</button>
         <Link to={"/login"} className='hover:text-blue-600'> Or, Log in </Link>
         </div>
    </div>
    </div>
  )
}

export default Signup
