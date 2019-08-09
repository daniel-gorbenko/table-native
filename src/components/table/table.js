import React, {useState, useRef, useCallback, useReducer, useMemo, useEffect} from 'react';

import PercentCell from '../percent-cell/percent-cell';
import SumCell from '../sum-cell/sum-cell';
import TableTfootRow from '../table-tfoot-row/table-tfoot-row';
import TableRow from '../table-row/table-row';

import tableReducer from './table-reducer';

function generateAmount(digits) {
  return parseInt(Math.random()
                    .toString()
                    .substring(2, digits)
                  );
}

function generateCellData(x, y, digits) {
  return {
    id: `${x}_${y}`,
    amount: generateAmount(digits)
  };
}

function unmarkChangedRows(rows) {
  return rows.map(() => false);
}

const Table = (props) => {
  let amountDigitsIndex = props.amountDigits + 2;

  let rowIdList = useRef([]);
  let rowId = useRef(-1);
  let highlighted = useRef([]);
  let changedRows = useRef([]);
  let recalculateSums = useRef(true);
  let colsSums = useRef(null);
  let [table, dispatchTable] = useReducer(tableReducer, null, generateTableData);

  if(recalculateSums.current) {
    colsSums.current = getColsSums(props.rows, props.cols, table);
  }

  useEffect(() => {
    changedRows.current = unmarkChangedRows(changedRows.current);
  });

  useEffect(() => {
    recalculateSums.current = false;
  });

  function isChangedRow(row) {
    return changedRows.current[row];
  }

  function setRecalculateSumsTo(bool) {
    recalculateSums.current = bool;
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
      row[j] = generateCellData(i, j, amountDigitsIndex);
    }

    return row;
  }

  function getColsSums(rows, colsCount, table) {
    let cols = [];

    for(let i = 0; i < colsCount; i++) {
      cols[i] = calcSumByCol(i, table, rows);
    }

    return cols;
  }

  function calcSumByRow(row, table, cols) {
    let sumByRow = 0;

    for(let i = 0; i < cols; i++) {
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

  const onRowAdd = useCallback((e) => {
    setRecalculateSumsTo(true);

    dispatchTable({
      type: 'row-add',
      payload: {
        e: e,
        rowIdList: rowIdList,
        rowData: generateRowData(table.length),
        nextRowId: getNextRowId()
      }
    });

    props.onRowAdd(e);
  }, []);

  const onRowRemove = useCallback((e, row) => {
    setRecalculateSumsTo(true);

    dispatchTable({
      type: 'row-remove',
      payload: {
        e: e,
        row: row,
        rowIdList: rowIdList,
        changedRows: changedRows
      }
    });

    props.onRowRemove(e);
  }, []);

  const onSumCellOver = useCallback((row) => {
    dispatchTable({
      type: 'sum-cell-over',
      payload: {
        row: row,
        changedRows: changedRows
      }
    });
  }, []);

  const onSumCellOut = useCallback((row) => {
    dispatchTable({
      type: 'sum-cell-out',
      payload: {
        row: row,
        changedRows: changedRows
      }
    });
  }, []);

  const onCellClick = useCallback((e, row, col) => {
    setRecalculateSumsTo(true);

    dispatchTable({
      type: 'cell-click',
      payload: {
        row: row,
        col: col,
        highlighted: highlighted,
        x: props.x,
        changedRows: changedRows
      }
    });
  }, []);

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
          <TableTfootRow cells={colsSums.current} />
        </tfoot>
      </table>
  );
};

export default Table;
