import { useEffect, useState, useRef } from "react";

export default function Boat({
  id,
  initialX,
  initialY,
  scale,
  initialRotation,
  onUpdate,
  boats,
}) {
  const [x, setX] = useState(initialX);
  const [y, setY] = useState(initialY);
  const [rotation, setRotation] = useState(initialRotation);
  const [dimensions, setDemensions] = useState({ width: 0, height: 0 });
  const pathRef = useRef(null);
  // const scale = 5;
  const boatWidth = 14; // Baseline width
  const boatHeight = 32; // Baseline height

  const checkCollision = (newX, newY) => {
    return boats.some(
      (boat) =>
        boat.id !== id &&
        newX < boat.x + boatWidth * boat.scale &&
        newX + boatWidth * scale > boat.x &&
        newY < boat.y + boatHeight * boat.scale &&
        newY + boatHeight * scale > boat.y
    );
  };

  const handleMove = (e) => {
    const newX = x + e.movementX;
    const newY = y + e.movementY;
    if (!checkCollision(newX, newY)) {
      setX(newX);
      setY(newY);
      onUpdate(id, newX, newY, rotation);
    }
  };

  const handleRotation = (e) => {
    const delta = e.deltaY > 0 ? 5 : -5;
    const newDelta = rotation + delta;
    console.log("x", x, "y", y, "deg", newDelta);
    setRotation(newDelta);
    onUpdate(id, x, y, newDelta);
  };

  useEffect(() => {
    if (pathRef.current) {
      const bbox = pathRef.current.getBBox();
      setDemensions({ width: bbox.width, height: bbox.height });
      // console.log("Breite:", boundingBox.width);
      // console.log("Höhe:", boundingBox.height);
    }
  }, []);

  return (
    <>
      <svg
        className="icon"
        onPointerDown={(e) => e.target.setPointerCapture(e.pointerId)}
        onPointerMove={(e) => e.buttons === 1 && handleMove(e)}
        onWheel={handleRotation}
        width={boatWidth * scale}
        height={boatHeight * scale}
        viewBox={`0 0 ${boatWidth} ${boatHeight}`}
        style={{
          position: "absolute",
          top: `${y}px`,
          left: `${x}px`,
          transform: `rotate(${rotation}deg)`,
          pointerEvents: "all",
          transition: "transform 0.1s ease",
        }}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Boat shape */}
        <path
          ref={pathRef}
          d="M7 0 C5 3 0 12 1 30 Q7 31 13 30 C14 12 9 3 7 0 Z"
          stroke="black"
          strokeWidth="0.5"
        />

        {/* ID label */}
        <text x={boatWidth / 2} y={boatHeight - 5} fontSize={2} fill="black">
          ID: {id}
        </text>

        {/* Position label */}
        <text
          x={boatWidth / 2}
          y={boatHeight - 10}
          fontSize={2}
          fill="black"
          textAnchor="middle"
        >
          X: {Math.round(x)}, Y: {Math.round(y)}
        </text>
      </svg>
    </>
  );
}
