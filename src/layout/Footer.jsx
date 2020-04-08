import React, { Component } from 'react';
import './Footer.css';
import SocialButton from '../components/SocialButton/SocialButton';
import githubimg from '../resources/imgs/social/githubimg.png';
import linkedin from '../resources/imgs/social/linkedin.png';

export class Footer extends Component {
  render() {
    return (
      <footer className="page-footer">
        <div className="row">
          <div className="center">
            <div><span>kocham tygryska</span></div>
            <div>           
              <SocialButton src={linkedin} href={"https://www.linkedin.com/in/dawid-dyczek-07b193183/"}/>
              <SocialButton src={githubimg} href={"https://github.com/silus91"}/>
            </div>
          </div>
        </div>
    </footer>
    )
  }
}

export default Footer;




// zrobic na tip top footera zeby byl spoko i zeby z sign sie to wygladalo i  trzeba zrobic contatct me form i popatrzec na to