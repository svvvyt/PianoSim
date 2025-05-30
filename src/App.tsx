import React, { useMemo } from 'react';
import { Board } from './components/Board/Board.tsx';
import { Metronome } from './components/Metronome/Metronome.tsx';

const App: React.FC = () => {
  const board = useMemo(() => <Board />, []);
  const metronome = useMemo(() => <Metronome />, []);
  return (
    <div className='app'>
      {board} {metronome}
    </div>
  );
};

export default App;
