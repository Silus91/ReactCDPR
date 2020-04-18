import React, { Component } from 'react';
import M from "materialize-css";
import './Home.css';
import { Parallax } from 'react-materialize';
import cityCar from '../../resources/imgs/cityCarv2.jpg';
import silverHand from '../../resources/imgs/silverHand.jpg';
import swords from '../../resources/imgs/carousel/swords.jpg';
import {creatorInfo, why } from './info';
import githubimg from '../../resources/imgs/social/githubimg.png';
import SocialButton from '../../components/SocialButton/SocialButton';
import Survey from '../../components/Survey/Survey';
import { getSurveys } from '../../actions/uiActions';
import { connect } from 'react-redux';
import QuoteGenerator from '../../components/QuoteGenerator/QuoteGenerator';

class Home extends Component {

  componentDidMount() {
    M.AutoInit();
    this.props.getSurveys()
  }

  render() {
    const { UI: {loading}, UI: { surveys }  } = this.props;
    // for now until whole loader will be build
    let surveyje = surveys.length > 0 ? (
      <QuoteGenerator time={5000}  surveys={surveys} />
    ) : (
      <div>Loading</div>
    );

    return (
      <div className="">
          <div className="header">
          <div className="container headerContent">
            <h1 className="title">Welcome!</h1>
            <h2 className="titleSecond">CD Project Red <br />Fan Page!</h2>
            <div>Want to jump to orginal page?? Just Click below!</div>
            <a rel="noopener noreferrer" className="btn large cyan yellow-text" href="https://en.cdprojektred.com/" target="_blank">
              Redirect
            </a>
          </div>
        </div>
        <div className="section white row container">
          <div className='center'>
            <h3 className="titleSecond">Info from creator</h3>
            <p className="paragraph">{creatorInfo}</p>
            <SocialButton
              src={githubimg} 
              href="https://github.com/Silus91/ReactCDPR"
            />
          </div>
        </div>
        <div>
          <Parallax
            image={<img alt="" src={cityCar} />}
            options={{
              responsiveThreshold: 0
            }}
          />
          <div className="section white">
            <div className="row container">
              <p className="paragraph">{why}</p>
            </div>
          </div>
          <Parallax
            image={<img alt="" src={silverHand} />}
            options={{
            responsiveThreshold: 0
            }}
          />
          <div className="section white">
            <div className="row container">
              <div className="col l6 m6 s12 offset-l3 center  quote">
                <h4 className="quote center">Opinions about that page</h4>
                <h5>Want to add your own?? Scroll bellow.</h5>
                {surveyje}
              </div>
            </div>
          </div>
          <Parallax
            image={<img alt="" src={swords} />}
            options={{
            responsiveThreshold: 0
            }}
          />
          <div className="section white row container">
            <div className="col l6 m6 s12 card">
              <div className="card-content">
                <Survey />
              </div>
            </div>
          </div>
        </div>                  
      </div>
    )
  }
}

 const mapStateToProps = (state) => ({
  UI: state.UI
 })

export default connect(mapStateToProps, { getSurveys })(Home);
