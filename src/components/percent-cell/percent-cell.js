import Cell from '../cell/cell';

import React from 'react';

const PercenterCell = (props) => {
  let className = [
    props.higlight ? 'higlight' : '',
    props.over ? 'over' : ''
  ].join(' ');

  let style = {
    height: `${props.percentValue}%`
  };

  return (
    <Cell className={className} value={props.value}
    onClick={props.onClick}
    onMouseOver={props.onMouseOver}
    onMouseOut={props.onMouseOut}>
      <span className="percent_value">{props.percentValue}%</span>
      <div className="percent" style={style}></div>
    </Cell>
  );
}

export default PercenterCell;

//   shouldComponentUpdate(nextProps, nextState) {
//     if(nextProps.higlight === this.props.higlight
//       && nextProps.value === this.props.value
//       && nextProps.percentValue === this.props.percentValue
//       && nextProps.over === this.props.over
//     )  {
//       return false;
//     }
//
//     return true;
//   }
