import React from 'react';
import { Fuel as Mosque, BookOpen, Map, Award, Heart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 pt-16 md:pl-24 md:pr-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl text-primary-800 mb-2">Virtue Quest</h1>
        <p className="text-lg text-primary-600 font-medium">Ummah Builder</p>
        <p className="mt-2 text-gray-600 max-w-md mx-auto">
          Build your virtual Muslim community, learn, and grow in faith and knowledge.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Link to="/village" className="card group hover:shadow-lg transition-all duration-300">
          <div className="bg-primary-100 p-6">
            <div className="flex justify-between items-center">
              <Mosque className="w-10 h-10 text-primary-600" />
              <ArrowRight className="w-5 h-5 text-primary-400 group-hover:text-primary-600 transition-colors" />
            </div>
            <h2 className="text-xl text-primary-800 mt-4">Your Village</h2>
            <p className="text-gray-600 mt-2">
              Build and manage your Islamic community. Construct mosques, schools, and homes.
            </p>
          </div>
        </Link>
        
        <Link to="/learn" className="card group hover:shadow-lg transition-all duration-300">
          <div className="bg-accent-100 p-6">
            <div className="flex justify-between items-center">
              <BookOpen className="w-10 h-10 text-accent-600" />
              <ArrowRight className="w-5 h-5 text-accent-400 group-hover:text-accent-600 transition-colors" />
            </div>
            <h2 className="text-xl text-accent-800 mt-4">Learn & Play</h2>
            <p className="text-gray-600 mt-2">
              Test your Islamic knowledge with quizzes and learn Arabic through fun mini-games.
            </p>
          </div>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="card p-4 bg-secondary-50">
          <div className="flex items-center">
            <div className="bg-secondary-100 rounded-full p-2 mr-3">
              <Heart className="w-6 h-6 text-secondary-500" />
            </div>
            <div>
              <h3 className="font-medium text-secondary-800">Daily Virtues</h3>
              <p className="text-sm text-gray-600">Complete daily acts of kindness</p>
            </div>
          </div>
        </div>
        
        <div className="card p-4 bg-primary-50">
          <div className="flex items-center">
            <div className="bg-primary-100 rounded-full p-2 mr-3">
              <Mosque className="w-6 h-6 text-primary-500" />
            </div>
            <div>
              <h3 className="font-medium text-primary-800">Prayer Times</h3>
              <p className="text-sm text-gray-600">Track your daily prayers</p>
            </div>
          </div>
        </div>
        
        <div className="card p-4 bg-accent-50">
          <div className="flex items-center">
            <div className="bg-accent-100 rounded-full p-2 mr-3">
              <Award className="w-6 h-6 text-accent-500" />
            </div>
            <div>
              <h3 className="font-medium text-accent-800">Leaderboard</h3>
              <p className="text-sm text-gray-600">See top community members</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="card p-6 bg-gradient-to-r from-primary-100 to-primary-50">
        <h2 className="text-xl text-primary-800 mb-3">Did You Know?</h2>
        <p className="text-gray-700">
          "The best among you are those who have the best manners and character." - Prophet Muhammad (peace be upon him)
        </p>
        <div className="mt-4 text-right">
          <button className="btn btn-primary">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;