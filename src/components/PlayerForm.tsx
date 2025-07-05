"use client";

import { useState } from "react";
import { Player } from "../app/page";

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
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Player</h2>

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
            Game
          </label>
          <select
            id="game"
            name="game"
            value={formData.game}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select a game</option>
            <option value="Counter-Strike">Counter-Strike</option>
            <option value="League of Legends">League of Legends</option>
            <option value="Valorant">Valorant</option>
            <option value="Dota 2">Dota 2</option>
            <option value="Overwatch">Overwatch</option>
            <option value="Apex Legends">Apex Legends</option>
            <option value="Fortnite">Fortnite</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label htmlFor="score" className="block text-sm font-medium text-gray-700 mb-1">
            Current Score
          </label>
          <input
            type="number"
            id="score"
            name="score"
            value={formData.score}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter current score"
            step="0.01"
            required
          />
        </div>

        <div>
          <label htmlFor="biggestWin" className="block text-sm font-medium text-gray-700 mb-1">
            Biggest Win
          </label>
          <input
            type="number"
            id="biggestWin"
            name="biggestWin"
            value={formData.biggestWin}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter biggest win"
            step="0.01"
            required
          />
        </div>

        <div>
          <label htmlFor="team" className="block text-sm font-medium text-gray-700 mb-1">
            Team
          </label>
          <input
            type="text"
            id="team"
            name="team"
            value={formData.team}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter team name"
            required
          />
        </div>

        <div>
          <label htmlFor="winnings" className="block text-sm font-medium text-gray-700 mb-1">
            Winnings
          </label>
          <input
            type="text"
            id="winnings"
            name="winnings"
            value={formData.winnings}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter winnings (e.g., $500, Trophy, etc.)"
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
