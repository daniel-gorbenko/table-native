
class State {
  static get(parentState) {
    let F = function () {};
    F.prototype = parentState;
    F.prototype.constructor = F;

    return new F();
  }
}

class Template {
  static template(template, data) {
    return Object.keys(data).reduce((template, key) => {
      return template.replace(new RegExp("%%\\s*" + key + "\\s*%%", 'g'), data[key]);
    }, template);
  }

  static createRootElement(template) {
    let tmp = document.createElement('template');

    tmp.innerHTML = template;
    return tmp.content.firstElementChild;
  }
}

class Component {
  constructor(options) {
    this.template = options.template;
    this.container = options.container;
    this.className = options.className || null;
    this.data = options.data || {};
    this.optional = options.optional || {};

    this.state = State.get(options.state || {});

    this.events = options.events || {};

    this.initEl();
    this.initEvents();
    this.initState();
  }

  initEl() {
    this.el = Template.createRootElement(this.template);
    this.innerTemplate = this.el.innerHTML;

    if(this.className) this.addClassName(this.className);
  }

  initEvents() {
    Object.keys(this.events).forEach((type) => {
      this.events[type].forEach((eventHandler) => {
        this.el.addEventListener(type, (e) => {
          eventHandler(e, this);
        });
      })
    });
  }

  prepareData() {
    return Object.keys(this.data).reduce((preparedData, key) => {
        preparedData[key] = (typeof this.data[key] === 'function')
          ? this.data[key]()
          : this.data[key];

        return preparedData;
    }, {});
  }

  initState() {}

  destroyEl() {
    this.container.removeChild(this.el);
  }

  addClassName(className) {
    this.el.className += ' ' + className;
  }

  removeClassName(className) {
    this.el.className = this.el.className
      .replace(new RegExp("\\s+" + className + "\\s+"), '')
      .replace(new RegExp("\\s+" + className + ""), '')
      .replace(new RegExp("" + className + "\\s+"), '')
      .replace(new RegExp("" + className + ""), '');
  }
}

class Button extends Component {
  constructor(options) {
    super(options);
  }

  render() {
    this.refresh();
  }

  refresh() {
    this.container.innerHTML = '';
    this.container.appendChild(this.el);
  }
}

class Cell extends Component {
  constructor(options) {
    super(options);
  }

  render() {
    this.container.appendChild(this.el);
    this.refresh();
  }

  refresh() {
    this.el.innerHTML = Template.template(this.innerTemplate, this.prepareData(this.data));

    if(this.data.higlight) {
      if(this.data.higlight()) this.addClassName('higlight');
      if(!this.data.higlight()) this.removeClassName('higlight');
    }
  }
}

class DeleteRowSpan extends Component {
  constructor(options) {
    super(options);
  }

  render() {
    this.container.appendChild(this.el);
    this.refresh();
  }

  refresh() {
    this.el.innerHTML = Template.template(this.innerTemplate, this.prepareData(this.data));
  }
}

class SumCell extends Component {
  constructor(options) {
    super(options);
  }

  render() {
    this.container.appendChild(this.el);

    this.refresh();
  }

  refresh() {
    this.el.innerHTML = Template.template(this.innerTemplate, this.prepareData(this.data));

    this.deleteRowSpan = new DeleteRowSpan({
      container: this.el.getElementsByClassName('delete_row')[0],
      template: document.getElementById('template-delete_row').innerHTML,
      state: this.state,

      events: {
        'click': [(e) => this.state.onRowRemove(e, this.optional.row)]
      },
      data: {},
      optional: {cell: this}
    });

    this.deleteRowSpan.render();
  }
}

class Row extends Component {
  constructor(options) {
    super(options);

    this.cells = [];
    this.sumCell = [];
  }

  getPercent(index) {
    return (this.optional.row[index].amount / this.sumCell.data.amount() * 100).toFixed(2);
  }

