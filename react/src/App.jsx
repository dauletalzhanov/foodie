import { useState } from 'react'

// Pages
import Home from './Pages/Home';
import Shop from './Pages/Shop';

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
  }
])

function App() {
  return (<>
    <RouterProvider router={router} />
  </>)
}

export default App
