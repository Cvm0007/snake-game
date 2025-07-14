// Snake.jsx

const Snake = ({ isHead = false }) => {
  return (
    <div
      className={`w-3/4 h-3/4 rounded-md ${
        isHead
          ? "bg-green-800 shadow-[0_0_8px_4px_#0f0]" // Snake head
          : "bg-green-400 shadow-[0_0_6px_2px_#0f0] animate-pulse" // Snake body
      }`}
    />
  );
};

export default Snake;
