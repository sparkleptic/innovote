import React, { Component } from "react";
import { Dropdown, Button, Icon } from "react-materialize";

class VoteDropdown extends Component {
  render() {
    return (
      <div className={this.props.className}>
        <div className="vote-group">
          <p>
            <input
              name={this.props.name}
              className="yes"
              type="radio"
              value="yes"
              id={this.props.YesId}
              checked={this.props.checkedYes}
              onChange={this.props.onChangeYes}
            />
            <label htmlFor={this.props.YesId}>Y</label>
          </p>
          <p>
            <input
              name={this.props.name}
              className="no"
              type="radio"
              value="no"
              id={this.props.NoId}
              checked={this.props.checkedNo}
              onChange={this.props.onChangeNo}
            />
            <label htmlFor={this.props.NoId}>N</label>
          </p>
          <p>
            <input
              name={this.props.name}
              className="abstain"
              type="radio"
              value="abstain"
              id={this.props.AbsId}
              checked={this.props.checkedAbs}
              onChange={this.props.onChangeAbs}
            />
            <label htmlFor={this.props.AbsId}>A</label>
          </p>
        </div>

        <Dropdown
          trigger={
            <Button className={this.props.Alt}>
              Alt <Icon>arrow_drop_down</Icon>
            </Button>
          }
        >
          {this.props.alternatives}
        </Dropdown>
      </div>
    );
  }
}

export default VoteDropdown;
