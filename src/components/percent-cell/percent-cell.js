import Cell from '../cell/cell';

import React from 'react';

class PercentCell extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let classes = [
      this.props.higlight ? 'higlight' : '',
      this.props.over ? 'over' : ''
    ];

    let className = classes.join(' ');

    let style = {
      height: this.props.percentValue + '%'
    };

    return (
      <Cell className={className} value={this.props.value}
      onClick={this.props.onClick}
      onMouseOver={this.props.onMouseOver}
      onMouseOut={this.props.onMouseOut}>
        <span className="percent_value">{this.props.percentValue}%</span>
        <div className="percent" style={style}></div>
      </Cell>
    );
  }
};

export default PercentCell;
