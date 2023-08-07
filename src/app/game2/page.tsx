import { FC } from 'react';

import { Game2 } from '@/components/Game2';

const page: FC = ({}) => {
  return (
    <main className="grid place-items-center min-h-screen bg-gray-900 overflow-hidden">
      <Game2 />
    </main>
  );
};

export default page;
