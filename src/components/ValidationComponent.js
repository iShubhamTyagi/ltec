// ValidationComponent.js
import React from 'react';

function ValidationComponent({ answers }) {
  const isEligible = Object.values(answers).some(answer => answer === 'Yes');

  return (
    <div>
      {isEligible ? 'The user is eligible.' : 'The user is not eligible.'}
    </div>
  );
}

export default ValidationComponent;
