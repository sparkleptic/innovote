import React, { Component } from "react";
import { Dropdown, Button, Icon } from "react-materialize";

class Attendance extends Component {
  render() {
    return (
      <Dropdown
        trigger={
          <Button className="attendance-dropdown">
            <Icon>person</Icon>
            <Icon className="arrow-down">arrow_drop_down</Icon>
          </Button>
        }
      >
        <p>In person</p>
        <p>In person and voting paper</p>
        <p>Voting Paper</p>
        <p>Proxy</p>
        <p>Apology</p>
      </Dropdown>
    );
  }
}

export default Attendance;
