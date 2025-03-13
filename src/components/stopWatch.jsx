import React, { useState, useEffect } from "react"

export const formatTime = (time, showMinutes) => {
    const minutes = Math.floor(time / 60000)
    const seconds = Math.floor((time % 60000) / 1000)
    const milliseconds = Math.floor((time % 1000) / 10)
    return `${showMinutes ? `${String(minutes).padStart(2, "0")}:` : ""}${String(seconds).padStart(
        2,
        "0"
    )}:${String(milliseconds).padStart(2, "0")}`
}
export default function Stopwatch({
    getTime = () => console.log("get time"),
    getReset = () => console.log("get reset"),
}) {
    const [time, setTime] = useState(0)
    const [isRunning, setIsRunning] = useState(false)

    useEffect(() => {
        let interval
        if (isRunning) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime + 10)
            }, 10)
        } else {
            clearInterval(interval)
        }
        return () => clearInterval(interval)
    }, [isRunning])

    useEffect(() => {
        if (time > 0 && !isRunning) getTime(time)
        if (time === 0 && !isRunning) getReset()
    }, [time, isRunning])

    return (
        <div
            className="flex items-center gap-4 justify-between"
            onClick={() => (isRunning ? setIsRunning(false) : null)}
        >
            <div
                className={`${
                    time === 0
                        ? " text-neutral-300 dark:text-neutral-800"
                        : " text-neutral-600 dark:text-neutral-400"
                } text-3xl font-mono p-2 `}
            >
                {formatTime(time)}
            </div>
            {isRunning ? (
                <button className="ml-auto primaryx bg-red-500!">Stop</button>
            ) : (
                <>
                    <div className="flex gap-2">
                        {time > 0 && (
                            <button
                                className="secondary"
                                onClick={() => {
                                    setTime(0)
                                    setIsRunning(false)
                                }}
                            >
                                Reset
                            </button>
                        )}
                        <button onClick={() => setIsRunning(true)} disabled={isRunning}>
                            Go!
                        </button>
                    </div>
                </>
            )}
        </div>
    )
}
