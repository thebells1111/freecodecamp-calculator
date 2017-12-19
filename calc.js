let calc = {
  total: 0,
  arr: [],
  input: '',
  lastNum: 0,
  lastOper: '=',
  clearSet: false,

  load: function() {
    for (i = 0, j = document.getElementsByClassName('calc-button').length; i < j; i++) {
      document.getElementsByClassName('calc-button')[i].addEventListener('click', calc.buttonPush);
      document.body.addEventListener('keypress', calc.buttonPush);
    }
  },

  buttonPush: function(evt) {
    console.log(evt)
    calc.setInput(evt);
    calc.checkForEqual();
    calc.getInputFunction();
    document.getElementsByClassName('screen-bottom')[0].innerText = calc.arr.join(' ').toString();
  },

  setInput: function(evt) {
    if (evt.key) {
      if (isNaN(Number(evt.key))) {
        calc.input = evt.key;
        if (evt.key === 'Enter') {
          calc.input = '=';
        }
      } else {
        calc.input = Number(evt.key);
      }
    } else if (isNaN(Number(evt.target.innerText))) {
      calc.input = evt.target.getAttribute('data-calc');
    } else {
      calc.input = Number(evt.target.getAttribute('data-calc'));
    }
  },

  checkForEqual: function() {
    if (calc.arr[calc.arr.length - 2] === '=')
      calc.arr = [];
  },

  getInputFunction: function() {
    if (calc.input !== 'clear') {
      calc.clearSet = false;
    }

    if (!isNaN(Number(calc.input))) {
      calc.number();
    } else if (['+', '-', '/', '*'].indexOf(calc.input) > -1) {
      calc.math(calc.input);
    } else if (calc.input === '.') {
      calc.deci();
    } else if (calc.input === '=') {
      calc.equals();
    } else if (calc.input === 'neg') {
      calc.neg();
    } else if (calc.input === 'clear') {
      calc.clear();
    } else if (calc.input === 'ac') {
      calc.allClear();
    }
  },

  arrLast: {
    isNum: function() {
      return !isNaN(Number(calc.arr[calc.arr.length - 1]));
    }
  },

  getTotal: function() {
    if (calc.arr.length < 3) {
      calc.total = calc.arr[0];
    } else {
      switch (calc.arr[calc.arr.length - 3]) {
        case '+':
          calc.total = (Number(calc.total) + Number(calc.arr[calc.arr.length - 2])).toPrecision(9) / 1;
          break;
        case '-':
          calc.total = (Number(calc.total) - Number(calc.arr[calc.arr.length - 2])).toPrecision(9) / 1;
          break;
        case '*':
          calc.total = (Number(calc.total) * Number(calc.arr[calc.arr.length - 2])).toPrecision(9) / 1;
          break;
        case '/':
          calc.total = (Number(calc.total) / Number(calc.arr[calc.arr.length - 2])).toPrecision(9) / 1;
          break;
      }
    }
    document.getElementsByClassName('screen-top')[0].innerText = calc.total;
  },


  allClear: function() {
    document.getElementsByClassName('screen-top')[0].innerText = '0';
    document.getElementsByClassName('screen-bottom')[0].innerText = '';
    calc.arr = [];
    calc.total = 0;
    calc.lastNum = 0;
    calc.lastOper = '=';
    calc.clearSet = false;
  },

  clear: function() {
    if (calc.clearSet) {
      calc.allClear();
    } else {
      calc.clearSet = true;
      if (calc.arrLast.isNum()) {
        calc.arr.pop();
      }
    }
  },

  number: function() {
    if (calc.arrLast.isNum() || (calc.arr.length > 0 && calc.arr[calc.arr.length - 1].indexOf(".") > -1)) {
      calc.arr[calc.arr.length - 1] = calc.arr[calc.arr.length - 1].toString() + calc.input.toString();

    } else {
      calc.arr.push(calc.input.toString());
    }
    document.getElementsByClassName('screen-top')[0].innerText = calc.arr[calc.arr.length - 1];
  },

  deci: function() {
    if (calc.arr.length > 0 && calc.arr[calc.arr.length - 1].indexOf(".") > -1) {} else if (isNaN(Number(calc.arr[calc.arr.length - 1])) || calc.arr.length === 0) {
      calc.arr.push('0.');
    } else if (calc.arrLast.isNum()) {
      calc.arr[calc.arr.length - 1] = calc.arr[calc.arr.length - 1].toString() + calc.input.toString();
    }
    document.getElementsByClassName('screen-top')[0].innerText = calc.arr[calc.arr.length - 1];
  },

  neg: function() {
    if (calc.arr.length === 0) {
      calc.arr.push(calc.total);
    }
    if (calc.arrLast.isNum()) {
      calc.arr[calc.arr.length - 1] = 0 - Number(calc.arr[calc.arr.length - 1]);
      document.getElementsByClassName('screen-top')[0].innerText = calc.arr[calc.arr.length - 1];

    }
  },

  equals: function() {
    if (calc.arr.length < 4) {
      if (calc.arr.length === 0) {
        calc.arr[0] = calc.total;
        calc.arr[1] = calc.lastOper;
        calc.arr[2] = calc.lastNum;
        if (calc.lastOper !== '=') calc.arr[3] = '=';
      } else if (calc.arr[2]) {
        calc.total = Number(calc.arr[0]);
        calc.lastOper = calc.arr[1];
        calc.lastNum = Number(calc.arr[2]);
        calc.arr[3] = '=';
      } else {
        calc.total = Number(calc.arr[0]);
        calc.lastOper = '=';
        calc.lastNum = Number(calc.arr[0]);
        calc.arr[1] = '=';
        calc.arr[2] = calc.total;
      }
      console.log(calc.arr)
    } else if (calc.arrLast.isNum()) {
      calc.lastOper = calc.arr[calc.arr.length - 2];
      calc.lastNum = Number(calc.arr[calc.arr.length - 1])
      calc.arr.push('=');
    } else {
      calc.arr[calc.arr.length - 1] = '=';
    }

    switch (calc.lastOper) {
      case '+':
        calc.total = (Number(calc.total) + Number(calc.arr[calc.arr.length - 2])).toPrecision(9) / 1;
        break;
      case '-':
        calc.total = (Number(calc.total) - Number(calc.arr[calc.arr.length - 2])).toPrecision(9) / 1;
        break;
      case '*':
        calc.total = (Number(calc.total) * Number(calc.arr[calc.arr.length - 2])).toPrecision(9) / 1;
        break;
      case '/':
        calc.total = (Number(calc.total) / Number(calc.arr[calc.arr.length - 2])).toPrecision(9) / 1;
        break;
    }

    document.getElementsByClassName('screen-top')[0].innerText = calc.total;
    
    if (calc.arr[1] !== '=') {
      calc.arr.push(calc.total.toString());
    }
  },

  math: function(operand) {
    if (calc.arr.length === 0) {
      calc.arr.push(calc.total.toString());
      calc.arr.push(operand);
    } else if (calc.arrLast.isNum()) {
      calc.arr.push(operand);
      calc.getTotal();
    } else {
      calc.arr[calc.arr.length - 1] = operand;
    }
  },
}

calc.load();
