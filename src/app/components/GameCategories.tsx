"use client";

import gamesData from "../../game-data/games.json";

export default function GameCategories() {
  const getCategoryStats = (categoryName: string) => {
    switch (categoryName) {
      case "High Volatility":
        return gamesData.slotGames.filter((game) => game.volatility === "High").length;
      case "Medium Volatility":
        return gamesData.slotGames.filter((game) => game.volatility === "Medium").length;
      case "Low Volatility":
        return gamesData.slotGames.filter((game) => game.volatility === "Low").length;
      case "Progressive Jackpot":
        return gamesData.slotGames.filter((game) => game.maxWin === "Progressive Jackpot").length;
      case "Megaways":
        return gamesData.slotGames.filter((game) => game.name.toLowerCase().includes("megaways")).length;
      default:
        return 0;
    }
  };

  const getCategoryColor = (categoryName: string) => {
    switch (categoryName) {
      case "High Volatility":
        return "bg-red-50 border-red-200";
      case "Medium Volatility":
        return "bg-yellow-50 border-yellow-200";
      case "Low Volatility":
        return "bg-green-50 border-green-200";
      case "Progressive Jackpot":
        return "bg-purple-50 border-purple-200";
      case "Megaways":
        return "bg-blue-50 border-blue-200";
      default:
        return "bg-gray-50 border-gray-200";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">📊 Game Categories</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {gamesData.categories.map((category) => {
          const gameCount = getCategoryStats(category.name);

          return (
            <div key={category.name} className={`border-2 rounded-lg p-4 ${getCategoryColor(category.name)}`}>
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-gray-800">{category.name}</h3>
                <span className="bg-white text-gray-800 px-2 py-1 rounded-full text-xs font-medium border">
                  {gameCount} games
                </span>
              </div>

              <p className="text-sm text-gray-600">{category.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
