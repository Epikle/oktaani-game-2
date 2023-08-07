import { FC } from 'react';
import Link from 'next/link';

export const Header: FC = () => {
  return (
    <header className="p-4 z-50">
      <nav className="flex justify-center">
        <ul className="flex gap-4 justify-center items-center py-2 px-4 rounded bg-gray-700 text-slate-300 ">
          <li>
            oktaani<span className="font-bold text-gray-950">GAMES</span>
          </li>
          <li>
            <Link href="/">Game 1</Link>
          </li>
          <li>
            <Link href="/game2">Game 2</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
