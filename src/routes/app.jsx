import DashboardPage from "views/Dashboard/Dashboard.jsx";
import UserProfile from "views/UserProfile/UserProfile.jsx";
import BottlePage from "views/Bottle/Bottle.jsx";
import LoginPage from "views/Login/Login.jsx";



export var appRoutes = {
  dashboard: {
    path: "/dashboard",
    component: DashboardPage,
  },
  user: {
    path: "/user",
    component: UserProfile,
  },
  bottle:{
    path: "/bottle",
    component: BottlePage,
  }
};

export const redirects = [
  { redirect: true, path: "/", to: "/dashboard", navbarName: "Redirect" }
];
