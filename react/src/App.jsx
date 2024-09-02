import { CookiesProvider } from 'react-cookie';

// Pages
import Home from './Pages/Home';
import Shop from './Pages/Shop';
import Order from './Pages/Order';
import OrderAddress from './Pages/OrderAddress';
import OrderPayment from './Pages/OrderPayment'
import NoPage from './Pages/NoPage';
import Faberge from './Pages/Faberge';
import Landing from './Pages/Landing';
import Signin from './Pages/Signin';
import Signout from './Pages/Signout';
import Signup from './Pages/Signup';
import Profile from './Pages/Profile';
import Settings from './Pages/Settings';


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
    path: "/signin",
    element: <Signin />
  },
  {
    path: "/signout",
    element: <Signout />
  },
  {
    path: "/signup",
    element: <Signup />
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
  },
  {
    path: "/profile/:id",
    element: <Profile />
  },
  {
    path: "settings",
    element: <Settings />
  },
])

function App() {
  return (<>
    <CookiesProvider>
      <RouterProvider router={router} />
    </CookiesProvider>
  </>)
}

export default App
