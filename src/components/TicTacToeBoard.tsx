'use client';

import React from 'react';

type Player = {
  username: string;
  // score: number;
};

type Props = {
  board: string[]; // ['X', '', 'O', ...]
  turn: string;    // 'X' or 'O'
  players: [Player, Player];
  onCellClick: (index: number) => void;
  playerName: string;
};

export default function TicTacToeBoard({ board, turn, players, onCellClick, playerName }: Props) {
  return (
    <div className="w-full max-w-md mx-auto bg-black border border-gray-300 rounded-2xl shadow-lg p-6 space-y-6">
      {/* Players and Scores */}
      <div className="flex justify-between items-center text-center">
        {players?.map((player, idx) => (
          <div key={idx} className="flex-1">
            <p className="text-gray-500 text-sm">{playerName === player?.username ? 'You' : `Player ${idx + 1}`}</p>
            <p className="font-semibold text-lg">{player?.username}</p>
            {/* <p className="text-sm text-gray-400">Score: {player.score}</p> */}
          </div>
        ))}
      </div>

      {/* Turn */}
      {players?.length > 1 &&
        <div className="text-center text-gray-600 font-medium text-md">
          {turn === 'X' ? playerName === players[0].username ? 'Your' : players[0].username : playerName === players[1].username ? 'Your' : players[1].username} Turn ({turn})
        </div>
      }

      {/* Board */}
      <div className="grid grid-cols-3 gap-2">
        {board?.map((cell, index) => (
          <button
            key={index}
            className="aspect-square w-full text-2xl font-bold border border-gray-400 rounded-lg hover:bg-gray-800 transition-all"
            onClick={() => onCellClick(index)}
            disabled={!!cell}
          >
            {cell}
          </button>
        ))}
      </div>
    </div>
  );
}
