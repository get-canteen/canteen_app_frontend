import React from 'react';

const NewsBlock = () => (
    <div className="news-block">
    <div className="news-image-block">
      <div className="news-image-container">
        <a className="news-link" href="https://www.ttconf.org/" target="_blank">
          <img className="news-logo" src="/images/landingPage/transtech.png" alt="Transformative Technologies Conference"/>
        </a>
      </div>
      <div className="news-image-container">
        <a className="news-link" href="https://cognitiveworld.com" target="_blank">
          <img className="news-logo" src="/images/landingPage/logo.png" alt="Cognitive World AI Contributor Group on Forbes"/>
        </a>
      </div>
      <div className="news-image-container">
        <a href="https://thriveglobal.com/stories/convenient-ways-to-optimize-your-underutilized-time/" target="_blank">
          <img className="news-logo-small" src="/images/landingPage/thrive-global.png" alt="Thrive Global"/>
        </a>
      </div>
      <div className="news-image-container">
        <a href="https://givearmor.com/" target="_blank">
          <img className="news-logo-small" src="/images/landingPage/give-armor.png" alt="Give Armor"/>
        </a>
      </div>
      <div className="news-image-container">
        <a href="https://www.serendipia.life/" target="_blank">
          <img className="news-logo-small" src="/images/landingPage/serendipia.png" alt="Serendipia"/>
        </a>
      </div>
    </div>
  </div>
)

export default NewsBlock;