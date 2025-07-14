import React, { useState } from 'react';
import { Link, Outlet, useNavigate } from "react-router-dom";
import InviteNav from "./InviteNav";
import Tasks from './Tasks.jsx'
import MessageBar from "./MessageBar";
import CheckIn from "./CheckIn";
import CopyLink from './CopyLink';
import { motion } from 'framer-motion';
import FriendsSection from './FriendsSection';
import Button from '../Button';

export default function InvitePage({ 
  title = "Invite Your Friends!", 
  message = "Share your invite link to earn rewards." 
}) {
  const [activeSection, setActiveSection] = useState('tasks'); // 'tasks' or 'friends'
  const navigate = useNavigate();
  const CheckinArray = [
    { day: 1, number: 1000, paid: true, confirmed: false },
    { day: 2, number: 700, paid: false, confirmed: false },
    { day: 3, number: 1000, paid: false, confirmed: false },
    { day: 4, number: 1500, paid: false, confirmed: false },
    { day: 5, number: 1800, paid: false, confirmed: false },
    { day: 6, number: 2000, paid: false, confirmed: false },
    { day: 7, number: 2300, paid: false, confirmed: false },
    { day: 8, number: 3000, paid: false, confirmed: false },
    { day: 9, number: 3500, paid: false, confirmed: false },
    { day: 10, number: 4000, paid: false, confirmed: false },
    { day: 11, number: 5000, paid: false, confirmed: true },
  ];

  return (
    <div className="w-full min-h-full bg-transparent relative z-[100] overflow-x-hidden">
      {/* <Outlet /> removed */}
      <InviteNav />
      <div className="container mx-auto px-4">
        <motion.div
          className='pt-48 md:pt-48'
          initial={{ opacity: 0, y: -50 }}
          animate={{ 
            opacity: 1,
            y: 0
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 10,
            bounce: 0.5,
            duration: 1
          }}
        >
          {/* Points Section */}
          <div className="text-center">
            <motion.img 
              src="/coin.png" 
              alt="Points Coin" 
              className="w-40 md:w-60 mx-auto mb-4 transform -rotate-20"
              style={{
                filter: `
                  drop-shadow(0 0 30px rgba(255, 215, 0, 0.4))
                  drop-shadow(0 0 30px rgba(255, 215, 0, 0.4))
                `
              }}
              whileHover={{ scale: [1, 1.2, 1, 1.2] }}
              transition={{ duration: 1 }}
            />
            <p className="text-white text-lg md:text-xl font-semibold mb-2 pt-6 md:pt-10">
              Total Point Balance
            </p>
            <h1 className="text-white text-3xl md:text-4xl font-extrabold mb-8 md:mb-16">
              4,800
            </h1>
          </div>
          {/* Daily Check-in Section */}
          <h2 className="text-white text-3xl md:text-5xl font-bold text-center mb-4 md:mb-6 pt-4 md:pt-8">
            Daily Check-In
          </h2>
          <div className="max-w-4xl mx-auto px-2 md:px-4">
            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-4">
              {CheckinArray.map((item, index) => (
                <CheckIn key={index} item={item} index={index} />
              ))}
            </div>
          </div>
          <div className="w-full h-[2px] bg-transparent my-6 md:my-8" />
          
          <CopyLink />
          {/* Referral Message */}
          <div className=' mx-auto w-10/12 bg-gradient-to-r from-[#29113e] to-[#1B0B29] rounded-lg px-4 md:px-20 py-6 md:py-10 max-w-9xl my-5'>
            <h1 className="text-lg md:text-xl font-bold text-yellow-500 mb-2">
              {title}
            </h1>
            <p className="text-white/90 text-xs md:text-sm mt-3">
              {message}
            </p>
          </div>
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-6xl mx-auto mt-10 md:mt-20 px-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 10
              }}
              className="w-full sm:w-auto"
            >
              <button
                onClick={() => setActiveSection('friends')}
                className={`bg-transparent text-xl md:text-2xl text-white font-semibold py-2 px-6 rounded-lg hover:bg-white/10 transition-colors block text-center border border-white ${activeSection === 'friends' ? 'bg-white/10' : ''}`}
              >
                Invite Friends
              </button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 10
              }}
              className="w-full sm:w-auto"
            >
              <button
                onClick={() => setActiveSection('tasks')}
                className={`bg-transparent text-xl md:text-2xl text-white font-semibold py-2 px-6 rounded-lg border border-white hover:bg-white/10 transition-colors block text-center ${activeSection === 'tasks' ? 'bg-white/10' : ''}`}
              >
                Tasks
              </button>
            </motion.div>
          </div>

          {/* Toggle Section */}
          {activeSection === 'tasks' && <Tasks />}
          {activeSection === 'friends' && <FriendsSection />}
        </motion.div>
      </div>
    </div>
  );
}
