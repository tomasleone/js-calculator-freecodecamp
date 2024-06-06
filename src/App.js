import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { evaluate } from 'mathjs';
import './App.css';

const App = () => {
  const [display, setDisplay] = useState('0');
  const [lastInput, setLastInput] = useState('');
  const [evaluated, setEvaluated] = useState(false);

  const handleClear = () => {
    setDisplay('0');
    setLastInput('');
    setEvaluated(false);
  };

  const handleNumber = (num) => {
    if (evaluated) {
      setDisplay(num);
      setEvaluated(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
    setLastInput(num);
  };

  const handleOperator = (operator) => {
    if (evaluated) {
      setDisplay(lastInput + operator);
      setEvaluated(false);
    } else if (/[+\-*/]$/.test(display)) {
      if (operator === '-' && lastInput !== '-') {
        setDisplay(display + operator);
      } else {
        setDisplay(display.replace(/[+\-*/]+$/, '') + operator);
      }
    } else {
      setDisplay(display + operator);
    }
    setLastInput(operator);
  };

  const handleDecimal = () => {
    if (evaluated) {
      setDisplay('0.');
      setEvaluated(false);
    } else {
      const lastNumber = display.split(/[+\-*/]/).pop();
      if (!lastNumber.includes('.')) {
        setDisplay(display + '.');
      }
    }
    setLastInput('.');
  };

  const handleEvaluate = () => {
    try {
      const result = evaluate(display.replace('--', '+'));
      setDisplay(result.toString());
      setLastInput(result.toString());
      setEvaluated(true);
    } catch (error) {
      setDisplay('Error');
    }
  };

  return (
    <div className="app-container d-flex justify-content-center align-items-center vh-100 bg-dark">
      <div className="calculator card shadow-lg">
        <div id="display" className="card-body text-right h2 bg-secondary text-white">
          {display}
        </div>
        <div className="card-body">
          <div className="row mb-2">
            <button id="clear" className="btn btn-danger col-6" onClick={handleClear}>AC</button>
            <button id="divide" className="btn btn-secondary col-5" onClick={() => handleOperator('/')}>/</button>
            
          </div>
          <div className="row mb-2">
            <button id="seven" className="btn btn-light col-3" onClick={() => handleNumber('7')}>7</button>
            <button id="eight" className="btn btn-light col-3" onClick={() => handleNumber('8')}>8</button>
            <button id="nine" className="btn btn-light col-3" onClick={() => handleNumber('9')}>9</button>
            <button id="multiply" className="btn btn-secondary col-2" onClick={() => handleOperator('*')}>*</button>
          </div>
          <div className="row mb-2">
            <button id="four" className="btn btn-light col-3" onClick={() => handleNumber('4')}>4</button>
            <button id="five" className="btn btn-light col-3" onClick={() => handleNumber('5')}>5</button>
            <button id="six" className="btn btn-light col-3" onClick={() => handleNumber('6')}>6</button>
            <button id="subtract" className="btn btn-secondary col-2" onClick={() => handleOperator('-')}>-</button>
          </div>
          <div className="row mb-2">
            <button id="one" className="btn btn-light col-3" onClick={() => handleNumber('1')}>1</button>
            <button id="two" className="btn btn-light col-3" onClick={() => handleNumber('2')}>2</button>
            <button id="three" className="btn btn-light col-3" onClick={() => handleNumber('3')}>3</button>
            <button id="add" className="btn btn-secondary col-2" onClick={() => handleOperator('+')}>+</button>
          </div>
          <div className="row">
            <button id="zero" className="btn btn-light col-6" onClick={() => handleNumber('0')}>0</button>
            <button id="decimal" className="btn btn-light col-3" onClick={handleDecimal}>.</button>
            <button id="equals" className="btn btn-primary col-2" onClick={handleEvaluate}>=</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;

