import { Pointer } from 'lucide-react';

export default function Home() {
  return (
    <main className="grid place-items-center min-h-screen bg-gray-900">
      <div className="absolute margin-auto rounded-full aspect-square w-64 bg-cyan-600 animate-ping" />
      <section className="relative rounded-full bg-slate-900 aspect-square w-96 overflow-hidden border-8 border-cyan-600">
        <div className="absolute inset-0 grid place-items-center z-20">
          <div className="rounded-full w-2/3 bg-cyan-600 aspect-square grid place-items-center text-white">
            <span className="self-end">CLICK</span>
            <span className="font-bold text-6xl animate-bounce ">
              <Pointer size={64} />
            </span>
            <span className="self-start">TO PLAY</span>
          </div>
        </div>

        <div className="z-10 absolute m-auto left-0 right-0 w-1 h-1/2 origin-bottom bg-orange-500 animate-[spin_3s_linear_infinite_alternate]" />

        <div className="absolute m-auto left-0 right-0 w-0 h-0 border-l-[50px] border-l-transparent border-t-[12rem] border-t-red-500 border-r-[50px] border-r-transparent origin-bottom" />
        <div className="absolute m-auto left-0 right-0 w-0 h-0 border-l-[50px] border-l-transparent border-t-[12rem] border-t-green-500 border-r-[50px] border-r-transparent origin-bottom rotate rotate-90" />
      </section>
    </main>
  );
}
