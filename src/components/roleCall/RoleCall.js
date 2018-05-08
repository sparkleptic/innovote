import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col, Button, Icon } from "react-materialize";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import Header from "../elements/Header";
import NumberFormat from "react-number-format";
import NameStatus from "../roleCall/List/NameStatus";
import * as fetchVote from "../../actions/voteActions";
import RoundLoader from "../elements/RoundLoader";
import $ from "jquery";
import "./rolecall.css";

class RoleCall extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.renderRows = this.renderRows.bind(this);
    this.scrollDown = this.scrollDown.bind(this);
    this.scrollUp = this.scrollUp.bind(this);
    this.onClickPerson = this.onClickPerson.bind(this);
    this.onClickProxy = this.onClickProxy.bind(this);
    this.onClickVotePaper = this.onClickVotePaper.bind(this);
    this.onClickApology = this.onClickApology.bind(this);
  }

  componentWillMount() {
    $("div.fixed-action-btn").removeClass("active");
    fetch(this.props.fetchVote());
    $(window).scroll(function() {
      if ($(this).scrollTop() > 0) {
        $(".scrollDown").fadeOut();
      } else {
        $(".scrollDown").fadeIn();
      }
    });
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

  scrollUp() {
    $("html, body").animate({ scrollTop: 0 }, "slow");
    $(".scrollUp").css("opacity", 0);
  }

  onClickPerson(lot) {
    this.setState({
      [lot]: "In Person"
    });
    $("." + lot)
      .find("span")
      .text("In Person");

    $("." + lot)
      .find("i")
      .removeClass()
      .addClass("material-icons In Person");

    console.log(this.state[lot]);
  }

  onClickProxy(lot) {
    this.setState({
      [lot]: "Proxy"
    });
    $("." + lot)
      .find("span")
      .text("Proxy");

    $("." + lot)
      .find("i")
      .removeClass()
      .addClass("material-icons Proxy");

    console.log(this.state[lot]);
  }

  onClickVotePaper(lot) {
    this.setState({
      [lot]: "Vote Paper"
    });
    $("." + lot)
      .find("span")
      .text("Vote Paper");

    $("." + lot)
      .find("i")
      .removeClass()
      .addClass("material-icons Vote Paper");

    console.log(this.state[lot]);
  }

  onClickApology(lot) {
    this.setState({
      [lot]: "Apology"
    });
    $("." + lot)
      .find("span")
      .text("Apology");

    $("." + lot)
      .find("i")
      .removeClass()
      .addClass("material-icons Apology");

    console.log(this.state[lot]);
  }

  renderRows(rowList) {
    const owners = rowList.owners;
    return owners.map(item => (
      <Row key={item.Id}>
        <NameStatus
          lot={item.LotNumber}
          name={item.FullName}
          amount={
            <NumberFormat
              value={item.YearToDateBalance}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"$"}
              decimalScale={2}
            />
          }
          date={<Moment format="DD MMM YYYY" date={item.PaidToDate} />}
          statusClass={item.LotNumber}
          status={item.Attendence || "In Person" || this.state[item.LotNumber]}
          inperson={this.onClickPerson.bind(this, item.LotNumber)}
          proxy={this.onClickProxy.bind(this, item.LotNumber)}
          votePaper={this.onClickVotePaper.bind(this, item.LotNumber)}
          apology={this.onClickApology.bind(this, item.LotNumber)}
        />
      </Row>
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
      <div className="roll-call">
        <Header />
        <Button className="backHome">
          <Link to="/">
            <Icon>keyboard_backspace</Icon>Back
          </Link>
        </Button>
        <Row className="container-fluid data-table">
          <Row className="z-depth-1 title vote-count">
            <Col className="lot-area" />
            <Col l={3} />
            <Col l={2} />
          </Row>
          <Row className="dataList">{this.renderRows(this.props.voteList)}</Row>
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
}

function mapStateToProps({ vote }) {
  if (vote) {
    return { voteList: vote.voteList };
  }
  return {};
}

export default connect(mapStateToProps, fetchVote)(RoleCall);
