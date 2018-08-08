import DashboardPage from "views/Dashboard/Dashboard.jsx";
import UserProfile from "views/UserProfile/UserProfile.jsx";
import LoginPage from "views/Login/Login.jsx";
import {appRoutes} from "routes/app.jsx";

import {
  Dashboard,
  Person
} from "material-ui-icons";

const sidebarItems = [
  {
    type: "navigation",
    route: appRoutes["dashboard"],
    sidebarName: "Dashboard",
    navbarName: "Smart Pills Dashboard",
    icon: Dashboard,
  },
  {
    type: "navigation",
    route: appRoutes["user"],
    sidebarName: "User Profile",
    navbarName: "Profile",
    icon: Person,
  },
  {
    type: "action",
    sidebarName: "Logout",
    icon: Person,
  },
];

export default sidebarItems;
