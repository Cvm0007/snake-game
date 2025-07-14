// src/components/GameBoard.jsx
import { useState, useEffect, useRef, useCallback } from "react";
import { Box } from "@mui/material";
import { useSwipeable } from "react-swipeable";

import Snake from "./Snake";
import Food from "./Food";
import ScoreBoard from "./ScoreBoard";
import Controls from "./Controls";

import musicFile from "../assets/bg-music.mp3";
import eatSound from "../assets/eat.mp3";
import gameOverSound from "../assets/game-over.mp3";

const BOARD_SIZE = 20;
const initialSnake = [{ x: 10, y: 10 }];

const getRandomFood = () => ({
  x: Math.floor(Math.random() * BOARD_SIZE),
  y: Math.floor(Math.random() * BOARD_SIZE),
});

const GameBoard = () => {
  const [snake, setSnake] = useState(initialSnake);
  const [direction, setDirection] = useState("RIGHT");
  const [food, setFood] = useState(getRandomFood());
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(() => +localStorage.getItem("bestScore") || 0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showGameOver, setShowGameOver] = useState(false);

  const musicRef = useRef(null);
  const gameOverRef = useRef(null);
  const eatAudio = useRef(null);
  const intervalRef = useRef(null);

  const moveSnake = useCallback(() => {
    const newSnake = [...snake];
    const head = { ...newSnake[0] };

    switch (direction) {
      case "UP": head.y -= 1; break;
      case "DOWN": head.y += 1; break;
      case "LEFT": head.x -= 1; break;
      case "RIGHT": head.x += 1; break;
    }

    // Game over: hit wall or self
    if (
      head.x < 0 || head.x >= BOARD_SIZE ||
      head.y < 0 || head.y >= BOARD_SIZE ||
      newSnake.some(seg => seg.x === head.x && seg.y === head.y)
    ) {
      setIsPlaying(false);
      gameOverRef.current?.play();
      musicRef.current?.pause();
      musicRef.current.currentTime = 0;
      setShowGameOver(true);
      return;
    }

    newSnake.unshift(head);

    // Eat food
    if (head.x === food.x && head.y === food.y) {
      setScore(prev => {
        const newScore = prev + 1;
        if (newScore > bestScore) {
          setBestScore(newScore);
          localStorage.setItem("bestScore", newScore);
        }
        return newScore;
      });
      setFood(getRandomFood());
      eatAudio.current?.play();
    } else {
      newSnake.pop();
    }

    setSnake(newSnake);
  }, [snake, direction, food, bestScore]);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(moveSnake, 180);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isPlaying, moveSnake]);

  useEffect(() => {
    if (isPlaying) {
      musicRef.current?.play().catch(() => {});
    } else {
      musicRef.current?.pause();
      musicRef.current.currentTime = 0;
    }
  }, [isPlaying]);

  // Prevent page scroll on arrow keys
  useEffect(() => {
    const preventScroll = (e) => {
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        e.preventDefault();
      }
    };
    window.addEventListener("keydown", preventScroll);
    return () => window.removeEventListener("keydown", preventScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case "ArrowUp": if (direction !== "DOWN") setDirection("UP"); break;
        case "ArrowDown": if (direction !== "UP") setDirection("DOWN"); break;
        case "ArrowLeft": if (direction !== "RIGHT") setDirection("LEFT"); break;
        case "ArrowRight": if (direction !== "LEFT") setDirection("RIGHT"); break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [direction]);

  const handlers = useSwipeable({
    onSwipedUp: () => direction !== "DOWN" && setDirection("UP"),
    onSwipedDown: () => direction !== "UP" && setDirection("DOWN"),
    onSwipedLeft: () => direction !== "RIGHT" && setDirection("LEFT"),
    onSwipedRight: () => direction !== "LEFT" && setDirection("RIGHT"),
    preventDefaultTouchmoveEvent: true,
    trackTouch: true,
  });

  const startGame = () => {
    setSnake(initialSnake);
    setDirection("RIGHT");
    setFood(getRandomFood());
    setScore(0);
    setShowGameOver(false);
    setIsPlaying(true);
  };

  return (
    <div className="flex flex-col items-center bg-black/30 rounded-xl p-6 shadow-2xl backdrop-blur-md">
      {/* Sounds */}
      <audio ref={musicRef} src={musicFile} loop />
      <audio ref={gameOverRef} src={gameOverSound} />
      <audio ref={eatAudio} src={eatSound} />

      <ScoreBoard score={score} best={bestScore} />

      <Box
        {...handlers}
        sx={{
          width: "90vw",
          height: "90vw",
          maxWidth: 400,
          maxHeight: 400,
          display: "grid",
          gridTemplateColumns: `repeat(${BOARD_SIZE}, 1fr)`,
          gridTemplateRows: `repeat(${BOARD_SIZE}, 1fr)`,
          backgroundColor: "#111",
          border: "4px solid #00ffcc",
          boxShadow: "0 0 20px #00ffcc",
          marginTop: "10px",
          touchAction: "none",
        }}
      >
        {Array.from({ length: BOARD_SIZE * BOARD_SIZE }).map((_, index) => {
          const x = index % BOARD_SIZE;
          const y = Math.floor(index / BOARD_SIZE);
          const isSnake = snake.some(seg => seg.x === x && seg.y === y);
          const isFood = food?.x === x && food?.y === y;

          return (
            <Box
              key={index}
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {isSnake && (
                <Snake isHead={snake[0].x === x && snake[0].y === y} />
              )}
              {isFood && <Food />}
            </Box>
          );
        })}
      </Box>

      {!isPlaying && !showGameOver && <Controls onStart={startGame} />}

      {showGameOver && (
        <div className="bg-black/80 p-6 rounded-xl shadow-lg text-center text-white animate-pulse mt-4">
          <h2 className="text-2xl font-bold mb-2 text-red-500">💀 Game Over!</h2>
          <p className="mb-4">Your Score: <span className="font-bold">{score}</span></p>
          <button
            onClick={startGame}
            className="bg-green-500 hover:bg-green-600 transition px-6 py-2 rounded-full font-bold text-white"
          >
            🔁 Play Again
          </button>
        </div>
      )}
    </div>
  );
};

export default GameBoard;
