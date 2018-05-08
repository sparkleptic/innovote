import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col, Button, Icon } from "react-materialize";
import Sticky from "react-sticky-el";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import Header from "../elements/Header";
import NumberFormat from "react-number-format";
import RoundLoader from "../elements/RoundLoader";
import VoteDropdown from "../elements/VoteDropdown";
import * as fetchVote from "../../actions/voteActions";
import $ from "jquery";

class Page2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countYes1: 0,
      countYes2: 0,
      countYes3: 0,
      countYes4: 0,
      countYes5: 0,
      countYes6: 0,
      countYes7: 0,
      countYes8: 0,
      countNo1: 0,
      countNo2: 0,
      countNo3: 0,
      countNo4: 0,
      countNo5: 0,
      countNo6: 0,
      countNo7: 0,
      countNo8: 0,
      result1: "",
      result2: "",
      result3: "",
      result4: "",
      result5: "",
      result6: "",
      result7: "",
      result8: ""
    };
    this.onChangeInput = this.onChangeInput.bind(this);
    this.scrollDown = this.scrollDown.bind(this);
    this.scrollUp = this.scrollUp.bind(this);
    this.renderVote = this.renderVote.bind(this);
    this.renderRows = this.renderRows.bind(this);
    this.renderVoteChoices = this.renderVoteChoices.bind(this);
  }

  componentWillMount() {
    $("div.fixed-action-btn").removeClass("active");
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

  onChangeInput() {
    var yes1 = $(".vote1 .vote-group .yes:checked").length;
    var no1 = $(".vote1 .vote-group .no:checked").length;
    this.setState({
      countYes1: yes1
    });
    this.setState({
      countNo1: no1
    });

    if (yes1 > no1) {
      this.setState({
        result1: "Pass"
      });
    }

    if (yes1 < no1) {
      this.setState({
        result1: "Fail"
      });
    }

    var yes2 = $(".vote2 .vote-group .yes:checked").length;
    var no2 = $(".vote2 .vote-group .no:checked").length;
    this.setState({
      countYes2: yes2
    });
    this.setState({
      countNo2: no2
    });

    if (yes2 > no2) {
      this.setState({
        result2: "Pass"
      });
    }

    if (yes2 < no2) {
      this.setState({
        result2: "Fail"
      });
    }

    var yes3 = $(".vote3 .vote-group .yes:checked").length;
    var no3 = $(".vote3 .vote-group .no:checked").length;
    this.setState({
      countYes3: yes3
    });
    this.setState({
      countNo3: no3
    });

    if (yes3 > no3) {
      this.setState({
        result3: "Pass"
      });
    }

    if (yes3 < no3) {
      this.setState({
        result3: "Fail"
      });
    }

    var yes4 = $(".vote4 .vote-group .yes:checked").length;
    var no4 = $(".vote4 .vote-group .no:checked").length;
    this.setState({
      countYes4: yes4
    });
    this.setState({
      countNo4: no4
    });

    if (yes4 > no4) {
      this.setState({
        result4: "Pass"
      });
    }

    if (yes4 < no4) {
      this.setState({
        result4: "Fail"
      });
    }

    var yes5 = $(".vote5 .vote-group .yes:checked").length;
    var no5 = $(".vote5 .vote-group .no:checked").length;
    this.setState({
      countYes5: yes5
    });
    this.setState({
      countNo5: no5
    });

    if (yes5 > no5) {
      this.setState({
        result5: "Pass"
      });
    }

    if (yes5 < no5) {
      this.setState({
        result5: "Fail"
      });
    }

    var yes6 = $(".vote6 .vote-group .yes:checked").length;
    var no6 = $(".vote6 .vote-group .no:checked").length;
    this.setState({
      countYes6: yes6
    });
    this.setState({
      countNo6: no6
    });

    if (yes6 > no6) {
      this.setState({
        result6: "Pass"
      });
    }

    if (yes6 < no6) {
      this.setState({
        result6: "Fail"
      });
    }

    var yes7 = $(".vote7 .vote-group .yes:checked").length;
    var no7 = $(".vote7 .vote-group .no:checked").length;
    this.setState({
      countYes7: yes7
    });
    this.setState({
      countNo7: no7
    });

    if (yes7 > no7) {
      this.setState({
        result7: "Pass"
      });
    }

    if (yes7 < no7) {
      this.setState({
        result7: "Fail"
      });
    }

    var yes8 = $(".vote8 .vote-group .yes:checked").length;
    var no8 = $(".vote8 .vote-group .no:checked").length;
    this.setState({
      countYes8: yes8
    });
    this.setState({
      countNo8: no8
    });

    if (yes8 > no8) {
      this.setState({
        result8: "Pass"
      });
    }

    if (yes8 < no8) {
      this.setState({
        result8: "Fail"
      });
    }
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

  renderVoteChoices(id){
    return (
      <div>
        <Col className="choices">
          <span className="on-mobile">Vote 8</span>        
          <VoteDropdown
            className="vote1"
            name={"vote1" + id}
            YesId={"vote1-1" + id}
            NoId={"vote1-2" + id}
            AbsId={"vote1-3" + id}
            onChangeYes={this.onChangeInput}
            onChangeNo={this.onChangeInput}
            onChangeAbs={this.onChangeInput}
            Alt="hide"
          />
        </Col>
        <Col className="choices">
          <span className="on-mobile">Vote 9</span>        
          <VoteDropdown
            className="vote2"
            name={"vote2" + id}
            YesId={"vote2-1" + id}
            NoId={"vote2-2" + id}
            AbsId={"vote2-3" + id}
            onChangeYes={this.onChangeInput}
            onChangeNo={this.onChangeInput}
            onChangeAbs={this.onChangeInput}
            Alt="hide"
          />
        </Col>
        <Col className="choices">
          <span className="on-mobile">Vote 10</span>                
          <VoteDropdown
            className="vote3"
            name={"vote3" + id}
            YesId={"vote3-1" + id}
            NoId={"vote3-2" + id}
            AbsId={"vote3-3" + id}
            onChangeYes={this.onChangeInput}
            onChangeNo={this.onChangeInput}
            onChangeAbs={this.onChangeInput}
            Alt="hide"
          />
        </Col>
        <Col className="choices">
          <span className="on-mobile">Vote 11</span>                
          <VoteDropdown
            className="vote4"
            name={"vote4" + id}
            YesId={"vote4-1" + id}
            NoId={"vote4-2" + id}
            AbsId={"vote4-3" + id}
            onChangeYes={this.onChangeInput}
            onChangeNo={this.onChangeInput}
            onChangeAbs={this.onChangeInput}
            Alt="hide"
          />
        </Col>
        <Col className="choices">
          <span className="on-mobile">Vote 12</span>                        
          <VoteDropdown
            className="vote5"
            name={"vote5" + id}
            YesId={"vote5-1" + id}
            NoId={"vote5-2" + id}
            AbsId={"vote5-3" + id}
            onChangeYes={this.onChangeInput}
            onChangeNo={this.onChangeInput}
            onChangeAbs={this.onChangeInput}
            Alt="hide"
          />
        </Col>
        <Col className="choices">
          <span className="on-mobile">Vote 13</span>                        
          <VoteDropdown
            className="vote6"
            name={"vote6" + id}
            YesId={"vote6-1" + id}
            NoId={"vote6-2" + id}
            AbsId={"vote6-3" + id}
            onChangeYes={this.onChangeInput}
            onChangeNo={this.onChangeInput}
            onChangeAbs={this.onChangeInput}
            Alt="hide"
          />
        </Col>
        <Col className="choices">
          <span className="on-mobile">Vote 14</span>                        
          <VoteDropdown
            className="vote7"
            name={"vote7" + id}
            YesId={"vote7-1" + id}
            NoId={"vote7-2" + id}
            AbsId={"vote7-3" + id}
            onChangeYes={this.onChangeInput}
            onChangeNo={this.onChangeInput}
            onChangeAbs={this.onChangeInput}
            Alt="hide"            
          />
        </Col>
        <Col className="choices">
          <span className="on-mobile">Vote 15</span>                        
          <VoteDropdown
            className="vote8"
            name={"vote8" + id}
            YesId={"vote8-1" + id}
            NoId={"vote8-2" + id}
            AbsId={"vote8-3" + id}
            onChangeYes={this.onChangeInput}
            onChangeNo={this.onChangeInput}
            onChangeAbs={this.onChangeInput}
            Alt="hide"            
          />
        </Col>
      </div>
    );
  }

  renderRows(rowList) {
    const owners = rowList.Vote.Owners;
    return owners.map(item => (
      <Row key={item.ID} className="list">
        <Col className="lot-area">
          <p>{item.Lot}</p>
        </Col>
        <Col l={2}>
          <p>
            <span className="attendance-status">
              <Icon className={item.Attendance}>brightness_1</Icon>
            </span>   
            <span className="name">{item.Name}</span>
            <br />
            <span className="italic amount">
              <NumberFormat
                value={item.Arrears}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
                decimalScale={2}
              />
            </span>
            <br />
            <span className="admin-paid-to">
              <Moment format="DD MMM YYYY" date={item.DateOfArrears} />
            </span>
            <br />
          </p>
        </Col>
        <Col l={10} className="right">
          {this.renderVoteChoices(item.ID)}
        </Col>
      </Row>
    ));
  }

  renderVote(voteList) {
    console.log(voteList);
    return (
      <div className="page2">
        <Row className="container-fluid data-table">
          <Row className="z-depth-1 vote-count">
            <Sticky className="z-depth-1" topOffset={10}>
              <Col l={2} className="backPage navigation">
                <Link to="/">
                  <Icon>arrow_back</Icon>
                </Link>
              </Col>
              <Col l={10} className="right">
                <Col className="choices">
                  <p className="title">Vote 8</p>
                </Col>
                <Col className="choices">
                  <p className="title">Vote 9</p>
                </Col>
                <Col className="choices">
                  <p className="title">Vote 10</p>
                </Col>
                <Col className="choices">
                  <p className="title">Vote 11</p>
                </Col>
                <Col className="choices">
                  <p className="title">Vote 12</p>
                </Col>
                <Col className="choices">
                  <p className="title">Vote 13</p>
                </Col>
                <Col className="choices">
                  <p className="title">Vote 14</p>
                </Col>
                <Col className="choices">
                  <p className="title">Vote 15</p>
                </Col>
              </Col>
            </Sticky>
          </Row>
          <Row className="voteList">{this.renderRows(this.props.voteList)}</Row>
        </Row>
        <Row className="container-fluid result">
          <Sticky bottomOffset={10}>
            <Col className="lot-area" />
            <Col l={2}>
              <p>Result</p>
            </Col>
            <Col l={10} className="right">
              <Col className="choices">
                <div className="count-result">
                  <p>
                    Yes: <span>{this.state.countYes1}</span>
                  </p>
                  <p>
                    No: <span>{this.state.countNo1}</span>
                  </p>
                  <p>{this.state.result1}</p>
                </div>
              </Col>
              <Col className="choices">
                <div className="count-result">
                  <p>
                    Yes: <span>{this.state.countYes2}</span>
                  </p>
                  <p>
                    No: <span>{this.state.countNo2}</span>
                  </p>
                  <p>{this.state.result2}</p>
                </div>
              </Col>
              <Col className="choices">
                <div className="count-result">
                  <p>
                    Yes: <span>{this.state.countYes3}</span>
                  </p>
                  <p>
                    No: <span>{this.state.countNo3}</span>
                  </p>
                  <p>{this.state.result3}</p>
                </div>
              </Col>
              <Col className="choices">
                <div className="count-result">
                  <p>
                    Yes: <span>{this.state.countYes4}</span>
                  </p>
                  <p>
                    No: <span>{this.state.countNo4}</span>
                  </p>
                  <p>{this.state.result4}</p>
                </div>
              </Col>
              <Col className="choices">
                <div className="count-result">
                  <p>
                    Yes: <span>{this.state.countYes5}</span>
                  </p>
                  <p>
                    No: <span>{this.state.countNo5}</span>
                  </p>
                  <p>{this.state.result5}</p>
                </div>
              </Col>
              <Col className="choices">
                <div className="count-result">
                  <p>
                    Yes: <span>{this.state.countYes6}</span>
                  </p>
                  <p>
                    No: <span>{this.state.countNo6}</span>
                  </p>
                  <p>{this.state.result6}</p>
                </div>
              </Col>
              <Col className="choices">
                <div className="count-result">
                  <p>
                    Yes: <span>{this.state.countYes7}</span>
                  </p>
                  <p>
                    No: <span>{this.state.countNo7}</span>
                  </p>
                  <p>{this.state.result7}</p>
                </div>
              </Col>
              <Col className="choices">
                <div className="count-result">
                  <p>
                    Yes: <span>{this.state.countYes8}</span>
                  </p>
                  <p>
                    No: <span>{this.state.countNo8}</span>
                  </p>
                  <p>{this.state.result8}</p>
                </div>
              </Col>
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
        <div>
          <Header/>
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

export default connect(mapStateToProps, fetchVote)(Page2);
