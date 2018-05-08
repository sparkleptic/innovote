import React, { Component } from "react";
import { Row, Col, Button, Icon } from "react-materialize";

class NameStatus extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Row className="list">
        <Col className="lot-area">{this.props.lot}</Col>
        <Col l={3}>
          <p className="bold">{this.props.name}</p>
          <div className="details">
            <p className="italic">{this.props.amount}</p>
            <p className="date">{this.props.date}</p>
          </div>
        </Col>
        <Col s={12} l={2}>
          <p className={this.props.statusClass}>
            <Icon className={this.props.status}>brightness_1</Icon>
            <span>{this.props.status}</span>
          </p>
        </Col>

        <Col s={12} l={6}>
          <div className="button-group">
            <Button waves="light" onClick={this.props.inperson}>
              In person
            </Button>
            <Button waves="light" onClick={this.props.proxy}>
              Proxy
            </Button>
            <Button waves="light" onClick={this.props.votePaper}>
              Vote Paper
            </Button>
            <Button waves="light" onClick={this.props.apology}>
              Apology
            </Button>
          </div>
        </Col>
      </Row>
    );
  }
}

export default NameStatus;
