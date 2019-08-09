import React from 'react';

import SumCell from '../sum-cell/sum-cell';

const TableRowSumCell = (props) => {
  return (
    <SumCell
      onMouseOver={(e) => props.onSumCellOver(props.index)}
      onMouseOut={(e) => props.onSumCellOut(props.index)}
      onRowRemove={(e) => props.onRowRemove(e, props.index)}
      value={props.sumCellValue}
      />
  );
};

const TableRowSumCellMemo = React.memo(TableRowSumCell);

export default TableRowSumCellMemo;
