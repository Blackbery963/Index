import { useState } from "react";

const PixelPainter = () => {
  const gridSize = 16; // 16x16 grid
  const [selectedColor, setSelectedColor] = useState("#4f46e5");
  const [pixels, setPixels] = useState(
    Array(gridSize * gridSize).fill("#ffffff")
  );

  const colors = [
    "#000000",
    "#ffffff",
    "#ef4444",
    "#f59e0b",
    "#10b981",
    "#3b82f6",
    "#8b5cf6",
    "#ec4899",
  ];

  const paintPixel = (index) => {
    const newPixels = [...pixels];
    newPixels[index] = selectedColor;
    setPixels(newPixels);
  };

  const clearBoard = () => {
    setPixels(Array(gridSize * gridSize).fill("#ffffff"));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-6">
      <h1 className="text-2xl font-bold text-indigo-800 mb-4 drop-shadow-sm">
        🎨 Pixel Painter (Offline Fun)
      </h1>

      {/* Color Palette */}
      <div className="flex gap-2 mb-4">
        {colors.map((color, idx) => (
          <button
            key={idx}
            className={`w-8 h-8 rounded-md border-2 transition-transform ${
              selectedColor === color
                ? "border-indigo-600 scale-110"
                : "border-gray-300"
            }`}
            style={{ backgroundColor: color }}
            onClick={() => setSelectedColor(color)}
          />
        ))}
      </div>

      {/* Pixel Grid */}
      <div
        className="grid border-4 border-indigo-500 rounded-lg shadow-lg"
        style={{
          gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
        }}
      >
        {pixels.map((color, index) => (
          <div
            key={index}
            onClick={() => paintPixel(index)}
            className="w-6 h-6 border border-gray-200 cursor-pointer transition-transform hover:scale-110"
            style={{ backgroundColor: color }}
          ></div>
        ))}
      </div>

      {/* Actions */}
      <button
        onClick={clearBoard}
        className="mt-6 px-6 py-2 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 hover:scale-105 transition-all"
      >
        Clear Board
      </button>
    </div>
  );
};

export default PixelPainter;
