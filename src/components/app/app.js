import React, {useState} from 'react';

import PageCreateTable from '../page-create-table/page-create-table';
import PageTable from '../page-table/page-table';

const App = (props) => {
  let [rows, setRows] = useState('');
  let [cols, setCols] = useState('');
  let [x, setX] = useState('');
  let [page, setPage] = useState('CreateTable');

  function onSubmit (e) {
    e.preventDefault();

    setPage('Table');
  }

  function onChange(e, name) {
    switch(name) {
      case 'rows': setRows(parseInt(e.target.value)); break;
      case 'cols': setCols(parseInt(e.target.value)); break;
      case 'x': setX(parseInt(e.target.value)); break;
      default: break;
    }
  }

  // ??? КАК ??? Здесь rows === 5, 6, 7, 8 ...
  const onRowAdd = () => {
    // А здесь rows === 5 всегда
    setRows(state => state + 1);
  };

  function onRowRemove() {
    setRows(state => state - 1);
  };

  switch(page) {
    case 'CreateTable':
      return <PageCreateTable
        onSubmit={onSubmit}
        onChange={onChange}
        values={{rows, cols, x}}/>;

    case 'Table':
      return <PageTable
        rows={rows}
        cols={cols}
        x={x}
        amountDigits={3}
        onRowAdd={onRowAdd}
        onRowRemove={onRowRemove}/>;

    default:
      break;
  }
};

export default App;
