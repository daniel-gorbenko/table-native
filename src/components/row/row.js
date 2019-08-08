import React from 'react';

// const CustomReactMemo = (component) => {
//   const inner = {props: null, component: null};
//
//   return (props) => {
//     if(true && inner.component !== null) return inner.component;
//
//     inner.props = props;
//     inner.component = component(props);
//
//     return inner.component;
//   };
// };
//
// const Row = CustomReactMemo((props) => {
//   return (
//     <tr>{props.children}</tr>
//   );
// });

const Row = (props) => {
  return (
    <tr>{props.children}</tr>
  );
};

export default Row;
