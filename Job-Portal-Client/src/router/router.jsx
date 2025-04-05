import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import Home from "../Pages/Home";
import Layout from "../Layout/Layout";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import JobDetails from "../Pages/JobDetails";
import PrivateRoute from "./PrivateRoute";
import JobApply from "../Pages/JobApply";
import MyApplications from "../Pages/MyApplications";
import AddJobs from "../Pages/AddJobs";
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/JobDetails/:id",
          element: <PrivateRoute><JobDetails /></PrivateRoute>,
          loader: ({ params }) => fetch(`http://localhost:3000/JobDetails/${params.id}`),
        },
        {
          path: "/jobApply/:id",
          element: <PrivateRoute><JobApply /></PrivateRoute>,
        },
        {
          path: "/MyApplications",
          element: <PrivateRoute><MyApplications /></PrivateRoute>,
        },
        {
          path: "/AddJobs",
          element: <PrivateRoute><AddJobs /></PrivateRoute>,
        },
        {
          path: "/register",
          element: <Register></Register>,
        },
      ],
    },
  ]);
  
  export default router;