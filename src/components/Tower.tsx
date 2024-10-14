import React from 'react';
import { Disk } from '../types';

interface TowerProps {
  disks: Disk[];
  onClick: () => void;
  isSelected: boolean;
  towerNumber: number;
}

const Tower: React.FC<TowerProps> = ({ disks, onClick, isSelected, towerNumber }) => {
  return (
    <div
      className={`flex flex-col items-center mx-8 cursor-pointer transition-all duration-300 ${
        isSelected ? 'bg-blue-100 rounded-lg p-4' : ''
      }`}
      onClick={onClick}
    >
      <div className="flex flex-col-reverse items-center min-h-[16rem]">
        {disks.map((disk, index) => (
          <div
            key={index}
            className={`h-8 ${disk.color} rounded-full shadow-md transition-all duration-300 hover:brightness-110 mb-1`}
            style={{ width: `${disk.size * 24}px` }}
          ></div>
        ))}
      </div>
      <div className="mt-4 text-2xl font-bold text-gray-700">{towerNumber}</div>
    </div>
  );
};

export default Tower;