  render() {
    this.container.appendChild(this.el);

    for(let i = 0; i < this.optional.cols; i++) {
      this.cells[i] = new Cell({
        container: this.el,
        template: document.getElementById('template-cell').innerHTML,

        events: {
          'click': [this.state.onCellClick],
          'mouseover': [this.state.onCellOver],
          'mouseout': [this.state.onCellOut],
          'select': [this.state.onCellSelect]
        },
        data: {
          amount: () => this.optional.row[i].amount,
          higlight: () => this.optional.row[i].higlight,
          percent: () => this.getPercent(i)
        },
        optional: {cell: this.optional.row[i], row: this}
      });

    }

    this.sumCell = new SumCell({
      container: this.el,
      className: 'sum_cell',
      template: document.getElementById('template-sum_cell').innerHTML,
      state: this.state,

      events: {
        'mouseover': [this.state.onSumCellOver],
        'mouseout': [this.state.onSumCellOut],
        'select': [this.state.onCellSelect]
      },
      data: {
        amount: () => this.optional.row.reduce((s, cell) =>  s + cell.amount, 0)
      },
      optional: {row: this}
    });

    for(let i = 0; i < this.optional.cols; i++) {
      this.cells[i].render();
    }

    this.sumCell.render();
  }

  refresh() {
    for(let i = 0; i < this.optional.cols; i++) {
      this.cells[i].refresh();
    }

    this.sumCell.refresh();
  }
}

class SumRow extends Component {
  constructor(options) {
    super(options);

    this.cells = [];
  }

  render() {
    this.container.appendChild(this.el);

    for(let i = 0; i < this.optional.cols; i++) {
      this.cells[i] = new Cell({
        element: 'td',
        container: this.el,
        template: document.getElementById('template-cell').innerHTML,

        data: {amount: () => this.optional.sums[i]}
      });

      this.cells[i].render();
    }
  }

  refresh() {
    for(let i = 0; i < this.optional.cols; i++) {
      this.cells[i].refresh();
    }
  }
}

class Table extends Component {
  constructor(options) {
    super(options);

    if(options.x > (options.rows * options.cols)) {
      alert("Число X больше общего количества ячеек. Пожалуйста, установите меньшее значение.");

      throw new Error("X is bigger than count of cells. Please set it lower than count of cells");
    }

    this.rows = options.rows;
    this.cols = options.cols;
    this.x = options.x;
    this.amountDigitsIndex = options.amountDigits + 2;

    this.table = this.generateTableData();
    this.sums = {rows: [], cols: []};

    this.calcSums();
    this.initDOM();

    this.comp_rows = [];
  }

  initDOM() {
    this.dom = {
      thead: this.el.getElementsByTagName('thead')[0],
      button_container: this.el.getElementsByClassName('button_cell')[0],
      tbody: this.el.getElementsByTagName('tbody')[0],
      tfoot: this.el.getElementsByTagName('tfoot')[0]
    };
  }

  calcSums() {
    this.sums.rows.splice(0, this.sums.rows.length).push.apply(this.sums.rows, this.getRowsSums());
    this.sums.cols.splice(0, this.sums.cols.length).push.apply(this.sums.cols, this.getColsSums());
  }

  generateTableData() {
    let table = [];

    for(let i = 0; i < this.rows; i++) {
      table[i] = this.generateRowData(i);
    }

    return table;
  }

