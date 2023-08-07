import { FC } from 'react';

import GameBoard2 from '@/components/GameBoard2';

const page: FC = ({}) => {
  return (
    <main className="grid place-items-center min-h-screen bg-gray-900 overflow-hidden">
      <GameBoard2 />
    </main>
  );
};

export default page;
