import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import Tower from './components/Tower';
import Controls from './components/Controls';
import { Disk, TowerState } from './types';

const DISK_COLORS = [
  'bg-red-500',
  'bg-blue-500',
  'bg-green-500',
  'bg-yellow-500',
  'bg-purple-500',
  'bg-pink-500',
  'bg-indigo-500',
  'bg-orange-500',
];

const App: React.FC = () => {
  const [disks, setDisks] = useState<number>(3);
  const [towers, setTowers] = useState<TowerState>([[], [], []]);
  const [selectedTower, setSelectedTower] = useState<number | null>(null);
  const [moves, setMoves] = useState<number>(0);
  const [time, setTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<boolean>(false);

  useEffect(() => {
    resetGame();
  }, [disks]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && !gameOver) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, gameOver]);

  const resetGame = () => {
    const initialTower: Disk[] = Array.from({ length: disks }, (_, i) => ({
      size: disks - i,
      color: DISK_COLORS[i % DISK_COLORS.length],
    }));
    setTowers([initialTower, [], []]);
    setSelectedTower(null);
    setMoves(0);
    setTime(0);
    setIsRunning(false);
    setGameOver(false);
  };

  const toggleGame = () => {
    setIsRunning(!isRunning);
  };

  const handleTowerClick = (towerIndex: number) => {
    if (!isRunning || gameOver) return;

    if (selectedTower === null) {
      if (towers[towerIndex].length > 0) {
        setSelectedTower(towerIndex);
      }
    } else {
      if (selectedTower !== towerIndex) {
        const sourceTower = towers[selectedTower];
        const targetTower = towers[towerIndex];

        if (targetTower.length === 0 || sourceTower[sourceTower.length - 1].size < targetTower[targetTower.length - 1].size) {
          const newTowers = towers.map((tower, index) => {
            if (index === selectedTower) {
              return tower.slice(0, -1);
            } else if (index === towerIndex) {
              return [...tower, sourceTower[sourceTower.length - 1]];
            }
            return tower;
          });

          setTowers(newTowers);
          setMoves(moves + 1);

          if (towerIndex !== 0 && newTowers[towerIndex].length === disks) {
            setGameOver(true);
            setIsRunning(false);
          }
        }
      }
      setSelectedTower(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">汉诺塔游戏</h1>
      <div className="mb-6">
        <label htmlFor="diskCount" className="mr-2 text-lg font-semibold text-gray-700">圆盘数量:</label>
        <input
          id="diskCount"
          type="number"
          min="1"
          max="8"
          value={disks}
          onChange={(e) => setDisks(Math.min(8, Math.max(1, parseInt(e.target.value))))}
          className="border rounded px-3 py-2 text-lg"
        />
      </div>
      <div className="flex justify-center mb-8">
        {towers.map((tower, index) => (
          <Tower
            key={index}
            disks={tower}
            onClick={() => handleTowerClick(index)}
            isSelected={selectedTower === index}
            towerNumber={index + 1}
          />
        ))}
      </div>
      <Controls
        isRunning={isRunning}
        onToggle={toggleGame}
        onReset={resetGame}
        moves={moves}
        time={time}
      />
      {gameOver && (
        <div className="mt-8 text-2xl font-bold text-green-600 animate-pulse">
          恭喜！你用 {moves} 步和 {time} 秒解决了难题。
        </div>
      )}
    </div>
  );
};

export default App;