import React from "react";

export default function Food({ food }) {
  return (
    <div
      style={{
        gridColumn: food[0] + 1,
        gridRow: food[1] + 1,
      }}
      className="bg-red-500 rounded-full animate-bounce"
    />
  );
}
