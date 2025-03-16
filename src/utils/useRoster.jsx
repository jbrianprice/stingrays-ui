import { useEffect, useState } from "react"
import { firestoreDB } from "../firebaseConfig"
import { collection, onSnapshot } from "firebase/firestore"


export const useRoster = ()=> {
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

                    const sortRosterByName = rosterList.sort((a, b) => {
                        const nameA = a.firstName.toUpperCase();
                        const nameB = b.firstName.toUpperCase();
                        if (nameA < nameB) {
                          return -1;
                        }
                        if (nameA > nameB) {
                          return 1;
                        }
                        return 0;
                      });

                    setRoster(sortRosterByName)
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

    const groupedByTeam = roster.reduce((acc, player) => {
        const teamName = player.team?.teamName || "No Team"
        if (!acc[teamName]) {
            acc[teamName] = []
        }
        acc[teamName].push(player)
        return acc
    }, {})

    return {roster, loading, error, groupedByTeam}
}