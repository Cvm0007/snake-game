export default function About() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 text-white">
      <h1 className="text-3xl font-bold text-green-400 mb-4">About the Snake Game</h1>
      <p className="mb-4">
        Snake is one of the most iconic arcade games in history. Originating in the late 1970s and
        gaining global fame with Nokia phones in the 1990s, it challenges players to control a
        growing snake as it consumes food and avoids collisions.
      </p>
      <h2 className="text-2xl font-semibold text-yellow-400 mb-2">How to Play</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>Press "Start Game" to begin.</li>
        <li>Use Arrow Keys (↑ ↓ ← →) to control the snake.</li>
        <li>Avoid hitting the walls or yourself.</li>
        <li>Score increases as the snake eats food.</li>
        <li>Try to beat your Best Score!</li>
      </ul>
      <h2 className="text-2xl font-semibold text-yellow-400 mb-2">Why This Game?</h2>
      <p className="mb-4">
        This version of the Snake game is built to bring a nostalgic experience with a modern
        twist – forest scenery, sound effects, responsive layout, and smooth animations. It’s a
        relaxing and fun way to test your reflexes.
      </p>
      <h2 className="text-2xl font-semibold text-yellow-400 mb-2">About the Developer</h2>
      <p className="mb-2">
        <span className="text-green-400 font-bold">Shivam Narayan</span> is a passionate React and
        MERN Stack developer, crafting interactive apps and interfaces with modern tools.
        With a creative mind and technical precision, he enjoys blending UI/UX with playful
        logic.
      </p>
      <p className="text-sm text-gray-300">
        Project Built Using: React, Vite, Tailwind CSS, Material UI, JavaScript, Audio API.
      </p>
    </div>
  );
}