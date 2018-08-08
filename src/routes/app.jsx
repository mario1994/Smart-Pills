import DashboardPage from "views/Dashboard/Dashboard.jsx";
import UserProfile from "views/UserProfile/UserProfile.jsx";
import LoginPage from "views/Login/Login.jsx";


import {
  Dashboard,
  Person
} from "material-ui-icons";

export const appRoutes = {
  dashboard: {
    path: "/dashboard",
    component: DashboardPage,
  },
  user: {
    path: "/user",
    component: UserProfile,
  }
};

export const redirects = [
  { redirect: true, path: "/", to: "/dashboard", navbarName: "Redirect" }
];
