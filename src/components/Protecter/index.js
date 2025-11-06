import Cookies from 'js-cookie';
import { Component } from "react";
import { Navigate } from "react-router-dom";
import { withRouter } from '../../withRouter';

import './index.css';
class Protecter extends Component{
    state ={generatedKey: '', key: ''}; 
    handleFormVerify = (event) => {
        event.preventDefault(); 
        const {generatedKey, key} = this.state; 
        if(generatedKey.length > 0 && key.length> 0){
            this.setState({
                generatedKey: '', key: ''
            })
            this.props.router.navigate('/');
        }else{
            this.setState({
                keyError: 'Your public key is not valid', generatedKey: '', key: ''
            })
        }

    }
    componentDidMount(){
        const jwtToken = Cookies.get('jwt_token');

        if (jwtToken === undefined) {
            return; 
        }
       this.generatePublicKey();
    }
    generatePublicKey = () => {
        let length = 120;
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let generatedKey = '';

        for (let i = 0; i < length; i++) {
            generatedKey += characters.charAt(Math.floor(Math.random() * characters.length));
        }

        prompt("Your public key (copy this):", generatedKey);
        this.setState({ generatedKey });
    };
    render(){
        const jwtToken = Cookies.get('jwt_token'); 
        if(jwtToken === undefined){
           return <Navigate to="/Sign-Up" replace />; 
        }
        return(
            <div className="proctor-main-container">
                <div className="empty-verify-container">
                </div>
                <div className="verify-container">
                    <div className="logo-container">
                        <img src='https://res.cloudinary.com/dsp32vyqi/image/upload/v1762369414/Group_1244832109_haysg7.png' alt='logo' className="logo-image"/>
                        <h1 className="heading-stack">Stackguard</h1>
                    </div>
                    <h1 className="verify-heading">Verify your public key</h1>
                    <p className="get-started">To get started provide your public key for verification </p>
                    <form onSubmit={this.handleFormVerify} className="form-container">
                        <input type='text' placeholder="Enter your public key" className="key-input"
                       onPaste={(event) => {
                      let pasted = event.clipboardData.getData("text");
                      this.setState({ key: pasted });
                       }}
                      onChange={(event) => this.setState({ key: event.target.value })}/>
                        <button className="verify-btn">Verify</button>
                    </form>
                    <p className="bottom-para">Don’t have a public key? Contact your adminstrator</p>
                </div>
            </div>
        )
    }
}

export default withRouter(Protecter); 