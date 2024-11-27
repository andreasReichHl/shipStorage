import React, { useState } from "react";
import Boat from "./components/Boat/boat";

const App = () => {
  const [boats, setBoats] = useState([
    { id: 1, x: 0, y: 100, rotation: 0, scale: 5 },
    { id: 2, x: 100, y: 300, rotation: 0, scale: 7 },
    { id: 3, x: 200, y: 300, rotation: 0, scale: 7 },
  ]);

  const [axX, setaxX] = useState(0);
  const [axY, setaxY] = useState(0);

  const hallWidth = 800;
  const hallHeight = 600;

  const handleBoatUpdate = (id, newX, newY, newRotation) => {
    setaxX(newX);
    setaxY(newY);
    setBoats((prevBoats) =>
      prevBoats.map((boat) =>
        boat.id === id
          ? { ...boat, x: newX, y: newY, rotation: newRotation }
          : boat
      )
    );
  };

  console.log("x: ", axX, "y: ", axY);

  return (
    <>
      <div
        style={{
          width: hallWidth,
          height: hallHeight,
          position: "relative",
          border: "1px solid black",
          overflow: "hidden",
        }}
      >
        <div className="absolute">
          {boats.map((boat) => (
            <Boat
              key={boat.id}
              id={boat.id}
              initialX={boat.x}
              initialY={boat.y}
              scale={boat.scale}
              initialRotation={boat.rotation}
              onUpdate={handleBoatUpdate}
              boats={boats}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default App;
