import React, { Component } from 'react';
import './Footer.css';
import SocialButton from '../components/SocialButton/SocialButton';
import ContactUs from '../components/ContactUs/ContactUs';
import githubimg from '../resources/imgs/social/githubimg.png';
import linkedin from '../resources/imgs/social/linkedin.png';
import aboutMe from './aboutMe';
import Card from '../components/Card/Card';

export class Footer extends Component {
  render() {
    return (
      <footer className="page-footer">
        <div className="container row">
          <div className="col l4 s12">
            <h4 className="center">About Me</h4>
            <Card configs={aboutMe}/>
          </div>
          <div className="col l4 s12">
            <h4 className="center">Find Me</h4>
            <div className="center">
              <div><SocialButton src={linkedin} href={"https://www.linkedin.com/in/dawid-dyczek-07b193183/"}/></div>
              <div><SocialButton src={githubimg} href={"https://github.com/silus91"}/></div>
            </div>
          </div>
          <div className="col l4 s12 card z-depth-2 hoverable grey darken-2">
            <h4 className="center">Contact Us</h4>
            <ContactUs />
          </div>
        </div>
      </footer>
    )
  }
}

export default Footer;
