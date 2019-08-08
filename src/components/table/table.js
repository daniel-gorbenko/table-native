import React, {useState, useRef, useCallback, useReducer, useMemo, useEffect} from 'react';

import Cell from '../cell/cell';
import PercentCell from '../percent-cell/percent-cell';
import SumCell from '../sum-cell/sum-cell';
import Row from '../row/row';
import TableRow from '../table-row/table-row';

// MUTABLE
const onCellClick = (state, {row, col}) => {
  state[row][col].amount += 1;

  return [...state];
};

// MUTABLE
const markRowAsChanged = (changedRows, row) => {
  changedRows.current[row] = true;
};

// MUTABLE
const highlightProcess = (state, {row, col, highlighted, x, changedRows}) => {
  let cellSelected = state[row][col];

  let sortedCells = state.reduce((cells, row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      cells.push({
        row: rowIndex,
        col: colIndex,
        amountDiff: Math.abs(cellSelected.amount - cell.amount),
        cell: cell
      });
    });

    return cells;
  }, []);

  sortedCells = sortedCells.sort((a, b) => {
    if(a.amountDiff < b.amountDiff) return -1;
    if(a.amountDiff > b.amountDiff) return 1;
    if(a.amountDiff === b.amountDiff) return 0;
  });

  highlighted.current = [];

  let sortedCellsLength = sortedCells.length;

  for(let selected = 0, i = 0; selected < x; i++) {
    if(sortedCellsLength === i) return;
    if(sortedCells[i].cell === cellSelected) continue;

    highlighted.current[selected] = sortedCells[i];

    markRowAsChanged(changedRows, sortedCells[i].row);
    state[sortedCells[i].row][sortedCells[i].col].highlight = true;
    selected++;
  }

  return [...state];
}

// MUTABLE
const unhighlightProcess = (state, {highlighted, x, changedRows}) => {
  let highlightedLength = highlighted.current.length;

  for(let i = 0; i < x; i++) {
    if(highlightedLength === i) break;

    markRowAsChanged(changedRows, highlighted.current[i].row);
    state[highlighted.current[i].row][highlighted.current[i].col].highlight = false;
  }

  return [...state];
}

// MUTABLE
const setCellsOver = (state, {row}) => {
  state[row].forEach((cell) => {
    cell.over = true;
  });

  return [...state];
};

// MUTABLE
const setCellsOut = (state, {row}) => {
  state[row].forEach((cell) => {
    cell.over = false;
  });

  return [...state];
};

// MUTABLE
const rowRemove = (state, {e, row, rowIdList}) => {

  console.log('console');
  // let newState = [...state.slice(0, row), ...state.slice(row + 1)];
  // rowIdList.current.splice(row, 1);
  // calcSums(props.rows - 1, props.cols, table);

  // onRowRemove(e);
  return [1, 2];
};

const reducer = (state, action) => {
  switch(action.type) {
    case 'cell-click':
      return highlightProcess(
        unhighlightProcess(
          onCellClick(state, action.payload), action.payload
        ), action.payload
      );

    case 'cell-over':
      return highlightProcess(
        unhighlightProcess(state, action.payload), action.payload
      );

    case 'cell-out':
      return unhighlightProcess(state, action.payload);

    case 'sum-cell-over':
      return setCellsOver(state, action.payload);

    case 'sum-cell-out':
      return setCellsOut(state, action.payload);

    // case 'row-add':
      // return rowAdd(state, action.payload);

    case 'row-remove':
    debugger
      return rowRemove(state, action.payload);

    default:
      throw new Error('action.type should be exist');
  }
};

