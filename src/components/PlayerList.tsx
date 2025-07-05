"use client";

import { useState } from "react";
import { Player } from "../app/page";

interface PlayerListProps {
  players: Player[];
  onDeletePlayer: (id: string) => void;
  onUpdatePlayer: (id: string, player: Omit<Player, "id">) => void;
}

export default function PlayerList({ players, onDeletePlayer, onUpdatePlayer }: PlayerListProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<Omit<Player, "id">>({
    playerId: "",
    game: "",
    score: 0,
    biggestWin: 0,
    team: "",
    winnings: "",
  });

  const handleEdit = (player: Player) => {
    setEditingId(player.id);
    setEditFormData({
      playerId: player.playerId,
      game: player.game,
      score: player.score,
      biggestWin: player.biggestWin,
      team: player.team,
      winnings: player.winnings,
    });
  };

  const handleSave = () => {
    if (editingId) {
      onUpdatePlayer(editingId, editFormData);
      setEditingId(null);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: name === "score" || name === "biggestWin" ? parseFloat(value) : value,
    }));
  };

  if (players.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Players List</h2>
        <p className="text-gray-500 text-center py-8">No players added yet. Add your first player!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Players List ({players.length})</h2>

      <div className="space-y-4">
        {players.map((player) => (
          <div key={player.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            {editingId === player.id ? (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    name="playerId"
                    value={editFormData.playerId}
                    onChange={handleChange}
                    className="px-2 py-1 border border-gray-300 rounded text-sm"
                    placeholder="Player ID"
                  />
                  <select
                    name="game"
                    value={editFormData.game}
                    onChange={handleChange}
                    className="px-2 py-1 border border-gray-300 rounded text-sm"
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

                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="number"
                    name="score"
                    value={editFormData.score}
                    onChange={handleChange}
                    className="px-2 py-1 border border-gray-300 rounded text-sm"
                    placeholder="Score"
                    step="0.01"
                  />
                  <input
                    type="number"
                    name="biggestWin"
                    value={editFormData.biggestWin}
                    onChange={handleChange}
                    className="px-2 py-1 border border-gray-300 rounded text-sm"
                    placeholder="Biggest Win"
                    step="0.01"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    name="team"
                    value={editFormData.team}
                    onChange={handleChange}
                    className="px-2 py-1 border border-gray-300 rounded text-sm"
                    placeholder="Team"
                  />
                  <input
                    type="text"
                    name="winnings"
                    value={editFormData.winnings}
                    onChange={handleChange}
                    className="px-2 py-1 border border-gray-300 rounded text-sm"
                    placeholder="Winnings"
                  />
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={handleSave}
                    className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className="px-3 py-1 bg-gray-600 text-white rounded text-sm hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-lg text-gray-800">{player.playerId}</h3>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(player)}
                      className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDeletePlayer(player.id)}
                      className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-600">Game:</span> {player.game}
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Team:</span> {player.team}
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Score:</span> {player.score}
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Biggest Win:</span> {player.biggestWin}
                  </div>
                  <div className="col-span-2">
                    <span className="font-medium text-gray-600">Winnings:</span> {player.winnings}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
