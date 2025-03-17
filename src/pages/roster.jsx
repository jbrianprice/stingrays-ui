import React, { useState, useEffect } from "react"
import { firestoreDB } from "../firebaseConfig" // Import your Firebase configuration
import { collection, doc, addDoc, updateDoc, deleteDoc } from "firebase/firestore"
import AddPlayer from "../components/addPlayer"
import Modal from "../components/modal"
import { useNavigate } from "react-router-dom"
import Loader from "../components/loader"
import { useRoster } from "../utils/useRoster"
import { Plus } from "lucide-react"

function Roster() {
    const navigate = useNavigate()
    const { roster, loading, error } = useRoster()
    const [addFlow, showAddFlow] = useState(false)
    const [editPlayerData, setEditPlayerData] = useState()

    const collectionName = "roster"

    const handleEdit = (player) => {
        setEditPlayerData(player)
        showAddFlow(true)
    }
    const handleCancel = () => {
        setEditPlayerData()
        showAddFlow(false)
    }

    const handleAddPlayer = async (formData) => {
        console.log('add', formData)
        await addDoc(collection(firestoreDB, collectionName), {
            ...formData,
            number: parseInt(formData.number),
            dateAdded: new Date(),
            dateModified: new Date(),
        })
    }
    const handleUpdatePlayer = async (formData) => {
        console.log('update', formData)
        const recordRef = doc(firestoreDB, collectionName, editPlayerData?.id)
        const updateRecord = async () => {
            try {
                await updateDoc(recordRef, {
                    ...formData,
                    number: parseInt(formData.number),
                    dateAdded: new Date(),
                    dateModified: new Date(),
                })
                console.log("Record updated successfully!")
            } catch (error) {
                console.error("Error updating record:", error)
            }
        }

        updateRecord()
        setEditPlayerData()
    }
    const handleDeletePlayer = async (playerId) => {
        const recordRef = doc(firestoreDB, collectionName, playerId)
        try {
          await deleteDoc(recordRef);
          console.log(`Document with ID ${playerId} deleted successfully from collection ${collectionName}.`);
        } catch (error) {
          console.error("Error deleting document:", error);
        }
      };

    const groupedByTeam = roster.reduce((acc, player) => {
        const teamName = player.team?.teamName || "No Team"
        if (!acc[teamName]) {
            acc[teamName] = []
        }
        acc[teamName].push(player)
        return acc
    }, {})

    if (loading) {
        return <Loader message="...loading players" />
    }

    if (error) {
        return <p>Error: {error.message}</p>
    }

    return (
        <div className="flex flex-col gap-6 w-full">
            <ul className="flex flex-col gap-6 w-full">
                {Object.entries(groupedByTeam).map(([teamName, players]) => (
                    <li key={teamName}>
                        <h2>{teamName}</h2>
                        <ul>
                            {players.map((item) => (
                                <li
                                    key={item.id}
                                    className="flex items-center gap-6 justify-between group border-b border-slate-200 dark:border-slate-800"
                                >
                                    <p
                                        className="flex items-baseline gap-2 text-xl py-2 cursor-pointer w-full"
                                        onClick={() => navigate(`/player/${item.id}`)}
                                    >
                                        <span className="badge">#{item.number}</span>
                                        <span className="font-semibold">
                                            {item.firstName} {item.lastName.slice(0, 1)}.
                                        </span>
                                        <span className="text-xs text-slate-500">
                                            {item.team.teamName}
                                        </span>
                                    </p>
                                    <button
                                        className="tertiary text-xs md:hidden group-hover:block"
                                        onClick={() => handleEdit(item)}
                                    >
                                        Edit
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
            <button
                onClick={() => showAddFlow(true)}
                className="tertiary text-sm flex items-center mx-auto"
            >
                <Plus className="h-4" />
                Add a new player
            </button>
            {addFlow && (
                <Modal title="Add player" isOpen={addFlow} handleClose={() => showAddFlow(false)}>
                    <AddPlayer
                        currentRoster={roster}
                        handleCancel={handleCancel}
                        handleSubmit={handleAddPlayer}
                        handleUpdatePlayer={handleUpdatePlayer}
                        handleDeletePlayer={handleDeletePlayer}
                        playerData={editPlayerData}
                    />
                </Modal>
            )}
        </div>
    )
}

export default Roster
