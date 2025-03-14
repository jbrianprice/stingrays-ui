import Stopwatch from "./stopWatch"
import { firestoreDB } from "../firebaseConfig" // Import your Firebase configuration
import { collection, query, where, orderBy, limit, onSnapshot, addDoc } from "firebase/firestore"
import { useEffect, useState } from "react"
import useLocation from "../utils/useLocation"
// import useWeather from "../utils/useWeather"
import {
    History,
    Trophy,
    Plus,
    Minus,
    CircleChevronUp,
    CircleChevronDown,
    ChevronDown,
    ChevronUp,
} from "lucide-react"
import { formatTime } from "./stopWatch"
import { useNavigate } from "react-router-dom"
import PlayerGameRow from "./playerGameRow"

const RadarData = ({ player, statType, minValue, maxValue }) => {
    const [lastRecord, setLastRecord] = useState()
    const [pr, setPR] = useState()
    const [timeError, setTimeError] = useState()
    const [celebrate, isCelebrate] = useState()

    const [speed, setSpeed] = useState(40)

    const navigate = useNavigate()

    const userCords = useLocation()
    // const weather = useWeather()

    const collectionName = "stats"

    useEffect(() => {
        // Reference to the Firestore collection
        const statRef = collection(firestoreDB, collectionName)

        const lastRecordQuery = query(
            statRef,
            where("playerId", "==", player.id),
            where("statType", "==", statType),
            where("statValue", ">", minValue),
            where("statValue", "<", maxValue),
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
            where("statValue", ">", minValue),
            where("statValue", "<", maxValue),
            orderBy("statValue", "desc"),
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
        if (value < maxValue && value > minValue) {
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
            if (value >= pr?.statValue) isCelebrate(true)
        } else setTimeError(true)
    }

    useEffect(() => {
        setTimeout(() => {
            isCelebrate(false)
        }, 250)
    }, [celebrate])

    const handleIncrement = (value) => {
        if (speed + value <= maxValue && speed + value >= minValue) setSpeed(speed + value)
    }

    return (
        <PlayerGameRow
            player={player}
            prLabel={"Highest speed"}
            prValue={pr ? pr?.statValue : null}
            lastLabel="Last speed"
            lastRecordValue={pr ? lastRecord?.statValue : null}
            error={timeError}
            errorMessage="That number looks fishy. Try again."
            celebrate={celebrate}
        >
            <div className="flex gap-3 items-center">
                <div className="flex flex-col">
                    <button className="tertiary" onClick={() => handleIncrement(10)}>
                        <ChevronUp className="h-7 md:h-4" />
                    </button>
                    <button className="tertiary" onClick={() => handleIncrement(-10)}>
                        <ChevronDown className="h-7 md:h-4" />
                    </button>
                </div>
                <div className="flex">
                    <span className="border border-stone-200 dark:border-stone-800 p-4 rounded-md text-4xl font-mono">
                        {speed.toString().slice(0, 1)}
                    </span>
                    <span className="border border-stone-200 dark:border-stone-800 p-4 rounded-md text-4xl font-mono">
                        {speed.toString().slice(1)}
                    </span>
                </div>
                <div className="flex flex-col">
                    <button className="tertiary" onClick={() => handleIncrement(1)}>
                        <ChevronUp className="h-7 md:h-4" />
                    </button>
                    <button className="tertiary" onClick={() => handleIncrement(-1)}>
                        <ChevronDown className="h-7 md:h-4" />
                    </button>
                </div>
                <button onClick={()=> handleAddStat(speed)} className="ml-auto">Save</button>
            </div>
        </PlayerGameRow>
    )
}

export default RadarData
