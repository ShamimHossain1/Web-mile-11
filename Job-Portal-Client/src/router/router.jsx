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
import MypostedJobs from "../Pages/MypostedJobs";
import Applicants from "../Pages/Applicants";




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
        loader: ({ params }) => fetch(`https://job-portal-server-d28ye5li7-shamimhossain1s-projects.vercel.app/JobDetails/${params.id}`),
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
        path: "/My-Posted-Jobs",
        element: <PrivateRoute><MypostedJobs /></PrivateRoute>,
      },
      {
        path: "/view-applications/:job_id",
        element: <PrivateRoute><Applicants /></PrivateRoute>,
        loader: ({ params }) => fetch(`https://job-portal-server-d28ye5li7-shamimhossain1s-projects.vercel.app/view-applications/jobs/${params.job_id}`),
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
    ],
  },
]);

export default router;