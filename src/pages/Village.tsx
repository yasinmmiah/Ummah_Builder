import React, { useState, useEffect } from 'react';
import { 
  Fuel as Mosque, 
  Home as HomeIcon, 
  School, 
  ShoppingBag, 
  Book, 
  Flower2, 
  Clock, 
  Coins, 
  GraduationCap, 
  Heart,
  AlertCircle,
  X,
  Users,
  HandHeart,
  PartyPopper,
  Building as BuildingIcon
} from 'lucide-react';
import { Building, BuildingType, BuildingEvent } from '../types';

const BUILDING_TYPES: Record<string, BuildingType> = {
  mosque: {
    type: 'mosque',
    name: 'Mosque',
    description: 'Center of worship and community gathering. Increases virtue points generation.',
    baseCost: { coins: 100, knowledge: 50, virtuePoints: 20 },
    baseResources: { coinsPerHour: 0, knowledgePerHour: 5, virtuePerHour: 10 },
    baseCapacity: 50,
    specialEffect: 'Increases virtue points generation of nearby buildings by 20%',
    constructionTime: 300,
    influenceRadius: 2,
    maxLevel: 5,
    events: [
      {
        id: 'friday_prayer',
        type: 'community',
        title: 'Friday Prayer',
        description: 'Host Friday prayer gathering',
        duration: 60,
        rewards: { virtuePoints: 50, happiness: 10 }
      }
    ]
  },
  school: {
    type: 'school',
    name: 'Islamic School',
    description: 'Educational center for Islamic studies. Generates knowledge points.',
    baseCost: { coins: 80, knowledge: 30, virtuePoints: 10 },
    baseResources: { coinsPerHour: 0, knowledgePerHour: 10, virtuePerHour: 5 },
    baseCapacity: 30,
    constructionTime: 240,
    maxLevel: 4,
    events: [
      {
        id: 'quran_class',
        type: 'education',
        title: 'Quran Class',
        description: 'Host Quran learning session',
        duration: 120,
        rewards: { knowledge: 30, virtuePoints: 20 }
      }
    ]
  },
  home: {
    type: 'home',
    name: 'Family Home',
    description: 'Housing for community members. Generates coins and provides population capacity.',
    baseCost: { coins: 50, knowledge: 0, virtuePoints: 5 },
    baseResources: { coinsPerHour: 5, knowledgePerHour: 0, virtuePerHour: 2 },
    baseCapacity: 4,
    constructionTime: 180,
    maxLevel: 3
  },
  market: {
    type: 'market',
    name: 'Halal Market',
    description: 'Trade center for the community. Primary source of coins.',
    baseCost: { coins: 70, knowledge: 20, virtuePoints: 10 },
    baseResources: { coinsPerHour: 10, knowledgePerHour: 0, virtuePerHour: 0 },
    baseCapacity: 10,
    constructionTime: 240,
    maxLevel: 4,
    events: [
      {
        id: 'charity_bazaar',
        type: 'charity',
        title: 'Charity Bazaar',
        description: 'Organize a bazaar for charity',
        duration: 180,
        rewards: { coins: 100, virtuePoints: 30 }
      }
    ]
  },
  library: {
    type: 'library',
    name: 'Islamic Library',
    description: 'Repository of Islamic knowledge and literature.',
    baseCost: { coins: 90, knowledge: 40, virtuePoints: 15 },
    baseResources: { coinsPerHour: 0, knowledgePerHour: 8, virtuePerHour: 3 },
    baseCapacity: 20,
    specialEffect: 'Increases knowledge generation of nearby buildings by 15%',
    constructionTime: 270,
    requirements: { level: 3 },
    maxLevel: 4,
    events: [
      {
        id: 'study_circle',
        type: 'education',
        title: 'Study Circle',
        description: 'Host Islamic study circle',
        duration: 120,
        rewards: { knowledge: 40, virtuePoints: 15 }
      }
    ]
  },
  garden: {
    type: 'garden',
    name: 'Community Garden',
    description: 'Peaceful garden for reflection and community gatherings.',
    baseCost: { coins: 40, knowledge: 10, virtuePoints: 15 },
    baseResources: { coinsPerHour: 2, knowledgePerHour: 2, virtuePerHour: 5 },
    baseCapacity: 15,
    specialEffect: 'Increases happiness of nearby buildings',
    constructionTime: 150,
    maxLevel: 3
  },
  charity_center: {
    type: 'charity_center',
    name: 'Charity Center',
    description: 'Center for organizing charitable activities and helping those in need.',
    baseCost: { coins: 120, knowledge: 30, virtuePoints: 40 },
    baseResources: { coinsPerHour: -5, knowledgePerHour: 0, virtuePerHour: 15 },
    baseCapacity: 25,
    specialEffect: 'Increases virtue generation of all buildings by 10%',
    constructionTime: 360,
    requirements: { level: 4 },
    maxLevel: 4,
    events: [
      {
        id: 'food_drive',
        type: 'charity',
        title: 'Food Drive',
        description: 'Organize food distribution for the needy',
        duration: 240,
        rewards: { virtuePoints: 100, happiness: 20 }
      }
    ]
  },
  community_hall: {
    type: 'community_hall',
    name: 'Community Hall',
    description: 'Venue for community events and celebrations.',
    baseCost: { coins: 150, knowledge: 50, virtuePoints: 30 },
    baseResources: { coinsPerHour: 3, knowledgePerHour: 3, virtuePerHour: 8 },
    baseCapacity: 100,
    specialEffect: 'Enables special community events',
    constructionTime: 420,
    requirements: { level: 5 },
    maxLevel: 3,
    events: [
      {
        id: 'eid_celebration',
        type: 'celebration',
        title: 'Eid Celebration',
        description: 'Host community Eid celebration',
        duration: 360,
        rewards: { happiness: 50, virtuePoints: 75 }
      }
    ]
  }
};

