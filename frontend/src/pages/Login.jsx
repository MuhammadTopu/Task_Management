
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <div className='h-[98vh] flex items-center justify-center'>
    <div className='w-2/6 bg-gray-700 rounded p-4'>
      <div className='text-2xl font-semibold'>Log in</div>

    <input type="email"
        placeholder='xyz@example.com' 
        className='bg-gray-800 p-3 my-3 w-full rounded'
        name='xyz@example.com'
        required
        />

    <input type="password"
        placeholder='your password' 
        className='bg-gray-800 p-3 my-3 w-full rounded' 
        required
        />
         <div className='flex items-center justify-between'>
         <button className='p-2 bg-blue-500 rounded hover:bg-blue-600'>Log in</button>
         <Link to={"/signup"} className='hover:text-blue-600'> Or, Create New Account </Link>
         </div>
       
    </div>
    </div>
  )
}

export default Login
