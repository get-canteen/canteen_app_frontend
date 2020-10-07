import React from 'react';

const HeroImage = () => (
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
        <form method='post'>
          <div className="row" id="form-row">
            <div className="landing-page-email-block">
              <input type="email" placeholder="Enter email address" name="EMAIL" className="text-input" id="mce-EMAIL"
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" required/>
            </div>
            <div>
              <input className="button-primary" type="submit" value="Sign Up"/>
            </div>
          </div>
        </form>
      </div>
      <img className="app" src="/images/landingPage/canteen-app.png" alt="Canteen app"/>
    </div>
    </div>
);

export default HeroImage;