import Link from "next/link";
import { LuSquareArrowOutUpRight } from "react-icons/lu";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <main className="flex flex-col items-center justify-center w-full px-6 text-center space-y-10">
        <h1 className="text-5xl sm:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          Your Trading System, Simplified!
        </h1>
        <p className="text-lg sm:text-xl text-gray-300 max-w-2xl">
          Experience a modern interface designed for effortless order management
          and efficient trade settlements
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 max-w-5xl">
          <Link href="/user">
            <div className="group p-8 max-w-sm w-full bg-gray-800 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
              <h3 className="text-2xl font-semibold text-blue-400 flex align-middle justify-center gap-2 items-center group-hover:text-purple-400 transition-colors duration-300">
                Trade Now <LuSquareArrowOutUpRight className="hover:rotate-45 ease-in " />
              </h3>
              <p className="mt-4 text-gray-400 group-hover:text-gray-200 transition-colors duration-300">
                Enter your trades with confidence and speed.
              </p>
            </div>
          </Link>
          <Link href="/admin">
            <div className="group p-8 max-w-sm w-full bg-gray-800 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
              <h3 className="text-2xl font-semibold text-blue-400 flex align-middle justify-center gap-2 items-center group-hover:text-purple-400 transition-colors duration-300">
                Account Manager Portal <LuSquareArrowOutUpRight className="hover:rotate-45 ease-in " />
              </h3>
              <p className="mt-4 text-gray-400 group-hover:text-gray-200 transition-colors duration-300">
                Your go-to portal for reconciling trades effortlessly.
              </p>
            </div>
          </Link>
        </div>
      </main>
      <footer className="mt-10 text-sm text-gray-500">
        Made by{" "}
        <span className="font-semibold text-blue-400 hover:underline">
          <a href="https://github.com/ChiefRavinder" target="_blank">
            Ravinder Sharma
          </a>
        </span>
      </footer>
    </div>
  );
}
