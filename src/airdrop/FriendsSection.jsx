import React from 'react'
import { motion } from 'framer-motion'
import InvitePage from './InvitePage'
import { Outlet } from 'react-router-dom'
import Button from '../Button';

export default function FriendsSection() {
  const dataArray = [
    { 
      email: "user1@example.com", 
      coinAmount: 100, 
      coinReward: 10 
    },
    { 
      email: "user2@example.com", 
      coinAmount: 200, 
      coinReward: 20 
    },
    { 
      email: "user3@example.com", 
      coinAmount: 300, 
      coinReward: 30 
    },
  ]

  return (
    <div className="w-10/12 mx-auto relative min-h-screen pb-10 ">

      {/* Content */}
      <div className="relative z-10">
       {/* <Outlet /> */}

        {/* Friends List Card */}
        <div className="max-w-5xl mx-auto rounded-2xl bg-gradient-to-br from-[#2B123F] to-[#1B0B29] mt-10 py-12 px-20">
          {dataArray.map((item, index) => (
            <div 
              key={index} 
              className="border-b border-white/20 p-6"
            >
              <div className="flex items-center justify-between mb-2">
                <p className="text-white font-medium">
                  {item.email}
                </p>
                <span className="flex items-center gap-2">
                  <img 
                    src="/coin.png" 
                    alt="Coin" 
                    className="w-4 h-4 object-contain" 
                  />
                  <p className="text-white text-sm">
                    {item.coinAmount}
                  </p>
                </span>
              </div>
              
              <div className="flex items-center text-xs text-gray-300">
                <p>1 invited:</p>
                <span className="flex items-center gap-1 ml-2">
                  <img 
                    src="/coin.png" 
                    alt="Coin" 
                    className="w-2 h-2 object-contain" 
                  />
                  {item.coinReward}
                </span>
              </div>
            </div>
          ))}

          {/* Invite Button */}
          <div className="mt-16 text-center">
            <Button>
              Invite Friends
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}