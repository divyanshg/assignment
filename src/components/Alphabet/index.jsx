import BaseButton from "../BaseButton";

function Alphabet({
  value: alphabet,
  isDropped,
  onDragStart,
  removeItem,
  droppedIndex,
}) {
  return (
    <div
      className="bg-green-400 p-10 px-12 hover:bg-green-500 shadow-lg rounded cursor-move relative"
      {...(!isDropped ? { draggable: true } : {})}
      onDragStart={(e) =>
        onDragStart(e, alphabet.value, "alphabet", alphabet.numericalValue)
      }
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
      <BaseButton content={alphabet.value} />
    </div>
  );
}

export default Alphabet;
