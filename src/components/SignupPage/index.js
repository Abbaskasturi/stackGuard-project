import { Component } from 'react';
import { withRouter } from '../../withRouter';
import Cookies from 'js-cookie'
import { Navigate } from "react-router-dom";

import './index.css';
class SignupPage extends Component{
    state = {firstName: '', password: '', confirmpassword: '', lastName: '', email: '', error: '', accountSwith: false, signinEmail: '',  signinpassword: ''}
    firstname = (event) => {
        this.setState({
            firstName: event.target.value, error: ''
        })
    }
    lastname =(event) => {
        this.setState({
            lastName: event.target.value
        })
    }
    email = (event) => {
        this.setState({
            email: event.target.value
        })
    }
    password = (event) => {
        this.setState({
            password: event.target.value
        })
    }
    confirmPassword = (event) => {
        this.setState({
         confirmpassword: event.target.value
        })
    }
    handleAccountSwith = () => {
        this.setState((prev) => ({
            accountSwith: !prev.accountSwith, error: ''
        }))
    }
    handleForm = (event) =>{
        event.preventDefault(); 
        const {firstName, lastName, email, password, confirmpassword} = this.state; 
        if (firstName.length<=0 || lastName.length<=0 || email.length<=0 || password.length<=0 || confirmpassword.length<=0) {
      this.setState({ error: 'All fields are required' })
      return
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailPattern.test(email)) {
      this.setState({ error: 'Please enter a valid email address' })
      return
    }

    if (password.length < 6) {
      this.setState({ error: 'Password must be at least 6 characters long' })
      return
    }

    if (password !== confirmpassword) {
      this.setState({ error: 'Passwords do not match' })
      return
    }
    const userDetails ={
        firstName, 
        lastName,
        password, 
        email, 
        confirmpassword, 
    } 
    localStorage.setItem(email, JSON.stringify(userDetails)); 
    this.setState({ error: '', firstName: '', lastName: '', email: '', password: '', confirmpassword: '' })
    alert('Signup Successful!')
  }
  handleSigninForm = (event) => {
    event.preventDefault(); 
    const {signinEmail, signinpassword} = this.state; 

     if (signinEmail.length<=0 || signinpassword.length<=0) {
      this.setState({ error: 'All fields are required' })
      return
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailPattern.test(signinEmail)) {
      this.setState({ error: 'Please enter a valid email address' })
      return
    }

    if (signinpassword.length < 6) {
      this.setState({ error: 'Password must be at least 6 characters long' })
      return
    }
    let token = localStorage.getItem(signinEmail); 
    if(token !== null){
        let cookieToken = token.password; 
        Cookies.set(
            'jwt_token', cookieToken, {expires: 30})
        this.props.router.navigate('/protectKey');
    }else{
        this.setState({  
            error: 'Email and Password not matched'
        })
    }
    }
  signinEmail = (event) => {
    this.setState({
        signinEmail: event.target.value, error: ''
    })
  }
  signinpassword = (event) => {
    this.setState({
        signinpassword: event.target.value
    })
   }
    render(){
         let jwtToken = Cookies.get('jwt_token');  
         if (jwtToken !== undefined) {
         return <Navigate to="/" replace />;
        }
        const {error, firstName, lastName, email, password, confirmpassword, accountSwith, signinEmail, signinpassword} = this.state; 
        const cssCondition = accountSwith ? 'no-space': 'space'; 
        return(
            <div className='signup-main-container'>
                <div className='empty-side-container'>
                </div>
                <div className='signup-fields-container'>
                        <div className='logo-container'>
                            <img src='https://res.cloudinary.com/dsp32vyqi/image/upload/v1762369414/Group_1244832109_haysg7.png' alt='stack-logo' className='image-logo'/>
                            <h1 className='stackguard-heading'>Stackguard</h1>
                        </div>
                            <h1 className='welcome-heading'>Welcome to Stackguard</h1>
                            <p className='secure-paragraph'>Secure your codebase with advanced secret scanning security best practice</p>
                        {
                            accountSwith ? 
                            ( 
                            <form className='form-container-2' onSubmit={this.handleSigninForm}>
                                <input type='text' placeholder='Enter email ID' className='input' onChange={this.signinEmail} value={signinEmail}/>
                                <input type='password' placeholder='Enter password' className='input' onChange={this.signinpassword} value={signinpassword}/>
                                <button className='account-btn' >Sign In</button>
                            </form>
                        ) : 
                        (
                        <form className='form-container' onSubmit={this.handleForm}>
                            <div className='name-container'>
                               <input type='text' placeholder='Enter first name' className='name-input' onChange ={this.firstname} value={firstName}/>
                               <input type='text' placeholder='Enter last name' className='name-input' onChange={this.lastname} value={lastName}/>
                            </div>
                            <input type='text' placeholder='Enter email ID' className='input-2' onChange={this.email} value={email}/>
                            <input type='password' placeholder='Enter password' className='input-2' onChange={this.password} value={password}/>
                            <input type='password' placeholder='Confirm password' className='input-2' onChange={this.confirmPassword} value={confirmpassword}/>
                            <button className='account-btn-2' >Create account</button>
                        </form>
                        )
                       }
                        <p className={cssCondition}>By continuing, you agree to our <span className='span'>Terms of Service</span> and <span className='span'>Privacy Policy</span></p>
                        {
                            accountSwith ? ( <p className='account-para'>Create an account? <span className='sign-span' onClick={this.handleAccountSwith}>Sign up</span></p>) : ( <p className='account-para'>Already have an account? <span className='sign-span' onClick={this.handleAccountSwith}>Sign in</span></p>)
                        }
                        {
                            error.length > 0 ? (<p className='error-para'>{error}</p>) : ('')
                        }
                 </div>
            </div>
        )
    }
}

export default withRouter(SignupPage); 