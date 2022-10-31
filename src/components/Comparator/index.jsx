import React from "react";
import BaseButton from "../BaseButton";

function Comparator({
  value,
  isInDropZone,
  removeItem,
  droppedIndex,
  onClick,
}) {
  return (
    <div
      {...(onClick && { onClick: (e) => onClick(value) })}
      className="relative bg-red-400 p-10 px-12 hover:bg-red-500 shadow-lg rounded"
    >
      {isInDropZone && (
        <span
          onClick={() => removeItem(droppedIndex)}
          title="Remove Tile"
          className="absolute text-white font-semibold text-lg top-0 right-2 cursor-pointer"
        >
          x
        </span>
      )}
      <BaseButton content={value} />
    </div>
  );
}

export default Comparator;
