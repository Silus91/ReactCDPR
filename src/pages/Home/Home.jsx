import React, { Component } from "react";
import M from "materialize-css";
import "./Home.css";
import { Parallax } from "react-materialize";
import { creatorInfo, why } from "../../resources/textConfigs/info";
import SocialButton from "../../components/SocialButton/SocialButton";
import Survey from "../../components/Survey/Survey";
import { getSurveys } from "../../actions/uiActions";
import { connect } from "react-redux";
import QuoteGenerator from "../../components/QuoteGenerator/QuoteGenerator";

class Home extends Component {
  componentDidMount() {
    M.AutoInit();
    this.props.getSurveys();
  }

  render() {
    const {
      UI: { loading },
      UI: { surveys },
      user: { authenticated },
    } = this.props;
    return (
      <div className=''>
        <div className='header'>
          <div className='container headerContent center'>
            <div className='headerBackground '>
              <h1 className='title'>Wel come!</h1>
              <h1 className='titleSecond'>
                CD Project Red <br />
                Fan Page!
              </h1>
            </div>
          </div>
        </div>
        <div className='section white row container'>
          <div className='center sectionContent'>
            <h3 className='titleSecond noMargin'>Info from creator</h3>
            <p className='paragraph'>{creatorInfo}</p>
            <SocialButton
              src='https://firebasestorage.googleapis.com/v0/b/cdred-project.appspot.com/o/social%2Fgithubimg.png?alt=media&token=3b23bab8-1d18-435d-9548-c7cc0244f1d2'
              href='https://github.com/Silus91/ReactCDPR'
              toolPosition='right'
              toolTip='My GitHub portfolio!'
            />
          </div>
        </div>
        <div>
          <Parallax
            image={
              <img
                alt='cdpr games'
                src='https://firebasestorage.googleapis.com/v0/b/cdred-project.appspot.com/o/pageImgs%2FstartImg.jpg?alt=media&token=e28e2361-c941-481f-844b-3e457016a859'
              />
            }
            options={{
              responsiveThreshold: 0,
            }}
            style={{ height: "700px" }}
          />
          <div className='section white'>
            <div className='row container sectionContent center quote'>
              <h3 className='noMargin'>Big Games</h3>
              <p className='paragraph'>
                {why}
                <br /> Want to jump to orginal page?? Just Click below!
              </p>
              <a
                rel='noopener noreferrer'
                className='btn large black yellow-text'
                href='https://en.cdprojektred.com/'
                target='_blank'
              >
                Redirect
              </a>
            </div>
          </div>
          <Parallax
            image={
              <img
                alt='Cd project red'
                src='https://firebasestorage.googleapis.com/v0/b/cdred-project.appspot.com/o/pageImgs%2Fcdproject.jpg?alt=media&token=67ce0a7d-50cb-46eb-96ef-f7e5b0c8c172'
              />
            }
            options={{
              responsiveThreshold: 0,
            }}
          />
          <div className='section white row'>
            <div className='container sectionContent center quote'>
              <h4>Opinions From Users</h4>
              <h5>Want to add your own?? Scroll bellow.</h5>
              <div className='survey'>
                {surveys.length > 0 ? (
                  <QuoteGenerator time={2000} surveys={surveys} />
                ) : (
                  loading
                )}
              </div>
            </div>
          </div>
          <Parallax
            image={
              <img
                alt=''
                src='https://firebasestorage.googleapis.com/v0/b/cdred-project.appspot.com/o/Carousels%2Fswords.jpg?alt=media&token=1f33ccf1-ec87-4121-b4d0-1eba340f7638'
              />
            }
            options={{
              responsiveThreshold: 0,
            }}
          />
          <div className='section white row container'>
            <div className='center card'>
              <div className='card-content'>
                {authenticated ? (
                  <Survey />
                ) : (
                  <h4 className='quote'>Signup to Send some Survey!</h4>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

export default connect(mapStateToProps, { getSurveys })(Home);
