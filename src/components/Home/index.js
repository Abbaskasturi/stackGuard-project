import './index.css'; 
import Cookies from 'js-cookie'; 
import { Navigate } from "react-router-dom";
import { withRouter } from '../../withRouter';
const Home = (props) => {
    const jwtToken = Cookies.get('jwt_token'); 
    if(jwtToken === undefined){
        return <Navigate to="/Sign-Up" replace />;
    }
    const handleLogout = () => {
        Cookies.remove('jwt_token'); 
        props.router.navigate('/Sign-Up');
    }
    return(
        <div className='home-container'>
            <div className='header-container'>
                <div>
                <h1 className='hello-heading'>Hello user</h1>
                <p className='today-para'>How are you doing today?</p>
                </div>
                <button className='logout-btn' onClick={handleLogout}>Logout</button>
            </div>
        </div>
    )
}

export default withRouter(Home); 