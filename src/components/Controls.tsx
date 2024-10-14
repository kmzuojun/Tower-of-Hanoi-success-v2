import React from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

interface ControlsProps {
  isRunning: boolean;
  onToggle: () => void;
  onReset: () => void;
  moves: number;
  time: number;
}

const Controls: React.FC<ControlsProps> = ({ isRunning, onToggle, onReset, moves, time }) => {
  return (
    <div className="flex items-center space-x-6">
      <button
        onClick={onToggle}
        className={`px-6 py-3 rounded-full text-white font-semibold transition-all duration-300 ${
          isRunning ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-green-500 hover:bg-green-600'
        }`}
      >
        {isRunning ? <Pause size={28} /> : <Play size={28} />}
      </button>
      <button
        onClick={onReset}
        className="px-6 py-3 rounded-full bg-red-500 hover:bg-red-600 text-white font-semibold transition-all duration-300"
      >
        <RotateCcw size={28} />
      </button>
      <div className="text-xl font-semibold text-gray-700">
        步数: {moves} | 时间: {time}秒
      </div>
    </div>
  );
};

export default Controls;