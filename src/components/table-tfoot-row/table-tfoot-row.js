import React from 'react';

import Row from '../row/row';
import TableTfootCell from '../table-tfoot-cell/table-tfoot-cell';

const TableTfootRow = (props) => {
  return (
    <Row>
      {props.cells.map((sum, index) =>
        <TableTfootCell key={index} value={sum}/>
      )}
    </Row>
  );
};

const TableTfootRowMemo = React.memo(TableTfootRow);

export default TableTfootRowMemo;
