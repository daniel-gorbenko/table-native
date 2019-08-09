import React from 'react';

import Cell from '../cell/cell';

const TableTfootCell = (props) => {
  return (
    <Cell value={props.value} />
  );
};

const TableTfootCellMemo = React.memo(TableTfootCell);

export default TableTfootCellMemo;
