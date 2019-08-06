import React from 'react';

import PercentCell from '../percent-cell/percent-cell';

class TableRowPercentCell extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps) {
    if(nextProps.higlight === this.props.higlight
      && nextProps.amount === this.props.amount
      && nextProps.over === this.props.over
    )  {
      return false;
    }

    return true;
  }

  render() {
    return (
      <PercentCell
        percentValue={this.props.getPercent(this.props.rowIndex, this.props.amount)}
        onClick={(e) => this.props.onCellClick(e, this.props.rowIndex, this.props.colIndex)}
        onMouseOver={(e) => this.props.onCellOver(e, this.props.rowIndex, this.props.colIndex)}
        onMouseOut={(e) => this.props.onCellOut(e, this.props.rowIndex, this.props.colIndex)}
        over={this.props.over}
        value={this.props.amount}
        higlight={this.props.higlight}
        />
    );
  }
};

export default TableRowPercentCell;
