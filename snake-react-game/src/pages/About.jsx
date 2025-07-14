// About.jsx

const About = () => {
  return (
    <div className="min-h-screen w-full flex justify-center items-start bg-black/80 backdrop-blur-sm py-10 px-4 overflow-y-auto text-white">
      <div className="max-w-4xl w-full bg-white/5 rounded-xl shadow-xl p-6 space-y-6">
        <h1 className="text-3xl font-bold text-green-400 border-b border-green-500 pb-2">
          🐍 About the Snake Zone Game
        </h1>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-green-300">🎮 Game Concept</h2>
          <p>
            This game is inspired by the classic Nokia Snake Game — reborn using modern web tech! It’s designed for fun, nostalgia, and a bit of competitive spirit.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-green-300">🕹️ How to Play</h2>
          <ul className="list-disc ml-6 space-y-1">
            <li>Use arrow keys or swipe on mobile to move the snake.</li>
            <li>Eat the red food dots to grow and score points.</li>
            <li>Avoid hitting the walls or yourself — or it’s game over!</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-green-300">🌍 Origin</h2>
          <p>
            The original Snake game was created in the late 1970s, but it became legendary with Nokia phones in the early 2000s. This version is a tribute using React + Vite + Tailwind CSS.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-green-300">👨‍💻 Developer</h2>
          <p>
            This game was built with love by <span className="text-green-400 font-bold">Shivam Narayan</span> using:
          </p>
          <ul className="list-disc ml-6">
            <li>React + Vite for frontend speed</li>
            <li>Tailwind CSS for quick, clean design</li>
            <li>Material UI for components</li>
            <li>Swipeable & Sound features for interactivity</li>
          </ul>
          <p className="text-sm text-gray-300 pt-2">
            You can play it on mobile or desktop! Built for all ages to enjoy.
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;
