"use client";

import { useState } from "react";
import PlayerForm from "./components/PlayerForm";
import PlayerList from "./components/PlayerList";
import PlayerStats from "./components/PlayerStats";
import GameBrowser from "./components/GameBrowser";
import ProviderInfo from "./components/ProviderInfo";
import GameCategories from "./components/GameCategories";

export interface Player {
  id: string;
  playerId: string;
  game: string;
  score: number;
  biggestWin: number;
  team: string;
  winnings: string;
}

export default function Home() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [activeTab, setActiveTab] = useState<string>("players");

  const addPlayer = (player: Omit<Player, "id">) => {
    const newPlayer: Player = {
      ...player,
      id: Date.now().toString(),
    };
    setPlayers([...players, newPlayer]);
  };

  const deletePlayer = (id: string) => {
    setPlayers(players.filter((player) => player.id !== id));
  };

  const updatePlayer = (id: string, updatedPlayer: Omit<Player, "id">) => {
    setPlayers(players.map((player) => (player.id === id ? { ...updatedPlayer, id } : player)));
  };

  const tabs = [
    { id: "players", label: "👥 Players", icon: "👥" },
    { id: "games", label: "🎰 Games", icon: "🎰" },
    { id: "providers", label: "🏢 Providers", icon: "🏢" },
    { id: "categories", label: "📊 Categories", icon: "📊" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          🎰 Casino Slot Players Management System 🎰
        </h1>

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 justify-center">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "players" && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <PlayerForm onAddPlayer={addPlayer} />
              </div>

              <div>
                <PlayerList players={players} onDeletePlayer={deletePlayer} onUpdatePlayer={updatePlayer} />
              </div>
            </div>
            <PlayerStats players={players} />
          </>
        )}

        {activeTab === "games" && <GameBrowser />}

        {activeTab === "providers" && <ProviderInfo />}

        {activeTab === "categories" && <GameCategories />}
      </div>
    </div>
  );
}
