"use client";

import { useState } from "react";
import { Player } from "../page";
import gamesData from "../../game-data/games.json";

interface PlayerFormProps {
  onAddPlayer: (player: Omit<Player, "id">) => void;
}

export default function PlayerForm({ onAddPlayer }: PlayerFormProps) {
  const [formData, setFormData] = useState({
    playerId: "",
    game: "",
    score: "",
    biggestWin: "",
    team: "",
    winnings: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.playerId ||
      !formData.game ||
      !formData.score ||
      !formData.biggestWin ||
      !formData.team ||
      !formData.winnings
    ) {
      alert("Please fill in all fields");
      return;
    }

    onAddPlayer({
      playerId: formData.playerId,
      game: formData.game,
      score: parseFloat(formData.score),
      biggestWin: parseFloat(formData.biggestWin),
      team: formData.team,
      winnings: formData.winnings,
    });

    // Reset form
    setFormData({
      playerId: "",
      game: "",
      score: "",
      biggestWin: "",
      team: "",
      winnings: "",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">🎰 Add New Slot Player</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="playerId" className="block text-sm font-medium text-gray-700 mb-1">
            Player ID
          </label>
          <input
            type="text"
            id="playerId"
            name="playerId"
            value={formData.playerId}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter player ID"
            required
          />
        </div>

        <div>
          <label htmlFor="game" className="block text-sm font-medium text-gray-700 mb-1">
            Slot Game
          </label>
          <select
            id="game"
            name="game"
            value={formData.game}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select a slot game</option>
            {gamesData.slotGames.map((game) => (
              <option key={game.id} value={game.name}>
                {game.name} ({game.provider})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="score" className="block text-sm font-medium text-gray-700 mb-1">
            Current Balance ($)
          </label>
          <input
            type="number"
            id="score"
            name="score"
            value={formData.score}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter current balance"
            step="0.01"
            required
          />
        </div>

        <div>
          <label htmlFor="biggestWin" className="block text-sm font-medium text-gray-700 mb-1">
            Biggest Win ($)
          </label>
          <input
            type="number"
            id="biggestWin"
            name="biggestWin"
            value={formData.biggestWin}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter biggest win amount"
            step="0.01"
            required
          />
        </div>

        <div>
          <label htmlFor="team" className="block text-sm font-medium text-gray-700 mb-1">
            Casino/Platform
          </label>
          <input
            type="text"
            id="team"
            name="team"
            value={formData.team}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter casino or platform name"
            required
          />
        </div>

        <div>
          <label htmlFor="winnings" className="block text-sm font-medium text-gray-700 mb-1">
            Prize/Reward
          </label>
          <input
            type="text"
            id="winnings"
            name="winnings"
            value={formData.winnings}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter prize or reward (e.g., $500, Free Spins, etc.)"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        >
          Add Player
        </button>
      </form>
    </div>
  );
}
