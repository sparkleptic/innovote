import React, { Component } from "react";
import { Dropdown, Button, NavItem } from "react-materialize";

class AttendanceDropdown extends Component {
  render() {
    return (
      //   <div class="dropdown">
      //     <button
      //       className="btn btn-secondary dropdown-toggle attendance"
      //       type="button"
      //       data-toggle="dropdown"
      //       id="attendanceDropdownButton"
      //       aria-haspopup="true"
      //       aria-expanded="false"
      //     >
      //       <i class="fa fa-address-book" />
      //     </button>
      //     <div class="dropdown-menu" aria-labelledby="attendanceDropdownButton">
      //       <p class="dropdown-item">In person</p>
      //       <p class="dropdown-item">In person and voting paper</p>
      //       <p class="dropdown-item">Voting Paper</p>
      //       <p class="dropdown-item">Proxy</p>
      //       <p class="dropdown-item">Apology</p>
      //     </div>
      //   </div>
      <Dropdown trigger={<Button>Drop me!</Button>}>
        <NavItem>one</NavItem>
        <NavItem>two</NavItem>
        <NavItem divider />
        <NavItem>three</NavItem>
      </Dropdown>
    );
  }
}

export default AttendanceDropdown;
