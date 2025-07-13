import React from "react";

export default function Snake({ snake }) {
  return (
    <>
      {snake.map(([x, y], index) => (
        <div
          key={index}
          style={{
            gridColumn: x + 1,
            gridRow: y + 1,
          }}
          className={`${
            index === 0 ? "bg-green-600" : "bg-green-400"
          } rounded-md transition-all duration-75`}
        />
      ))}
    </>
  );
}
