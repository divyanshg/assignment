import React from "react";
import BaseButton from "../BaseButton";

function Operator({ value, isDropped, onDragStart, removeItem, droppedIndex }) {
  return (
    <div
      className={`relative bg-red-400 p-10 px-12 hover:bg-red-500 shadow-lg rounded ${!isDropped ? "cursor-move" : "cursor-default"}`}
      {...(!isDropped ? { draggable: true } : {})}
      onDragStart={(e) => onDragStart(e, value, "operator")}
    >
      {isDropped && (
        <span
          onClick={() => removeItem(droppedIndex)}
          title="Remove Tile"
          className="absolute text-white font-semibold text-lg top-0 right-2 cursor-pointer"
        >
          x
        </span>
      )}
      <BaseButton content={value} className="text-lg" />
    </div>
  );
}

export default Operator;
