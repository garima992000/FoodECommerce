import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import ProtectedRoutes from "./ProtectedRoutes";
import AppLayout from "../Layout/AppLayout";

import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Subscription from "../Pages/Subscription";
const UserHome=lazy(()=>import("../Pages/User/UserHome"));
const AdminDashboard=lazy(()=>import("../Pages/Admin/AdminDashboard"));
const OwnerDashboard=lazy(()=>import("../Pages/Owner/OwnerDashboard"));
const Users=lazy(()=>import("../Pages/Admin/Users"));
const Restaurants=lazy(()=>import("../Pages/Admin/Restraunts"));
const MyOrders=lazy(()=>import("../Pages/User/MyOrders"));
const Cart=lazy(()=>import("../Pages/User/Cart"));
const MyRestaurants=lazy(()=>import("../Pages/Owner/MyRestaurants"));
const OwnerOrders=lazy(()=>import("../Pages/Owner/OwnerOrders"));
const RestaurantMenu=lazy(()=>import("../Pages/RestaurantMenu"));
const OwnerMenu=lazy(()=>import("../Pages/OwnerMenu"));

const Routes = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path:"/register",
    element:<Register/>
  },
  {
    path: "/",
    element: (
      <ProtectedRoutes allowedRoles={["user", "admin", "restaurant_owner"]}>
        <AppLayout />
      </ProtectedRoutes>
    ),
    children: [
      {
        path: "",
        element: <UserHome/>,
      },
      {
        path:"myorders",
        element:<MyOrders/>
      },{
        path:"cart",
        element:<Cart/>
      },{
        path:"subscription",
        element:<Subscription/>
      },
      {
        path:"admin",
        element:<AdminDashboard/>
      },
      {
        path:"admin/users",
        element:<Users/>
      },
      {
        path:"admin/restaurants",
        element:<Restaurants/>
      },{
        path:'owner',
        element:<OwnerDashboard/>
      },
      {
        path:'owner/orders',
        element:<OwnerOrders/>
      },
      {
        path:'owner/restaurants',
        element:<MyRestaurants/>
      },
      {
        path:'restaurants/:restaurantId/menu',
        element:<RestaurantMenu/>
      },{
        path:'restaurants/:restaurantId/foods',
        element:<OwnerMenu/>
      }
    ],
  },
]);

export default Routes;
