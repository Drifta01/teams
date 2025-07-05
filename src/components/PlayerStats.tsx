"use client";

import { Player } from "../app/page";

interface StatsProps {
  players: Player[];
}

export default function PlayerStats({ players }: StatsProps) {
  if (players.length === 0) {
    return null;
  }

  const totalPlayers = players.length;
  const averageScore = players.reduce((sum, player) => sum + player.score, 0) / totalPlayers;
  const highestScore = Math.max(...players.map((p) => p.score));
  const biggestWin = Math.max(...players.map((p) => p.biggestWin));

  const gameStats = players.reduce((acc, player) => {
    acc[player.game] = (acc[player.game] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const mostPopularGame = Object.entries(gameStats).sort(([, a], [, b]) => b - a)[0];

  const teamStats = players.reduce((acc, player) => {
    acc[player.team] = (acc[player.team] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Statistics</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold text-blue-800 mb-2">Player Stats</h3>
          <p className="text-sm text-gray-600">
            Total Players: <span className="font-bold">{totalPlayers}</span>
          </p>
          <p className="text-sm text-gray-600">
            Average Score: <span className="font-bold">{averageScore.toFixed(2)}</span>
          </p>
          <p className="text-sm text-gray-600">
            Highest Score: <span className="font-bold">{highestScore}</span>
          </p>
          <p className="text-sm text-gray-600">
            Biggest Win: <span className="font-bold">{biggestWin}</span>
          </p>
        </div>

        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="font-semibold text-green-800 mb-2">Game Stats</h3>
          {mostPopularGame && (
            <p className="text-sm text-gray-600 mb-2">
              Most Popular: <span className="font-bold">{mostPopularGame[0]}</span>
            </p>
          )}
          <div className="space-y-1">
            {Object.entries(gameStats)
              .slice(0, 3)
              .map(([game, count]) => (
                <p key={game} className="text-xs text-gray-600">
                  {game}: {count}
                </p>
              ))}
          </div>
        </div>

        <div className="bg-purple-50 p-4 rounded-lg">
          <h3 className="font-semibold text-purple-800 mb-2">Team Stats</h3>
          <p className="text-sm text-gray-600 mb-2">
            Total Teams: <span className="font-bold">{Object.keys(teamStats).length}</span>
          </p>
          <div className="space-y-1">
            {Object.entries(teamStats)
              .slice(0, 3)
              .map(([team, count]) => (
                <p key={team} className="text-xs text-gray-600">
                  {team}: {count} players
                </p>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
