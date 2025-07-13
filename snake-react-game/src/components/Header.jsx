import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-black/70 text-white shadow-lg p-4 flex justify-between items-center">
      <div className="text-2xl font-bold text-green-400 flex items-center gap-2">
        🐍 SnakeZone <span className="text-sm text-white italic">– Slither Smart</span>
      </div>
      <nav className="space-x-4">
        <Link to="/" className="hover:text-green-400">Home</Link>
        <Link to="/about" className="hover:text-green-400">About</Link>
      </nav>
    </header>
  );
}