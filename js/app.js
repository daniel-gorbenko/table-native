window.onload = () => {

  function createTable(e) {
    e.preventDefault();

    let rows = parseInt(document.getElementById('rows').value);
    let cols = parseInt(document.getElementById('cols').value);
    let x = parseInt(document.getElementById('x').value);

    if(rows < 1 || cols < 1 || x < 1 || Number.isNaN(rows) || Number.isNaN(cols) || Number.isNaN(x)) {
      alert('Значения должны быть больше нуля');

      throw new Error();
    }

    e.preventDefault();

    let table = new Table({
      rows: parseInt(document.getElementById('rows').value),
      cols: parseInt(document.getElementById('cols').value),
      x: parseInt(document.getElementById('x').value),
      amountDigits: 3,

      container: document.getElementById('app'),
      template: document.getElementById('template-table').innerHTML
    });

    table.render();

    document.getElementById('form').className += ' hidden';
  }

  document.getElementById('create-table').addEventListener('click', createTable);
};
