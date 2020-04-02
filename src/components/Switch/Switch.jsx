// toggle on of true flace w reduxie zmieniamy background i color czcionki na przeciwne ale teraz pytanie czy zadzaial za materialize trzeba to sprawedzic bo jak nie to huj z tym bedzie a jak na important to bedzie to moze zadziala do reduxa trzeba dodac np w ui dodatkowy element np. i bedzie podmienial css z app.css

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { switchTheme } from '../../actions/uiActions';

export class Switch extends Component {

  render() {
    return (
    <div>
      <div className="switch">
        <label>
          Light
            <input type="checkbox" onClick={() => this.props.switchTheme()}/>
            <span className="lever"></span>
          Dark
        </label>
      </div>
    </div>
    )
  }
}

export default connect(null, { switchTheme })(Switch);
