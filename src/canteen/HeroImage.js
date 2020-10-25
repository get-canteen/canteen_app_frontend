import React, {useState} from 'react';
// import { history } from '../routers/AppRouter';
import { withRouter } from 'react-router-dom';

const HeroImage = (props) => {
    console.log('history', props.history);
    const [email, setEmail] = useState('');
    const handleSubmit = (e) => {
      e.preventDefault();
      props.history.push(
        { 
          pathname:`/signup`,
          state: { email: email } 
        }
      )
    }
    return(
    <div className="hero-image">
    <div className="banner">
      <div className="banner-text">
        <p>Looking to onboard your community? Contact us at hello@getcanteen.com</p>
      </div>
    </div>
    <div className="content">
      <div className="hero-text">
        <div className="main-text-container">
          <h4 className="main-text">
            Network smarter. Connect easier.
          </h4>
          <h4 className="secondary-text">
            Connect with the right people for your professional needs and offer solutions to your community.
          </h4>
        </div>
        <form>
          <div className="row" id="form-row">
            <div className="landing-page-email-block">
              <input 
                type="email" 
                placeholder="Enter email address" 
                name="EMAIL" 
                className="text-input" 
                id="mce-EMAIL"
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" 
                value = {email} 
                onChange={(e) => setEmail(e.target.value)} 
                required/>
            </div>
            <div>
              <input 
                className="button-primary" 
                value="Sign Up" 
                type="submit"
                onClick={handleSubmit}
              />
            </div>
          </div>
        </form>
      </div>
      <img className="app" src="/images/landingPage/canteen-app.png" alt="Canteen app"/>
    </div>
    </div>
    )
};

export default withRouter(HeroImage);