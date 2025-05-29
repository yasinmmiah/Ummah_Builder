import React, { useState } from 'react';
import { Award, Users, Heart, Trophy, Search } from 'lucide-react';
import { LeaderboardEntry } from '../types';

const Leaderboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'individual' | 'community'>('individual');
  const [searchTerm, setSearchTerm] = useState('');
  
  const leaderboardData: LeaderboardEntry[] = [
    { userId: '1', userName: 'Ahmad', avatar: '👨‍🦱', virtuePoints: 1250, level: 8 },
    { userId: '2', userName: 'Fatima', avatar: '👩‍🦱', virtuePoints: 980, level: 7 },
    { userId: '3', userName: 'Mohammed', avatar: '👨‍🦲', virtuePoints: 870, level: 6 },
    { userId: '4', userName: 'Aisha', avatar: '👩', virtuePoints: 760, level: 5 },
    { userId: '5', userName: 'Yusuf', avatar: '👨', virtuePoints: 650, level: 5 },
    { userId: '6', userName: 'Khadija', avatar: '👩‍🦰', virtuePoints: 540, level: 4 },
    { userId: '7', userName: 'Ibrahim', avatar: '👨‍🦳', virtuePoints: 430, level: 3 },
    { userId: '8', userName: 'Zainab', avatar: '👩‍🦳', virtuePoints: 320, level: 2 },
    { userId: '9', userName: 'Omar', avatar: '👳‍♂️', virtuePoints: 210, level: 2 },
    { userId: '10', userName: 'Maryam', avatar: '🧕', virtuePoints: 100, level: 1 },
  ];
  
  const communityGoals = [
    { id: '1', name: 'Build Grand Mosque', progress: 75, target: 10000, current: 7500 },
    { id: '2', name: 'Community Iftar', progress: 40, target: 5000, current: 2000 },
    { id: '3', name: 'Islamic Library', progress: 25, target: 8000, current: 2000 },
    { id: '4', name: 'Charity Drive', progress: 90, target: 3000, current: 2700 },
  ];
  
  const filteredLeaderboard = leaderboardData.filter(entry => 
    entry.userName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="container mx-auto px-4 py-8 pt-16 md:pl-24 md:pr-8">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl text-primary-800 mb-2">Leaderboard</h1>
        <p className="text-gray-600">See how you rank among the community</p>
      </div>
      
      <div className="flex mb-6">
        <button
          className={`flex-1 py-2 px-4 text-center ${
            activeTab === 'individual'
              ? 'bg-primary-600 text-white rounded-l-lg'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-l-lg'
          }`}
          onClick={() => setActiveTab('individual')}
        >
          <Award className="w-5 h-5 inline mr-1" />
          Individual
        </button>
        <button
          className={`flex-1 py-2 px-4 text-center ${
            activeTab === 'community'
              ? 'bg-primary-600 text-white rounded-r-lg'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-r-lg'
          }`}
          onClick={() => setActiveTab('community')}
        >
          <Users className="w-5 h-5 inline mr-1" />
          Community Goals
        </button>
      </div>
      
      {activeTab === 'individual' ? (
        <>
          <div className="mb-4 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="input pl-10"
              placeholder="Search players..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="card overflow-hidden">
            <div className="bg-primary-50 p-4 border-b border-primary-100">
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-1 font-medium text-primary-800">Rank</div>
                <div className="col-span-5 font-medium text-primary-800">Player</div>
                <div className="col-span-3 font-medium text-primary-800">Virtue Points</div>
                <div className="col-span-3 font-medium text-primary-800">Level</div>
              </div>
            </div>
            
            <div className="divide-y divide-gray-100">
              {filteredLeaderboard.map((entry, index) => (
                <div 
                  key={entry.userId} 
                  className={`p-4 ${index < 3 ? 'bg-accent-50' : ''} hover:bg-gray-50`}
                >
                  <div className="grid grid-cols-12 gap-4 items-center">
                    <div className="col-span-1">
                      {index < 3 ? (
                        <div className={`
                          w-8 h-8 rounded-full flex items-center justify-center
                          ${index === 0 ? 'bg-yellow-100 text-yellow-700' : 
                            index === 1 ? 'bg-gray-100 text-gray-700' : 
                            'bg-amber-100 text-amber-700'}
                        `}>
                          <Trophy className="w-4 h-4" />
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-700">
                          {index + 1}
                        </div>
                      )}
                    </div>
                    <div className="col-span-5 flex items-center">
                      <span className="text-2xl mr-2">{entry.avatar}</span>
                      <span className="font-medium">{entry.userName}</span>
                    </div>
                    <div className="col-span-3 flex items-center">
                      <Heart className="w-4 h-4 text-secondary-500 mr-1" />
                      <span>{entry.virtuePoints}</span>
                    </div>
                    <div className="col-span-3">
                      <div className="inline-block px-2 py-1 bg-primary-100 text-primary-800 rounded-full text-sm">
                        Level {entry.level}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="space-y-4">
          {communityGoals.map(goal => (
            <div key={goal.id} className="card p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">{goal.name}</h3>
                <span className="text-sm text-gray-600">{goal.current} / {goal.target}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                <div 
                  className="bg-primary-500 h-3 rounded-full" 
                  style={{ width: `${goal.progress}%` }}
                ></div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">{goal.progress}% Complete</span>
                <button className="btn btn-primary text-sm py-1 px-3">
                  Contribute
                </button>
              </div>
            </div>
          ))}
          
          <div className="card p-6 bg-primary-50">
            <h3 className="font-medium text-primary-800 mb-4">Suggest a Community Goal</h3>
            <div className="space-y-3">
              <input 
                type="text" 
                className="input" 
                placeholder="Goal name"
              />
              <textarea 
                className="input" 
                placeholder="Description"
                rows={3}
              ></textarea>
              <input 
                type="number" 
                className="input" 
                placeholder="Target amount"
              />
              <button className="btn btn-primary w-full">
                Submit Suggestion
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;