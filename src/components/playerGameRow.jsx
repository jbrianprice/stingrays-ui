import { useNavigate } from "react-router-dom"
import { Trophy, History } from "lucide-react"

const PlayerGameRow = ({
    player,
    prLabel = "Best",
    prValue,
    lastLabel = "Last",
    lastRecordValue,
    error,
    errorMessage = "That number looks fishy. Try again.",
    children,
    celebrate,
}) => {
    const navigate = useNavigate()

    return (
        <li
            className={`relative static-card flex flex-col items-center gap-6 justify-between group border-b border-slate-200 dark:border-slate-800`}
        >
            <div className="flex justify-between gap-6 w-full">
                <div
                    className="flex items-baseline gap-2 text-xl py-2 cursor-pointer w-full"
                    onClick={() => navigate(`/player/${player.id}`)}
                >
                    <span className="badge">#{player.number}</span>
                    <div className="flex items-baseline gap-2 flex-wrap">
                        <span className="font-semibold">
                            {player.firstName} {player.lastName.slice(0, 1)}.
                        </span>
                        <span className="text-xs text-slate-500">{player.team.teamName}</span>
                    </div>
                </div>
                <div className="flex flex-col items-center text-sm text-slate-500 font-extrabold">
                    {prValue && (
                        <p className={`flex items-center gap-1`}>
                            <span className="flex whitespace-nowrap items-center gap-2">
                                <span className="font-normal hidden md:block">{prLabel}</span>
                                <Trophy size="1rem" className="flex-none" />
                            </span>
                            {prValue}
                        </p>
                    )}
                    {lastRecordValue && (
                        <p
                            className={`flex items-center gap-1 ${
                                lastRecordValue === prValue ? "text-green-500" : ""
                            }`}
                        >
                            <span className="flex whitespace-nowrap items-center gap-2">
                                <span className="font-normal hidden md:block">{lastLabel}</span>
                                <History size="1rem" className="flex-none" />
                            </span>
                            {lastRecordValue}
                        </p>
                    )}
                </div>
            </div>
            {error && <p className=" text-sm ml-auto error-message">{errorMessage}</p>}
            <div className="w-full">{children}</div>
            {celebrate && (
                <div className="absolute top-0 bottom-0 left-0 right-0 animate-ping bg-green-400" />
            )}
        </li>
    )
}

export default PlayerGameRow
