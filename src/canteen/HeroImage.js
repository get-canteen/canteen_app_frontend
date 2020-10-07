import React from 'react';
import canteenApp from '../../public/images/landingPage/canteen-app.png'

const HeroImage = () => (
    <div class="hero-image">
    <div class="banner">
      <div class="banner-text">
        <p>Looking to onboard your community? Contact us at hello@getcanteen.com</p>
      </div>
    </div>
    <div class="content">
      <div class="hero-text">
        <div class="main-text-container">
          <h4 class="main-text">
            Network smarter. Connect easier.
          </h4>
          <h4 class="secondary-text">
            Connect with the right people for your professional needs and offer solutions to your community.
          </h4>
        </div>
        <form method='post'>
          <div class="row" id="form-row">
            <div class="landing-page-email-block">
              <input type="email" placeholder="Enter email address" name="EMAIL" class="text-input" id="mce-EMAIL"
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" required/>
            </div>
            <div>
              <input class="button-primary" type="submit" value="Sign Up"/>
            </div>
          </div>
        </form>
      </div>
      <img class="app" src={canteenApp} alt="Canteen app"/>
    </div>
    </div>
);

export default HeroImage;