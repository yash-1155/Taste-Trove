import { RouterProvider, createBrowserRouter } from "react-router-dom";
import axios from "axios";
import Home from "./ui/Home";
import Error from "./ui/Error";
import Menu, { loader as menuLoader } from "./features/menu/Menu";
import Cart from "./features/cart/Cart";
import CreateOrd,{
  createOrderAction,
} from "./features/order/CreateOrd";
// import Order, { loader as orderLoader } from "./features/order/Order";
// import { action as updateOrderAction } from "./features/order/UpdateOrder";
import AppLayout from "./ui/AppLayout";
import SignInForm from "./features/user/SignInForm/SignInForm";
import SignUpForm from "./features/user/SignInForm/SignUpForm";
import { useEffect, useState } from "react";
// import { logout } from "../backend/controllers/goo_auth_controllers";
// import { logout } from "./ui/Header";
import Timepass from "./ui/timepass";
import Index from "./ui/Index";
import NewListing from "./ui/NewListing";
import Edit from "./ui/Edit";
import Main from "./ui/Main";
import AllMess from "./ui/AllMess";
import Mainn from "./ui/Mainn";
import Forgotpassword from "./ui/Forgotpassword";
import ResetPassword from "./ui/ResetPassword";
import Profile from './ui/Profile'
import UserProfile from './ui/UserProfile'
import "./index.css";
import AdminHub from "./ui/Dashboard"
import DashboardAdmin from "./ui/DashboardAdmin"
const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,

    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/Mainn",
        element: <Mainn />,
      },
      {
        path: "/allListings",
        element: <Index />,
      },
      {
        path: "/allmess",
        element: <AllMess />,
      },
      {
        path: "/editListing/:bid",
        element: <Edit />,
      },
      {
        path: "/Adminprofile/:id",
        element: <DashboardAdmin/>,
      },
      {
        path: "/Userprofile/:id",
        element: <AdminHub/>,
      },
      {
        path: "/listings/:bid",
        element: <Main/>,
      },
      {
        path: "/listings/Owner/:bid",
        element: <Mainn/>,
      },
      {
        path: "/new/:id",
        element: <NewListing />,
      },
      ,
      {
        path: "/signUp",
        element: <SignUpForm />,
      },
      {
        path: "/order/neworder/:userid",
        element: <CreateOrd />,
        action: createOrderAction
      },
      {
        path: "/menu",
        element: <Menu />,
        loader: menuLoader,
        errorElement: <Error />,
      },
      {
        path: "/cart/:userid",
        element: <Cart />,
      },
      // {
      //   path: "/order/:orderId",
      //   element: <Order />,
      //   loader: orderLoader,
      //   errorElement: <Error />,
      //   // action: updateOrderAction,
      // },
      {
        path: "/login",
        element: <SignInForm />,
      },
      {
        path: "/p",
        element: <Timepass />,
      },
      {
        path: "/login/forgotPassword",
        element: <Forgotpassword />,
      },
      {
        path: "/login/resetPassword/:token",
        element: <ResetPassword />,
      },
      // {
      //   path: "/dashboard",
      //   element: <AdminHub />,
      // }
    ],
  },
]);

function App() {
  return (
    <>
      <div className="App">
        <div className="AppGlass">
          <RouterProvider router={router} />;
        </div>
      </div>
    </>
  );
}

export default App;

// import { RouterProvider, createBrowserRouter } from "react-router-dom";
// import axios from 'axios'
// import Home from "./ui/Home";
// import Error from "./ui/Error";
// import Menu, { loader as menuLoader } from "./features/menu/Menu";
// import Cart from "./features/cart/Cart";
// import CreateOrder, {
//   action as createOrderAction,
// } from "./features/order/CreateOrder";
// import Order, { loader as orderLoader } from "./features/order/Order";
// import { action as updateOrderAction } from "./features/order/UpdateOrder";
// import AppLayout from "./ui/AppLayout";
// import SignInForm from "./features/user/SignInForm/SignInForm";
// import { useEffect,useState } from "react";
// import { logout } from "../backend/controllers/goo_auth_controllers";
// // import { logout } from "./ui/Header";
// import Timepass from "./ui/timepass";

// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route
//           element={<AppLayout />}
//           errorElement={<Error />}
//         >
//           <Route path="/" element={<Home />} />
//           <Route
//             path="/menu"
//             element={<Menu />}
//             loader={menuLoader}
//             errorElement={<Error />}
//           />
//           <Route path="/cart" element={<Cart />} />
//           <Route
//             path="/order/new"
//             element={<CreateOrder />}
//             action={createOrderAction}
//           />
//           <Route
//             path="/order/:orderId"
//             element={<Order />}
//             loader={orderLoader}
//             errorElement={<Error />}
//             action={updateOrderAction}
//           />
//           <Route path="/login" element={<SignInForm />} />
//           <Route path="/timepass" element={<Timepass />} />
//           {/* Uncomment and implement logout route if needed */}
//           {/* <Route path="/logout" element={<Logout />} /> */}
//         </Route>
//       </Routes>
//     </Router>
//   );
// }

// export default App;
