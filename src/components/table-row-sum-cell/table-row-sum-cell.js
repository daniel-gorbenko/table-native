import React from 'react';

import SumCell from '../sum-cell/sum-cell';

class TableRowSumCell extends React.Component {
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
      <SumCell
        onMouseOver={(e) => this.props.onSumCellOver(this.props.index)}
        onMouseOut={(e) => this.props.onSumCellOut(this.props.index)}
        onRowRemove={(e) => this.props.onRowRemove(e, this.props.index)}
        value={this.props.sumCellValue}
        />
    );
  }
};

export default TableRowSumCell;
