import React, { Component }  from "react";
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
				method: 'post',
				headers: {'Content-Type':'application/json'},
				body: JSON.stringify({
					email:this.state.signInEmail,
					password:this.state.signInPassword
				})
			})
				.then(response => response.json())
	    		.then(user => {
	       		if(user.id){
	          		this.props.loadUser(user);
	       		 }
	      })
	    }else{
	    	alert("Pleae stop!");
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
		        <label className="db fw6 lh-copy f4 black" htmlFor="email-address">Email</label>
		        <input 
		        className="pa2 input-reset ba bg-transparent hover-bg-white hover-black w-100"
		        type="email" 
		        name="email-address"  
		        id="email-address"
		        required
		        onChange = {this.onEmailChange}
		        />
		      </div>
		      <div className="mv3">
		        <label className="db fw6 lh-copy f4 black" htmlFor="password">Password</label>
		        <input 
		        className="pa2 input-reset ba bg-transparent hover-bg-white hover-black w-100"
		        type="password" 
		        name="password"  
		        id="password"
		        required
		        onChange = {this.onPasswordChange}
		        />
		      </div>
		    </fieldset>
		    <div className="">
		      <input
		      onClick={this.onSubmitSignIn}
		      className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f4 dib"
		      type="submit"
		      value="Sign in"/>
		    </div>
		    <div className="lh-copy mt3">
		      <p 
		      onClick={() => onRouteChange('register')}
		      href="#0" 
		      className="f4 link dim black db">Register</p>
		    </div>
		  </div>
		</main>
	</article>
	);
	}
}
export default Login;