import React, { Component }  from "react";
import PropTypes from "prop-types";
import Navigation from 'components/Navigation/Navigation';
import LoginPage from "views/Login/Login.jsx";
import RegisterPage from "views/Register/Register.jsx";
import DashboardPage from "views/Dashboard/Dashboard.jsx";
import BottlePage from "views/Bottle/Bottle.jsx";
import UserProfile from "views/UserProfile/UserProfile.jsx";
import { Switch, Route, Redirect } from "react-router-dom";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import { withStyles } from "material-ui";

import { Header, Footer, Sidebar } from "components";
import {appRoutes, redirects} from "routes/app.jsx";

import {
  withRouter
} from 'react-router-dom'

import appStyle from "variables/styles/appStyle.jsx";

import image from "assets/img/sidebar-3.jpg";
import logo from "assets/img/pillslogo.jpg";

import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import 'react-s-alert/dist/s-alert-css-effects/scale.css';
import 'react-s-alert/dist/s-alert-css-effects/bouncyflip.css';
import 'react-s-alert/dist/s-alert-css-effects/flip.css';
import 'react-s-alert/dist/s-alert-css-effects/genie.css';
import 'react-s-alert/dist/s-alert-css-effects/jelly.css';
import 'react-s-alert/dist/s-alert-css-effects/stackslide.css';

import {
  user,
  setUser,
  logoutUser
} from "variables/User";

import {
  sidebarItems,
  addBottleItems,
  removeBottleItems
}  from "sidebarItems/sidebarItems.jsx";

const switchRoutes = (
  <Switch>
    { Object.keys(appRoutes).map((key) => {
      var route = appRoutes[key]
      return <Route path={route.path} component={route.component}  key={key} />;
    })}
    {redirects.map((prop, key) => {
        return <Redirect from={prop.path} to={prop.to} key={key} />;
    })}
  </Switch>
);

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      mobileOpen: false,
      route: 'signin',
    };
    if(localStorage.getItem("user") != null){
       var storedUser = JSON.parse(localStorage.getItem("user"))
       setUser(storedUser);
       addBottleItems(storedUser.bottles);
       this.state.route = 'loggedIn';
    }
   }
  

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  loadUser = (data) => {
    setUser(data);
    addBottleItems(user.bottles);
    localStorage.setItem("user", JSON.stringify (data));
    this.setState({route: 'loggedIn'});
  }

  addNewBottle = () =>{
    removeBottleItems();
    addBottleItems(user.bottles);
    var storedUser = JSON.parse(localStorage.getItem("user"))
    storedUser.bottles = user.bottles;
    localStorage.setItem("user", JSON.stringify (storedUser));
    this.setState({route: 'loggedIn'});
  }
  onRouteChange = (route) => {
    this.setState({route: route});
  }
  signOutUser = () =>{
    logoutUser();
    removeBottleItems();
    localStorage.clear()
    this.setState({route: "signin"})
  }

  componentDidMount() {
    if(navigator.platform.indexOf('Win') > -1){
      // eslint-disable-next-line
      const ps = new PerfectScrollbar(this.refs.mainPanel);
    }
  }
  render() {

    const { classes, ...rest } = this.props;
    if(this.state.route === 'loggedIn'){
    return (
        <div className={classes.wrapper}>
          <Sidebar
            signOutUser = {this.signOutUser}
            sidebarItems={sidebarItems}
            logoText={"Smart Pills"}
            logo={logo}
            image={image}
            handleDrawerToggle={this.handleDrawerToggle}
            open={this.state.mobileOpen}
            color="blue"
            {...rest}
          />
          <div className={classes.mainPanel} ref="mainPanel">
            <Header
              routes={appRoutes}
              handleDrawerToggle={this.handleDrawerToggle}
              {...rest}
            />
            {
              <div className={classes.content}>
                <div className={classes.container}>
                <Switch>
                    { Object.keys(appRoutes).map((key) => {
                      var route = appRoutes[key]
                      
                      if(key == "dashboard"){
                         return <Route 
                         path={route.path} 
                         render={(props) => <DashboardPage {...props}/>} 
                         key={key} />;
                      }else if (key == "user"){
                        return <Route 
                        path={route.path}
                        render={(props) => <UserProfile {...props} addNewBottle={this.addNewBottle} />}
                        key={key} />;
                      }else if (key == "bottle"){
                        var bottleRoute = route.path + "/:id"
                        return <Route 
                        path= {bottleRoute}
                        render={(props) => <BottlePage {...props} bottleId={user.bottles}/>}
                        key={key} />;
                       }
                      }
                    )}
                </Switch>
                </div>
              </div>
            }
          </div>
            <Alert stack={{limit: 3}} />
        </div>
      );
    }else if(this.state.route === 'signin'){
      return(
        <div>
          <LoginPage loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
          <Alert stack={{limit: 3}} />
        </div>
        );
    }else if(this.state.route === 'register'){
      return(
      <div>
        <RegisterPage loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
        <Alert stack={{limit: 3}} />
      </div>
        );
    }
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(appStyle)(App);
