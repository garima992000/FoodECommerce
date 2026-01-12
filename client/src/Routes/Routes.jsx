import {createBrowserRouter} from 'react-router-dom';
import Login from '../Pages/Login';
import Home from '../Pages/Home';
import ProtectedRoutes from './ProtectedRoutes';
const Routes=createBrowserRouter([
     {
        path:'/login',
        element:<Login/>
     },
  {
    path: "/",
    element: (
      <ProtectedRoutes allowedRoles={["user"]}>
        <Home />
      </ProtectedRoutes>
    ),
  },
])

export default Routes;