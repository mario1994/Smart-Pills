import React from 'react';
import { CountryDropdown } from 'react-country-region-selector';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.handleDayChange = this.handleDayChange.bind(this);
    this.state = {
      email: '',
      firstName: '',
      lastName: '',
      dateOfBirth: undefined,
      city:'',
      country:'',
      postalCode:'',
      password: '',
      confirmPassword:'',
      emailIsValid: false,
      firstNameIsValid: false,
      lastNameIsValid: false,
      dateOfBirthIsValid: false,
      cityIsValid: false,
      countryIsValid: false,
      postalCodeIsValid: false,
      passwordIsValid: false,
      confirmPasswordIsValid: false,
    }
  }

  checkPassword = (str) => {
    const re = new RegExp("^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$");
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

   onCityChange = (event) => {
    if(event.target.value != ""){
      this.setState({cityIsValid: true})
    }
    this.setState({city: event.target.value})
  }

  selectCountry (val) {
    this.setState({countryIsValid: true})
    this.setState({ country: val });
  }

   onPostalCodeChange = (event) => {
    if(event.target.value != ""){
      this.setState({postalCodeIsValid: true})
    }
    this.setState({postalCode: event.target.value})
  }

  onEmailChange = (event) => {
    if(event.target.validity.valid == true){
      this.setState({emailIsValid: true})
    }
    this.setState({email: event.target.value})
  }

  onPasswordChange = (event) => {
    if(event.target.validity.valid == true && this.checkPassword(event.target.value)){
      this.setState({passwordIsValid: true})
    }
    this.setState({password: event.target.value})
  }
  onConfirmPasswordChange = (event) => {
    if(this.confirmPassword == this.password && this.passwordIsValid){
      this.setState({confirmPasswordIsValid: true})
    }
    this.setState({password: event.target.value})
  }

  onSubmitSignUp = () => {
    const {emailIsValid,confirmPasswordIsValid,firstNameIsValid,lastNameIsValid,cityIsValid,countryIsValid,dateOfBirthIsValid,postalCodeIsValid} = this.state;
    if(emailIsValid && confirmPasswordIsValid && firstNameIsValid && lastNameIsValid && cityIsValid && countryIsValid && dateOfBirthIsValid && postalCodeIsValid){
      fetch('http://localhost:3100/signup', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password,
          first_name: this.state.firstName,
          last_name: this.state.lastName,
          city: this.state.city,
          country: this.state.country,
          postal_code: this.state.postalCode
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
            var response = response.json()
            return new Promise((resolve, reject) => {
              reject({"error":"invalid user registration data sent"});
            })
          }
        })
        .then(user => {
          if (user) {
            console.log(user);
            this.props.loadUser(user);
          }
        })
        .catch(err => {
        console.log(err);
      })
      }
  }

  render() {
    const { dateOfBirth } = this.state;
    return (
      <article className="br3 ba b--black-10 mw6 shadow-5 center">
        <main className="pa4 black-80">
          <div className="measure center">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0 tc">
              <legend className="f1 fw6 ph0 mh0">Register</legend>
              <div className="mt0">
                <label className="db fw6 lh-copy f5 black" htmlFor="email-address">Email</label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-white hover-black w-75"
                  type="email"
                  name="email-address"
                  id="email-address"
                  required
                  onChange={this.onEmailChange}
                />
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f5 black" htmlFor="firstName">First Name</label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-white hover-black w-75"
                  type="firstName"
                  name="firstName"
                  id="firstName"
                  required
                  onChange={this.onFirstNameChange}
                />
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f5 black" htmlFor="lastName">Last Name</label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-white hover-black w-75"
                  type="lastName"
                  name="lastName"
                  id="lastName"
                  required
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
               <div className="mt3">
                <label className="db fw6 lh-copy f5 black" htmlFor="city">City</label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-white hover-black w-75"
                  type="city"
                  name="city"
                  id="city"
                  required
                  onChange={this.onCityChange}
                />
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f5 black" htmlFor="country">Country</label>
                <CountryDropdown
                value={this.state.country}
                onChange={(val) => this.selectCountry(val)} />
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f5 black" htmlFor="postalCode">Postal Code</label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-white hover-black w-75"
                  type="postalCode"
                  name="postalCode"
                  id="postalCode"
                  required
                  onChange={this.onPostalCodeChange}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f5 black" htmlFor="password">Password</label>
                <label className="db fw6 lh-copy f9" htmlFor="password">Password must contain at least 6 characters, including UPPER/lowercase and numbers</label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-white hover-black w-75"
                  type="password"
                  name="password"
                  id="password"
                  required
                  onChange={this.onPasswordChange}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f5 black" htmlFor="password">Confirm Password</label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-white hover-black w-75"
                  type="password"
                  name="confirm-password"
                  id="confirm-password"
                  required
                  onChange={this.onConfirmPasswordChange}
                />
              </div>
            </fieldset>
            <div className="tc">
              <input
                onClick={this.onSubmitSignUp}
                className="center pv2 input-reset ba b--black bg-transparent grow pointer f6 dib w-50"
                type="submit"
                value="Register"
              />
            </div>
              <div className="lh-copy mt1 tc">
              <p 
             onClick={() => this.props.onRouteChange('signin')}
             href="#0" 
             className="f4 link dim black db">Sign in</p>
            </div>
          </div>
        </main>
      </article>
    );
  }
}

export default Register;