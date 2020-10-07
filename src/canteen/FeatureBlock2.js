import React from 'react';
import canteenProfile from '../../public/images/landingPage/canteen-app-profile.png'

const FeatureBlock2 = () => (
    <div class="feature-block-2">
    <div class="feature-container-2">
      <div class="feature-container-text">
        <h1 class="feature-title-text">Create a user profile with your offerings and needs</h1>
        <p class="feature-description-text">Offer services, consultations, or life experiences and list what you
          need.</p>
      </div>
      <div class="feature-image">
        <img class="app" src={canteenProfile} alt="Canteen app"/>
      </div>
    </div>
  </div>
)

export default FeatureBlock2;