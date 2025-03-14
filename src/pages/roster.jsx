import React, { useState, useEffect } from "react"
import { firestoreDB } from "../firebaseConfig" // Import your Firebase configuration
import { collection, getDocs, onSnapshot, addDoc } from "firebase/firestore"
import AddPlayer from "../components/addPlayer"
import Modal from "../components/modal"
import { useNavigate } from "react-router-dom"
import Loader from "../components/loader"
import { useRoster } from "../utils/useRoster"

function Roster() {
    const navigate = useNavigate();
    const {roster, loading, error} = useRoster()
    const [addFlow, showAddFlow] = useState(false)

    const collectionName = "roster"

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
        return  <Loader message="...loading players" />
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
