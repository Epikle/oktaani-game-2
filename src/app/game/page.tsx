import { FC } from 'react';

import Game from '@/components/Game';

const page: FC = ({}) => {
  return (
    <main className="grid place-items-center min-h-screen bg-gray-900 overflow-hidden">
      <Game />
    </main>
  );
};

export default page;
