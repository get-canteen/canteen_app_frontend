import React from 'react';
import Transtech from "../../public/images/landingPage/transtech.png";
import CognitiveWorld from "../../public/images/landingPage/logo.png";
import ThriveGlobal from "../../public/images/landingPage/thrive-global.png";
import GiveArmor from "../../public/images/landingPage/give-armor.png";
import Serendipia from "../../public/images/landingPage/serendipia.png";

const NewsBlock = () => (
    <div class="news-block">
    <div class="news-image-block">
      <div class="news-image-container">
        <a class="news-link" href="https://www.ttconf.org/" target="_blank">
          <img class="news-logo" src={Transtech} alt="Transformative Technologies Conference"/>
        </a>
      </div>
      <div class="news-image-container">
        <a class="news-link" href="https://cognitiveworld.com" target="_blank">
          <img class="news-logo" src={CognitiveWorld} alt="Cognitive World AI Contributor Group on Forbes"/>
        </a>
      </div>
      <div class="news-image-container">
        <a href="https://thriveglobal.com/stories/convenient-ways-to-optimize-your-underutilized-time/" target="_blank">
          <img class="news-logo-small" src={ThriveGlobal} alt="Thrive Global"/>
        </a>
      </div>
      <div class="news-image-container">
        <a href="https://givearmor.com/" target="_blank">
          <img class="news-logo-small" src={GiveArmor} alt="Give Armor"/>
        </a>
      </div>
      <div class="news-image-container">
        <a href="https://www.serendipia.life/" target="_blank">
          <img class="news-logo-small" src={Serendipia} alt="Serendipia"/>
        </a>
      </div>
    </div>
  </div>
)

export default NewsBlock;