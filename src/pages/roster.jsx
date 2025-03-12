import React, { useState, useEffect } from "react"
import { firestoreDB } from "../firebaseConfig" // Import your Firebase configuration
import { collection, getDocs, onSnapshot, addDoc } from "firebase/firestore"
import AddPlayer from "../components/addPlayer"
import Modal from "../components/modal"
import { useNavigate } from "react-router-dom"

function Roster() {
    const navigate = useNavigate();
    const [data, setData] = useState([])
    const [roster, setRoster] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [addFlow, showAddFlow] = useState(false)


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

    // useEffect(() => {
    //     const rosterRef = collection(firestoreDB, collectionName)
    //     const unsubscribe = onSnapshot(rosterRef, (snapshot) => {
    //         const data = snapshot.docs.map((doc) => doc.data())
    //         setRoster(data)
    //     })

    //     return () => unsubscribe()
    // }, [])

    // useEffect(() => {
    //   const fetchData = async () => {
    //     try {
    //       const querySnapshot = await getDocs(collection(firestoreDB, collectionName));
    //       const newData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    //       setData(newData);
    //     } catch (e) {
    //       setError(e);
    //     } finally {
    //       setLoading(false);
    //     }
    //   };

    //   fetchData();
    // }, []);

    const handleAddPlayer = async (formData) => {
        const now = new Date()
        await addDoc(collection(firestoreDB, collectionName), {
            ...formData,
            number: parseInt(formData.number),
            dateAdded: new Date(),
            dateModified: new Date(),
        })
    }

    if (loading) {
        return <p>Loading roster...</p>
    }

    if (error) {
        return <p>Error: {error.message}</p>
    }

    return (
        <div className="flex flex-col gap-6 w-full">
            <h1>{roster[0].team.teamName}</h1>
            <ul className="w-full">
                {roster.map((item) => (
                    <li
                        key={item.id}
                        className="flex items-center gap-6 justify-between group border-b border-slate-200 dark:border-slate-800"
                    >
                        <p className="flex items-baseline gap-2 text-xl py-2 cursor-pointer w-full" onClick={() => navigate(`/player/${item.id}`)}>
                            <span className="badge">#{item.number}</span>
                            <span className="font-semibold">
                                {item.firstName} {item.lastName.slice(0, 1)}.
                            </span>
                            <span className="text-xs text-slate-500">{item.team.teamName}</span>
                        </p>
                        <button className="tertiary text-xs md:hidden group-hover:block">Edit</button>
                    </li>
                ))}
            </ul>
            <button onClick={() => showAddFlow(true)} className="tertiary text-sm">
                + Add a new player
            </button>
            {addFlow && (
                <Modal title="Add player" isOpen={addFlow} handleClose={() => showAddFlow(false)}>
                    <AddPlayer
                        currentRoster={roster}
                        handleCancel={() => showAddFlow(false)}
                        handleSubmit={handleAddPlayer}
                    />
                </Modal>
            )}
        </div>
    )
}

export default Roster
