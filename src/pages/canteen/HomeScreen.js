import React from 'react';

const HomeScreen = () => (
    <div id="navbar">
    <div id="navbar-block">
      <a id="navbar-logo" href="/">
        <div id="logo">
          <img id="logo-image" src="images/logo.png" alt="Canteen">
        </div>
      </a>
      <div id="navbar-menu">
        <a id="navbar-link" href="team">Team</a>
        <a id="nav-sign-up-button" href="/">Sign Up</a>
      </div>
    </div>
  </div>
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
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" required>
            </div>
            <div>
              <input class="button-primary" type="submit" value="Sign Up">
            </div>
          </div>
        </form>
      </div>
      <img class="app" src="images/canteen-app.png" alt="Canteen app">
    </div>
  </div>
  <div class="news-block">
    <div class="news-image-block">
      <div class="news-image-container">
        <a class="news-link" href="https://www.ttconf.org/" target="_blank">
          <img class="news-logo" src="images/transtech.png" alt="Transformative Technologies Conference">
        </a>
      </div>
      <div class="news-image-container">
        <a class="news-link" href="https://cognitiveworld.com" target="_blank">
          <img class="news-logo" src="images/cognitive-world.png" alt="Cognitive World AI Contributor Group on Forbes">
        </a>
      </div>
      <div class="news-image-container">
        <a href="https://thriveglobal.com/stories/convenient-ways-to-optimize-your-underutilized-time/" target="_blank">
          <img class="news-logo-small" src="images/thrive-global.png" alt="Thrive Global">
        </a>
      </div>
      <div class="news-image-container">
        <a href="https://givearmor.com/" target="_blank">
          <img class="news-logo-small" src="images/give-armor.png" alt="Give Armor">
        </a>
      </div>
      <div class="news-image-container">
        <a href="https://www.serendipia.life/" target="_blank">
          <img class="news-logo-small" src="images/serendipia.png" alt="Serendipia">
        </a>
      </div>
    </div>
  </div>
  <div class="mission-block">
    <h1 class="mission-text">Canteen is a network of communities where you can search and offer startup solutions. Our
      platform helps you find the right person for your professional needs, facilitates the connection, and tracks the
      results of each interaction.</h1>
  </div>
  <div class="feature-block-1">
    <div class="feature-container-1">
      <div class="feature-container-text">
        <h1 class="feature-title-text">Engage with our public and private communities</h1>
        <p class="feature-description-text">Each community has a dedicated space you can join to engage with its
          members. Our current Canteen communities include:</p>
        <ul class="feature-description-text">
          <li>Investors</li>
          <li>Domain experts</li>
          <li>Media</li>
          <li>Startup founders</li>
          <li>Hiring managers</li>
          <li>Conference speakers</li>
        </ul>
      </div>
      <div class="feature-image">
        <img class="app" src="images/canteen-app-group.png" alt="Canteen app group posts">
      </div>
    </div>
  </div>
  <div class="feature-block-2">
    <div class="feature-container-2">
      <div class="feature-container-text">
        <h1 class="feature-title-text">Create a user profile with your offerings and needs</h1>
        <p class="feature-description-text">Offer services, consultations, or life experiences and list what you
          need.</p>
      </div>
      <div class="feature-image">
        <img class="app" src="images/canteen-app-profile.png" alt="Canteen app">
      </div>
    </div>
  </div>
  <div class="feature-block-1">
    <div class="feature-container-1">
      <div class="feature-container-text">
        <h1 class="feature-title-text">Conveniently connect via integrated scheduling</h1>
        <p class="feature-description-text">Members can view your availability and book sessions.</p>
      </div>
      <div class="feature-image">
        <img class="app" src="images/canteen-app-calendar.png" alt="Canteen app calendar scheduling">
      </div>
    </div>
  </div>
  <div class="footer-block">
    <div class="legal-block">
      <div class="policies-block">
        <a href="legal/privacy-policy" target="_blank">Privacy Policy</a>
        <a href="contact-us" target="_blank">Contact Us</a>
      </div>
      <p>© 2020 Copyright Canteen LLC</p>
    </div>
    <div class="footer-icon-block">
      <a class="social-media-icon" href="https://www.facebook.com/getcanteen" target="_blank">
        <i class="fa fa-facebook-square"></i>
      </a>
      <a class="social-media-icon" href="https://www.instagram.com/getcanteen" target="_blank">
        <i class="fa fa-instagram"></i>
      </a>
      <a class="social-media-icon" href="https://www.linkedin.com/company/getcanteen" target="_blank">
        <i class="fa fa-linkedin-square"></i>
      </a>
      <a class="social-media-icon" href="https://twitter.com/getcanteen" target="_blank">
        <i class="fa fa-twitter"></i>
      </a>
    </div>
  </div>
);

export default HomeScreen;