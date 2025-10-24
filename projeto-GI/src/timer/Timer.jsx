import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Timer() {
    const INITIAL_TIME = 25 * 60;
    const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);
    const [isRunning, setIsRunning] = useState(false);


    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    };

    useEffect(() => {
        if (!isRunning) return;

        const interval = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    setIsRunning(false);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);


        return () => clearInterval(interval);
    }, [isRunning]);

    const handleStartPause = () => setIsRunning((prev) => !prev);
    const handleReset = () => {
        setIsRunning(false);
        setTimeLeft(INITIAL_TIME);
    };

    return (
        <>
            <div className="timer-container">
                <h2 className="timer-display">{formatTime(timeLeft)}</h2>
                <div className="timer-buttons">
                    <button onClick={handleStartPause} className="timer-btn">
                        {isRunning ? "Pausar" : "Iniciar"}
                    </button>
                    <button onClick={handleReset} className="timer-btn reset">
                        Resetar
                    </button>
                </div>
            </div>
            <div>
                <p className="redirectText">
                    Editar perfil <Link to="/Perfil">Perfil</Link>
                </p>
            </div>
        </>
    );
}

export default Timer