  generateRowData(i) {
    let row = [];

    for(let j = 0; j < this.cols; j++) {
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

  getRowsSums() {
    let rows = [];

    for(let i = 0; i < this.rows; i++) {
      rows[i] = this.calcSumByRow(i);
    }

    return rows;
  }

  getColsSums() {
    let cols = [];

    for(let i = 0; i < this.cols; i++) {
      cols[i] = this.calcSumByCol(i);
    }

    return cols;
  }

  getSumsByCell(row, col) {
    return {
      row: this.calcSumByRow(row),
      col: this.calcSumByCol(col)
    }
  }

  calcSumByRow(row) {
    let sumByRow = 0;

    for(let i = 0; i < this.cols; i++) {
      sumByRow += this.table[row][i].amount;
    }

    return sumByRow;
  }

  calcSumByCol(col) {
    let sumByCol = 0;

    for(let i = 0; i < this.rows; i++) {
      sumByCol += this.table[i][col].amount;
    }

    return sumByCol;
  }

  initState() {
    this.state.onCellClick = this.onCellClick.bind(this);
    this.state.onCellOver = this.onCellOver.bind(this);
    this.state.onCellOut = this.onCellOut.bind(this);
    this.state.onSumCellOver = this.onSumCellOver.bind(this);
    this.state.onSumCellOut = this.onSumCellOut.bind(this);
    this.state.onCellSelect = this.onCellSelect.bind(this);
    this.state.onRowRemove = this.onRowRemove.bind(this);
  }

  onCellSelect(e, that) {
    e.preventDefault();
  }

  onCellClick(e, that) {
    that.optional.cell.amount++;
    that.refresh();

    that.optional.row.refresh();

    this.calcSums();
    this.sumRow.refresh();

    this.unHiglightProcess(that);
    this.higlightProcess(that);
  }

  onCellOver(e, that) {
    this.higlightProcess(that);
  }

  onSumCellOver(e, that) {
    that.optional.row.addClassName('percent');
  }

  onSumCellOut(e, that) {
    that.optional.row.removeClassName('percent');
  }

  higlightProcess(that) {
    this.sortedCells = this.table.reduce((cells, col, rowIndex) => {
      col.forEach((cell, colIndex) => {
        cells.push({
          row: rowIndex,
          col: colIndex,
          amountDiff: Math.abs(that.optional.cell.amount - cell.amount),
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

    for(let selected = 0, i = 0; selected < this.x; i++) {
      if(sortedCellsLength === i) return;
      if(this.sortedCells[i].cell === that.optional.cell) continue;

      this.higlighted[selected] = this.sortedCells[i];

      this.higlightCell(this.sortedCells[i].row, this.sortedCells[i].col);
      selected++;
    }
  }

  higlightCell(row, col) {
    this.setCellHighlight(row, col, true);
  }

  unHiglightCell(row, col) {
    this.setCellHighlight(row, col, false);
  }

  setCellHighlight(row, col, light) {
    this.table[row][col].higlight = light;
    this.comp_rows[row].cells[col].refresh();
  }

  onCellOut(e, that) {
    this.unHiglightProcess(that);
  }

  unHiglightProcess() {
    let higlightedLength = this.higlighted.length;

    for(let i = 0; i < this.x; i++) {
      if(higlightedLength === i) return;
      this.unHiglightCell(this.higlighted[i].row, this.higlighted[i].col);
    }
  }

  onRowRemove(e, that) {
    e.preventDefault();

    this.unHiglightProcess();

    this.rows--;
    this.table.splice(this.table.indexOf(that.optional.row), 1);
    this.comp_rows.splice(this.comp_rows.indexOf(that), 1);

    that.destroyEl();

    this.calcSums();
    this.sumRow.refresh();
  }

  onRowAdd(e, that) {
    e.preventDefault();

    this.rows++;
    this.table[this.table.length] = this.generateRowData(this.table.length);

    this.addRow(this.table.length - 1);

    this.calcSums();
    this.sumRow.refresh();
  }

  addRow(rowCoord) {
    this.comp_rows[rowCoord] = new Row({
      container: this.dom.tbody,
      template: document.getElementById('template-row').innerHTML,
      state: this.state,

      events: {},
      optional: {cols: this.cols, row: this.table[rowCoord]}
    })

    this.comp_rows[rowCoord].render();
  }

  addButton() {
    new Button({
      container: this.dom.button_container,
      template: document.getElementById('template-add').innerHTML,

      events: {
        click: [this.onRowAdd.bind(this)]
      }
    }).render();
  }

  render() {
    this.addButton();

    for(let i = 0; i < this.rows; i++) {
      this.addRow(i);
    }

    this.sumRow = new SumRow({
      container: this.dom.tfoot,
      template: document.getElementById('template-row').innerHTML,

      optional: {cols: this.cols, sums: this.sums.cols}
    });

    this.sumRow.render();

    this.container.innerHTML = '';
    this.container.appendChild(this.el);
  }
}
