"use client";

import gamesData from "../../game-data/games.json";

export default function ProviderInfo() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">🏢 Game Providers</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {gamesData.providers.map((provider) => {
          const providerGames = gamesData.slotGames.filter((game) => game.provider === provider.name);

          return (
            <div
              key={provider.name}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-gray-800">{provider.name}</h3>
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                  {providerGames.length} games
                </span>
              </div>

              <p className="text-sm text-gray-600 mb-3">{provider.description}</p>

              <div className="space-y-1">
                <p className="text-xs font-medium text-gray-700">Popular Games:</p>
                <div className="flex flex-wrap gap-1">
                  {providerGames.slice(0, 3).map((game) => (
                    <span key={game.id} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                      {game.name}
                    </span>
                  ))}
                  {providerGames.length > 3 && (
                    <span className="text-xs text-gray-500">+{providerGames.length - 3} more</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
