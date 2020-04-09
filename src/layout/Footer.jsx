import React, { Component } from 'react';
import './Footer.css';
import SocialButton from '../components/SocialButton/SocialButton';
import ContactUs from '../components/ContactUs/ContactUs';
import githubimg from '../resources/imgs/social/githubimg.png';
import linkedin from '../resources/imgs/social/linkedin.png';

export class Footer extends Component {
  render() {
    return (
      <footer className="page-footer">
        <div className="container row">
          <div className="col l4"></div>
          <div className="col l4">
            <div><span>kocham tygryska</span></div>
            <div>           
              <SocialButton src={linkedin} href={"https://www.linkedin.com/in/dawid-dyczek-07b193183/"}/>
              <SocialButton src={githubimg} href={"https://github.com/silus91"}/>
            </div>
          </div>
          <div className="col l4 card">
            <ContactUs />
          </div>

        </div>
    </footer>
    )
  }
}

export default Footer;




// zrobic na tip top footera zeby byl spoko i zeby z sign sie to wygladalo i  trzeba zrobic contatct me form i popatrzec na to