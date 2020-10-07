import React from 'react';
import canteenCalendar from '../../public/images/landingPage/canteen-app-calendar.png'

const FeatureBlock3 = () => (
    <div class="feature-block-1">
    <div class="feature-container-1">
      <div class="feature-container-text">
        <h1 class="feature-title-text">Conveniently connect via integrated scheduling</h1>
        <p class="feature-description-text">Members can view your availability and book sessions.</p>
      </div>
      <div class="feature-image">
        <img class="app" src={canteenCalendar} alt="Canteen app calendar scheduling"/>
      </div>
    </div>
  </div>
)

export default FeatureBlock3;