import React from 'react';

import TableRowPercentCell from '../table-row-percent-cell/table-row-percent-cell';
import TableRowSumCell from '../table-row-sum-cell/table-row-sum-cell';

class TableRow extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.changed;
  }

  render() {
    return (
      <tr>
        {this.props.cells.map((cell, colIndex) =>

            <TableRowPercentCell
              key={colIndex}
              rowIndex={this.props.index}
              colIndex={colIndex}
              getPercent={this.props.getPercent}
              onCellClick={this.props.onCellClick}
              onCellOver={this.props.onCellOver}
              onCellOut={this.props.onCellOut}
              over={cell.over}
              amount={cell.amount}
              higlight={cell.higlight}/>
          )}

          <TableRowSumCell
            index={this.props.index}
            onSumCellOver={this.props.onSumCellOver}
            onSumCellOut={this.props.onSumCellOut}
            onRowRemove={this.props.onRowRemove}
            sumCellValue={this.props.sumCellValue}
            />
      </tr>
    );
  }
}

export default TableRow;
