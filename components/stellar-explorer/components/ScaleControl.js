import React from "react";
import ControlContainer from "../assets/styled-components/ControlContainer";

class ScaleControl extends React.Component {
  decrease = () => {
    this.props.clickAction("scale", "-");
  };

  increase = () => {
    this.props.clickAction("scale", "+");
  };

  render() {
    return (
      <ControlContainer style={{ top: 0 }}>
        {this.props.universeScale.scale >
        this.props.universeScale.scaleLimitLower ? (
          <button onClick={this.decrease}>-</button>
        ) : (
          <button disabled="disabled" className="disabled">
            -
          </button>
        )}
        <p>Scale is {this.props.universeScale.scale}</p>
        {this.props.universeScale.scale <
        this.props.universeScale.scaleLimitUpper ? (
          <button onClick={this.increase}>+</button>
        ) : (
          <button disabled="disabled" className="disabled">
            +
          </button>
        )}
      </ControlContainer>
    );
  }
}

export default ScaleControl;
