'use client'

import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';

const page = () => {
  const route = useRouter()
  const joinRoom = useMutation(api?.mutations?.joinRoom.joinRoom);
  const [roomName, setRoomName] = useState('');
  const [playerName, setPlayerName] = useState('');

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!playerName || !roomName) return alert("Name and room required.");

    try {
      const result = await joinRoom({ username: playerName, roomName });
      console.log("Room created:", result);
      route.push(`/user/${playerName}/room/${roomName}`);
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className='flex-grow w-full flex justify-center items-center'>
        <div className="bg-background border-[1px] border-foreground rounded-2xl shadow-xl p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold text-gray-600 mb-6 text-center">Create a Room</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="Name" className="block text-gray-400 font-medium mb-2">
                Your Name
              </label>
              <input
                type="text"
                id="Name"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                placeholder="Enter Your name"
                required
                className="w-full text-black px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-white"
              />
            </div>
            <div>
              <label htmlFor="roomName" className="block text-gray-400 font-medium mb-2">
                Room Name
              </label>
              <input
                type="text"
                id="roomName"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                placeholder="Enter room name"
                required
                className="w-full text-black px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-white"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-foreground border-[2px] border-gray-300  text-background hover:text-foreground py-2 rounded-md hover:bg-background transition duration-200"
            >
              Join Room
            </button>
          </form>
          <div className='w-full  mt-2 flex justify-center'>
            <Link href={`/`}>
              <p onClick={() => route.push(`/`)} className=' cursor-pointer hover:text-gray-400'>Create Room</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
