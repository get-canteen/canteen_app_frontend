import React from 'react';
import canteenGroup from '../../public/images/landingPage/canteen-app-group.png'

const FeatureBlock1 = () => (
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
        <img class="app" src={canteenGroup} alt="Canteen app group posts"/>
      </div>
    </div>
  </div>
)

export default FeatureBlock1;
