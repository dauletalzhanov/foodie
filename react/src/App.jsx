import { useState } from 'react'

// Pages
import Home from './Pages/Home';
import Shop from './Pages/Shop';
import Order from './Pages/Order';

// Router
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    
  },
  {
    path: "/shop",
    element: <Shop />
  },
  {
    path: "/order",
    element: <Order />
  }
])

function App() {
  return (<>
    <RouterProvider router={router} />
  </>)
}

export default App
