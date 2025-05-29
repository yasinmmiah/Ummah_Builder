import React from 'react';
import { Coins, BookOpen, Heart } from 'lucide-react';

interface ResourceBarProps {
  coins: number;
  knowledge: number;
  virtuePoints: number;
}

const ResourceBar: React.FC<ResourceBarProps> = ({ coins, knowledge, virtuePoints }) => {
  return (
    <div className="fixed top-0 left-0 right-0 bg-white shadow-sm z-40 md:left-16">
      <div className="container mx-auto px-4 py-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Coins className="w-5 h-5 text-accent-500 mr-1" />
              <span className="text-sm font-medium">{coins}</span>
            </div>
            <div className="flex items-center">
              <BookOpen className="w-5 h-5 text-primary-500 mr-1" />
              <span className="text-sm font-medium">{knowledge}</span>
            </div>
            <div className="flex items-center">
              <Heart className="w-5 h-5 text-secondary-500 mr-1" />
              <span className="text-sm font-medium">{virtuePoints}</span>
            </div>
          </div>
          <div className="text-sm font-medium">
            Level: <span className="text-primary-600">1</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceBar;