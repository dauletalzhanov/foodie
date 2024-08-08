import { useState } from 'react'

// Pages
import Home from './Pages/Home';
import Shop from './Pages/Shop';
import Order from './Pages/Order';
import OrderAddress from './Pages/OrderAddress';
import NoPage from './Pages/NoPage';
import Faberge from './Pages/Faberge';

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
    path: "/order/trophy_wife",
    element: <Faberge />
  }
])

function App() {
  return (<>
    <RouterProvider router={router} />
  </>)
}

export default App
