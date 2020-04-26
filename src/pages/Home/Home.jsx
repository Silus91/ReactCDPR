import React, { Component } from 'react';
import M from "materialize-css";
import './Home.css';
import { Parallax } from 'react-materialize';
import {creatorInfo, why } from '../../resources/textConfigs/info';
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
    return (
      <div className="">
          <div className="header">
          <div className="container headerContent">
            <h1 className="title">Welcome!</h1>
            <h1 className="titleSecond">CD Project Red <br />Fan Page!</h1>
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
              src="https://firebasestorage.googleapis.com/v0/b/cdred-project.appspot.com/o/social%2Fgithubimg.png?alt=media&token=3b23bab8-1d18-435d-9548-c7cc0244f1d2" 
              href="https://github.com/Silus91/ReactCDPR"
              toolPosition="right"
              toolTip="My GitHub portfolio!"
            />
          </div>
        </div>
        <div>
          <Parallax
            image={
              <img
                alt="cdpr"
                src="https://firebasestorage.googleapis.com/v0/b/cdred-project.appspot.com/o/pageImgs%2FstartImg.jpg?alt=media&token=e28e2361-c941-481f-844b-3e457016a859"
              />
            }
            options={{
              responsiveThreshold: 0
            }}
            style={{height: "700px"}}
          />
          <div className="section white">
            <div className="row container center quote">
              <h4>Big Games</h4>

              <p className="paragraph">{why}</p>
            </div>
          </div>
          <Parallax
            image={
              <img
                alt="Silver Hand"
                src="https://firebasestorage.googleapis.com/v0/b/cdred-project.appspot.com/o/pageImgs%2FsilverHand.jpg?alt=media&token=11bf9e9b-a494-4cd2-9e8b-1ab056a6fc84"
              />
            }
            options={{
            responsiveThreshold: 0
            }}
          />
          <div className="section white">
            <div className="row container">
              <div className="col l6 m6 s12 offset-l3 center  quote">
                <h4>Opinions about that page</h4>
                <h5>Want to add your own?? Scroll bellow.</h5>
                <div className="survey">
                  {surveys.length > 0 ? (
                    <QuoteGenerator time={2000}  surveys={surveys} />
                      ) : (
                    loading)}
                </div>
              </div>
            </div>
          </div>
          <Parallax
            image={
              <img
                alt=""
                src="https://firebasestorage.googleapis.com/v0/b/cdred-project.appspot.com/o/Carousels%2Fswords.jpg?alt=media&token=1f33ccf1-ec87-4121-b4d0-1eba340f7638" 
              />
            }
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
