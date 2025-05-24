'use client'

import { useMutation, useQuery } from 'convex/react'
import React, { useEffect, useState } from 'react'
import { api } from '../../../../../../convex/_generated/api'
import { useParams, useRouter } from 'next/navigation'
import TicTacToeBoard from '/src/components/TicTacToeBoard'

function checkWinner(board: string[]): "X" | "O" | "draw" | undefined {
  const winningCombos = [
    [0, 1, 2], // rows
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], // columns
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], // diagonals
    [2, 4, 6],
  ];

  for (const [a, b, c] of winningCombos) {
    if (
      board[a] &&
      board[a] === board[b] &&
      board[b] === board[c]
    ) {
      return board[a] as "X" | "O";
    }
  }

  // Check for draw
  if (board.every(cell => cell)) {
    return "draw";
  }

  return undefined;
}


const page = () => {
  const data = useParams()
  const roomName = data?.roomName as string;
  const playerName = data?.playerName as string;
  const room = useQuery(api.queries.getRoom.getRoom, { roomName: String(roomName) })
  const updateRoom = useMutation(api.mutations.updateRoom.updateRoom)
  const route = useRouter()
  const [draw, setDraw] = useState(false)

  useEffect(() => {
    if (room) {
      const isDraw = checkWinner(room?.board)
      if (isDraw === 'draw') {
        setDraw(true)
      }
    }
  }, [room])

  useEffect(() => {
    if (room === null) {
      route.push(`/`)
    }
  }, [room])

  const userClintOnBoard = async (index: number) => {
    if (room && room.turn !== 'X' ? playerName === room?.players[0]?.username : playerName === room?.players[1]?.username) {
      return
    }
    if (room?.winner) {
      return
    }
    if (room?.board !== undefined) {

      let board: string[] = room?.board
      board[index] = (room?.turn === 'X' ? 'X' : 'O')

      const winner = checkWinner(board)
      if (winner === 'draw') {
        setDraw(true)
      }

      try {
        await updateRoom({
          roomName,
          board,
          turn: room?.turn === 'X' ? 'O' : 'X',
          winner
        });
      } catch (err) {
        console.error("Failed to update room:", err);
      }
    }
  }

  const resetGame = async () => {
    try {
      await updateRoom({
        roomName,
        board: ["", "", "", "", "", "", "", "", ""],
        turn: room?.turn === 'X' ? 'O' : 'X',
        winner: ""
      });
    } catch (err) {
      console.error("Failed to update room:", err);
    }
  }


  return (
    <div className='relative w-screen min-h-screen flex justify-center items-center'>
      {room?.winner &&
        <div className='h-[100px] flex justify-center items-center flex-col gap-2 w-full bg-black absolute border-t-[1px] border-b-[1px] border-white'>
          {!draw &&
            <div>THE WINNER IS:{" "}
              <strong>
                {room && room.players?.length === 2 && room.winner
                  ? room.winner === "X"
                    ? room.players[0]?.username
                    : room.players[1]?.username
                  : "No winner yet"}
              </strong>
            </div>
          }
          {draw &&
            <div>The Match is{" "}
              <strong>
                Draw
              </strong>
            </div>
          }
          <button onClick={resetGame} className='px-4 py-1 bg-white text-black rounded-2xl hover:bg-gray-200'>Reset</button>
        </div>
      }
      <TicTacToeBoard
        board={room?.board as Array<string>}
        turn={room?.turn as string}
        players={room?.players as any}
        onCellClick={userClintOnBoard}
        playerName={playerName}
      />
    </div>
  )
}

export default page