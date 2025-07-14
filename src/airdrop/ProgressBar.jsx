import React, { useState, useEffect } from "react";
import LodgifiersBar from "./LodgifiersBar";

// League Config - Updated to match the reference image
const leagues = [
    {
      name: "Wood League",
      min: 0,
      max: 9999,
      image: "/Wood League.png",
      color: "from-amber-800 to-amber-900", // Wood color
    },
    {
      name: "Copper League",
      min: 10000,
      max: 299999,
      image: "/Copper League.png",
      color: "from-orange-600 to-orange-700", // Copper color
    },
    {
      name: "Bronze League",
      min: 300000,
      max: 1499999,
      image: "/Bronze League.png",
      color: "from-amber-600 to-amber-700", // Bronze color
    },
    {
      name: "Silver League",
      min: 1500000,
      max: 4999999,
      image: "/Silver League.png",
      color: "from-gray-400 to-gray-500", // Silver color
    },
    {
      name: "Gold League",
      min: 5000000,
      max: 9999999,
      image: "/Gold League.png",
      color: "from-yellow-400 to-yellow-500", // Gold color
    },
    {
      name: "Platinum League",
      min: 10000000,
      max: 24999999,
      image: "/Platinum League.png",
      color: "from-gray-300 to-gray-400", // Platinum color
    },
    {
      name: "Diamond League",
      min: 25000000,
      max: 74999999,
      image: "/Diamond League.png",
      color: "from-blue-400 to-blue-500", // Diamond color
    },
    {
      name: "Purple Diamond League",
      min: 75000000,
      max: 149999999,
      image: "/Purple Diamond League.png",
      color: "from-purple-400 to-purple-500", // Master color
    }
  ];

const getLeague = (points) => {
  return leagues.find((league) => points >= league.min && points <= league.max);
};

