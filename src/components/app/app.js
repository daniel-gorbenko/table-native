import React from 'react';

import PageCreateTable from '../page-create-table/page-create-table';
import PageTable from '../page-table/page-table';

const App = class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      values: {
        rows: '',
        cols: '',
        x: ''
      },
      page: 'CreateTable'
    };
  }

  onSubmit = (e) => {
    e.preventDefault();

    this.togglePage('Table');
  }

  togglePage = (page) => {
    this.setState({
      page: page
    });
  }

  onChange = (e, name) => {
    this.setState({
      values: Object.assign({}, this.state.values, {
        [name]: parseInt(e.target.value)
      })
    });
  }

  onRowAdd = (e) => {
    this.setState((state, cb) => {
      return {values: Object.assign({}, state.values, {rows: state.values.rows + 1})};
    });
  }

  onRowRemove = (e) => {
    this.setState((state, cb) => {
      return {values: Object.assign({}, state.values, {rows: state.values.rows - 1})};
    });
  }

  render() {
    let page;

    switch(this.state.page) {
      case 'CreateTable': page = <PageCreateTable
        onSubmit={this.onSubmit}
        onChange={this.onChange}
        values={this.state.values}/>;
        break;
      case 'Table': page = <PageTable
        rows={this.state.values.rows}
        cols={this.state.values.cols}
        x={this.state.values.x}
        amountDigits={3}
        onRowAdd={this.onRowAdd}
        onRowRemove={this.onRowRemove}
        />;
        break;
      default: break;
    }

    return page;
  }
};

export default App;
