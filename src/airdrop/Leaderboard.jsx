import React from "react";
import { FaMedal, FaCoins } from "react-icons/fa";
import { Link } from "react-router-dom";
import LodgifierProgress from "./ProgressBar";

const leaderboardData = [
  { rank: 1, name: "Stanley", coins: 99876, avatar: "https://via.placeholder.com/40", medal: "gold" },
  { rank: 2, name: "Debbie343", coins: 97876, avatar: "https://via.placeholder.com/40", medal: "silver" },
  { rank: 3, name: "Derick", coins: 96876, avatar: "https://via.placeholder.com/40", medal: "bronze" },
  { rank: 4, name: "Dickson", coins: 92876, avatar: "https://via.placeholder.com/40" },
  { rank: 5, name: "Shola143", coins: 92476, avatar: "https://via.placeholder.com/40" },
  { rank: 6, name: "Ifanyi3223", coins: 91373, avatar: "https://via.placeholder.com/40" },
  { rank: 7, name: "Nonye", coins: 91174, avatar: "https://via.placeholder.com/40" },
  { rank: 8, name: "David regan", coins: 91143, avatar: "https://via.placeholder.com/40" },
  { rank: 9, name: "Austin43", coins: 91140, avatar: "https://via.placeholder.com/40" },
  { rank: 10, name: "Ifeanyi3223", coins: 90246, avatar: "https://via.placeholder.com/40" },
];

const getMedalIcon = (type) => {
  const colorMap = {
    gold: "text-yellow-500",
    silver: "text-gray-300",
    bronze: "text-amber-700",
  };
  return <FaMedal className={`text-xl ${colorMap[type]}`} />;
};

const getRankIcon = (rank) => {
  if (rank === 1) {
    return <img src="/1stcoin.png" alt="1st Place Coin" className="w-6 h-6" />;
  } else if (rank === 2) {
    return <img src="/2ndcoin.png" alt="2nd Place Coin" className="w-6 h-6" />;
  } else if (rank === 3) {
    return <img src="/3rdcoin.png" alt="3rd Place Coin" className="w-6 h-6" />;
  } else {
    return <span className="text-gray-400 bg-gray-700 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium">{rank}</span>;
  }
};

const getCoinIcon = (rank) => {
  if (rank === 1) {
    return <img src="/1stcoin.png" alt="1st Place Coin" className="w-5 h-5" />;
  } else if (rank === 2) {
    return <img src="/2ndcoin.png" alt="2nd Place Coin" className="w-5 h-5" />;
  } else if (rank === 3) {
    return <img src="/3rdcoin.png" alt="3rd Place Coin" className="w-5 h-5" />;
  } else {
    return <FaCoins className="text-yellow-400" />;
  }
};

export default function Leaderboard() {
  return (
    <div className="max-w-md mx-auto p-4 bg-transparent text-white rounded-xl shadow-lg">
      {/* Back Button */}
      <div className="mb-4">
        <Link
          to="/airdrop/invite"
          className="flex items-center text-white/80 hover:text-white text-sm font-medium"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Invite
        </Link>
      </div>
      
        <LodgifierProgress points={900}/>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-white">Lodgifiers</h2>
        <div className="bg-gradient-to-r from-[#29113e] to-[#1B0B29] border border-white/10 px-3 py-1 rounded-full text-sm text-white">Day</div>
      </div>
      <ul className="space-y-3">
        {leaderboardData.map((user, index) => (
          <li
            key={index}
            className="flex items-center justify-between bg-gradient-to-r from-[#29113e] to-[#1B0B29] border border-white/10 p-3 rounded-lg hover:bg-gradient-to-r hover:from-[#3a1a4f] hover:to-[#2a1a3a] transition-all"
          >
            <div className="flex items-center space-x-3">
              {user.medal ? getRankIcon(user.rank) : getRankIcon(user.rank)}
              <img
                src={user.avatar}
                alt={user.name}
                className="w-10 h-10 rounded-full border border-white/20"
              />
              <span className="text-white">{user.name}</span>
            </div>
            <div className="flex items-center space-x-1 text-yellow-400">
              <img src="/lodify-coin.png" alt="Lodify Coin" className="w-5 h-5" />
              <span>{user.coins}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}