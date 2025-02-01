
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {Provider} from "react-redux"
import store from './store/index.js'
import { BrowserRouter as Router } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
 
    <Router>
    <Provider store = {store} >
    <App />
    </Provider>
    </Router>
  
)
