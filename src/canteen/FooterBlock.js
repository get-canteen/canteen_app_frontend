import React from 'react';

const FooterBlock = () => (
    <div className="footer-block">
    <div className="legal-block">
      <div className="policies-block">
        <a href="legal/privacy-policy" target="_blank">Privacy Policy</a>
        <a href="contact-us" target="_blank">Contact Us</a>
      </div>
      <p>© 2020 Copyright Canteen LLC</p>
    </div>
    <div className="footer-icon-block">
      <a className="social-media-icon" href="https://www.facebook.com/getcanteen" target="_blank">
        <i className="fa fa-facebook-square"></i>
      </a>
      <a className="social-media-icon" href="https://www.instagram.com/getcanteen" target="_blank">
        <i className="fa fa-instagram"></i>
      </a>
      <a className="social-media-icon" href="https://www.linkedin.com/company/getcanteen" target="_blank">
        <i className="fa fa-linkedin-square"></i>
      </a>
      <a className="social-media-icon" href="https://twitter.com/getcanteen" target="_blank">
        <i className="fa fa-twitter"></i>
      </a>
    </div>
  </div>
)
export default FooterBlock;