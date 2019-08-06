import React from 'react';

import Cell from '../cell/cell';
import PercentCell from '../percent-cell/percent-cell';
import SumCell from '../sum-cell/sum-cell';
import Row from '../row/row';
import TableRow from '../table-row/table-row';

const Table = class Table extends React.Component {
  constructor(props) {
    super(props);

    this.amountDigitsIndex = props.amountDigits + 2;

    this.rowIdList = [];
    this.rowChanges = [];
    this._currentRowId = -1;

    this.state = {
      table: this.generateTableData()
    };

    this.state.sums = this.getSums(this.state.table, props.rows, props.cols);

    this.getPercent= this.getPercent.bind(this);
    this.onCellClick= this.onCellClick.bind(this);
    this.onCellOver= this.onCellOver.bind(this);
    this.onCellOut= this.onCellOut.bind(this);

    this.onSumCellOver= this.onSumCellOver.bind(this);
    this.onSumCellOut= this.onSumCellOut.bind(this);
    this.onRowRemove= this.onRowRemove.bind(this);
  }

  getNextRowId() {
    return ++this._currentRowId;
  }

  generateTableData() {
    let table = [];

    for(let i = 0; i < this.props.rows; i++) {
      table[i] = this.generateRowData(i);
      this.rowIdList[i] = this.getNextRowId();
      this.rowChanges[i] = true;
    }

    return table;
  }

  generateRowData(i) {
    let row = [];

    for(let j = 0; j < this.props.cols; j++) {
      row[j] = this.generateCellData(i, j);
    }

    return row;
  }

  generateCellData(x, y) {
    let idTemplate = 'x_y';

    return {
      id: idTemplate.replace('x', x).replace('y', y),
      amount: this.generateAmount()
    };
  }

  generateAmount() {
    return parseInt(Math.random()
                      .toString()
                      .substring(2, this.amountDigitsIndex)
                    );
  }

  getSums(table, rows, cols) {
    return {
      rows: this.getRowsSums(table, rows, cols),
      cols: this.getColsSums(table, rows, cols)
    };
  }

  getRowsSums(table, rowsCount, colsCount) {
    let rows = [];

    for(let i = 0; i < rowsCount; i++) {
      rows[i] = this.calcSumByRow(i, table, colsCount);
    }

    return rows;
  }

  getColsSums(table, rowsCount, colsCount) {
    let cols = [];

    for(let i = 0; i < colsCount; i++) {
      cols[i] = this.calcSumByCol(i, table, rowsCount);
    }

    return cols;
  }

  calcSumByRow(row, table, colsCount) {
    let tbl = table || this.state.table;

    let sumByRow = 0;

    for(let i = 0; i < colsCount; i++) {
      sumByRow += tbl[row][i].amount;
    }

    return sumByRow;
  }

  calcSumByCol(col, table, rowsCount) {
    let tbl = table || this.state.table;

    let sumByCol = 0;

    for(let i = 0; i < rowsCount; i++) {
      sumByCol += tbl[i][col].amount;
    }

    return sumByCol;
  }

  markChangedRows(row) {
    this.rowChanges[row] = true;
  }

  unmarkChangedRows() {
    this.rowChanges = this.rowChanges.map(() => false);
  }

  onCellClick(e, row, col) {
    this.markChangedRows(row);

    this.setState(state => {
      let newTableState = [...this.state.table];
      newTableState[row] = [...newTableState[row]];
      newTableState[row][col] = Object.assign({}, newTableState[row][col], {
        amount: newTableState[row][col].amount + 1
      });

      return {table: newTableState, sums: this.getSums(newTableState, this.props.rows, this.props.cols)};
    }, () => {
      this.unHiglightProcess();
      this.higlightProcess(row, col);
    });


  }

  onCellOver(e, row, col) {
    this.higlightProcess(row, col);
  }

  onCellOut(e, row, col) {
    this.unHiglightProcess();
  }

  higlightProcess(cellRow, cellCol) {
    let cellSelected = this.state.table[cellRow][cellCol];

    this.sortedCells = this.state.table.reduce((cells, row, rowIndex) => {
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

    this.sortedCells = this.sortedCells.sort((a, b) => {
      if(a.amountDiff < b.amountDiff) return -1;
      if(a.amountDiff > b.amountDiff) return 1;
      if(a.amountDiff === b.amountDiff) return 0;
    });

    this.higlighted = [];

    let sortedCellsLength = this.sortedCells.length;

    for(let selected = 0, i = 0; selected < this.props.x; i++) {
      if(sortedCellsLength === i) return;
      if(this.sortedCells[i].cell === cellSelected) continue;

      this.higlighted[selected] = this.sortedCells[i];

      this.higlightCell(this.sortedCells[i].row, this.sortedCells[i].col);
      selected++;
    }
  }

  unHiglightProcess() {
    let higlightedLength = this.higlighted.length;

    for(let i = 0; i < this.props.x; i++) {
      if(higlightedLength === i) return;
      this.unHiglightCell(this.higlighted[i].row, this.higlighted[i].col);
    }
  }

  higlightCell(row, col) {
    this.setCellHighlight(row, col, true);
  }

  unHiglightCell(row, col) {
    this.setCellHighlight(row, col, false);
  }

  setCellHighlight(row, col, light) {
    this.markChangedRows(row);

    this.setState(state => {
      state.table[row][col].higlight = light;

      return state;
    });
  }

  getPercent = (index, value) => {
    return (value / this.calcSumByRow(index, this.state.table, this.props.cols) * 100).toFixed(2);
  }

  onSumCellOver(row) {
    this.markChangedRows(row);

    this.setState(state => {
      state.table[row].forEach((cell) => {
        cell.over = true;
      });

      return {};
    });
  }

  onSumCellOut(row) {
    this.markChangedRows(row);

    this.setState(state => {
      state.table[row].forEach((cell) => {
        cell.over = false;
      });

      return {};

    });
  }

  onRowAdd = (e) => {
    e.preventDefault();

    this.setState(state => {

      let table = [...state.table];

      table[table.length] = this.generateRowData(state.table.length);
      this.rowIdList[this.rowIdList.length] = this.getNextRowId();
      this.rowChanges[this.rowChanges.length] = true;

      return {table: table, sums: this.getSums(table, table.length, this.props.cols)};
    });

    this.props.onRowAdd(e);
  }

  onRowRemove = (e, row) => {
    e.preventDefault();

    this.props.onRowRemove(e);

    this.setState(state => {

      let table = [...state.table];

      table.splice(row, 1);
      this.rowIdList.splice(row, 1);
      this.rowChanges.splice(row, 1);

      for(let i = row, l = table.length; i < l; i++) {
        this.markChangedRows(i);
      }

      return {table: table, sums: this.getSums(table, table.length, this.props.cols)};
    });
  }

  render() {
    let rows = [];

    for(let i = 0; i < this.props.rows; i++) {
      rows.push(
        <TableRow
          index={i}
          cells={this.state.table[i]}
          key={this.rowIdList[i]}
          changed={this.rowChanges[i]}

          getPercent={this.getPercent}
          onCellClick={this.onCellClick}
          onCellOver={this.onCellOver}
          onCellOut={this.onCellOut}

          onSumCellOver={this.onSumCellOver}
          onSumCellOut={this.onSumCellOut}
          onRowRemove={this.onRowRemove}
          sumCellValue={this.state.table[i].reduce((s, cell) =>  s + cell.amount, 0)}
          />
      );
    }

    return (
      <table>
        <caption>
          <h2>Сгенерированная таблица</h2>
          <a href="#" className="table-btn" onClick={this.onRowAdd}>Добавить строку</a>
        </caption>
        <thead></thead>
        <tbody>
          {rows}
        </tbody>
        <tfoot>
          <Row changed={true}>
            {this.state.sums.cols.map((sum, index) =>
              <Cell key={index} value={sum}/>
            )}
          </Row>
        </tfoot>
      </table>
    );
  }

  componentDidUpdate() {
    this.unmarkChangedRows();
  }

  componentDidMount() {
    this.unmarkChangedRows();
  }
};

export default Table;
