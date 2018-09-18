import DashboardPage from "views/Dashboard/Dashboard.jsx";
import UserProfile from "views/UserProfile/UserProfile.jsx";
import LoginPage from "views/Login/Login.jsx";
import {appRoutes} from "routes/app.jsx";
import {
  Dashboard,
  Person,
  Kitchen
} from "material-ui-icons";
var sidebarItems = [
  {
    type: "navigation",
    path: appRoutes["dashboard"].path,
    sidebarName: "Dashboard",
    navbarName: "Smart Pills Dashboard",
    icon: Dashboard,
  },
  {
    type: "navigation",
    path: appRoutes["user"].path,
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

function addBottleItems(bottles) {
  bottles.map((bottle,key) => {
    var bottlePath = appRoutes["bottle"].path + "/" + bottle
    var bottleItem = {
      type:"navigation",
      path:bottlePath,
      sidebarName: bottle,
      navbarName: "Bottle",
      icon: Kitchen
    }
    sidebarItems.splice(2, 0, bottleItem);
  })
}

function removeBottleItems(){
  sidebarItems = [
  {
    type: "navigation",
    path: appRoutes["dashboard"].path,
    sidebarName: "Dashboard",
    navbarName: "Smart Pills Dashboard",
    icon: Dashboard,
  },
  {
    type: "navigation",
    path: appRoutes["user"].path,
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
}
export {sidebarItems, addBottleItems,removeBottleItems} ; 
