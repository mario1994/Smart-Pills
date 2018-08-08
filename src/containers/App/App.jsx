import React from "react";
import PropTypes from "prop-types";
import Navigation from 'components/Navigation/Navigation';
import LoginPage from "views/Login/Login.jsx";
import RegisterPage from "views/Register/Register.jsx";
import DashboardPage from "views/Dashboard/Dashboard.jsx";
import UserProfile from "views/UserProfile/UserProfile.jsx";
import { Switch, Route, Redirect } from "react-router-dom";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import { withStyles } from "material-ui";

import { Header, Footer, Sidebar } from "components";

import sidebarItems from "sidebarItems/sidebarItems.jsx";
import {appRoutes, redirects} from "routes/app.jsx";

import appStyle from "variables/styles/appStyle.jsx";

import image from "assets/img/sidebar-3.jpg";
import logo from "assets/img/pillslogo.jpg";

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

class App extends React.Component {
  state = {
    user:{
      firstName:"",
      lastName:"",
      email:"",
      dateOfBirth:"",
      city:"",
      country:"",
      postalCode:"",
    },
    mobileOpen: false,
    route: 'loggedIn',
  };

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  loadUser = (data) => {
    this.setState({route: 'loggedIn'});
    console.log(this.state.user);
  }
  onRouteChange = (route) => {
    this.setState({route: route});
  }
  signOutUser = () =>{
    this.setState({user:{
      firstName:"",
      lastName:"",
      email:"",
      dateOfBirth:"",
      city:"",
      country:"",
      postalCode:"",
    }});
    this.setState({route: "signin"});
  }
  getRoute() {
    return this.props.location.pathname !== "/maps";
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
            {/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
            {this.getRoute() ? (
              <div className={classes.content}
              >
                <div 
                className={classes.container}
                >
                <Switch>
                    { Object.keys(appRoutes).map((key) => {
                      var route = appRoutes[key]
                      if(key == "dashboard"){
                         return <Route 
                         path={route.path} 
                         render={(props) => <DashboardPage {...props} user={this.state.user}/>} 
                         key={key} />;
                      }else if (key == "user"){
                        return <Route 
                        path={route.path}
                        render={(props) => <UserProfile {...props} user={this.state.user}/>}
                        key={key} />;
                      }
                    })}
                    {redirects.map((prop, key) => {
                        return <Redirect from={prop.path} to={prop.to} key={key} />;
                    })}
                </Switch>
                </div>
              </div>
            ) : (
              <div className={classes.map}>{switchRoutes}</div>
            )}
            {this.getRoute() ? <Footer /> : null}
          </div>
        </div>
      );
    }else if(this.state.route === 'signin'){
      return(
        <div>
          <LoginPage loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
        </div>
        );
    }else if(this.state.route === 'register'){
      return(
      <div>
        <RegisterPage loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
      </div>
        );
    }
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(appStyle)(App);
