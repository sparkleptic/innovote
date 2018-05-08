import React from "react";
import { Input } from "react-materialize";
import InputError from "./InputErrorMessage.js";
import PropTypes from "prop-types";

export default class InputField extends React.Component {
  constructor(props) {
    super(props);
    this.shouldDisplayError = this.shouldDisplayError.bind(this);
  }
  componentDidMount() {
    var mask = this.props.mask;
    window.jQuery(this.refs.textInput.input).on("keypress", (event) => {
      switch (mask) {
        case "number":
          if ("0123456789".indexOf(event.key) == -1) {
            return false;
          }
          break;
      }
    });
  }
  shouldDisplayError() {
    return this.props.showError && this.props.errorText !== "";
  }
  render() {
    return (
      <div className="form-field text-field">
        <Input
          s={this.props.s}
          m={this.props.m}
          label={this.props.label}
          type={this.props.type || "text"}
          value={this.props.text}
          name={this.props.name}
          placeholder={this.props.placeholder}
          mask={this.props.mask}
          ref="textInput"
        >
          <InputError display={this.shouldDisplayError()}>
            <div className="validation-error">
              <span className="text">{this.props.errorText}</span>
            </div>
          </InputError>
        </Input>
      </div>
    );
  }
}

InputField.propTypes = {
  showError: PropTypes.bool.isRequired,
  onFieldChanged: PropTypes.func.isRequired
};
