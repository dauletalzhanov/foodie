import { useState } from 'react'

// Pages
import Home from './Pages/Home';
import Shop from './Pages/Shop';
import Order from './Pages/Order';
import OrderAddress from './Pages/OrderAddress';
import OrderPayment from './Pages/OrderPayment'
import NoPage from './Pages/NoPage';
import Faberge from './Pages/Faberge';
import Landing from './Pages/Landing';

// Router
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <NoPage />,
  },
  {
    path: "/shop",
    element: <Shop />
  },
  {
    path: "/order",
    element: <Order />,
  },
  {
    path: "/order/address",
    element: <OrderAddress />
  },
  {
    path: "/order/payment",
    element: <OrderPayment />
  },
  {
    path: "/order/trophy",
    element: <Faberge />
  }, 
  {
    path: "/landing",
    element: <Landing />
  }
])

function App() {
  return (<>
    <RouterProvider router={router} />
  </>)
}

export default App
