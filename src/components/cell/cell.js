import React from 'react';

const Cell = (props) => {
  return <td className={props.className}
             onClick={props.onClick}
             onMouseEnter={props.onMouseOver}
             onMouseLeave={props.onMouseOut}>
              <span className="amount">{props.value}</span>
              {props.children}
         </td>;
};

export default  Cell;
