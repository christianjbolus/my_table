import React from 'react';

function TextArea({ label, name, value, rows, placeholder, onChange }) {
  return (
    <div className="form-input">
      <label htmlFor={name}>{label}</label>
      <textarea
        value={value}
        id={name}
        name={name}
        onChange={onChange}
        rows={rows}
        placeholder={placeholder}
      />
    </div>
  );
}

export default TextArea;