const Village: React.FC = () => {
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(null);
  const [isPlacingBuilding, setIsPlacingBuilding] = useState(false);
  const [buildingTypeToPlace, setBuildingTypeToPlace] = useState<Building['type'] | null>(null);
  const [showBuildingInfo, setShowBuildingInfo] = useState<BuildingType | null>(null);
  const [activeEvents, setActiveEvents] = useState<BuildingEvent[]>([]);
  const [villageLevel] = useState(1);
  const [resources] = useState({
    coins: 500,
    knowledge: 200,
    virtuePoints: 100,
  });
  const [error, setError] = useState<string | null>(null);
  const [happiness, setHappiness] = useState(50);
  
  const gridSize = 8;
  const grid = Array(gridSize).fill(null).map(() => Array(gridSize).fill(null));
  
  // Place buildings on grid
  buildings.forEach(building => {
    const { x, y } = building.position;
    if (x >= 0 && x < gridSize && y >= 0 && y < gridSize) {
      grid[y][x] = building;
    }
  });
  
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);
  
  useEffect(() => {
    // Update happiness based on buildings and events
    const baseHappiness = 50;
    const buildingBonus = buildings.reduce((sum, building) => {
      return sum + (building.happiness || 0);
    }, 0);
    const eventBonus = activeEvents.reduce((sum, event) => {
      return sum + (event.rewards.happiness || 0);
    }, 0);
    
    setHappiness(Math.min(100, baseHappiness + buildingBonus + eventBonus));
  }, [buildings, activeEvents]);
  
  const handleCellClick = (x: number, y: number) => {
    const building = grid[y][x];
    
    if (isPlacingBuilding && buildingTypeToPlace && !building) {
      const buildingType = BUILDING_TYPES[buildingTypeToPlace];
      
      // Check resources
      if (
        resources.coins < buildingType.baseCost.coins ||
        resources.knowledge < buildingType.baseCost.knowledge ||
        resources.virtuePoints < buildingType.baseCost.virtuePoints
      ) {
        setError('Not enough resources to build this structure');
        return;
      }
      
      // Check requirements
      if (buildingType.requirements) {
        if (buildingType.requirements.level && villageLevel < buildingType.requirements.level) {
          setError(`Requires village level ${buildingType.requirements.level}`);
          return;
        }
        
        if (buildingType.requirements.buildings) {
          for (const req of buildingType.requirements.buildings) {
            const count = buildings.filter(b => b.type === req.type).length;
            if (count < req.count) {
              setError(`Requires ${req.count} ${BUILDING_TYPES[req.type].name}(s)`);
              return;
            }
          }
        }
      }
      
      // Check adjacent buildings for bonuses
      const adjacentBuildings = getAdjacentBuildings(x, y);
      const bonusMultiplier = calculateBonusMultiplier(adjacentBuildings);
      
      // Place new building
      const newBuilding: Building = {
        id: Date.now().toString(),
        type: buildingTypeToPlace,
        level: 1,
        position: { x, y },
        resources: {
          coinsPerHour: buildingType.baseResources.coinsPerHour * bonusMultiplier,
          knowledgePerHour: buildingType.baseResources.knowledgePerHour * bonusMultiplier,
          virtuePerHour: buildingType.baseResources.virtuePerHour * bonusMultiplier,
        },
        capacity: buildingType.baseCapacity,
        constructionTime: buildingType.constructionTime,
        constructionStarted: new Date(),
        specialEffect: buildingType.specialEffect,
        happiness: 5,
        influence: buildingType.influenceRadius || 1,
        events: buildingType.events,
      };
      
      setBuildings([...buildings, newBuilding]);
      setIsPlacingBuilding(false);
      setBuildingTypeToPlace(null);
    } else if (building) {
      setSelectedBuilding(building);
    }
  };
  
  const getAdjacentBuildings = (x: number, y: number) => {
    const adjacent: Building[] = [];
    const directions = [[-1,0], [1,0], [0,-1], [0,1]];
    
    for (const [dx, dy] of directions) {
      const newX = x + dx;
      const newY = y + dy;
      if (newX >= 0 && newX < gridSize && newY >= 0 && newY < gridSize && grid[newY][newX]) {
        adjacent.push(grid[newY][newX]);
      }
    }
    
    return adjacent;
  };
  
  const calculateBonusMultiplier = (adjacentBuildings: Building[]) => {
    let multiplier = 1;
    
    adjacentBuildings.forEach(building => {
      if (building.type === 'mosque') multiplier *= 1.2;
      if (building.type === 'library') multiplier *= 1.15;
      if (building.type === 'garden') multiplier *= 1.1;
    });
    
    return multiplier;
  };
  
  const getBuildingIcon = (type: Building['type']) => {
    switch (type) {
      case 'mosque':
        return <Mosque className="w-6 h-6 text-primary-600" />;
      case 'school':
        return <School className="w-6 h-6 text-accent-600" />;
      case 'home':
        return <HomeIcon className="w-6 h-6 text-secondary-600" />;
      case 'market':
        return <ShoppingBag className="w-6 h-6 text-green-600" />;
      case 'library':
        return <Book className="w-6 h-6 text-purple-600" />;
      case 'garden':
        return <Flower2 className="w-6 h-6 text-emerald-600" />;
      case 'charity_center':
        return <HandHeart className="w-6 h-6 text-red-600" />;
      case 'community_hall':
        return <Users className="w-6 h-6 text-blue-600" />;
      default:
        return null;
    }
  };
  
  const startPlacingBuilding = (type: Building['type']) => {
    setIsPlacingBuilding(true);
    setBuildingTypeToPlace(type);
    setSelectedBuilding(null);
    setShowBuildingInfo(BUILDING_TYPES[type]);
  };
  
  const startBuildingEvent = (building: Building, event: BuildingEvent) => {
    if (!building.events?.includes(event)) return;
    
    // Check if event is already active
    if (activeEvents.some(e => e.id === event.id)) {
      setError('This event is already in progress');
      return;
    }
    
    // Check requirements
    if (event.requirements) {
      if (event.requirements.level && building.level < event.requirements.level) {
        setError(`Building must be level ${event.requirements.level}`);
        return;
      }
      
      if (event.requirements.resources) {
        const { coins = 0, knowledge = 0, virtuePoints = 0 } = event.requirements.resources;
        if (resources.coins < coins || resources.knowledge < knowledge || resources.virtuePoints < virtuePoints) {
          setError('Not enough resources for this event');
          return;
        }
      }
    }
    
    setActiveEvents([...activeEvents, { ...event, buildingId: building.id }]);
    
    // Event will complete automatically after duration
    setTimeout(() => {
      setActiveEvents(events => events.filter(e => e.id !== event.id));
      // Add rewards
      // This would normally update the global resource state
    }, event.duration * 1000);
  };
  
  const upgradeBuilding = () => {
    if (!selectedBuilding) return;
    
    const buildingType = BUILDING_TYPES[selectedBuilding.type];
    
    // Check max level
    if (selectedBuilding.level >= (buildingType.maxLevel || 3)) {
      setError('Building has reached maximum level');
      return;
    }
    
    const upgradeCost = {
      coins: buildingType.baseCost.coins * Math.pow(1.5, selectedBuilding.level),
      knowledge: buildingType.baseCost.knowledge * Math.pow(1.5, selectedBuilding.level),
      virtuePoints: buildingType.baseCost.virtuePoints * Math.pow(1.5, selectedBuilding.level),
    };
    
    if (
      resources.coins < upgradeCost.coins ||
      resources.knowledge < upgradeCost.knowledge ||
      resources.virtuePoints < upgradeCost.virtuePoints
    ) {
      setError('Not enough resources to upgrade this building');
      return;
    }
    
    setBuildings(buildings.map(building => 
      building.id === selectedBuilding.id 
        ? {
            ...building,
            level: building.level + 1,
            resources: {
              coinsPerHour: building.resources.coinsPerHour * 1.5,
              knowledgePerHour: building.resources.knowledgePerHour * 1.5,
              virtuePerHour: building.resources.virtuePerHour * 1.5,
            },
            capacity: Math.floor(building.capacity * 1.3),
            influence: (building.influence || 1) + 1,
            happiness: (building.happiness || 0) + 5,
          }
        : building
    ));
    
    setSelectedBuilding(null);
  };
  
  const calculateTotalResources = () => {
    return buildings.reduce(
      (total, building) => ({
        coins: total.coins + building.resources.coinsPerHour,
        knowledge: total.knowledge + building.resources.knowledgePerHour,
        virtue: total.virtue + building.resources.virtuePerHour,
      }),
      { coins: 0, knowledge: 0, virtue: 0 }
    );
  };
  
  const totalResources = calculateTotalResources();
  const totalCapacity = buildings.reduce((sum, b) => sum + b.capacity, 0);
  const population = Math.floor(totalCapacity * (happiness / 100));
  
  return (
    <div className="container mx-auto px-4 py-8 pt-16 md:pl-24 md:pr-8">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl text-primary-800 mb-2">Your Village</h1>
        <p className="text-gray-600">Build and manage your Islamic community</p>
      </div>
      
      {error && (
        <div className="fixed top-20 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-lg shadow-lg flex items-center z-50">
          <AlertCircle className="w-5 h-5 mr-2" />
          {error}
          <button onClick={() => setError(null)} className="ml-3">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="card p-3 bg-primary-50">
          <div className="flex items-center">
            <BuildingIcon className="w-5 h-5 text-primary-600 mr-2" />
            <div>
              <div className="text-sm font-medium">Village Level</div>
              <div className="text-lg font-semibold text-primary-700">{villageLevel}</div>
            </div>
          </div>
        </div>
        
        <div className="card p-3 bg-yellow-50">
          <div className="flex items-center">
            <Users className="w-5 h-5 text-yellow-600 mr-2" />
            <div>
              <div className="text-sm font-medium">Population</div>
              <div className="text-lg font-semibold text-yellow-700">
                {population}/{totalCapacity}
              </div>
            </div>
          </div>
        </div>
        
        <div className="card p-3 bg-pink-50">
          <div className="flex items-center">
            <Heart className="w-5 h-5 text-pink-600 mr-2" />
            <div>
              <div className="text-sm font-medium">Happiness</div>
              <div className="text-lg font-semibold text-pink-700">{Math.floor(happiness)}%</div>
            </div>
          </div>
        </div>
        
        <div className="card p-3 bg-purple-50">
          <div className="flex items-center">
            <PartyPopper className="w-5 h-5 text-purple-600 mr-2" />
            <div>
              <div className="text-sm font-medium">Active Events</div>
              <div className="text-lg font-semibold text-purple-700">{activeEvents.length}</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-2/3">
          <div className="bg-gradient-to-br from-green-100 to-primary-50 p-4 rounded-xl shadow-inner">
            <div className="grid grid-cols-{gridSize} gap-2">
              {grid.map((row, y) => (
                <div key={y} className="flex gap-2">
                  {row.map((cell, x) => (
                    <div 
                      key={`${x}-${y}`}
                      className={`w-12 h-12 md:w-16 md:h-16 rounded-lg flex items-center justify-center cursor-pointer transition-all duration-200 ${
                        cell 
                          ? 'bg-white shadow-md transform hover:scale-105' 
                          : isPlacingBuilding 
                            ? 'bg-white/50 hover:bg-white/80 border-2 border-dashed border-primary-300' 
                            : 'bg-white/30 hover:bg-white/50'
                      } ${selectedBuilding && cell?.id === selectedBuilding.id ? 'ring-2 ring-primary-500' : ''}`}
                      onClick={() => handleCellClick(x, y)}
                      onMouseEnter={() => cell && setShowBuildingInfo(BUILDING_TYPES[cell.type])}
                      onMouseLeave={() => !isPlacingBuilding && setShowBuildingInfo(null)}
                    >
                      {cell && (
                        <div className="flex flex-col items-center">
                          {getBuildingIcon(cell.type)}
                          <span className="text-xs mt-1">Lvl {cell.level}</span>
                          {cell.constructionTime && cell.constructionStarted && 
                           new Date().getTime() - cell.constructionStarted.getTime() < cell.constructionTime * 1000 && (
                            <div className="absolute -top-2 -right-2">
                              <Clock className="w-4 h-4 text-primary-600 animate-spin" />
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-4 grid grid-cols-3 gap-4">
            <div className="card p-3 bg-primary-50">
              <div className="flex items-center">
                <Coins className="w-5 h-5 text-primary-600 mr-2" />
                <div>
                  <div className="text-sm font-medium">Coins/hour</div>
                  <div className="text-lg font-semibold text-primary-700">
                    +{totalResources.coins.toFixed(1)}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="card p-3 bg-accent-50">
              <div className="flex items-center">
                <GraduationCap className="w-5 h-5 text-accent-600 mr-2" />
                <div>
                  <div className="text-sm font-medium">Knowledge/hour</div>
                  <div className="text-lg font-semibold text-accent-700">
                    +{totalResources.knowledge.toFixed(1)}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="card p-3 bg-secondary-50">
              <div className="flex items-center">
                <Heart className="w-5 h-5 text-secondary-600 mr-2" />
                <div>
                  <div className="text-sm font-medium">Virtue/hour</div>
                  <div className="text-lg font-semibold text-secondary-700">
                    +{totalResources.virtue.toFixed(1)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="md:w-1/3">
          {selectedBuilding ? (
            <div className="space-y-4">
              <div className="card p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    {getBuildingIcon(selectedBuilding.type)}
                    <h2 className="text-xl font-medium ml-2 capitalize">
                      {BUILDING_TYPES[selectedBuilding.type].name}
                    </h2>
                  </div>
                  <span className="text-sm bg-primary-100 text-primary-800 px-2 py-1 rounded-full">
                    Level {selectedBuilding.level}
                    {BUILDING_TYPES[selectedBuilding.type].maxLevel && 
                      `/${BUILDING_TYPES[selectedBuilding.type].maxLevel}`}
                  </span>
                </div>
                
                <p className="text-sm text-gray-600 mb-4">
                  {BUILDING_TYPES[selectedBuilding.type].description}
                </p>
                
                {selectedBuilding.specialEffect && (
                  <div className="bg-accent-50 text-accent-800 p-3 rounded-lg mb-4 text-sm">
                    ✨ {selectedBuilding.specialEffect}
                  </div>
                )}
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-sm">Coins per hour:</span>
                    <span className="text-sm font-medium">+{selectedBuilding.resources.coinsPerHour.toFixed(1)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Knowledge per hour:</span>
                    <span className="text-sm font-medium">+{selectedBuilding.resources.knowledgePerHour.toFixed(1)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Virtue per hour:</span>
                    <span className="text-sm font-medium">+{selectedBuilding.resources.virtuePerHour.toFixed(1)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Capacity:</span>
                    <span className="text-sm font-medium">{selectedBuilding.capacity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Influence Range:</span>
                    <span className="text-sm font-medium">{selectedBuilding.influence} tiles</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Happiness Bonus:</span>
                    <span className="text-sm font-medium">+{selectedBuilding.happiness || 0}%</span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <button 
                    className={`btn flex-1 ${
                      selectedBuilding.level >= (BUILDING_TYPES[selectedBuilding.type].maxLevel || 3)
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        : 'btn-primary'
                    }`}
                    onClick={upgradeBuilding}
                    disabled={selectedBuilding.level >= (BUILDING_TYPES[selectedBuilding.type].maxLevel || 3)}
                  >
                    <span className="mr-1">Upgrade</span>
                    <span className="text-xs">
                      ({Math.floor(BUILDING_TYPES[selectedBuilding.type].baseCost.coins * Math.pow(1.5, selectedBuilding.level))} coins)
                    </span>
                  </button>
                  <button 
                    className="btn bg-gray-200 text-gray-700 hover:bg-gray-300 focus:ring-gray-400 flex-1"
                    onClick={() => setSelectedBuilding(null)}
                  >
                    Close
                  </button>
                </div>
              </div>
              
              {selectedBuilding.events && selectedBuilding.events.length > 0 && (
                <div className="card p-4">
                  <h3 className="font-medium mb-3">Available Events</h3>
                  <div className="space-y-2">
                    {selectedBuilding.events.map(event => (
                      <div key={event.id} className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-medium">{event.title}</h4>
                            <p className="text-sm text-gray-600">{event.description}</p>
                          </div>
                          <span className="text-xs bg-primary-100 text-primary-800 px-2 py-1 rounded-full">
                            {event.duration / 60}m
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="text-xs text-gray-500">
                            Rewards: {Object.entries(event.rewards)
                              .map(([key, value]) => `+${value} ${key}`)
                              .join(', ')}
                          </div>
                          <button
                            className="btn btn-primary text-sm py-1 px-3"
                            onClick={() => startBuildingEvent(selectedBuilding, event)}
                            disabled={activeEvents.some(e => e.id === event.id)}
                          >
                            {activeEvents.some(e => e.id === event.id) ? 'In Progress' : 'Start'}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="card p-4">
                <h2 className="text-xl font-medium mb-4">Build New</h2>
                
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(BUILDING_TYPES).map(([key, building]) => (
                    <button 
                      key={key}
                      className={`btn ${
                        isPlacingBuilding && buildingTypeToPlace === key 
                          ? 'btn-primary' 
                          : building.requirements?.level && villageLevel < building.requirements.level
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-white border border-primary-200 text-primary-700 hover:bg-primary-50'
                      }`}
                      onClick={() => startPlacingBuilding(key as Building['type'])}
                      onMouseEnter={() => setShowBuildingInfo(building)}
                      onMouseLeave={() => !isPlacingBuilding && setShowBuildingInfo(null)}
                      disabled={building.requirements?.level && villageLevel < building.requirements.level}
                    >
                      <div className="flex items-center justify-center">
                        {getBuildingIcon(key as Building['type'])}
                        <span className="ml-1 text-sm">{building.name}</span>
                      </div>
                    </button>
                  ))}
                </div>
                
                {showBuildingInfo && (
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <h3 className="font-medium mb-1">{showBuildingInfo.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{showBuildingInfo.description}</p>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Cost:</span>
                        <span>
                          {showBuildingInfo.baseCost.coins} coins, 
                          {showBuildingInfo.baseCost.knowledge} knowledge,
                          {showBuildingInfo.baseCost.virtuePoints} virtue
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Construction time:</span>
                        <span>{showBuildingInfo.constructionTime / 60} minutes</span>
                      </div>
                      {showBuildingInfo.requirements && (
                        <div className="text-amber-600">
                          {showBuildingInfo.requirements.level && 
                            `Requires village level ${showBuildingInfo.requirements.level}`}
                        </div>
                      )}
                    </div>
                  </div>
                )}
                
                {isPlacingBuilding && (
                  <div className="mt-4">
                    <p className="text-sm text-primary-600">
                      Click on an empty cell in the grid to place your {buildingTypeToPlace}
                    </p>
                    <button 
                      className="mt-2 btn bg-gray-200 text-gray-700 hover:bg-gray-300 focus:ring-gray-400 w-full"
                      onClick={() => {
                        setIsPlacingBuilding(false);
                        setBuildingTypeToPlace(null);
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
              
              <div className="card p-4">
                <h2 className="text-xl font-medium mb-2">Village Stats</h2>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Total buildings:</span>
                    <span className="text-sm font-medium">{buildings.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Population capacity:</span>
                    <span className="text-sm font-medium">{totalCapacity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Current population:</span>
                    <span className="text-sm font-medium">{population}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Total income:</span>
                    <span className="text-sm font-medium">
                      {totalResources.coins.toFixed(1)} coins/hour
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Knowledge generation:</span>
                    <span className="text-sm font-medium">
                      {totalResources.knowledge.toFixed(1)} points/hour
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Virtue generation:</span>
                    <span className="text-sm font-medium">
                      {totalResources.virtue.toFixed(1)} points/hour
                    </span>
                  </div>
                </div>
              </div>
              
              {activeEvents.length > 0 && (
                <div className="card p-4">
                  <h2 className="text-xl font-medium mb-2">Active Events</h2>
                  <div className="space-y-2">
                    {activeEvents.map(event => (
                      <div key={event.id} className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-medium">{event.title}</h4>
                            <p className="text-xs text-gray-500">In progress...</p>
                          </div>
                          <Clock className="w-5 h-5 text-primary-600 animate-spin" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Village;