// src/components/Display.js
import React from 'react';

const Display = ({ input }) => {
  return (
    <div id="display" className="display">
      {input}
    </div>
  );
};

export default Display;
