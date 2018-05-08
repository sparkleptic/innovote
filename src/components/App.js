import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Table from "../components/tableDetails/InnovoteTable";
import Page2 from "../components/tableDetails/Page2";
import RoleCall from "../components/roleCall/RoleCall";
import Result from "../components/result/Result";
import VoteDetails from "../components/voteDetails/VoteDetails";
import "../components/styles/common.css";
import "../components/styles/responsive.css";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path="/" component={Table} />
          <Route path="/2" component={Page2} />
          <Route path="/vote/details" component={VoteDetails} />
          <Route path="/role-call" component={RoleCall} />
          <Route path="/result" component={Result} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
