import React from 'react';
import './Button.css';

function Button({ text, onClick, className }) {
  return (
    <button onClick={onClick} className={className}>
      {text}
    </button>
  );
}

Button.defaultProps = {
  onClick: null,
  className: 'btn',
};

export default Button;
