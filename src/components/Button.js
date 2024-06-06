// src/components/Button.js
import React from 'react';

const Button = ({ button, onClick }) => {
  const handleClick = () => {
    onClick(button);
  };

  return (
    <button
      id={button.id}
      className={`btn btn-secondary button ${button.type}`}
      onClick={handleClick}
    >
      {button.label}
    </button>
  );
};

export default Button;
