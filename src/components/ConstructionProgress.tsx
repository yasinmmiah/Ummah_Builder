import React from 'react';
import { Building } from '../types';
import { Clock, Users } from 'lucide-react';

interface ConstructionProgressProps {
  building: Building;
  onAddWorker: () => void;
  onRemoveWorker: () => void;
  availableWorkers: number;
}

const ConstructionProgress: React.FC<ConstructionProgressProps> = ({
  building,
  onAddWorker,
  onRemoveWorker,
  availableWorkers
}) => {
  const getPhaseColor = () => {
    switch (building.constructionPhase) {
      case 'foundation':
        return 'bg-amber-500';
      case 'structure':
        return 'bg-blue-500';
      case 'finishing':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getPhaseLabel = () => {
    switch (building.constructionPhase) {
      case 'foundation':
        return 'Laying Foundation';
      case 'structure':
        return 'Building Structure';
      case 'finishing':
        return 'Final Touches';
      default:
        return 'Complete';
    }
  };

  return (
    <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
      <div className="bg-white p-3 rounded-lg shadow-lg w-48">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">{getPhaseLabel()}</span>
          <Clock className="w-4 h-4 text-primary-600 animate-spin" />
        </div>
        
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
          <div 
            className={`h-full ${getPhaseColor()} transition-all duration-200`}
            style={{ width: `${building.constructionProgress}%` }}
          />
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center">
            <Users className="w-4 h-4 text-gray-600 mr-1" />
            <span>{building.workers}/{building.maxWorkers}</span>
          </div>
          
          <div className="flex space-x-1">
            <button
              className="px-2 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 disabled:opacity-50"
              onClick={onRemoveWorker}
              disabled={building.workers <= 1}
            >
              -
            </button>
            <button
              className="px-2 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200 disabled:opacity-50"
              onClick={onAddWorker}
              disabled={building.workers >= building.maxWorkers || availableWorkers <= 0}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConstructionProgress;