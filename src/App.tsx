import React, { useMemo } from 'react';
import { Board } from './components/Board/Board.tsx';

const App: React.FC = () => {
  const board = useMemo(() => <Board />, []);
  return <div className='app'>{board}</div>;
};

export default App;
