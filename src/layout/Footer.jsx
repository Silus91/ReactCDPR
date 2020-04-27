import React, { Component } from "react";
import "./Footer.css";
import SocialButton from "../components/SocialButton/SocialButton";
import ContactUs from "../components/ContactUs/ContactUs";
import { aboutMe } from "../resources/textConfigs/info";

export class Footer extends Component {
  render() {
    return (
      <footer className='page-footer'>
        <div className='container row'>
          <div className='col l4 s12'>
            <h4 className='center'>About Me</h4>
            <div>{aboutMe}</div>
          </div>
          <div className='col l4 s12'>
            <h4 className='center'>Find Me</h4>
            <div className='center'>
              <div>
                <SocialButton
                  src='https://firebasestorage.googleapis.com/v0/b/cdred-project.appspot.com/o/social%2Flinkedin.png?alt=media&token=97113707-7cb5-4ebb-894e-dd8ff46dd9d4'
                  href='https://www.linkedin.com/in/dawid-dyczek-07b193183/'
                />
              </div>
              <div>
                <SocialButton
                  src='https://firebasestorage.googleapis.com/v0/b/cdred-project.appspot.com/o/social%2Fgithubimg.png?alt=media&token=3b23bab8-1d18-435d-9548-c7cc0244f1d2'
                  href='https://github.com/silus91'
                />
              </div>
            </div>
          </div>
          <div className='col l4 s12 card z-depth-2 hoverable grey darken-2'>
            <h4 className='center'>Contact Us</h4>
            <ContactUs />
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
