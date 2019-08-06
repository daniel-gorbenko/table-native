import React from 'react';

class Row extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.changed;
  }

  render() {
    return (
      <tr>{this.props.children}</tr>
    );
  }
}

// const Row = (props) => {
//   return (
//     <tr>{props.children}</tr>
//   );
// };

export default Row;
