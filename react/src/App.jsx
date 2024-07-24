import { useState } from 'react'

// Pages
import Home from './Pages/Home';

// Router
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/dawg",
    element: (<>
      <h1>hello dawg</h1>
    </>)
  }
])

function App() {
  return (<>
    <RouterProvider router={router} />
  </>)
}

export default App
