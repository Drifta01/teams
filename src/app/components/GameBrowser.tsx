"use client";

import { useState } from "react";
import gamesData from "../../game-data/games.json";

export default function GameBrowser() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedProvider, setSelectedProvider] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredGames = gamesData.slotGames.filter((game) => {
    const matchesCategory = selectedCategory === "all" || game.volatility === selectedCategory;
    const matchesProvider = selectedProvider === "all" || game.provider === selectedProvider;
    const matchesSearch =
      game.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      game.theme.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesProvider && matchesSearch;
  });

  const getVolatilityColor = (volatility: string) => {
    switch (volatility) {
      case "High":
        return "bg-red-100 text-red-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "Low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">🎰 Casino Slot Games Browser</h2>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Search Games</label>
          <input
            type="text"
            placeholder="Search by name or theme..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Volatility</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Volatility</option>
            <option value="High">High Volatility</option>
            <option value="Medium">Medium Volatility</option>
            <option value="Low">Low Volatility</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Provider</label>
          <select
            value={selectedProvider}
            onChange={(e) => setSelectedProvider(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Providers</option>
            {gamesData.providers.map((provider) => (
              <option key={provider.name} value={provider.name}>
                {provider.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Game Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 p-3 rounded-lg text-center">
          <div className="text-2xl font-bold text-blue-600">{filteredGames.length}</div>
          <div className="text-sm text-gray-600">Games Found</div>
        </div>
        <div className="bg-green-50 p-3 rounded-lg text-center">
          <div className="text-2xl font-bold text-green-600">{gamesData.providers.length}</div>
          <div className="text-sm text-gray-600">Providers</div>
        </div>
        <div className="bg-purple-50 p-3 rounded-lg text-center">
          <div className="text-2xl font-bold text-purple-600">{gamesData.categories.length}</div>
          <div className="text-sm text-gray-600">Categories</div>
        </div>
        <div className="bg-orange-50 p-3 rounded-lg text-center">
          <div className="text-2xl font-bold text-orange-600">{gamesData.slotGames.length}</div>
          <div className="text-sm text-gray-600">Total Games</div>
        </div>
      </div>

      {/* Games Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredGames.map((game) => (
          <div key={game.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-gray-800 text-sm">{game.name}</h3>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getVolatilityColor(game.volatility)}`}>
                {game.volatility}
              </span>
            </div>

            <div className="space-y-1 text-xs text-gray-600">
              <p>
                <span className="font-medium">Provider:</span> {game.provider}
              </p>
              <p>
                <span className="font-medium">Theme:</span> {game.theme}
              </p>
              <p>
                <span className="font-medium">Max Win:</span> {game.maxWin}
              </p>
            </div>
          </div>
        ))}
      </div>

      {filteredGames.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No games found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}
