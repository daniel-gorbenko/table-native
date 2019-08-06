import React from 'react';

const PageCreateTable = (props) => {
  return (
      <div>
        <h1>Построить таблицу</h1>

        <form onSubmit={props.onSubmit}>
          <input onChange={(e) => props.onChange(e, 'rows')} value={props.values.rows} type="number" placeholder="Введите количество строк" />
          <input onChange={(e) => props.onChange(e, 'cols')} value={props.values.cols} type="number" placeholder="Введите количество столбцов" />
          <input onChange={(e) => props.onChange(e, 'x')} value={props.values.x} type="number" placeholder="Введите число X" />

          <input type="submit" value="Построить" />
        </form>
      </div>
    );
};

export default PageCreateTable;
