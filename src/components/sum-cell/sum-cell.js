import Cell from '../cell/cell';

import React from 'react';

const SumCell = (props) => {
  return (
    <Cell className="sum_cell" value={props.value}
      onMouseOver={props.onMouseOver}
      onMouseOut={props.onMouseOut}>
      <span onClick={props.onRowRemove} className="delete_row"><span>Удалить</span></span>
    </Cell>
  );
}

export default SumCell;
