import { useEffect, useState } from "react"
import { firestoreDB } from "../firebaseConfig" // Import your Firebase configuration
import { collection, onSnapshot, addDoc } from "firebase/firestore"
import PlayerStopWath from "./playerStopWatch"

const RosterStopWatch = ({statType}) => {
    const [roster, setRoster] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const collectionName = "roster"

    useEffect(() => {
        // Reference to the Firestore collection
        const rosterRef = collection(firestoreDB, collectionName)

        // Set up a real-time listener with error handling
        const unsubscribe = onSnapshot(
            rosterRef,
            async (snapshot) => {
                try {
                    // Map the snapshot to an array of players
                    const rosterList = await Promise.all(
                        snapshot.docs.map(async (doc) => ({
                            id: doc.id,
                            ...doc.data(),
                        }))
                    )
                    setRoster(rosterList)
                    setLoading(false)
                } catch (err) {
                    console.error("Failed to fetch players:", err)
                    setError("Failed to load players. Please try again later.")
                }
            },
            (err) => {
                console.error("Snapshot listener failed:", err)
                setError("Failed to connect to database.")
            }
        )

        // Clean up the listener when the component unmounts
        return () => unsubscribe()
    }, [])

    if (loading) {
        return <p>Loading roster...</p>
    }

    if (error) {
        return <p>Error: {error.message}</p>
    }

    return (
        <div className="flex flex-col gap-6 w-full py-4">
            <ul className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4">
                {roster.map((player) => (
                    <PlayerStopWath key={player.id} player={player} statType={statType} />
                ))}
            </ul>
        </div>
    )
}

export default RosterStopWatch
