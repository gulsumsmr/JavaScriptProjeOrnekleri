const display = document.getElementById('display');
const keys = document.querySelector('.calculator-keys');
const history = document.getElementById('history');
const copyBtn = document.getElementById('copyBtn');

let displayValue = '0';
let firstValue = null;
let operator = null;
let waitingForSecondValue = false;

function updateDisplay() {
  display.value = displayValue;
}

function updateHistory() {
  if (firstValue !== null && operator && !waitingForSecondValue) {
    history.textContent = `${firstValue} ${operator} ${displayValue}`;
  } else if (firstValue !== null && operator) {
    history.textContent = `${firstValue} ${operator}`;
  } else {
    history.textContent = '';
  }
}

keys.addEventListener('click', (e) => {
  const btn = e.target;
  if (!btn.matches('button')) return;

  const value = btn.value;

  if (btn.classList.contains('number')) {
    inputNumber(value);
  } else if (btn.classList.contains('decimal')) {
    inputDecimal(value);
  } else if (btn.classList.contains('operator') && value !== '=') {
    handleOperator(value);
  } else if (btn.classList.contains('equal-sign')) {
    performCalculation();
  } else if (btn.classList.contains('clear')) {
    clearCalculator();
  }
});

function inputNumber(num) {
  if (waitingForSecondValue) {
    displayValue = num;
    waitingForSecondValue = false;
  } else {
    displayValue = (displayValue === '0' || displayValue === 'Hata') ? num : displayValue + num;
  }
  updateDisplay();
  updateHistory();
}

function inputDecimal(dot) {
  if (waitingForSecondValue) {
    displayValue = '0.';
    waitingForSecondValue = false;
  } else if (!displayValue.includes(dot)) {
    displayValue += dot;
  }
  updateDisplay();
}

function handleOperator(nextOperator) {
  const inputValue = parseFloat(displayValue);

  if (operator && waitingForSecondValue) {
    operator = nextOperator;
    updateHistory();
    return;
  }

  if (firstValue === null) {
    firstValue = inputValue;
  } else if (operator) {
    const result = calculate(firstValue, inputValue, operator);
    displayValue = String(result);
    firstValue = result;
    updateDisplay();
  }

  operator = nextOperator;
  waitingForSecondValue = true;
  updateHistory();
}

function performCalculation() {
  if (operator === null || waitingForSecondValue) return;

  const secondValue = parseFloat(displayValue);
  const result = calculate(firstValue, secondValue, operator);

  // Geçmişi tam olarak göster
  history.textContent = `${firstValue} ${operator} ${secondValue} = ${result}`;

  displayValue = String(result);
  firstValue = null;
  operator = null;
  waitingForSecondValue = false;

  updateDisplay();
}


function calculate(first, second, op) {
  switch (op) {
    case '+': return first + second;
    case '-': return first - second;
    case '*': return first * second;
    case '/': return second === 0 ? 'Hata' : first / second;
    default: return second;
  }
}

function clearCalculator() {
  displayValue = '0';
  firstValue = null;
  operator = null;
  waitingForSecondValue = false;
  updateDisplay();
  updateHistory();
}

// Kopyalama özelliği
copyBtn.addEventListener('click', () => {
  navigator.clipboard.writeText(display.value)
    .then(() => {
      copyBtn.textContent = '✅ Kopyalandı!';
      setTimeout(() => {
        copyBtn.textContent = '📋 Kopyala';
      }, 1500);
    });
});

// Klavye desteği
document.addEventListener('keydown', (e) => {
  const key = e.key;

  if (!isNaN(key)) {
    inputNumber(key);
  } else if (['+', '-', '*', '/'].includes(key)) {
    handleOperator(key);
  } else if (key === '.') {
    inputDecimal('.');
  } else if (key === 'Enter' || key === '=') {
    performCalculation();
  } else if (key === 'Escape' || key === 'c') {
    clearCalculator();
  }
});
