import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col, Button, Icon } from "react-materialize";
import { Link } from "react-router-dom";
import Header from "../elements/Header";
import * as fetchVote from "../../actions/voteActions";
import RoundLoader from "../elements/RoundLoader";
import $ from "jquery";
import "./result.css";

class Result extends Component {
  constructor(props) {
    super(props);
    this.renderVotesRow = this.renderVotesRow.bind(this);
  }

  componentDidMount() {
    fetch(this.props.fetchVote());
    $(".collapsible").collapsible();
    window.scrollTo(0, 0);
  }

  renderVotesRow(rowList) {
    const listResult = rowList.motion;
    console.log(listResult);

    return listResult.map(item => (
        <li key={item.Number} className={"vote" + item.Number} >
            <div className="collapsible-header">
                Vote {item.Number}
                <div className="summary" >
                    Yes: <span> 5 </span>
                    No: <span> 5 </span>
                    - <span>Failed</span>
                </div>
            </div>
            <div className="collapsible-body">
                <Row className="data-holder">
                <span>
                    <Col s={12} m={4} className="mt-10">
                    <div className="list-container">
                        <h6>
                        Yes <span className="badge">3</span>
                        </h6>
                        <hr />
                        <div className="list-owners">
                        <ul>
                            <li>
                            <span>Lot 1 - </span>Michael Tippett
                            </li>
                            <li>
                            <span>Lot 2 - </span>Katherine Tippett
                            </li>
                            <li>
                            <span>Lot 3 - </span>Thomas Cummins
                            </li>
                        </ul>
                        </div>
                    </div>
                    </Col>
                    <Col s={12} m={4} className="mt-10">
                    <div className="list-container">
                        <h6>
                        No <span className="badge">4</span>
                        </h6>
                        <hr />
                        <div className="list-owners">
                        <ul>
                            <li>
                            <span>Lot 1 - </span>Michael Tippett
                            </li>
                            <li>
                            <span>Lot 2 - </span>Katherine Tippett
                            </li>
                            <li>
                            <span>Lot 3 - </span>Thomas Cummins
                            </li>
                            <li>
                            <span>Lot 4 - </span>Denise Moira Long
                            </li>
                        </ul>
                        </div>
                    </div>
                    </Col>
                    <Col s={12} m={4} className="mt-10">
                    <div className="list-container">
                        <h6>
                        Abstain <span className="badge">3</span>
                        </h6>
                        <hr />
                        <div className="list-owners">
                        <ul>
                            <li>
                            <span>Lot 1 - </span>Michael Tippett
                            </li>
                            <li>
                            <span>Lot 2 - </span>Katherine Tippett
                            </li>
                            <li>
                            <span>Lot 3 - </span>Thomas Cummins
                            </li>
                        </ul>
                        </div>
                    </div>
                    </Col>
                </span>
                </Row>
            </div>
        </li>
    ));
  }

  render() {
    const { voteList } = this.props;

    if (!voteList) {
      return (
        <div className="row order_loader">
          <div className="col s12 center">
            <RoundLoader />
          </div>
        </div>
      );
    }

    return (
      <Row className="resultPage">
        <Header />
        <Button className="backHome">
          <Link to="/">
            <Icon>keyboard_backspace</Icon>Back
          </Link>
        </Button>
        <Row className="z-depth-1 vote-count" />
        <Row className="container-fluid listResult">
          <Col s={12}>
            <h5>Vote Result</h5>
          </Col>
          <Col s={12}>
            <ul className="collapsible" data-collapsible="accordion">
              {this.renderVotesRow(this.props.voteList)}
            </ul>
          </Col>
        </Row>
      </Row>
    );
  }
}

function mapStateToProps({ vote }) {
  if (vote) {
    return { voteList: vote.voteList };
  }
  return {};
}

export default connect(mapStateToProps, fetchVote)(Result);