export default function LodgifierProgress({ points = 78200000 }) {
  // Get the actual league based on points
  const actualLeague = getLeague(points);
  const actualLeagueIdx = leagues.findIndex(l => l === actualLeague);
  
  // Separate state for carousel and actual progress
  const [selectedLeagueIdx, setSelectedLeagueIdx] = useState(actualLeagueIdx);
  const selectedLeague = leagues[selectedLeagueIdx];
  
  // Calculate progress for the ACTUAL league (not carousel selected)
  const calculateProgress = (pts, league) => {
    let progress = 0;
    if (league.max === Infinity) {
      // For the highest league, calculate progress relative to the next milestone
      const MILESTONE_INCREMENT = 50000000; // 50M points increment for legendary
      const pointsAboveMin = pts - league.min;
      progress = ((pointsAboveMin % MILESTONE_INCREMENT) / MILESTONE_INCREMENT) * 100;
    } else {
      // Calculate progress within the current league range
      const leagueRange = league.max - league.min + 1; // +1 to include the max value
      const pointsInLeague = pts - league.min;
      progress = (pointsInLeague / leagueRange) * 100;
    }
    return Math.max(0, Math.min(progress, 100));
  };

  const actualProgress = calculateProgress(points, actualLeague);
  
  // Animated progress state
  const [animatedProgress, setAnimatedProgress] = useState(0);
  
  // Reset animation when points or actual league changes
  useEffect(() => {
    setAnimatedProgress(0);
    const duration = 800; // ms
    const startTime = performance.now();
    
    function animate(now) {
      const elapsed = now - startTime;
      const percent = Math.min(elapsed / duration, 1);
      
      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - percent, 3);
      const currentProgress = easeOut * actualProgress;
      
      setAnimatedProgress(currentProgress);
      
      if (percent < 1) {
        requestAnimationFrame(animate);
      } else {
        setAnimatedProgress(actualProgress);
      }
    }
    
    // Start animation only if actualProgress > 0
    if (actualProgress > 0) {
      requestAnimationFrame(animate);
    } else {
      setAnimatedProgress(0);
    }
  }, [actualProgress]); // Remove points dependency to avoid unnecessary re-renders
  
  // Debug logging
  console.log('Actual League Index:', actualLeagueIdx);
  console.log('Selected League Index:', selectedLeagueIdx);
  console.log('Current League:', actualLeague.name);
  console.log('Actual Progress:', actualProgress);
  console.log('Points:', points);

  // Carousel state for LodgifiersBar - synced with selected league
  const totalLodgifiers = 7250; // Updated for 10 leagues
  const [lodgifierIndex, setLodgifierIndex] = useState(selectedLeagueIdx * 725);

  // Sync LodgifiersBar with selected league changes
  useEffect(() => {
    setLodgifierIndex(selectedLeagueIdx * 725);
  }, [selectedLeagueIdx]);

  const handleLodgifierPrev = () => {
    setLodgifierIndex((prev) => (prev - 1 + totalLodgifiers) % totalLodgifiers);
  };
  
  const handleLodgifierNext = () => {
    setLodgifierIndex((prev) => (prev + 1) % totalLodgifiers);
  };

  const handleLeaguePrev = () => {
    setSelectedLeagueIdx((prev) => (prev - 1 + leagues.length) % leagues.length);
  };
  
  const handleLeagueNext = () => {
    setSelectedLeagueIdx((prev) => (prev + 1) % leagues.length);
  };

  // Calculate lodgifiers count based on selected league
  const getLodgifiersForLeague = () => {
    const baseCount = 725; // Base count per league
    return Math.floor((selectedLeagueIdx + 1) * baseCount);
  };

  // Determine if we're showing the actual league or a different one
  const isShowingActualLeague = selectedLeagueIdx === actualLeagueIdx;

  return (
    <div className="bg-transparent text-white p-6 rounded-xl flex flex-col items-center space-y-5">
      {/* LodgifiersBar with carousel functionality synced with selected league */}
      <LodgifiersBar 
        onPrev={handleLodgifierPrev}
        onNext={handleLodgifierNext}
        currentIndex={lodgifierIndex}
        totalItems={getLodgifiersForLeague()}
        visibleItems={3}
      />

      {/* League Badge and Progress Bar as a carousel */}
      <div className="flex flex-col items-center space-y-3 w-full max-w-sm bg-gradient-to-r from-[#29113e] to-[#1B0B29] border border-white/10 p-6 rounded-xl">
        <div className="flex items-center justify-between w-full mb-2">
          <button className="text-white text-2xl px-2 hover:text-yellow-300 transition-colors" onClick={handleLeaguePrev}>&#8592;</button>
          
          {/* League Badge Container with dynamic background */}
          <div className={`w-36 h-36 rounded-full bg-gradient-to-br ${selectedLeague.color} p-1 shadow-lg`}>
            <div className="w-full h-full rounded-full bg-black/20 flex items-center justify-center">
              <img src={selectedLeague.image} alt="League Badge" className="w-28 h-28 object-contain" />
            </div>
          </div>
          
          <button className="text-white text-2xl px-2 hover:text-yellow-300 transition-colors" onClick={handleLeagueNext}>&#8594;</button>
        </div>
        
        <h3 className="text-xl font-bold text-center w-full text-white">{selectedLeague.name}</h3>
        
        {/* Show indicator if this is not the actual league */}
        {!isShowingActualLeague && (
          <div className="text-yellow-400 text-xs text-center">
            (Your actual league: {actualLeague.name})
          </div>
        )}
        
        <div className="w-full flex justify-center">
          <span className="text-gray-400 text-sm text-center w-full break-words whitespace-normal block overflow-visible" style={{wordBreak: 'break-word'}}>
            League {selectedLeagueIdx + 1} of {leagues.length}
          </span>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full">
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>Min: {selectedLeague.min.toLocaleString()}</span>
            <span>
              {isShowingActualLeague 
                ? `Progress: ${animatedProgress.toFixed(1)}%` 
                : `Your Progress: ${actualProgress.toFixed(1)}%`
              }
            </span>
            <span>Max: {selectedLeague.max === Infinity ? '∞' : selectedLeague.max.toLocaleString()}</span>
          </div>
          
          <div className="bg-gradient-to-r from-[#1B0B29] to-[#29113e] border border-white/10 h-4 rounded-full">
            <div
              className={`bg-gradient-to-r ${selectedLeague.color} h-4 rounded-full transition-all duration-500 shadow-sm`}
              style={{ 
                width: isShowingActualLeague 
                  ? `${animatedProgress}%` 
                  : `${calculateProgress(points, selectedLeague)}%` 
              }}
            ></div>
          </div>
          
          <p className="text-center text-sm mt-1 text-white">
            {points.toLocaleString()} points 
            {isShowingActualLeague 
              ? ` in ${selectedLeague.name}` 
              : ` (currently in ${actualLeague.name})`
            }
          </p>
        </div>
      </div>
    </div>
  );
}