const Table = (props) => {
  let amountDigitsIndex = props.amountDigits + 2;

  let rowIdList = useRef([]);
  let rowId = useRef(-1);
  let highlighted = useRef([]);
  let sortedCells = useRef([]);
  let changedRows = useRef([]);
  let [table, dispatchTable] = useReducer(reducer, null, generateTableData);
  let [colsSums, setColsSums] = useState(() => {
    return getColsSums(props.rows, props.cols, table);
  });

  const tableChangedStatus = useRef(false);
  const tableChanged = tableChangedStatus.current = useMemo(() => {
    return !tableChangedStatus.current;
  }, [table]);

  useEffect(() => {
    changedRows.current = unmarkChangedRows(changedRows.current);
  });

  function isChangedRow(row) {
    return changedRows.current[row];
  }

  function unmarkChangedRows(rows) {
    return rows.map(() => false);
  }

  function getNextRowId() {
    return ++rowId.current;
  }

  function generateTableData() {
    let table = [];
    let isFirstRender = rowId.current === -1;

    for(let i = 0; i < props.rows; i++) {
      table[i] = generateRowData(i);

      if(isFirstRender) {
        rowId.current = rowIdList.current[i] = getNextRowId();
      }
    }

    return table;
  }

  function generateRowData(i) {
    let row = [];

    for(let j = 0; j < props.cols; j++) {
      row[j] = generateCellData(i, j);
    }

    return row;
  }

  function generateCellData(x, y) {
    return {
      id: `${x}${y}`,
      amount: generateAmount()
    };
  }

  function generateAmount() {
    return parseInt(Math.random()
                      .toString()
                      .substring(2, amountDigitsIndex)
                    );
  }

  function calcSums(rows, cols, table) {
    setColsSums(getColsSums(rows, cols, table));
  }

  function getColsSums(rows, colsCount, table) {
    let cols = [];

    for(let i = 0; i < colsCount; i++) {
      cols[i] = calcSumByCol(i, table, rows);
    }

    return cols;
  }

  function calcSumByRow(row) {
    let sumByRow = 0;

    for(let i = 0; i < props.cols; i++) {
      sumByRow += table[row][i].amount;
    }

    return sumByRow;
  }

  function calcSumByCol(col, table, rows) {
    let sumByCol = 0;

    for(let i = 0; i < rows; i++) {
      sumByCol += table[i][col].amount;
    }

    return sumByCol;
  }

  const getPercent = useCallback((index, value) => {
    return (value / calcSumByRow(index, table, props.cols) * 100).toFixed(2);
  }, [props.rows, props.cols]);
  // }, [table, props.rows, props.cols]);

  function onRowAdd(e, row) {
    table[table.length] = generateRowData(table.length);
    rowIdList.current[rowIdList.current.length] = getNextRowId();

    dispatchTable(table);
    calcSums(props.rows + 1, props.cols, table);

    props.onRowAdd(e);
  }

  const onRowRemove = useCallback((e, row) => {
    dispatchTable({
      type: 'row-remove',
      payload: {
        e: e,
        row: row,
        rowIdList: rowIdList
      }
    });

    // props.onRowRemove();
  }, []);

  const onSumCellOver = useCallback((row) => {
    markRowAsChanged(changedRows, row);

    dispatchTable({
      type: 'sum-cell-over',
      payload: {
        row: row
      }
    });
  }, []);

  const onSumCellOut = useCallback((row) => {
    markRowAsChanged(changedRows, row);

    dispatchTable({
      type: 'sum-cell-out',
      payload: {
        row: row
      }
    });
  }, []);

  const onCellClick = useCallback((e, row, col) => {
    markRowAsChanged(changedRows, row);

    dispatchTable({
      type: 'cell-click',
      payload: {
        e: e,
        row: row,
        col: col,
        x: props.x,
        highlighted: highlighted,
        changedRows: changedRows
      }
    });
  }, [props.x]);

  const onCellOver = useCallback((e, row, col) => {
    dispatchTable({
      type: 'cell-over',
      payload: {
        e: e,
        row: row,
        col: col,
        x: props.x,
        highlighted: highlighted,
        changedRows: changedRows
      }
    });
  }, [props.x]);

  const onCellOut = useCallback((e, row, col) => {
    dispatchTable({
      type: 'cell-out',
      payload: {
        e: e,
        row: row,
        col: col,
        x: props.x,
        highlighted: highlighted,
        changedRows: changedRows
      }
    });
  }, [props.x]);

  let rows = [];

  for(let i = 0; i < props.rows; i++) {
      rows.push(
        <TableRow
          index={i}
          cells={table[i]}
          key={rowIdList.current[i]}

          reRender={isChangedRow(i)}

          getPercent={getPercent}
          onCellClick={onCellClick}
          onCellOver={onCellOver}
          onCellOut={onCellOut}

          onSumCellOver={onSumCellOver}
          onSumCellOut={onSumCellOut}
          onRowRemove={onRowRemove}
          sumCellValue={table[i].reduce((s, cell) =>  s + cell.amount, 0)}
          />
      );
    }

  return (
    <table>
        <caption>
          <h2>Сгенерированная таблица</h2>
          <button className="table-btn" onClick={onRowAdd}>Добавить строку</button>
        </caption>
        <thead></thead>
        <tbody>
          {rows}
        </tbody>
        <tfoot>
          <Row>
            {colsSums.map((sum, index) =>
              <Cell key={index} value={sum}/>
            )}
          </Row>
        </tfoot>
      </table>
  );
};

export default Table;
