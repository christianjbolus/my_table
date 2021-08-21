import React from 'react';
import './ListItems.css';
function ListItems({ items, numbered }) {
  return (
    <>
      {items &&
        items.map((item, index) => (
          <p className="item" key={index}>
            {numbered && <span className="bold">{`Step ${index + 1}:`}</span>} {item}
          </p>
        ))}
    </>
  );
}

export default ListItems;
