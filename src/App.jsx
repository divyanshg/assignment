import { useState } from "react";
import Alphabet from "./components/Alphabet";
import Operator from "./components/Operator";
import Comparator from "./components/Comparator";
import BaseButton from "./components/BaseButton";

function App() {
  const [alphabets, setAlphabets] = useState([
    { id: 1, value: "A", numericalValue: 10 },
    { id: 2, value: "B", numericalValue: 42 },
    { id: 3, value: "C", numericalValue: 33 },
    { id: 4, value: "D", numericalValue: 14 },
    { id: 5, value: "E", numericalValue: 57 },
    { id: 6, value: "F", numericalValue: 46 },
    { id: 7, value: "G", numericalValue: 71 },
  ]);

  const [operators, setOperators] = useState(["+", "-", "*", "/"]);
  const [comparators, setComparators] = useState(["<", ">"]);
  const [dragData, setDragData] = useState({});
  const [itemsInDropZone, setItemsInDropZone] = useState([]);

  const handleDragStart = (e, value, type, numericalValue) => {
    setDragData({ value, type, numericalValue });
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragLeave = (e) => {
    // setNoDrop("");
  };

  const handleDrop = (e) => {
    // setNoDrop("");
    const selected = dragData.type;
    //if dropzone is empty then allow only alphabet
    if (itemsInDropZone.length === 0 && selected === "operator") return;
    if (selected === "alphabet") {
      //check if last item is not of same type
      if (
        itemsInDropZone.length > 0 &&
        itemsInDropZone[itemsInDropZone.length - 1].type === "alphabet"
      ) {
        return;
      }
      setItemsInDropZone((prev) => [...prev, dragData]);
    } else if (selected === "operator") {
      if (
        itemsInDropZone.length > 0 &&
        itemsInDropZone[itemsInDropZone.length - 1].type === "operator"
      ) {
        return;
      }
      setItemsInDropZone((prev) => [...prev, dragData]);
    }
  };

  const removeItem = (index) => {
    if (itemsInDropZone.length === 0) return;
    setItemsInDropZone((prev) => {
      return prev.filter((item, i) => i !== index);
    });
  };

  const handleRhsInput = (e) => {
    let value = prompt("Enter value");
    if (value === null || value.length == 0 || isNaN(value)) {
      alert("Please enter a valid number");
      return;
    }
    // add to dropzone
    setItemsInDropZone((prev) => [...prev, { value: value, type: "rhs" }]);
  };

  const addComparator = (value) => {
    // check if last item is not of same type
    if (itemsInDropZone.length == 0) return;

    if (
      itemsInDropZone[itemsInDropZone.length - 1].type === "operator" ||
      itemsInDropZone[itemsInDropZone.length - 1].type === "comparator"
    )
      return;

    setItemsInDropZone((prev) => [
      ...prev,
      { value: value, type: "comparator" },
    ]);
  };

  const evaluate = () => {
    let expression = "";
    itemsInDropZone.forEach((item) => {
      if (item.type === "alphabet") {
        expression += item.numericalValue;
      } else {
        expression += item.value;
      }
    });
    console.log(expression);
    let result = eval(expression);
    alert(result);
  };

  return (
    <div className="flex flex-col">
      <div className="alphabet-container flex flex-row space-x-4 border-b-8 border-gray-100 py-2 px-3">
        {alphabets.map((alphabet, index) => (
          <Alphabet onDragStart={handleDragStart} value={alphabet} />
        ))}
      </div>
      <div className="flex flex-row space-x-24 border-b-8 border-gray-100 py-2 px-3">
        <div className="operator-container flex flex-row space-x-4">
          {operators.map((operator, index) => (
            <Operator onDragStart={handleDragStart} value={operator} />
          ))}
        </div>
        <div className="operator-container flex flex-row space-x-4">
          {comparators.map((comparator, index) => (
            <Comparator value={comparator} onClick={addComparator} />
          ))}
        </div>
        <div>
          <BaseButton
            content={"RHS Integer"}
            onClick={handleRhsInput}
            className="bg-red-400 hover:bg-red-500 h-full px-4 shadow-lg rounded"
          />
        </div>
      </div>
      <div
        className="drop-zone flex flex-row space-x-4 border-4 border-dashed px-3 my-2 h-32"
        onDragEnter={(e) => handleDragEnter(e)}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={(e) => handleDrop(e)}
      >
        {itemsInDropZone.map((item, index) => (
          <div className="py-2">
            {item.type === "alphabet" && (
              <Alphabet
                value={item}
                isDropped={true}
                removeItem={removeItem}
                droppedIndex={index}
              />
            )}
            {item.type === "operator" && (
              <Operator
                value={item.value}
                isDropped={true}
                removeItem={removeItem}
                droppedIndex={index}
              />
            )}
            {item.type === "rhs" && (
              <div className="relative bg-orange-400 p-10 px-12 hover:bg-orange-500 shadow-lg rounded cursor-move">
                <span
                  onClick={() => removeItem(index)}
                  title="Remove Tile"
                  className="absolute text-white font-semibold text-lg top-0 right-2 cursor-pointer"
                >
                  x
                </span>
                <div className="text-white">{item.value}</div>
              </div>
            )}
            {item.type === "comparator" && (
              <Comparator
                value={item.value}
                isInDropZone={true}
                removeItem={removeItem}
                droppedIndex={index}
              />
            )}
          </div>
        ))}
      </div>
      <BaseButton
        onClick={evaluate}
        className="mx-1 my-2 bg-blue-400 flex rounded text-white items-center justify-center hover:bg-blue-500 py-1"
        content={"Evaluate"}
      />

      <span className="my-2 text-lg mx-4">Values of alphabets</span>
      <div className="flex flex-row divide-x divide-gray-300 w-24">
        {alphabets.map((alphabet) => {
          return (
            <div className="flex flex-col px-2">
              <div className="text-center">{alphabet.value}</div>
              <div className="text-center">{alphabet.numericalValue}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
