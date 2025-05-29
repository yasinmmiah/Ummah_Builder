import React, { useState, useEffect } from 'react';
import { Clock, Check } from 'lucide-react';
import { Prayer } from '../types';

interface PrayerReminderProps {
  prayers: Prayer[];
  onPrayerComplete: (prayerName: string) => void;
}

const PrayerReminder: React.FC<PrayerReminderProps> = ({ prayers, onPrayerComplete }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showReminder, setShowReminder] = useState(false);
  const [currentPrayer, setCurrentPrayer] = useState<Prayer | null>(null);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute
    
    return () => clearInterval(timer);
  }, []);
  
  useEffect(() => {
    // Find the next prayer that hasn't been completed
    const nextPrayer = prayers.find(prayer => !prayer.completed);
    
    if (nextPrayer) {
      const prayerTime = new Date();
      const [hours, minutes] = nextPrayer.time.split(':').map(Number);
      prayerTime.setHours(hours, minutes, 0);
      
      // Show reminder if within 15 minutes of prayer time
      const timeDiff = Math.abs(prayerTime.getTime() - currentTime.getTime());
      if (timeDiff <= 15 * 60 * 1000) {
        setShowReminder(true);
        setCurrentPrayer(nextPrayer);
      } else {
        setShowReminder(false);
      }
    }
  }, [prayers, currentTime]);
  
  if (!showReminder || !currentPrayer) return null;
  
  return (
    <div className="fixed bottom-20 right-4 md:bottom-4 bg-white rounded-lg shadow-lg p-4 max-w-xs z-50 animate-pulse">
      <div className="flex items-start">
        <Clock className="w-6 h-6 text-primary-500 mr-2 flex-shrink-0" />
        <div>
          <h3 className="font-medium text-primary-800">{currentPrayer.name} Prayer Time</h3>
          <p className="text-sm text-gray-600 mt-1">It's time for {currentPrayer.name} prayer. Don't forget to pray!</p>
          <button 
            className="mt-2 btn btn-primary text-sm py-1 px-3"
            onClick={() => {
              onPrayerComplete(currentPrayer.name);
              setShowReminder(false);
            }}
          >
            <Check className="w-4 h-4 mr-1 inline" />
            Mark as Completed
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrayerReminder;