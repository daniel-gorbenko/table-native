import React from 'react';

import Table from '../table/table';

const PageTable = (props) => {
  return (
    <Table cols={props.cols} rows={props.rows} x={props.x}
      amountDigits={props.amountDigits}
      onRowAdd={props.onRowAdd}
      onRowRemove={props.onRowRemove}/>
  );
};

export default PageTable;
