import React from 'react';

import PercentCell from '../percent-cell/percent-cell';

const TableRowPercentCell = (props) => {
  return (
    <PercentCell
      percentValue={props.getPercent(props.rowIndex, props.amount)}
      onClick={(e) => props.onCellClick(e, props.rowIndex, props.colIndex)}
      onMouseOver={(e) => props.onCellOver(e, props.rowIndex, props.colIndex)}
      onMouseOut={(e) => props.onCellOut(e, props.rowIndex, props.colIndex)}
      over={props.over}
      value={props.amount}
      highlight={props.highlight}
      />
  );
};

const TableRowPercentCellMemo = React.memo(TableRowPercentCell);

export default TableRowPercentCellMemo;
