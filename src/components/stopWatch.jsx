import React, { useState, useEffect } from "react"

export default function Stopwatch() {
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

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60000)
        const seconds = Math.floor((time % 60000) / 1000)
        const milliseconds = Math.floor((time % 1000) / 10)
        return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}:${String(
            milliseconds
        ).padStart(2, "0")}`
    }

    return (
        <div
            className="flex items-center gap-4 justify-between"
            onClick={() => (isRunning ? setIsRunning(false) : null)}
        >
            <div className="text-3xl font-mono p-2">{formatTime(time)}</div>
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
