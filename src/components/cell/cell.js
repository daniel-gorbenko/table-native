import React from 'react';

export default (props) => {
  return <td className={props.className}
             onClick={props.onClick}
             onMouseEnter={props.onMouseOver}
             onMouseLeave={props.onMouseOut}>
              <span className="amount">{props.value}</span>
              {props.children}
         </td>;
}
