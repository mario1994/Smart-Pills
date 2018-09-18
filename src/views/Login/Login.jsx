import React, { Component }  from "react";
import Alert from 'react-s-alert';

import {
  Button,
} from "components";

import {
  withRouter
} from 'react-router-dom'

import {TextField} from "material-ui";
import './Login.css';


class Login extends Component {
	constructor(props){
		super(props);
		this.state = {
			signInEmail: '',
			signInPassword: '',
			emailIsValid: false,
			passwordIsValid: false,
		}
	}

	onEmailChange = (event) => {
		if(event.target.validity.valid == true){
			this.setState({emailIsValid: true})
		}
		this.setState({signInEmail: event.target.value})
	}

	onPasswordChange = (event) => {
		if(event.target.validity.valid == true){
			this.setState({passwordIsValid: true})
		}
		this.setState({signInPassword: event.target.value})
	}

	onSubmitSignIn = () => {
		const {emailIsValid,passwordIsValid} = this.state;
		if(emailIsValid && passwordIsValid){
			fetch('http://localhost:3100/signin',{
				credentials: "same-origin",
				method: 'post',
				headers: {'Content-Type':'application/json'},
				body: JSON.stringify({
					email:this.state.signInEmail,
					password:this.state.signInPassword
				})
			})
				.then(response => {
					if(response.status == 200){
		            return response.json()
		          }
		          else if(response.status == 204){
		            return new Promise((resolve, reject) => {
		              reject("incomplete form sent");
		            })
		          }
		          else if(response.status == 404){
		             return new Promise((resolve, reject) => {
		              reject("invalid login data sent");
		            })
		          }
		        })
	    		.then(user => {
	       		if(user.id){
	          		this.props.loadUser(user);
	          		this.props.history.push('/dashboard')
	       		 }
	      })
	    	.catch(error =>{
            Alert.error(error, {
            position: 'top-right',
            effect:"jelly",
            timeout: 2000,
            offset: 100
        });
        })
	    }else{
	    	Alert.error('email or password not entered', {
            position: 'top-right',
            effect:"jelly",
            timeout: 2000,
            offset: 100
        });
	    }
	}
	render(){
		const { onRouteChange } = this.props;
		return(
	<article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
		<main className="simple-form pa4 black-80 tc">
		  <div className="measure">
		    <fieldset id="sign_up" className="ba b--transparent ph0 mh0 tc">
		      <legend className="f1 fw6 ph0 mh0">Sign In</legend>
		      <div className="mt3">
		      <label className="db fw6 lh-copy f5 black">Email</label>
		        <TextField
		        type="email" 
		        name="email-address"  
		        id="email-address"
		        onChange = {this.onEmailChange}
		        />
		      </div>
		      <div className="mt3">
		      <label className="db fw6 lh-copy f5 black">Password</label>
		        <TextField 
		        type="password"   
		        id="password"
		        onChange = {this.onPasswordChange}
		        />
		      </div>
		    </fieldset>
		    <div className="mt3">
		      <Button
		      onClick={this.onSubmitSignIn}
		      className="b--black bg-transparent grow pointer f4 "
		      color= "primary"
		      type="submit"
		      value="Sign in">
		      Sign In
		      </Button>
		    </div>
		    <div className="mt3">
		      <Button 
		      onClick={() => onRouteChange('register')}
		      className="f4 bg-transparent grow pointer b--black"
		      color="primary">
		      Register
		      </Button>
		    </div>
		  </div>
		</main>
	</article>
	);
	}
}
export default withRouter(Login);