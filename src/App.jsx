import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AirdropHome from './airdrop/AirdropHome.jsx'
import AirdropSignup from './airdrop/AirdropSignup.jsx'
import Login from './airdrop/AirdropSignin.jsx'
import FriendsSection from './airdrop/FriendsSection.jsx'
import AirdropOtpVerify from './airdrop/AirdropOtpVerify.jsx'
import VerifyEmail from './airdrop/AirdropVerifyPassword.jsx'
import InviteFriends from './airdrop/InviteFriends.jsx'
import InvitePage from './airdrop/InvitePage.jsx'
import Leaderboard from './airdrop/Leaderboard.jsx'
const App = () => {
  return (
    <div className="bg-[#1B0B29] min-h-screen relative font-main">
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.1)_2px,transparent_2px)] bg-[length:20px_20px] [mask-image:linear-gradient(to_bottom,white,transparent_120vh)]" />
      <div className="relative z-10 mx-auto pb-5">
          <Routes>
            <Route path="/" element={<AirdropHome />} />
            <Route path="/airdrop/*" element={<InviteFriends />} >
              <Route path="invite" element={ <FriendsSection /> }/>
            </Route>
            {/* Waitlist routes */}
            {/* <Route path="/waitlist" element={<InvitePage />} /> */}
            <Route path="/waitlist/signup" element={<AirdropSignup />} />
            <Route path="/waitlist/leaderboard" element={<Leaderboard />} />
            <Route path="/waitlist/signin" element={<Login />} />
            <Route path="/waitlist/dashboard" element={<FriendsSection />} />
            <Route path="/waitlist/tasks" element={<InviteFriends />} />
            {/* Auth/Verification */}
            <Route path="/otp-verify" element={<AirdropOtpVerify />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="*" element={<AirdropHome />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;