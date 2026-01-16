import { createBrowserRouter } from "react-router-dom";
import Login from "../Pages/Login";
import ProtectedRoutes from "./ProtectedRoutes";
import AppLayout from "../Layout/AppLayout";
import Register from "../Pages/Register";
import UserHome from "../Pages/User/UserHome";
import AdminDashboard from "../Pages/Admin/AdminDashboard";
import OwnerDashboard from "../Pages/Owner/OwnerDashboard";
import Users from "../Pages/Admin/Users";
import Restaurants from "../Pages/Admin/Restraunts";
import MyOrders from "../Pages/User/MyOrders";
import Cart from "../Pages/User/Cart"
import MyRestaurants from "../Pages/Owner/MyRestaurants";
import OwnerOrders from "../Pages/Owner/OwnerOrders"
import RestaurantMenu from "../Pages/RestaurantMenu";
import OwnerMenu from "../Pages/OwnerMenu";
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
