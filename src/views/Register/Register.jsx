import React from 'react';
import { CountryDropdown } from 'react-country-region-selector';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import Alert from 'react-s-alert';

import {TextField} from "material-ui";

import {
  Button,
} from "components";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.handleDayChange = this.handleDayChange.bind(this);
    this.state = {
      email: '',
      firstName: '',
      lastName: '',
      dateOfBirth: undefined,
      password: '',
      confirmPassword:'',
      emailIsValid: false,
      firstNameIsValid: false,
      lastNameIsValid: false,
      dateOfBirthIsValid: false,
      passwordIsValid: false,
      confirmPasswordIsValid: false,
    }
  }

  checkPassword = (str) => {
    const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z]).{8,32}$");
    return re.test(str);
  }

  onFirstNameChange = (event) => {
    if(event.target.value != ""){
      this.setState({firstNameIsValid: true})
    }
    this.setState({firstName: event.target.value})
  }

  onLastNameChange = (event) => {
    if(event.target.value != ""){
      this.setState({lastNameIsValid: true})
    }
    this.setState({lastName: event.target.value})
  }

  handleDayChange(day) {
    this.setState({dateOfBirthIsValid: true})
    this.setState({ dateOfBirth: day });
  }

  onEmailChange = (event) => {
    if(event.target.validity.valid == true){
      this.setState({emailIsValid: true})
    }
    this.setState({email: event.target.value})
  }

  onPasswordChange = (event) => {
    if(this.checkPassword(event.target.value)){
      this.setState({passwordIsValid: true})
    }
    this.setState({password: event.target.value})
  }
  onConfirmPasswordChange = (event) => {
    if(event.target.value == this.state.password && this.state.passwordIsValid){
      this.setState({confirmPasswordIsValid: true})
    }
    this.setState({confirmPassword: event.target.value})
  }

  onSubmitSignUp = () => {
    const {emailIsValid,confirmPasswordIsValid,firstNameIsValid,lastNameIsValid,dateOfBirthIsValid} = this.state;
      fetch('http://localhost:3100/signup', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password,
          first_name: this.state.firstName,
          last_name: this.state.lastName,
          date_of_birth: this.state.dateOfBirth,
        })
      })
        .then(response => {
          if(response.status == 201){
            return response.json()
          }
          else if(response.status == 204){
            return new Promise((resolve, reject) => {
              reject({"error":"incomplete form sent"});
            })
          }
          else if(response.status == 404){
            console.log(response.json());
            Alert.error("", {
            position: 'top-right',
            effect:"jelly",
            timeout: 2000,
            offset: 100
            })
          }
        })
        .then(user => {
          if (user) {
            this.props.loadUser(user);
          }
        })
  }

  render() {
    const { dateOfBirth } = this.state;
    return (
      <article className="br3 ba b--black-10 mw6 shadow-5 center mt3 mb3">
        <main className="pa4 black-80">
          <div className="measure center">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0 tc">
              <legend className="f1 fw6 ph0 mh0">Register</legend>
              <div className="mt0">
                <label className="db fw6 lh-copy f5 black" htmlFor="email-address">Email</label>
                <TextField
                  className=""
                  type="email"
                  name="email-address"
                  id="email-address"
                  onChange={this.onEmailChange}
                />
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f5 black" htmlFor="firstName">First Name</label>
                <TextField
                  className=""
                  type="firstName"
                  name="firstName"
                  id="firstName"
                  onChange={this.onFirstNameChange}
                />
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f5 black" htmlFor="lastName">Last Name</label>
                <TextField
                  className=""
                  type="lastName"
                  name="lastName"
                  id="lastName"
                  onChange={this.onLastNameChange}
                />
            </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f5 black" htmlFor="firstName">Date of Birth</label>
                <div>
                <DatePicker
              selected={dateOfBirth}
              onChange={this.handleDayChange}
              openToDate={moment("1997-09-28")}
              maxDate={moment().add(1, "months")}
              showYearDropdown
              dateFormatCalendar="MMMM"
              scrollableYearDropdown
              yearDropdownItemNumber={100}
              />
            </div>
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f5 black" htmlFor="password">Password</label>
                <label className="db fw6 lh-copy f9 black" htmlFor="password">Password must contain at least 8 characters, including UPPER/lowercase and numbers</label>
                <TextField
                  className=""
                  type="password"
                  name="password"
                  id="password"
                  onChange={this.onPasswordChange}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f5 black" htmlFor="password">Confirm Password</label>
                <TextField
                  className=""
                  type="password"
                  name="confirm-password"
                  id="confirm-password"
                  onChange={this.onConfirmPasswordChange}
                />
              </div>
            </fieldset>
            <div className="tc">
              <Button
                onClick={this.onSubmitSignUp}
                className=""
                color="primary"
                type="submit"
                value="Register"
                >
                Register
              </Button>
            </div>
              <div className="lh-copy mt1 tc">
              <Button 
             onClick={() => this.props.onRouteChange('signin')}
             color="primary"
             className="">
             Sign in
             </Button>
            </div>
          </div>
        </main>
      </article>
    );
  }
}

export default Register;