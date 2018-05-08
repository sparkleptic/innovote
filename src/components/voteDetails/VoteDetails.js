import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Row, Col, Button, Icon } from "react-materialize";
import Cookies from "universal-cookie";
import Header from "../elements/Header";
import RoundLoader from "../elements/RoundLoader";
import * as voteActions from "../../actions/voteActions";
import "./voteDetails.css";

class VoteDetails extends Component {
  constructor(props) {
    super(props);

    window.cookies = new Cookies();
    //Get Order Id
    const splitPath = this.props.location.pathname.split("/");
    const voteId = splitPath[splitPath.length - 1];
    console.log(voteId);

    if (isNaN(voteId)) {
      //No Id, Push back to orders
      this.props.history.push("/");
    } else {
      this.props.fetchVoteDetails(splitPath[splitPath.length - 1]);
    }
    this.renderVoteDetails = this.renderVoteDetails.bind(this);
    this.renderDescriptionList = this.renderDescriptionList.bind(this);
    this.renderAlternatives = this.renderAlternatives.bind(this);
    this.renderAttachmentFiles = this.renderAttachmentFiles.bind(this);
    this.renderAttachmentFileUrl = this.renderAttachmentFileUrl.bind(this);
  }

  componentWillMount() {
    // fetch(this.props.fetchVoteDetails());
  }

  renderDescriptionList(voteDetails) {
    var list = voteDetails.Description.list;
    return list.map(item => (
      <li key={item} className="list">
        {item}
      </li>
    ));
  }

  renderAlternatives(voteDetails) {
    var alternative = voteDetails.MotionAlternatives;
    return alternative.map(item => (
      <Row key={item.Id} className="alt-section">
        <Col s={12}>
          <p>{item.AlternativeText}</p>
        </Col>
        <Col s={12}>
          <p className="alt-attachments">Attachments :</p>
          {item.Attachment}
        </Col>
      </Row>
    ));
  }

  renderAttachmentFiles(files) {
    if (files) {
      return files.map(item => (
        <div key={item.name}>
          <Button>
            <a href={"http://" + item.url}>
              <Icon>file_download</Icon>
            </a>
          </Button>
          {item.name}
          <br />
        </div>
      ));
    }
  }

  renderAttachmentFileUrl() {}

  renderVoteDetails(voteDetails) {
    return (
      <div className="container voteDetails">
        <Row>
          <h3>{voteDetails.Name}</h3>
          <div>
            {voteDetails.Question}
            {/* <ul>{this.renderDescriptionList(voteDetails)}</ul> */}
          </div>
        </Row>
        <Row className="alternative-section">
          <Col s={12} className="alternatives">
            <p>Alternatives</p>
            {this.renderAlternatives(voteDetails)}
          </Col>
        </Row>
        <Row className="attachment-section">
          <Col s={12} className="attachment">
            <p>Attachments</p>
            <Col s={12} className="file-links">
              <p>
                <Icon>attach_file</Icon> Files
              </p>
              <Col s={12}>
                {this.renderAttachmentFiles(voteDetails.Attachments)}
              </Col>
            </Col>
          </Col>
        </Row>
      </div>
    );
  }

  render() {
    const { voteDetails } = this.props;
    console.log(voteDetails);

    if (voteDetails) {
      return (
        <div className="vote-detail">
          <Header />
          <Button className="backHome">
            <Link to="/">
              <Icon>keyboard_backspace</Icon>Back
            </Link>
          </Button>
          <Row className="z-depth-1 vote-count" />
          <div>{this.renderVoteDetails(this.props.voteDetails)}</div>
        </div>
      );
    } else {
      return (
        <div className="row order_loader">
          <div className="col s12 center">
            <RoundLoader />
          </div>
        </div>
      );
    }
  }
}

function mapStateToProps({ vote }) {
  if (vote) {
    return { voteDetails: vote.voteDetails };
  }
  return {};
}

export default connect(mapStateToProps, voteActions)(VoteDetails);
