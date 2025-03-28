import { useParams } from "react-router-dom"
import React, { useEffect, useState } from "react"
import { doc, getDoc, query, where, onSnapshot, collection } from "firebase/firestore"
import { firestoreDB } from "../firebaseConfig"
import { ArrowLeft, Badge, CircleUserRound, CircleUserRoundIcon } from "lucide-react"
import BreadCrumb from "../components/breadCrumb"
import { gamesMeta } from "../constants/games"
import Loader from "../components/loader"
import { sortByString } from "../utils/sortByString"

const PlayerProfile = () => {
    const { playerId } = useParams()
    const [player, setPlayer] = useState(null)
    const [stats, setStats] = useState(null)
    const [loading, setLoading] = useState(true)
    const [statsLoading, setStatsLoading] = useState(true)
    const [showStats, showAllStats] = useState()

    useEffect(() => {
        const fetchPlayer = async () => {
            try {
                const docRef = doc(firestoreDB, "roster", playerId)
                const docSnap = await getDoc(docRef)

                if (docSnap.exists()) {
                    setPlayer(docSnap.data())
                } else {
                    console.log("No such document!")
                }
            } catch (error) {
                console.error("Error fetching document: ", error)
            } finally {
                setLoading(false)
            }
        }
        const collectionName = "stats"
        const statRef = collection(firestoreDB, collectionName)

        const statsQuery = query(statRef, where("playerId", "==", playerId))

        const unsubscribeStats = onSnapshot(statsQuery, (snapshot) => {
            if (!snapshot.empty) {
                setStatsLoading(false)
                const statRes = snapshot.docs.map((s) => {
                    return {
                        ...s.data(),
                        id: s.id,

                    }
                })

                const sortedbyDate = sortByString(statRes, "dateAdded")

                setStats(sortedbyDate)
            }
        })

        if (playerId)
            return () => {
                fetchPlayer()
                unsubscribeStats()
            }
    }, [playerId])

    const { firstName, lastName, birthday, number, team, positions } = player ?? {}

    const formattedBday = new Date(birthday + "T00:00:00")

    const groupedStatType = stats?.reduce((acc, stat) => {
        const { statType } = stat
        if (!acc[statType]) {
            acc[statType] = []
        }
        acc[statType].push(stat)
        return acc
    }, {})

    const getStatMetadata = (type) => {
        return gamesMeta.find((g) => g.statType === type)
    }

    const StatRow = ({ type, stats }) => {
        return (
            <li className="flex justify-between gap-4 text-sm md:border-b last:border-0 border-light pb-1 mb-1">
                <span>
                    {getStatMetadata(type)?.valueFormat
                        ? getStatMetadata(type)?.valueFormat(stats?.statValue)
                        : s.statValue}
                </span>
                <span className="text-sm text-stone-500">{stats.dateAdded}</span>
            </li>
        )
    }

    if (loading) return <Loader message="loading stats..." />
    if (!player) return <p>Player not found</p>
    return (
        <div>
            <BreadCrumb label="Full roster" path="/roster" />
            <div className="flex flex-col items-centerx gap-2 mx-auto mb-2 pb-6 border-b border-light">
                {/* <CircleUserRound size={"100px"} /> */}
                <div className="flex gap-2">
                    <div className="badge self-center">{number}</div>
                    <h2 className="text-3xl! font-semibold!">
                        {firstName} {lastName.slice(0, 1)}.
                    </h2>
                </div>
                <p className=" text-cyan-500 text-lg">{team.teamName}</p>
                <div>
                    <label>Born</label>
                    <p>
                        {formattedBday.toLocaleString("en", {
                            month: "long",
                            day: "2-digit",
                            year: "numeric",
                        })}
                    </p>
                </div>
                <div>
                    <label>Positions</label>
                    <p>{positions.join(", ")}</p>
                </div>
            </div>
            <div className="flex flex-col gap-3">
            <h3 className="font-semibold text-xl">Stats</h3>
            {statsLoading ? (
                <Loader message="loading stats..." />
            ) : (
                Object.entries(groupedStatType)?.map(([type, stats]) => (
                    <div className="static-card" key={type}>
                        <div className="flex gap-2 pb-2 mb-2 border-b border-light">
                            <div>
                                <h4 className="font-semibold">{getStatMetadata(type)?.name}</h4>
                                <p className="text-sm text-stone-500">
                                    {getStatMetadata(type)?.description}
                                </p>
                            </div>
                        </div>
                        <ul>
                            {stats?.slice(0, 9)?.map((s, i) => (
                                <StatRow key={s.id} type={type} stats={s} />
                            ))}
                            {showStats === type &&
                                stats
                                    ?.slice(10)
                                    ?.map((s, i) => <StatRow key={s.id} type={type} stats={s} />)}
                            {stats.length > 10 && (
                                <button
                                    onClick={() =>
                                        showStats === type ? showAllStats() : showAllStats(type)
                                    }
                                    className="tertiary text-sm"
                                >
                                    {showStats === type ? "show less" : "show more"}
                                </button>
                            )}
                        </ul>
                    </div>
                ))
            )}
            </div>
        </div>
    )
}

export default PlayerProfile
