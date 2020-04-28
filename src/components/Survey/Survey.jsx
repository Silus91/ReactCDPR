import React, { Component } from "react";
import { connect } from "react-redux";
import TextInput from "../TextInput/TextInput";
import { sendSurvey } from "../../actions/uiActions";
import M from "materialize-css";

const values = new Set([1, 2, 3, 4, 5]);

export class Survey extends Component {
  state = {
    opinion: "",
    rating: 0,
    errors: {},
  };

  componentDidMount() {
    M.AutoInit();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    } else if (!nextProps.UI.errors) {
      this.setState({ errors: "" });
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const surveyData = {
      opinion: this.state.opinion,
      rating: this.state.rating,
    };
    this.props.sendSurvey(surveyData);
    event.target.reset();
  };

  renderRadio() {
    return Array.from(values).map((value, index) => (
      <span key={index}>
        <label>
          <input
            name='group1'
            type='radio'
            id='rating'
            onChange={this.handleChange}
            value={value}
          />
          <span>{value}</span>
        </label>
      </span>
    ));
  }

  render() {
    const { errors } = this.state;
    const {
      UI: { loading },
    } = this.props;
    return (
      <>
        <h1 className='titleSecond center'>Survey</h1>
        <form onSubmit={this.handleSubmit}>
          <TextInput
            id='opinion'
            type='text'
            label='Opinion'
            htmlFor='opinion'
            icon='child_care'
            onChange={this.handleChange}
            errors={errors.opinion ? errors.opinion : ""}
          />
          <div className='center'>{this.renderRadio()}</div>
          <span className='helper-text red-text center-align'>
            {errors.rating ? errors.rating : ""}
          </span>
          <div className='input-field center-align'>
            <button
              type='submit'
              className={
                loading ? "btn disabled" : "btn teal darken-2 z-depth-2"
              }
            >
              Send
            </button>
          </div>
        </form>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  UI: state.UI,
});

export default connect(mapStateToProps, { sendSurvey })(Survey);
