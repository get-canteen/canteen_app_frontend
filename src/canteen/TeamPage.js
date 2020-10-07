import React from 'react';

const TeamPage = () => (
    <React.Fragment>
    <div id="navbar">
        <div id="navbar-block">
            <a id="navbar-logo" href="/">
                <div id="logo">
                    <img id="logo-image" src="images/landingPage/logo.png" alt="Canteen"/>
                </div>
            </a>
            <div id="navbar-menu">
                <a id="navbar-link" href="team">Team</a>
                <a id="nav-sign-up-button" href="/">Sign Up</a>
            </div>
        </div>
    </div>
    <div class="team-main-container">
        <div class="team-block">
            <div class="team-text-block">
                <h1 class="team-title">Our Team</h1>
                <p class="team-description">It takes a great team to build a great product. Meet the brains behind
                    Canteen.</p>
            </div>
            <div class="team-profile-block">
                <div id="profile-cece" class="team-profile">
                    <img class="profile-image" src="images/landingPage/cece.jpeg" alt="Canteen Co-Founder Cece Chen"/>
                    <div class="profile-text-block">
                        <p class="team-name-text">Cece Chen</p>
                        <p class="team-title-text">Co-Founder</p>
                        <a id="view-profile-cece" class="view-profile-button">View Canteen Profile</a>
                    </div>
                </div>

                <div id="profile-modal-cece" class="modal">
                    <div class="modal-block">
                        <div class="modal-content">
                            <span class="close">&times;</span>
                            <img class="app" src="images/landingPage/canteen-cece-profile.png" alt="Canteen profile Cece Chen"/>
                        </div>
                    </div>
                </div>

                <div class="team-profile">
                    <img class="profile-image" src="images/landingPage/brian.jpg" alt="Canteen Co-Founder Brian Hsu"/>
                    <div class="profile-text-block">
                        <p class="team-name-text">Brian Hsu</p>
                        <p class="team-title-text">Co-Founder</p>
                        <p id="view-profile-brian" class="view-profile-button">View Canteen Profile</p>
                    </div>
                </div>

                <div id="profile-modal-brian" class="modal">
                    <div class="modal-block">
                        <div class="modal-content">
                            <span class="close">&times;</span>
                            <img class="app" src="images/landingPage/canteen-brian-profile.png" alt="Canteen profile Brian Hsu"/>
                        </div>
                    </div>
                </div>

                <div class="team-profile">
                    <img class="profile-image" src="images/landingPage/daniel.png"
                        alt="Canteen Product Marketing Manager Daniel Lipson"/>
                    <div class="profile-text-block">
                        <p class="team-name-text">Daniel Lipson</p>
                        <p class="team-title-text">Product Marketing Manager</p>
                        <p id="view-profile-daniel" class="view-profile-button">View Canteen Profile</p>
                    </div>
                </div>

                <div id="profile-modal-daniel" class="modal">
                    <div class="modal-block">
                        <div class="modal-content">
                            <span class="close">&times;</span>
                            <img class="app" src="images/landingPage/canteen-daniel-profile.png"
                                alt="Canteen profile Daniel Lipson"/>
                        </div>
                    </div>
                </div>

                <div class="team-profile">
                    <img class="profile-image" src="images/landingPage/don.jpeg" alt="Canteen Software Engineer Donald Chen"/>
                    <div class="profile-text-block">
                        <p class="team-name-text">Donald Chen</p>
                        <p class="team-title-text">Software Engineer</p>
                        <p id="view-profile-don" class="view-profile-button">View Canteen Profile</p>
                    </div>
                </div>

                <div id="profile-modal-don" class="modal">
                    <div class="modal-block">
                        <div class="modal-content">
                            <span class="close">&times;</span>
                            <img class="app" src="images/landingPage/canteen-donald-profile.png" alt="Canteen profile Donald Chen"/>
                        </div>
                    </div>
                </div>

                <div class="team-profile">
                    <img class="profile-image" src="images/landingPage/melelani.jpg" alt="Canteen Software Engineer Donald Chen"/>
                    <div class="profile-text-block">
                        <p class="team-name-text">Melelani</p>
                        <p class="team-title-text">UX Designer</p>
                        <p id="view-profile-melelani" class="view-profile-button">View Canteen Profile</p>
                    </div>
                </div>

                <div id="profile-modal-melelani" class="modal">
                    <div class="modal-block">
                        <div class="modal-content">
                            <span class="close">&times;</span>
                            <img class="app" src="images/landingPage/canteen-melelani-profile.png" alt="Canteen profile Melelani"/>
                        </div>
                    </div>
                </div>

                <div class="team-profile">
                    <img class="profile-image" src="images/landingPage/lillian.jpg" alt="Canteen Software Engineer Donald Chen"/>
                    <div class="profile-text-block">
                        <p class="team-name-text">Lillian Chan</p>
                        <p class="team-title-text">Partnership Manager</p>
                        <p id="view-profile-lillian" class="view-profile-button">View Canteen Profile</p>
                    </div>
                </div>

                <div id="profile-modal-lillian" class="modal">
                    <div class="modal-block">
                        <div class="modal-content">
                            <span class="close">&times;</span>
                            <img class="app" src="images/landingPage/canteen-lillian-profile.png"
                                alt="Canteen profile Lillian Chan"/>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <div class="team-block">
            <div class="team-text-block">
                <h1 class="team-title">Our Advisors</h1>
                <p class="team-description">The best and brightest innovators in Silicon Valley advise our team</p>
            </div>
            <div class="advisor-profile-block">
                <div class="team-profile">
                    <img class="profile-image" src="images/landingPage/greg-hornby.png" alt="Canteen Technical Advisor Greg Hornby"/>
                    <div class="profile-text-block">
                        <p class="team-name-text">Greg Hornby</p>
                        <p class="team-title-text">Technical Advisor</p>
                        <a id="view-profile-greg" class="view-profile-button">View Canteen Profile</a>
                    </div>
                </div>

                <div id="profile-modal-greg" class="modal">
                    <div class="modal-block">
                        <div class="modal-content">
                            <span class="close">&times;</span>
                            <img class="app" src="images/landingPage/canteen-greg-profile.png" alt="Canteen profile Greg Hornby"/>
                        </div>
                    </div>
                </div>

                <div class="team-profile">
                    <img class="profile-image" src="images/landingPage/sterling.jpg"
                        alt="Canteen Healthcare Advisor Sterling Nakamura"/>
                    <div class="profile-text-block">
                        <p class="team-name-text">Sterling Nakamura</p>
                        <p class="team-title-text">Healthcare Advisor</p>
                        <p id="view-profile-sterling" class="view-profile-button">View Canteen Profile</p>
                    </div>
                </div>

                <div id="profile-modal-sterling" class="modal">
                    <div class="modal-block">
                        <div class="modal-content">
                            <span class="close">&times;</span>
                            <img class="app" src="images/landingPage/canteen-sterling-profile.png"
                                alt="Canteen profile Sterling Nakamura"/>
                        </div>
                    </div>
                </div>

                <div class="team-profile">
                    <img class="profile-image" src="images/landingPage/richard-ling.jpg"
                        alt="Canteen Venture Capital Advisor Richard Ling"/>
                    <div class="profile-text-block">
                        <p class="team-name-text">Richard Ling</p>
                        <p class="team-title-text">Venture Capital Advisor</p>
                        <p id="view-profile-richard" class="view-profile-button">View Canteen Profile</p>
                    </div>
                </div>

                <div id="profile-modal-richard" class="modal">
                    <div class="modal-block">
                        <div class="modal-content">
                            <span class="close">&times;</span>
                            <img class="app" src="images/landingPage/canteen-richard-profile.png"
                                alt="Canteen profile Richard Ling"/>
                        </div>
                    </div>
                </div>

                <div class="team-profile">
                    <img class="profile-image" src="images/landingPage/aku.png"
                        alt="Canteen Marketing Advisor Aku Aakriti Srikanth"/>
                    <div class="profile-text-block">
                        <p class="team-name-text">Aku Aakriti Srikanth</p>
                        <p class="team-title-text">Marketing Advisor</p>
                        <p id="view-profile-aku" class="view-profile-button">View Canteen Profile</p>
                    </div>
                </div>

                <div id="profile-modal-aku" class="modal">
                    <div class="modal-block">
                        <div class="modal-content">
                            <span class="close">&times;</span>
                            <img class="app" src="images/landingPage/canteen-aku-profile.png"
                                alt="Canteen profile Aku Aakriti Srikanth"/>
                        </div>
                    </div>
                </div>
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
    </React.Fragment>
);

export default TeamPage;