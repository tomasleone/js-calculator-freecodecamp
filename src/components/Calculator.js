// src/components/Calculator.js
import React, { useState } from 'react';
import Display from './Display';
import Button from './Button';

const buttons = [
  { id: 'clear', label: 'AC', type: 'action' },
  { id: 'divide', label: '/', type: 'operator' },
  { id: 'multiply', label: '*', type: 'operator' },
  { id: 'seven', label: '7', type: 'number' },
  { id: 'eight', label: '8', type: 'number' },
  { id: 'nine', label: '9', type: 'number' },
  { id: 'subtract', label: '-', type: 'operator' },
  { id: 'four', label: '4', type: 'number' },
  { id: 'five', label: '5', type: 'number' },
  { id: 'six', label: '6', type: 'number' },
  { id: 'add', label: '+', type: 'operator' },
  { id: 'one', label: '1', type: 'number' },
  { id: 'two', label: '2', type: 'number' },
  { id: 'three', label: '3', type: 'number' },
  { id: 'zero', label: '0', type: 'number' },
  { id: 'decimal', label: '.', type: 'decimal' },
  { id: 'equals', label: '=', type: 'equals' },
];

const evaluateExpression = (expression) => {
     // Reemplaza todas las comas por puntos para unificar el formato decimal
    expression = expression.replace(/,/g, '.');

    console.log('Input:', expression); // Agregar esta línea para imprimir el input

    const operators = {
      '+': (a, b) => a + b,
      '-': (a, b) => a - b,
      '*': (a, b) => a * b,
      '/': (a, b) => a / b,
    };
  
    const operatorPrecedence = {
      '+': 1,
      '-': 1,
      '*': 2,
      '/': 2,
    };
  
    const outputQueue = [];
    const operatorStack = [];
  
    const tokens = expression.match(/(\d+(\.\d+)?)|[+\-*/]/g);
  
    let lastToken = null;
    tokens.forEach((token) => {
      if (!isNaN(token)) {
        outputQueue.push(parseFloat(token));
      } else if (operators[token]) {
        while (
          operatorStack.length &&
          operatorPrecedence[operatorStack[operatorStack.length - 1]] >= operatorPrecedence[token]
        ) {
          outputQueue.push(operatorStack.pop());
        }
        operatorStack.push(token);
      } else if (token === '-' && (lastToken === null || isNaN(lastToken))) {
        // Handle negative number
        outputQueue.push(0);
        operatorStack.push(token);
      }
      lastToken = token;
    });
  
    while (operatorStack.length) {
      outputQueue.push(operatorStack.pop());
    }
  
    const resultStack = [];
    outputQueue.forEach((token) => {
      if (!isNaN(token)) {
        resultStack.push(token);
      } else {
        const b = resultStack.pop();
        const a = resultStack.pop();
        resultStack.push(operators[token](a, b));
      }
    });
  
    return resultStack[0];
  };
  

const Calculator = () => {
  const [input, setInput] = useState('0');
  const [lastInput, setLastInput] = useState('');

  const handleButtonClick = (button) => {
    switch (button.type) {
      case 'number':
        if (lastInput === 'equals' || input === '0') {
          setInput(button.label);
          setLastInput('');
        } else {
          setInput(input + button.label);
        }
        break;
        case 'decimal':
            if (!input.includes('.') || lastInput === 'number') {
              const lastChar = input.slice(-1); // Obtener el último carácter del input
              if (lastChar !== '.') { // Verificar que el último carácter no sea ya un punto
                setInput(input + button.label);
              }
            }
            break;
          
      case 'operator':
        if (['+', '-', '*', '/'].includes(lastInput)) {
          setInput(input.slice(0, -1) + button.label);
        } else {
          setInput(input + button.label);
        }
        break;
      case 'equals':
        const result = evaluateExpression(input);
        setInput(result.toString());
        setLastInput('equals');
        break;
      case 'action':
        setInput('0');
        setLastInput('');
        break;
      default:
        break;
    }
    setLastInput(button.type);
  };

  return (
    <div className="calculator">
      <Display input={input} />
      <div className="button-container">
        {buttons.map((button) => (
          <Button key={button.id} button={button} onClick={handleButtonClick} />
        ))}
      </div>
    </div>
  );
};

export default Calculator;
