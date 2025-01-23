
import Home from './pages/home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Alltasks from './pages/Alltasks';
import Importanttsks from './pages/Importanttsks';
import Completedtsk from './pages/completedtsk';
import Incompletedtsk from './pages/Incompletedtsk';
import Signup from './pages/Signup';
import Login from './pages/Login';


const App = () => {
  return (
    <div className='bg-gray-900 text-white h-screen p-2 relative'>
    <Router>
        <Routes>
        <Route exact path="/" element={<Home />}>
          <Route index path="/" element={<Alltasks />} />
          <Route path="important_tasks" element={<Importanttsks />} />
          <Route path="completed_tasks" element={<Completedtsk />} />
          <Route path="incompleted_tasks" element={<Incompletedtsk />} />
        </Route>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        </Routes>
    </Router>
  
    </div>
  )
}

export default App
