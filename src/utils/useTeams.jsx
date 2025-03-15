import { useEffect, useState } from "react"
import { firestoreDB } from "../firebaseConfig"
import { collection, onSnapshot } from "firebase/firestore"

export const useTeams = () => {
    const [teams, setTeams] = useState([])
    const [teamsLoading, setLoading] = useState(true)
    const [teamsError, setError] = useState(null)

    const collectionName = "teams"

    useEffect(() => {
        // Reference to the Firestore collection
        const teamRef = collection(firestoreDB, collectionName)

        // Set up a real-time listener with error handling
        const unsubscribe = onSnapshot(
            teamRef,
            async (snapshot) => {
                try {
                    // Map the snapshot to an array of players
                    const teamList = await Promise.all(
                        snapshot.docs.map(async (doc) => ({
                            id: doc.id,
                            ...doc.data(),
                        }))
                    )

                    const sortByName = teamList.sort((a, b) => {
                        const nameA = a.teamName.toUpperCase()
                        const nameB = b.teamName.toUpperCase()
                        if (nameA < nameB) {
                            return -1
                        }
                        if (nameA > nameB) {
                            return 1
                        }
                        return 0
                    })

                    setTeams(sortByName)
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

    return { teams, teamsLoading, teamsError }
}
