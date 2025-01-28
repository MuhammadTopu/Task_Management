import Home from './pages/home';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Alltasks from './pages/Alltasks';
import Importanttsks from './pages/Importanttsks';
import Completedtsk from './pages/completedtsk';
import Incompletedtsk from './pages/Incompletedtsk';
import Signup from './pages/Signup';
import Login from './pages/Login';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { authActions } from './store/auth';
import { useDispatch } from 'react-redux';

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    const id = localStorage.getItem("id");
    const token = localStorage.getItem("token");
    
    if (id && token) {
      dispatch(authActions.login());
    } 
    
  }, [isLoggedIn, navigate, dispatch]);

  return (
    <div className="bg-gray-900 text-white h-screen p-2 relative">
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<Alltasks />} />
          <Route path="important_tasks" element={<Importanttsks />} />
          <Route path="completed_tasks" element={<Completedtsk />} />
          <Route path="incompleted_tasks" element={<Incompletedtsk />} />
        </Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
