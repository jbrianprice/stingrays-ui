import Stopwatch from "./stopWatch"
import { firestoreDB } from "../firebaseConfig" // Import your Firebase configuration
import { collection, query, where, orderBy, limit, onSnapshot, addDoc } from "firebase/firestore"
import { useEffect, useState } from "react"
import useLocation from "../utils/useLocation"
import useWeather from "../utils/useWeather"
import { History, Trophy } from "lucide-react"
import { formatTime } from "./stopWatch"

const PlayerStopWath = ({ player, statType, minValue = 2.5, maxValue = 5.5 }) => {
    const [data, setData] = useState([])
    const [stats, setStats] = useState()
    const [lastRecord, setLastRecord] = useState()
    const [pr, setPR] = useState()
    const [roster, setRoster] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [timeError, setTimeError] = useState()
    const [addFlow, showAddFlow] = useState(false)
    const [celebrate, isCelebrate] = useState()

    const userCords = useLocation()
    // const weather = useWeather()

    const collectionName = "stats"

    console.log(player.firstName, "last", lastRecord?.statValue)
    console.log(player.firstName, "pr", pr?.statValue)
    // console.log(player.firstName, "stats", stats)

    useEffect(() => {
        // Reference to the Firestore collection
        const statRef = collection(firestoreDB, collectionName)

        const lastRecordQuery = query(
            statRef,
            where("playerId", "==", player.id),
            where("statType", "==", statType),
            where("statValue", ">", minValue * 1000), // convert seconds to milliseconds
            where("statValue", "<", maxValue * 1000), // convert seconds to milliseconds
            orderBy("dateAdded", "desc"),
            limit(1)
        )

        const unsubscribeLast = onSnapshot(lastRecordQuery, (snapshot) => {
            if (!snapshot.empty) {
                setLastRecord({ id: snapshot.docs[0].id, ...snapshot.docs[0].data() })
            }
        })

        const PRQuery = query(
            statRef,
            where("playerId", "==", player.id),
            where("statType", "==", statType),
            where("statValue", ">", minValue * 1000), // convert seconds to milliseconds
            where("statValue", "<", maxValue * 1000), // convert seconds to milliseconds
            orderBy("statValue", "asc"),
            limit(1)
        )

        const unsubscribeLowest = onSnapshot(PRQuery, (snapshot) => {
            if (!snapshot.empty) {
                setPR({ id: snapshot.docs[0].id, ...snapshot.docs[0].data() })
            }
        })

        return () => {
            unsubscribeLast()
            unsubscribeLowest()
        }
    }, [])

    const handleAddStat = async (value) => {
        if (value < maxValue * 1000 && value > minValue * 1000) {
            setTimeError(false)
            await addDoc(collection(firestoreDB, collectionName), {
                playerId: player.id,
                statType: statType,
                statValue: value,
                dateAdded: new Date().toLocaleString(),
                location: {
                    latitude: userCords.latitude,
                    longitude: userCords.longitude,
                },
                // weather:
            })
            if (value <= pr?.statValue) isCelebrate(true)
        } else setTimeError(true)
    }

    useEffect(() => {
        setTimeout(() => {
            isCelebrate(false)
        }, 250)
    }, [celebrate])

    console.log(celebrate)
    const handleResetTimer = () => {
        setTimeError(false)
    }

    return (
        <li
            className={`relative static-card flex flex-col items-center gap-6 justify-between group border-b border-slate-200 dark:border-slate-800`}
        >
            <div className="flex justify-between gap-6 w-full">
                <p className="flex items-baseline gap-2 text-xl py-2 cursor-pointer w-full">
                    <span className="badge">#{player.number}</span>
                    <div className="flex items-baseline gap-2 flex-wrap">
                        <span className="font-semibold">
                            {player.firstName} {player.lastName.slice(0, 1)}.
                        </span>
                        <span className="text-xs text-slate-500">{player.team.teamName}</span>
                    </div>
                </p>
                <div className="flex flex-col items-center text-sm text-slate-500 font-bold">
                    {pr && (
                        <p className={`flex items-center gap-1`}>
                            <span className="flex whitespace-nowrap items-center gap-2">
                                <span className="font-normal hidden md:block">Best time</span>
                                <Trophy size="1rem" className="flex-none" />
                            </span>
                            {formatTime(pr?.statValue)}
                        </p>
                    )}
                    {lastRecord && (
                        <p
                            className={`flex items-center gap-1 ${
                                lastRecord?.statValue === pr?.statValue ? "text-green-500" : ""
                            }`}
                        >
                            <span className="flex whitespace-nowrap items-center gap-2">
                                <span className="font-normal hidden md:block">Last time</span>
                                <History size="1rem" className="flex-none" />
                            </span>
                            {formatTime(lastRecord?.statValue)}
                        </p>
                    )}
                </div>
            </div>
            {timeError && (
                <p className=" text-sm ml-auto error-message">That time looks fishy. Try again.</p>
            )}
            <div className="w-full">
                <Stopwatch getTime={handleAddStat} getReset={handleResetTimer} />
            </div>
            {celebrate && (
                <div className="absolute top-0 bottom-0 left-0 right-0 animate-ping bg-green-400" />
            )}
        </li>
    )
}

export default PlayerStopWath
