import React from 'react';

// MUTABLE
const onCellClick = (state, {row, col, changedRows}) => {
  markRowAsChanged(changedRows, row);

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

  let sortedCellsLength = sortedCells.length;

  for(let selected = 0, i = 0; selected < x; i++) {
    if(sortedCellsLength === i) break;
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

  highlighted.current = [];

  return [...state];
}

// MUTABLE
const setCellsOver = (state, {row, changedRows}) => {
  markRowAsChanged(changedRows, row);

  state[row].forEach((cell) => {
    cell.over = true;
  });

  return [...state];
};

// MUTABLE
const setCellsOut = (state, {row, changedRows}) => {
  markRowAsChanged(changedRows, row);

  state[row].forEach((cell) => {
    cell.over = false;
  });

  return [...state];
};

// MUTABLE
const rowRemove = (state, {e, row, rowIdList, changedRows}) => {
  for(let i = row, l = state.length; i < l; i++) {
    markRowAsChanged(changedRows, i);
  }

  const returnState = [...state.slice(0, row), ...state.slice(row + 1)];
  rowIdList.current.splice(row, 1);
  // calcSums(props.rows - 1, props.cols, table);

  return returnState;
};

// MUTABLE
const rowAdd = (state, {e, rowIdList, nextRowId, rowData}) => {
  const returnState = [...state, rowData];
  rowIdList.current[rowIdList.current.length] = nextRowId;

  return returnState;
  // calcSums(props.rows + 1, props.cols, table);
};

export default (state, action) => {
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

    case 'row-add':
      return rowAdd(state, action.payload);

    case 'row-remove':
      return rowRemove(state, action.payload);

    default:
      throw new Error('action.type should be exist');
  }
};
