import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col, Button, Icon, Modal, Input } from "react-materialize";
import Ionicon from "react-ionicons";
import Sticky from "react-sticky-el";
import Moment from "react-moment";
import Header from "../elements/Header";
import NumberFormat from "react-number-format";
import RoundLoader from "../elements/RoundLoader";
import Attendance from "../elements/Attendance";
import VoteDropdown from "../elements/VoteDropdown";
import * as voteActions from "../../actions/voteActions";
import $ from "jquery";

class InnovoteTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: "",
      date: "",
      value: "",
      [voteActions]: ""
    };

    this.gotoDetails = this.gotoDetails.bind(this);
    this.onChangeInput = this.onChangeInput.bind(this);
    this.scrollUp = this.scrollUp.bind(this);
    this.scrollDown = this.scrollDown.bind(this);
    this.scrollRight = this.scrollRight.bind(this);
    this.renderVote = this.renderVote.bind(this);
    this.renderRows = this.renderRows.bind(this);
    this.renderVoteColumn = this.renderVoteColumn.bind(this);
    this.renderVoteHeader = this.renderVoteHeader.bind(this);
    this.renderVoteResult = this.renderVoteResult.bind(this);
    this.renderAlternative = this.renderAlternative.bind(this);
    this.onValueChange = this.onValueChange.bind(this);
    this.submitEdit = this.submitEdit.bind(this);
    this.renderVoteChoices = this.renderVoteChoices.bind(this);
    this.renderMobile = this.renderMobile.bind(this);
  }

  componentWillMount() {
    fetch(this.props.fetchVote());
    window.scrollTo(0, 0);

    $(window).scroll(function() {
      if ($(this).scrollTop() > 0) {
        $(".scrollDown").fadeOut();
      } else {
        $(".scrollDown").fadeIn();
      }
    });
  }

  componentWillReceiveProps(newProps, voteList) {
    $("div.fixed-action-btn").removeClass("active");
    this.setState({ amount: "", date: "" });
  }

  gotoDetails(id) {
    this.props.history.push("/vote/details/" + id);
  }

  onChangeInput(voteNumber, e) {
    var yes = $("." + voteNumber).find(".vote-group .yes:checked");
    var no = $("." + voteNumber).find(".vote-group .no:checked");
    var yesCount = yes.length;
    var noCount = no.length;
    $("#" + voteNumber)
      .find("p span.yes")
      .text(yesCount);
    $("#" + voteNumber)
      .find("p span.no")
      .text(noCount);

    if (yesCount > noCount) {
      $("#" + voteNumber)
      .find("p.result")
      .text("Pass");
    }

    if (yesCount < noCount) {
      $("#" + voteNumber)
      .find("p.result")
      .text("Fail");
    }
  }

  onValueChange(event) {
    this.setState({ [event.target.name]: event.target.value });
    console.log(this.state.date);
    $(".input-field").on("keydown", ".arrears", function(e) {
      -1 !== $.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) ||
        (/65|67|86|88/.test(e.keyCode) &&
          (e.ctrlKey === true || e.metaKey === true) &&
          (!0 === e.ctrlKey || !0 === e.metaKey)) ||
        (35 <= e.keyCode && 40 >= e.keyCode) ||
        ((e.shiftKey || 48 > e.keyCode || 57 < e.keyCode) &&
          (96 > e.keyCode || 105 < e.keyCode) &&
          e.preventDefault());
    });
  }

  submitEdit(e, id) {
    this.props.updateArrears(id, this.state.amount, this.state.date);
    $("#modal_0").modal("close");
  }

  scrollUp() {
    $("html, body").animate({ scrollTop: 0 }, "slow");
    $(".scrollUp").css("opacity", 0);
  }

  scrollDown() {
    $("html, body").animate(
      {
        scrollTop: $(document).height()
      },
      "slow"
    );
    $(".scrollUp").css("opacity", 1);
  }

  scrollRight() {
    var leftPos = $(".vote-container").scrollLeft();
    var leftHeaderPos = $(".header-count").scrollLeft();
    var leftFooterPos = $(".vote-result-count").scrollLeft();
    $(".vote-container").animate({ scrollLeft: leftPos + 200 }, 800);
    $(".header-count").animate({ scrollLeft: leftHeaderPos + 200 }, 800);
    $(".vote-result-count").animate({ scrollLeft: leftFooterPos + 200 }, 800);
  }

  scrollLeft() {
    var rightPos = $(".vote-container").scrollLeft();
    var rightHeaderPos = $(".header-count").scrollLeft();
    var rightFooterPos = $(".vote-result-count").scrollLeft();
    $(".vote-container").animate({ scrollLeft: rightPos - 200 }, 800);
    $(".header-count").animate({ scrollLeft: rightHeaderPos - 200 }, 800);
    $(".vote-result-count").animate({ scrollLeft: rightFooterPos - 200 }, 800);
  }

  renderAlternative(id, alternatives) {
    var alt = alternatives.MotionAlternatives;

    return alt.map(item => (
      <div key={item.Id} className="alt">
        <p>{item.AlternativeText}</p>
      </div>
    ));
  }

  renderVoteChoices(id, voteList) {
    var voteChoices = voteList.motion;

    return voteChoices.map(item => (
      <div key={item.Id} className="choices">
        <span className="on-mobile">Vote {item.Number}</span>
        <VoteDropdown
          className={"vote" + item.Number}
          name={"vote" + item.Number + id}
          YesId={"vote" + item.Number + "-1" + id}
          NoId={"vote" + item.Number + "-2" + id}
          AbsId={"vote" + item.Number + "-3" + id}
          onChangeYes={e => this.onChangeInput("vote" + item.Number, e)}
          onChangeNo={e => this.onChangeInput("vote" + item.Number, e)}
          onChangeAbs={e => this.onChangeInput("vote" + item.Number, e)}
          // checkedYes={this.state["vote" + item.Number + id] === "yes"}
          // checkedNo={this.state["vote" + item.Number + id] === "no"}
          // checkedAbs={this.state["vote" + item.Number + id] === "abstain"}
          Alt="alternative-dropdown"
          alternatives={this.renderAlternative(id, item)}
        />
      </div>
    ));
  }

  renderVoteHeader(voteList) {
    var voteChoices = voteList.motion;
    return voteChoices.map(item => (
      <div key={item.Number} className="choices">
        <Button className="vote1" onClick={() => this.gotoDetails(item.Id)}>
          <p>Vote {item.Number}</p>
        </Button>
      </div>
    ));
  }

  renderVoteResult(voteList) {
    var voteResult = voteList.motion;

    return voteResult.map(item => (
      <div key={item.Number} className="choices">
        <div className="count-result" id={"vote" + item.Number}>
          <p>
            Yes: <span className="yes" />
          </p>
          <p>
            No: <span className="no" />
          </p>
          <p className="result" />
        </div>
      </div>
    ));
  }

  renderVoteColumn(voteColumn) {
    var vote = voteColumn.owners;

    return vote.map(item => (
      <Row key={item.Id} className="row-votelist" id={item.Id}>
        {this.renderVoteChoices(item.Id, this.props.voteList)}
      </Row>
    ));
  }

  renderMobile(rowList) {
    var owners = rowList.owners;

    return owners.map(item => (
      <Row key={item.Id} className="list" id={item.Id}>
        <Col className="lot-area">
          <p>{item.LotNumber}</p>
        </Col>
        <Col s={8} l={2}>
          <p>
            <span className="attendance-status">
              <Icon className={item.Attendence}>brightness_1</Icon>
            </span>
            <span className="name">{item.FullName}</span>
            <br />
            <Modal
              header="Edit"
              fixedFooter
              trigger={
                <Button className="edit" onClick={this.openModal}>
                  <Icon>edit</Icon>
                </Button>
              }
              actions={
                <div className="buttonModal">
                  <Button
                    waves="light"
                    className="submit"
                    onClick={e => this.submitEdit(e, item.Id)}
                  >
                    Submit
                  </Button>

                  <Button flat modal="close" waves="light">
                    Close
                  </Button>
                </div>
              }
            >
              <Row className="edit-amount flex">
                <p>
                  <Ionicon
                    icon="ios-cash-outline"
                    fontSize="30px"
                    className="icon"
                  />
                </p>
                <Input
                  s={12}
                  className="arrears"
                  name="amount"
                  label="Arrears Amount"
                  value={this.state.amount}
                  onChange={this.onValueChange}
                />
              </Row>
              <Row className="flex">
                <p>
                  <Ionicon
                    icon="ios-calendar-outline"
                    fontSize="30px"
                    className="icon"
                  />
                </p>
                <Input
                  s={12}
                  name="date"
                  type="date"
                  label="Arrears Date"
                  value={this.state.date}
                  onChange={this.onValueChange}
                />
              </Row>
            </Modal>
            <span className="italic amount">
              <NumberFormat
                value={item.YearToDateBalance}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
                decimalScale={2}
              />
            </span>
            <br />
            <span className="admin-paid-to">
              <Moment format="DD MMM YYYY" date={item.PaidToDate} />
            </span>
            <br />
          </p>
        </Col>
        <Col className="attendance-col">
          <Attendance />
        </Col>
        <Col m={12} className="right">
          {this.renderVoteChoices(item.Id, this.props.voteList)}
        </Col>
      </Row>
    ));
  }

  renderRows(rowList) {
    var owners = rowList.owners;

    return owners.map(item => (
      <Row key={item.Id} className="list" id={item.Id}>
        <Col className="lot-area">
          <p>{item.LotNumber}</p>
        </Col>
        <Col l={2} s={8} className="owners-details">
          <p>
            <span className="attendance-status">
              <Icon className={item.Attendence}>brightness_1</Icon>
            </span>
            <span className="name">{item.FullName}</span>
            <br />
            <Modal
              header="Edit"
              fixedFooter
              trigger={
                <Button className="edit" onClick={this.openModal}>
                  <Icon>edit</Icon>
                  <div className="arrears">
                    <span className="italic amount">
                      <NumberFormat
                        value={item.YearToDateBalance}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"$"}
                        decimalScale={2}
                      />
                    </span>
                    <span className="admin-paid-to">
                      <Moment format="DD MMM YYYY" date={item.PaidToDate} />
                    </span>
                  </div>
                </Button>
              }
              actions={
                <div className="buttonModal">
                  <Button
                    waves="light"
                    className="submit"
                    onClick={e => this.submitEdit(e, item.Id)}
                  >
                    Submit
                  </Button>

                  <Button flat modal="close" waves="light">
                    Close
                  </Button>
                </div>
              }
            >
              <Row className="edit-amount flex">
                <p>
                  <Ionicon
                    icon="ios-cash-outline"
                    fontSize="30px"
                    className="icon"
                  />
                </p>
                <Input
                  s={12}
                  className="arrears"
                  name="amount"
                  label="Arrears Amount"
                  value={this.state.amount}
                  onChange={this.onValueChange}
                />
              </Row>
              <Row className="flex">
                <p>
                  <Ionicon
                    icon="ios-calendar-outline"
                    fontSize="30px"
                    className="icon"
                  />
                </p>
                <Input
                  s={12}
                  name="date"
                  type="date"
                  label="Arrears Date"
                  value={this.state.date}
                  onChange={this.onValueChange}
                />
              </Row>
            </Modal>
          </p>
        </Col>
        <Col className="attendance-col">
          <Attendance />
        </Col>
      </Row>
    ));
  }

  renderVote(voteList) {
    console.log(voteList);
    return (
      <div className="page1">
        <Row className="container-fluid data-table">
          <Row className="z-depth-1 vote-count">
            <Sticky className="z-depth-1" topOffset={10}>
              <Col className="lot-area" />
              <Col l={2} className="center" />
              <div className="navigation">
                <Button className="scrollLeft" onClick={this.scrollLeft}>
                  <Icon>arrow_back</Icon>
                </Button>
              </div>
              <Col l={1} />
              <Col l={9} className="right">
                <div className="header-count">
                  {this.renderVoteHeader(this.props.voteList)}
                </div>
              </Col>
              <div className="navigation">
                <Button className="scrollRight" onClick={this.scrollRight}>
                  <Icon>arrow_forward</Icon>
                </Button>
              </div>
            </Sticky>
          </Row>
          <Row className="voteList on-wide-screen">
            <Col l={3}>{this.renderRows(this.props.voteList)}</Col>
            <Col l={9}>
              <div className="vote-container">
                {this.renderVoteColumn(this.props.voteList)}
              </div>
            </Col>
          </Row>
          <Row className="voteList on-mobile-screen">
            {this.renderMobile(this.props.voteList)}
          </Row>
        </Row>
        <Row className="container-fluid result">
          <Sticky bottomOffset={10}>
            <Col l={3}>
              <div className="footer">
                <Modal
                  className="finish-modal"
                  fixedFooter
                  trigger={
                    <Button className="finish" onClick={this.openModal}>
                      Finish
                    </Button>
                  }
                  actions={
                    <div className="buttonModal">
                      <Button waves="light" className="submit">
                        Yes
                      </Button>

                      <Button flat modal="close" waves="light">
                        No
                      </Button>
                    </div>
                  }
                >
                  <Row className="verification">
                    <p>
                      Not everyone has voted. are you sure you want to finish?
                    </p>
                  </Row>
                </Modal>
                <p className="right-align">Result:</p>
              </div>
            </Col>
            <Col l={9}>
              <div className="vote-result-count">
                {this.renderVoteResult(this.props.voteList)}
              </div>
            </Col>
          </Sticky>
        </Row>
        <Row>
          <Button floating className="scrollUp" onClick={this.scrollUp}>
            <Icon>arrow_upward</Icon>
          </Button>
          <Button floating className="scrollDown" onClick={this.scrollDown}>
            <Icon>arrow_downward</Icon>
          </Button>
        </Row>
      </div>
    );
  }

  render() {
    const { voteList } = this.props;

    if (voteList) {
      return (
        <div className="votingPage">
          <Header onClick={this.filterVotes} />
          <div>{this.renderVote(this.props.voteList)}</div>
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
    return { voteList: vote.voteList };
  }
  return {};
}

export default connect(mapStateToProps, voteActions)(InnovoteTable);
