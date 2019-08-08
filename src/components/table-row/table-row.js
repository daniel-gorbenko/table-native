import React from 'react';

import TableRowPercentCell from '../table-row-percent-cell/table-row-percent-cell';
import TableRowSumCell from '../table-row-sum-cell/table-row-sum-cell';

const reRenderOrNot = (prevProps, nextProps) => {
  return !nextProps.reRender;
};

const TableRow = (props) => {
  return (
    <tr>
      {props.cells.map((cell, colIndex) =>

          <TableRowPercentCell
            key={colIndex}
            rowIndex={props.index}
            colIndex={colIndex}
            getPercent={props.getPercent}
            onCellClick={props.onCellClick}
            onCellOver={props.onCellOver}
            onCellOut={props.onCellOut}
            over={cell.over}
            amount={cell.amount}
            highlight={cell.highlight}/>
        )}

        <TableRowSumCell
          index={props.index}
          onSumCellOver={props.onSumCellOver}
          onSumCellOut={props.onSumCellOut}
          onRowRemove={props.onRowRemove}
          sumCellValue={props.sumCellValue}
          />
    </tr>
  );
}

const TableRowMemo = React.memo(TableRow, reRenderOrNot);

export default TableRowMemo;
