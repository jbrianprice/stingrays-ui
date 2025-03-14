import Stopwatch from "./stopWatch"
import { firestoreDB } from "../firebaseConfig" // Import your Firebase configuration
import { collection, query, where, orderBy, limit, onSnapshot, addDoc } from "firebase/firestore"
import { useEffect, useState } from "react"
import useLocation from "../utils/useLocation"
// import useWeather from "../utils/useWeather"
import { History, Trophy } from "lucide-react"
import { formatTime } from "./stopWatch"
import { useNavigate } from "react-router-dom"
import PlayerGameRow from "./playerGameRow"

const PlayerStopWath = ({ player, statType, minValue = 2.5, maxValue = 5.5 }) => {
    const [lastRecord, setLastRecord] = useState()
    const [pr, setPR] = useState()
    const [prs, setPRS] = useState()
    const [allPR, setAllPR] = useState()
    const [timeError, setTimeError] = useState()
    const [celebrate, isCelebrate] = useState()

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
            limit(3)
        )

        const unsubscribeLowest = onSnapshot(PRQuery, (snapshot) => {
            if (!snapshot.empty) {
                setPR({ id: snapshot.docs[0].id, ...snapshot.docs[0].data() })
                setPRS(
                    snapshot.docs.map(s => {
                        return {
                            ...s.data(),
                            id: s.id, 
                        }
                    })
                )
            }
        })
        
        const AllPRQuery = query(
            statRef,
            where("statType", "==", statType),
            where("statValue", ">", minValue * 1000), // convert seconds to milliseconds
            where("statValue", "<", maxValue * 1000), // convert seconds to milliseconds
            orderBy("statValue", "asc"),
            limit(3)
        )

        const unsubscribeTeamBest = onSnapshot(AllPRQuery, (snapshot) => {
            if (!snapshot.empty) {
                setAllPR({ id: snapshot.docs[0].id, ...snapshot.docs[0].data() })
            }
        })

        return () => {
            unsubscribeLast()
            unsubscribeLowest()
            unsubscribeTeamBest()
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

    const handleResetTimer = () => {
        setTimeError(false)
    }

    return (
        <PlayerGameRow
            player={player}
            allPRValue={player.id === allPR?.playerId ? formatTime(allPR?.statValue) : null}
            prValue={pr ? formatTime(pr?.statValue) : null}
            lastRecordValue={pr ? formatTime(lastRecord?.statValue) : null}
            error={timeError}
            celebrate={celebrate}
        >
            <Stopwatch getTime={handleAddStat} getReset={handleResetTimer} />
        </PlayerGameRow>
    )
}

export default PlayerStopWath
