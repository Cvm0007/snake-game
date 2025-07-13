import React, { useState, useEffect, useCallback, useRef } from "react";
import Snake from "./Snake";
import Food from "./Food";
import ScoreBoard from "./ScoreBoard";
import Controls from "./Controls";
import { Box } from "@mui/material";
import eatSound from "../assets/eat.mp3";
import bgMusic from "../assets/bg-music.mp3";
import { useSwipeable } from 'react-swipeable';


const BOARD_SIZE = 20;

const getRandomCoord = () => [
    Math.floor(Math.random() * BOARD_SIZE),
    Math.floor(Math.random() * BOARD_SIZE),
];

const initialSnake = [
    [8, 8],
    [8, 9],
];

const GameBoard = () => {
    const [snake, setSnake] = useState(initialSnake);
    const [food, setFood] = useState(getRandomCoord);
    const [direction, setDirection] = useState("UP");
    const [gameOver, setGameOver] = useState(false);
    const [started, setStarted] = useState(false);
    const [bestScore, setBestScore] = useState(
        parseInt(localStorage.getItem("bestScore")) || 0
    );

    const handlers = useSwipeable({
        onSwipedUp: () => setDirection('UP'),
        onSwipedDown: () => setDirection('DOWN'),
        onSwipedLeft: () => setDirection('LEFT'),
        onSwipedRight: () => setDirection('RIGHT'),
    });

    const score = snake.length - initialSnake.length;

    const bgAudio = useRef(null);
    const startBell = useRef(null);
    const endBell = useRef(null);
    const eatAudio = useRef(null);

    const moveSnake = useCallback(() => {
        const head = snake[0];
        const newHead = [...head];

        if (direction === "UP") newHead[1] -= 1;
        if (direction === "DOWN") newHead[1] += 1;
        if (direction === "LEFT") newHead[0] -= 1;
        if (direction === "RIGHT") newHead[0] += 1;

        const newSnake = [newHead, ...snake];

        if (newHead[0] === food[0] && newHead[1] === food[1]) {
            setFood(getRandomCoord());
            eatAudio.current?.play();
        } else {
            newSnake.pop();
        }

        if (
            newHead[0] < 0 || newHead[0] >= BOARD_SIZE ||
            newHead[1] < 0 || newHead[1] >= BOARD_SIZE ||
            snake.some(([x, y]) => x === newHead[0] && y === newHead[1])
        ) {
            setGameOver(true);
            setStarted(false);
            bgAudio.current.pause();
            endBell.current.play();
            return;
        }

        setSnake(newSnake);
    }, [snake, food, direction]);

    useEffect(() => {
        const handleKey = (e) => {
            const keyMap = {
                ArrowUp: "UP",
                ArrowDown: "DOWN",
                ArrowLeft: "LEFT",
                ArrowRight: "RIGHT",
            };
            if (keyMap[e.key]) setDirection(keyMap[e.key]);
        };

        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, []);

    useEffect(() => {
        if (!started || gameOver) return;
        const interval = setInterval(moveSnake, 180);
        return () => clearInterval(interval);
    }, [moveSnake, started, gameOver]);

    useEffect(() => {
        if (score > bestScore) {
            setBestScore(score);
            localStorage.setItem("bestScore", score.toString());
        }
    }, [score]);

    const handleStart = () => {
        setStarted(true);
        setSnake(initialSnake);
        setFood(getRandomCoord);
        setDirection("UP");
        setGameOver(false);
        startBell.current.play();
        bgAudio.current.play();
        bgAudio.current.loop = true;
    };

    return (
        <div className="flex flex-col items-center bg-black/30 rounded-xl p-6 shadow-2xl backdrop-blur-md">
            <ScoreBoard score={score} best={bestScore} />
            <Box
                {...handlers}
                sx={{
                    width: '90vw',
                    height: '90vw',
                    maxWidth: 400,
                    maxHeight: 400,
                    display: "grid",
                    gridTemplateColumns: `repeat(${BOARD_SIZE}, 1fr)`,
                    gridTemplateRows: `repeat(${BOARD_SIZE}, 1fr)`,
                    backgroundColor: "#111",
                    border: "4px solid #00ffcc",
                    boxShadow: "0 0 20px #00ffcc",
                    marginTop: "10px",
                }}
            >

                <Snake snake={snake} />
                <Food food={food} />
            </Box>
            <Controls onStart={handleStart} started={started} />

            <audio ref={bgAudio} src={bgMusic}></audio>
            {/* <audio ref={startBell} src={bellStart}></audio> */}
            {/* <audio ref={endBell} src={bellEnd}></audio> */}
            <audio ref={eatAudio} src={eatSound}></audio>
        </div>
    );
};

export default GameBoard;