import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import ResourceBar from './components/ResourceBar';
import PrayerReminder from './components/PrayerReminder';
import Home from './pages/Home';
import Village from './pages/Village';
import Learn from './pages/Learn';
import Leaderboard from './pages/Leaderboard';
import Profile from './pages/Profile';
import { Prayer } from './types';

function App() {
  const [resources, setResources] = useState({
    coins: 250,
    knowledge: 180,
    virtuePoints: 120
  });
  
  const [prayers, setPrayers] = useState<Prayer[]>([
    { name: 'Fajr', time: '05:30', completed: false },
    { name: 'Dhuhr', time: '12:30', completed: false },
    { name: 'Asr', time: '16:00', completed: false },
    { name: 'Maghrib', time: '19:15', completed: false },
    { name: 'Isha', time: '21:00', completed: false }
  ]);
  
  const handlePrayerComplete = (prayerName: string) => {
    setPrayers(prayers.map(prayer => 
      prayer.name === prayerName 
        ? { ...prayer, completed: true } 
        : prayer
    ));
    
    // Reward player for completing prayer
    setResources({
      ...resources,
      virtuePoints: resources.virtuePoints + 10
    });
  };
  
  // Simulate resource generation over time
  useEffect(() => {
    const timer = setInterval(() => {
      setResources(prev => ({
        coins: prev.coins + 1,
        knowledge: prev.knowledge + 0.5,
        virtuePoints: prev.virtuePoints + 0.2
      }));
    }, 10000); // Every 10 seconds
    
    return () => clearInterval(timer);
  }, []);
  
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 pb-16 md:pb-0 md:pl-16">
        <Navigation />
        <ResourceBar 
          coins={Math.floor(resources.coins)} 
          knowledge={Math.floor(resources.knowledge)} 
          virtuePoints={Math.floor(resources.virtuePoints)} 
        />
        <PrayerReminder prayers={prayers} onPrayerComplete={handlePrayerComplete} />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/village" element={<Village />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;