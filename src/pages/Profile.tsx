import React, { useState } from 'react';
import { User, Heart, Award, Settings, LogOut, Edit } from 'lucide-react';
import { User as UserType, Achievement } from '../types';

const Profile: React.FC = () => {
  const [user, setUser] = useState<UserType>({
    id: '1',
    name: 'Guest User',
    avatar: '👤',
    virtuePoints: 120,
    coins: 250,
    knowledge: 180,
    level: 2,
    achievements: [
      {
        id: '1',
        title: 'First Prayer',
        description: 'Complete your first prayer in the app',
        icon: '🕌',
        unlocked: true,
        unlockedAt: new Date('2023-05-10')
      },
      {
        id: '2',
        title: 'Knowledge Seeker',
        description: 'Complete 5 quizzes',
        icon: '📚',
        unlocked: false
      },
      {
        id: '3',
        title: 'Community Builder',
        description: 'Build 3 different types of buildings',
        icon: '🏙️',
        unlocked: false
      },
      {
        id: '4',
        title: 'Charitable Soul',
        description: 'Donate to charity 3 times',
        icon: '🤲',
        unlocked: true,
        unlockedAt: new Date('2023-05-15')
      }
    ]
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(user.name);
  const avatarOptions = ['👤', '👨‍🦱', '👩‍🦱', '👨‍🦲', '👩', '👨', '👩‍🦰', '👨‍🦳', '👩‍🦳', '👳‍♂️', '🧕'];
  const [selectedAvatar, setSelectedAvatar] = useState(user.avatar);
  
  const handleSaveProfile = () => {
    setUser({
      ...user,
      name: editName,
      avatar: selectedAvatar
    });
    setIsEditing(false);
  };
  
  const calculateProgress = () => {
    const currentXP = user.virtuePoints;
    const nextLevelXP = user.level * 100;
    return (currentXP / nextLevelXP) * 100;
  };
  
  return (
    <div className="container mx-auto px-4 py-8 pt-16 md:pl-24 md:pr-8">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl text-primary-800 mb-2">Your Profile</h1>
        <p className="text-gray-600">View and manage your progress</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <div className="card p-6 text-center">
            {isEditing ? (
              <>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Choose Avatar
                  </label>
                  <div className="flex flex-wrap justify-center gap-2 mb-4">
                    {avatarOptions.map(avatar => (
                      <button
                        key={avatar}
                        className={`text-2xl p-2 rounded-full ${
                          selectedAvatar === avatar 
                            ? 'bg-primary-100 ring-2 ring-primary-500' 
                            : 'hover:bg-gray-100'
                        }`}
                        onClick={() => setSelectedAvatar(avatar)}
                      >
                        {avatar}
                      </button>
                    ))}
                  </div>
                  
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    className="input mb-4"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                  />
                  
                  <div className="flex gap-2">
                    <button 
                      className="btn btn-primary flex-1"
                      onClick={handleSaveProfile}
                    >
                      Save
                    </button>
                    <button 
                      className="btn bg-gray-200 text-gray-700 hover:bg-gray-300 focus:ring-gray-400 flex-1"
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="text-5xl mb-4">{user.avatar}</div>
                <h2 className="text-xl font-medium mb-1">{user.name}</h2>
                <div className="text-sm text-gray-600 mb-4">Level {user.level}</div>
                
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress to Level {user.level + 1}</span>
                    <span>{user.virtuePoints}/{user.level * 100} XP</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-primary-500 h-2 rounded-full" 
                      style={{ width: `${calculateProgress()}%` }}
                    ></div>
                  </div>
                </div>
                
                <button 
                  className="btn btn-primary w-full flex items-center justify-center"
                  onClick={() => setIsEditing(true)}
                >
                  <Edit className="w-4 h-4 mr-1" />
                  Edit Profile
                </button>
              </>
            )}
          </div>
          
          <div className="card p-4 mt-4">
            <h3 className="font-medium mb-3">Stats</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Virtue Points:</span>
                <span className="text-sm font-medium">{user.virtuePoints}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Coins:</span>
                <span className="text-sm font-medium">{user.coins}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Knowledge:</span>
                <span className="text-sm font-medium">{user.knowledge}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Prayers Completed:</span>
                <span className="text-sm font-medium">12</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Quizzes Completed:</span>
                <span className="text-sm font-medium">3</span>
              </div>
            </div>
          </div>
          
          <div className="card p-4 mt-4">
            <h3 className="font-medium mb-3">Settings</h3>
            <div className="space-y-2">
              <button className="w-full text-left px-2 py-1 rounded hover:bg-gray-100 flex items-center">
                <Settings className="w-4 h-4 mr-2 text-gray-500" />
                <span>Preferences</span>
              </button>
              <button className="w-full text-left px-2 py-1 rounded hover:bg-gray-100 flex items-center">
                <LogOut className="w-4 h-4 mr-2 text-gray-500" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
        
        <div className="md:col-span-2">
          <div className="card p-6">
            <h2 className="text-xl font-medium mb-4">Achievements</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {user.achievements.map(achievement => (
                <div 
                  key={achievement.id} 
                  className={`p-4 rounded-lg border ${
                    achievement.unlocked 
                      ? 'bg-accent-50 border-accent-200' 
                      : 'bg-gray-50 border-gray-200 opacity-70'
                  }`}
                >
                  <div className="flex items-start">
                    <div className="text-3xl mr-3">{achievement.icon}</div>
                    <div>
                      <h3 className="font-medium">{achievement.title}</h3>
                      <p className="text-sm text-gray-600 mb-1">{achievement.description}</p>
                      {achievement.unlocked ? (
                        <span className="text-xs text-accent-700 bg-accent-100 px-2 py-1 rounded-full">
                          Unlocked {achievement.unlockedAt?.toLocaleDateString()}
                        </span>
                      ) : (
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                          Locked
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="card p-6 mt-6">
            <h2 className="text-xl font-medium mb-4">Recent Activity</h2>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-primary-100 p-2 rounded-full mr-3">
                  <Award className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-medium">Achievement Unlocked</h3>
                  <p className="text-sm text-gray-600">You unlocked "Charitable Soul"</p>
                  <p className="text-xs text-gray-500">2 days ago</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-accent-100 p-2 rounded-full mr-3">
                  <Heart className="w-5 h-5 text-accent-600" />
                </div>
                <div>
                  <h3 className="font-medium">Virtue Points Earned</h3>
                  <p className="text-sm text-gray-600">You earned 25 virtue points for completing daily prayers</p>
                  <p className="text-xs text-gray-500">3 days ago</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-secondary-100 p-2 rounded-full mr-3">
                  <User className="w-5 h-5 text-secondary-600" />
                </div>
                <div>
                  <h3 className="font-medium">Profile Created</h3>
                  <p className="text-sm text-gray-600">Welcome to Virtue Quest: Ummah Builder!</p>
                  <p className="text-xs text-gray-500">1 week ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;