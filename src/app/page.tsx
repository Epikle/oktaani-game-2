import { FC } from 'react';

import { Game } from '@/components/Game';

const page: FC = ({}) => {
  return (
    <main className="grid place-items-center flex-1">
      <Game />
    </main>
  );
};

export default page;
