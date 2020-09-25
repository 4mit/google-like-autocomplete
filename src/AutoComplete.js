import React, { Component } from "react";
import PropTypes from "prop-types";
import { scrollDown, scrollUp } from "./ScrollDown";
import filterText from "./Utility";
export class Autocomplete extends Component {
  constructor(props) {
    super();
    console.log("onChanges", props);
  }
  static propTypes = {
    options: PropTypes.instanceOf(Array)
  };
  state = {
    activeOption: 0,
    filteredOptions: [],
    showOptions: false,
    userInput: "",
    scrollAmount: 0
  };

  onChange = (e) => {
    const { options } = this.props;
    const userInput = e.currentTarget.value;
    let filteredOptions = filterText(options, userInput);
    this.setState({
      activeOption: 0,
      filteredOptions,
      showOptions: true,
      userInput: e.currentTarget.value,
      scrollAmount: 0
    });
  };

  onClick = (e) => {
    this.setState({
      activeOption: 0,
      filteredOptions: [],
      showOptions: false,
      userInput: e.currentTarget.innerText
    });
  };
  onKeyDown = (e) => {
    const { activeOption, filteredOptions } = this.state;

    // enter
    if (e.keyCode === 13) {
      this.setState({
        activeOption: 0,
        showOptions: false,
        userInput: filteredOptions[activeOption]
      });
      // arrow up
    } else if (e.keyCode === 38) {
      if (activeOption === 0) {
        return;
      }
      this.setState({ activeOption: activeOption - 1 });
      scrollDown(this.state.scrollAmount, "options").then((amount) => {
        this.setState({
          scrollAmount: amount
        });
      });
      console.log("activeOption outside", activeOption);
      // arrow down
    } else if (e.keyCode === 40) {
      if (activeOption === filteredOptions.length - 1) {
        console.log("activeOption", activeOption);
        return;
      }
      this.setState({ activeOption: activeOption + 1 });
      console.log("activeOption outside", activeOption);
      scrollUp(this.state.scrollAmount, "options").then((amount) => {
        this.setState({
          scrollAmount: amount
        });
      });
    }

    console.log(activeOption, filteredOptions);
  };

  render() {
    const {
      onChange,
      onClick,
      onKeyDown,
      state: { activeOption, filteredOptions, showOptions, userInput }
    } = this;
    let optionList;
    //console.log("fff", filteredOptions);
    if (showOptions && userInput) {
      if (filteredOptions.length) {
        optionList = (
          <ul className="options">
            {filteredOptions.map((optionName, index) => {
              let className;
              if (index === activeOption) {
                className = "option-active";
              }
              return (
                <li className={className} key={optionName.id} onClick={onClick}>
                  <div className="card">
                    <section className="title">
                      <strong>{optionName.id}</strong>
                    </section>
                    <section className="avatar-name">
                      <strong>
                        <i>{optionName.name}</i>
                      </strong>
                    </section>
                    <section className="found-in">
                      <ul>
                        {optionName.foundIn &&
                          optionName.foundIn.map((f) => (
                            <li key={"list_" + f}>{f}</li>
                          ))}
                      </ul>
                    </section>
                    <section className="address">{optionName.address}</section>
                  </div>
                </li>
              );
            })}
          </ul>
        );
      } else {
        optionList = (
          <div className="no-options">
            <em>No user found!</em>
          </div>
        );
      }
    }
    return (
      <React.Fragment>
        <div className="search">
          <div className="input-wrapper">
            <input type="submit" value="" className="search-btn" />
            <input
              type="text"
              className="search-box"
              onChange={onChange}
              onKeyDown={onKeyDown}
              value={userInput}
              placeholder="Search users by Id,adddress nam..."
            />
          </div>
        </div>
        {optionList}
      </React.Fragment>
    );
  }
}

export default Autocomplete;
