import DashboardPage from "views/Dashboard/Dashboard.jsx";
import UserProfile from "views/UserProfile/UserProfile.jsx";
import LoginPage from "views/Login/Login.jsx";


import {
  Dashboard,
  Person
} from "material-ui-icons";

const appRoutes = [
  {
    path: "/dashboard",
    sidebarName: "Dashboard",
    navbarName: "Smart Pills Dashboard",
    icon: Dashboard,
    component: DashboardPage
  },
  {
    path: "/user",
    sidebarName: "User Profile",
    navbarName: "Profile",
    icon: Person,
    component: UserProfile
  },
  { redirect: true, path: "/", to: "/dashboard", navbarName: "Redirect" }
];

export default appRoutes;
