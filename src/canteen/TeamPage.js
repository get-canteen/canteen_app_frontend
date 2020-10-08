import React, {useState} from 'react';
import Modal from 'react-modal';

const TeamPage = () => {

    const [ccOpen, setccOpen] = useState(false);

    return(
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
    <div className="team-main-container">
        <div className="team-block">
            <div className="team-text-block">
                <h1 className="team-title">Our Team</h1>
                <p className="team-description">It takes a great team to build a great product. Meet the brains behind
                    Canteen.</p>
            </div>
            <div className="team-profile-block">
                <div id="profile-cece" className="team-profile">
                    <img className="profile-image" src="images/landingPage/cece.jpeg" alt="Canteen Co-Founder Cece Chen"/>
                    <div className="profile-text-block">
                        <p className="team-name-text">Cece Chen</p>
                        <p className="team-title-text">Co-Founder</p>
                        <button id="view-profile-cece" className="view-profile-button" onClick={()=>setccOpen(true)}>View Canteen Profile</button>
                    </div>
                </div>

                <div id="profile-modal-cece" className="modal">
                    <Modal isOpen={ccOpen} onRequestClose={()=>setccOpen(false)} className="modal-block">
                        <div className="modal-content">
                            <span className="close">&times;</span>
                            <img className="app" src="images/landingPage/canteen-cece-profile.png" alt="Canteen profile Cece Chen"/>
                        </div>
                    </Modal>
                </div>

                <div className="team-profile">
                    <img className="profile-image" src="images/landingPage/brian.jpg" alt="Canteen Co-Founder Brian Hsu"/>
                    <div className="profile-text-block">
                        <p className="team-name-text">Brian Hsu</p>
                        <p className="team-title-text">Co-Founder</p>
                        <p id="view-profile-brian" className="view-profile-button">View Canteen Profile</p>
                    </div>
                </div>

                <div id="profile-modal-brian" className="modal">
                    <div className="modal-block">
                        <div className="modal-content">
                            <span className="close">&times;</span>
                            <img className="app" src="images/landingPage/canteen-brian-profile.png" alt="Canteen profile Brian Hsu"/>
                        </div>
                    </div>
                </div>

                <div className="team-profile">
                    <img className="profile-image" src="images/landingPage/daniel.png"
                        alt="Canteen Product Marketing Manager Daniel Lipson"/>
                    <div className="profile-text-block">
                        <p className="team-name-text">Daniel Lipson</p>
                        <p className="team-title-text">Product Marketing Manager</p>
                        <p id="view-profile-daniel" className="view-profile-button">View Canteen Profile</p>
                    </div>
                </div>

                <div id="profile-modal-daniel" className="modal">
                    <div className="modal-block">
                        <div className="modal-content">
                            <span className="close">&times;</span>
                            <img className="app" src="images/landingPage/canteen-daniel-profile.png"
                                alt="Canteen profile Daniel Lipson"/>
                        </div>
                    </div>
                </div>

                <div className="team-profile">
                    <img className="profile-image" src="images/landingPage/don.jpeg" alt="Canteen Software Engineer Donald Chen"/>
                    <div className="profile-text-block">
                        <p className="team-name-text">Donald Chen</p>
                        <p className="team-title-text">Software Engineer</p>
                        <p id="view-profile-don" className="view-profile-button">View Canteen Profile</p>
                    </div>
                </div>

                <div id="profile-modal-don" className="modal">
                    <div className="modal-block">
                        <div className="modal-content">
                            <span className="close">&times;</span>
                            <img className="app" src="images/landingPage/canteen-donald-profile.png" alt="Canteen profile Donald Chen"/>
                        </div>
                    </div>
                </div>

                <div className="team-profile">
                    <img className="profile-image" src="images/landingPage/melelani.jpg" alt="Canteen Software Engineer Donald Chen"/>
                    <div className="profile-text-block">
                        <p className="team-name-text">Melelani</p>
                        <p className="team-title-text">UX Designer</p>
                        <p id="view-profile-melelani" className="view-profile-button">View Canteen Profile</p>
                    </div>
                </div>

                <div id="profile-modal-melelani" className="modal">
                    <div className="modal-block">
                        <div className="modal-content">
                            <span className="close">&times;</span>
                            <img className="app" src="images/landingPage/canteen-melelani-profile.png" alt="Canteen profile Melelani"/>
                        </div>
                    </div>
                </div>

                <div className="team-profile">
                    <img className="profile-image" src="images/landingPage/lillian.jpg" alt="Canteen Software Engineer Donald Chen"/>
                    <div className="profile-text-block">
                        <p className="team-name-text">Lillian Chan</p>
                        <p className="team-title-text">Partnership Manager</p>
                        <p id="view-profile-lillian" className="view-profile-button">View Canteen Profile</p>
                    </div>
                </div>

                <div id="profile-modal-lillian" className="modal">
                    <div className="modal-block">
                        <div className="modal-content">
                            <span className="close">&times;</span>
                            <img className="app" src="images/landingPage/canteen-lillian-profile.png"
                                alt="Canteen profile Lillian Chan"/>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <div className="team-block">
            <div className="team-text-block">
                <h1 className="team-title">Our Advisors</h1>
                <p className="team-description">The best and brightest innovators in Silicon Valley advise our team</p>
            </div>
            <div className="advisor-profile-block">
                <div className="team-profile">
                    <img className="profile-image" src="images/landingPage/greg-hornby.png" alt="Canteen Technical Advisor Greg Hornby"/>
                    <div className="profile-text-block">
                        <p className="team-name-text">Greg Hornby</p>
                        <p className="team-title-text">Technical Advisor</p>
                        <a id="view-profile-greg" className="view-profile-button">View Canteen Profile</a>
                    </div>
                </div>

                <div id="profile-modal-greg" className="modal">
                    <div className="modal-block">
                        <div className="modal-content">
                            <span className="close">&times;</span>
                            <img className="app" src="images/landingPage/canteen-greg-profile.png" alt="Canteen profile Greg Hornby"/>
                        </div>
                    </div>
                </div>

                <div className="team-profile">
                    <img className="profile-image" src="images/landingPage/sterling.jpg"
                        alt="Canteen Healthcare Advisor Sterling Nakamura"/>
                    <div className="profile-text-block">
                        <p className="team-name-text">Sterling Nakamura</p>
                        <p className="team-title-text">Healthcare Advisor</p>
                        <p id="view-profile-sterling" className="view-profile-button">View Canteen Profile</p>
                    </div>
                </div>

                <div id="profile-modal-sterling" className="modal">
                    <div className="modal-block">
                        <div className="modal-content">
                            <span className="close">&times;</span>
                            <img className="app" src="images/landingPage/canteen-sterling-profile.png"
                                alt="Canteen profile Sterling Nakamura"/>
                        </div>
                    </div>
                </div>

                <div className="team-profile">
                    <img className="profile-image" src="images/landingPage/richard-ling.jpg"
                        alt="Canteen Venture Capital Advisor Richard Ling"/>
                    <div className="profile-text-block">
                        <p className="team-name-text">Richard Ling</p>
                        <p className="team-title-text">Venture Capital Advisor</p>
                        <p id="view-profile-richard" className="view-profile-button">View Canteen Profile</p>
                    </div>
                </div>

                <div id="profile-modal-richard" className="modal">
                    <div className="modal-block">
                        <div className="modal-content">
                            <span className="close">&times;</span>
                            <img className="app" src="images/landingPage/canteen-richard-profile.png"
                                alt="Canteen profile Richard Ling"/>
                        </div>
                    </div>
                </div>

                <div className="team-profile">
                    <img className="profile-image" src="images/landingPage/aku.png"
                        alt="Canteen Marketing Advisor Aku Aakriti Srikanth"/>
                    <div className="profile-text-block">
                        <p className="team-name-text">Aku Aakriti Srikanth</p>
                        <p className="team-title-text">Marketing Advisor</p>
                        <p id="view-profile-aku" className="view-profile-button">View Canteen Profile</p>
                    </div>
                </div>

                <div id="profile-modal-aku" className="modal">
                    <div className="modal-block">
                        <div className="modal-content">
                            <span className="close">&times;</span>
                            <img className="app" src="images/landingPage/canteen-aku-profile.png"
                                alt="Canteen profile Aku Aakriti Srikanth"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
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
    </React.Fragment>
    )
};

export default TeamPage;