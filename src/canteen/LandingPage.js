import React from 'react';
import FeatureBlock1 from './FeatureBlock1';
import FeatureBlock2 from './FeatureBlock2';
import FeatureBlock3 from './FeatureBlock3';
import FooterBlock from './FooterBlock';
import HeroImage from './HeroImage';
import MissionBlock from './MissionBlock';
import NavBar from './NavBar';
import NewsBlock from './NewsBlock';
import '../../public/dist/normalize.css';
import '../../public/dist/skeleton.css';
import '../../public/dist/style.css';
import { withRouter } from 'react-router-dom';

const LandingPage = () => (
    <React.Fragment>
        <NavBar/>
        <HeroImage/>
        <NewsBlock/>
        <MissionBlock/>
        <FeatureBlock1/>
        <FeatureBlock2/>
        <FeatureBlock3/>
        <FooterBlock/>
    </React.Fragment>
)

export default withRouter(LandingPage);