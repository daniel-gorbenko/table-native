import React, {useState, useRef} from 'react';

import Cell from '../cell/cell';
import PercentCell from '../percent-cell/percent-cell';
import SumCell from '../sum-cell/sum-cell';
import Row from '../row/row';

const Table = (props) => {
  let amountDigitsIndex = props.amountDigits + 2;

  let rowIdList = useRef([]);
  let rowId = useRef(-1);
  let higlighted = useRef([]);
  let sortedCells = useRef([]);
  let [table, setTable] = useState(generateTableData);
  let [colsSums, setColsSums] = useState(getColsSums(props.rows, props.cols, table));

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

  function getPercent(index, value) {
    return (value / calcSumByRow(index) * 100).toFixed(2);
  }

  function onRowRemove(e, row) {
    e.preventDefault();

    table.splice(row, 1);
    rowIdList.current.splice(row, 1);

    setTable(table);
    calcSums(props.rows - 1, props.cols, table);

    props.onRowRemove(e);
  }

  function onRowAdd(e, row) {
    table[table.length] = generateRowData(table.length);
    rowIdList.current[rowIdList.current.length] = getNextRowId();

    setTable(table);
    calcSums(props.rows + 1, props.cols, table);

    props.onRowAdd(e);
  }

  function onSumCellOver(row) {
    setTable(table => {
      table[row].forEach((cell) => {
        cell.over = true;
      });

      return [...table];
    });
  }

  function onSumCellOut(row) {
    setTable(table => {
      table[row].forEach((cell) => {
        cell.over = false;
      });

      return [...table];
    });
  }

  function onCellClick(e, row, col) {
    setTable(table => {
      table[row][col].amount += 1;

      calcSums(props.rows, props.cols, table);
      unHiglightProcess();
      higlightProcess(row, col);

      return [...table];
    });
  }

  function onCellOver(e, row, col) {
    higlightProcess(row, col);
  }

  function onCellOut(e, row, col) {
    unHiglightProcess();
  }

  function higlightProcess(cellRow, cellCol) {
    let cellSelected = table[cellRow][cellCol];

    sortedCells.current = table.reduce((cells, row, rowIndex) => {
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

    sortedCells.current = sortedCells.current.sort((a, b) => {
      if(a.amountDiff < b.amountDiff) return -1;
      if(a.amountDiff > b.amountDiff) return 1;
      if(a.amountDiff === b.amountDiff) return 0;
    });

    higlighted.current = [];

    let sortedCellsLength = sortedCells.current.length;

    for(let selected = 0, i = 0; selected < props.x; i++) {
      if(sortedCellsLength === i) return;

      if(sortedCells.current[i].cell === cellSelected) continue;

      higlighted.current[selected] = sortedCells.current[i];

      higlightCell(sortedCells.current[i].row, sortedCells.current[i].col);
      selected++;
    }
  }

  function unHiglightProcess() {
    let higlightedLength = higlighted.current.length;

    for(let i = 0; i < props.x; i++) {
      if(higlightedLength === i) return;

      unHiglightCell(higlighted.current[i].row, higlighted.current[i].col);
    }
  }

  function higlightCell(row, col) {
    setCellHighlight(row, col, true);
  }

  function unHiglightCell(row, col) {
    setCellHighlight(row, col, false);
  }

  function setCellHighlight(row, col, light) {
    setTable(table => {
      table[row][col].higlight = light;

      return [...table];
    });
  }

  let rows = [];

  for(let i = 0; i < props.rows; i++) {
    rows.push(
      <Row key={rowIdList.current[i]}>
        {table[i].map((cell, colIndex) =>
          <PercentCell
            key={colIndex}
            percentValue={getPercent(i, cell.amount)}
            onClick={(e) => onCellClick(e, i, colIndex)}
            onMouseOver={(e) => onCellOver(e, i, colIndex)}
            onMouseOut={(e) => onCellOut(e, i, colIndex)}
            over={cell.over}
            value={cell.amount}
            higlight={cell.higlight}/>
        )}
        <SumCell
          onMouseOver={(e) => onSumCellOver(i)}
          onMouseOut={(e) => onSumCellOut(i)}
          onRowRemove={(e) => onRowRemove(e, i)}
          value={table[i].reduce((s, cell) =>  s + cell.amount, 0)}/>
      </Row>
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
