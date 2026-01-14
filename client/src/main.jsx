import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Store from './Redux/Store.js'
import { RouterProvider } from 'react-router-dom'
import {Provider} from 'react-redux' 
import Routes from './Routes/Routes.jsx'
import { ToastContainer } from "react-toastify";
createRoot(document.getElementById('root')).render(
  <Provider store={Store}>
    <RouterProvider router={Routes}/>
    <ToastContainer
      position="top-right"
      autoClose={2000}
      hideProgressBar={false}
      closeOnClick
      pauseOnHover
      draggable
    />
  </Provider>,
)
