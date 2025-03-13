import { useParams } from "react-router-dom"
import React, { useEffect, useState } from "react"
import { doc, getDoc } from "firebase/firestore"
import { firestoreDB } from "../firebaseConfig"
import { ArrowLeft } from "lucide-react"
import BreadCrumb from "../components/breadCrumb"

const PlayerProfile = () => {
    const { playerId } = useParams()
    const [player, setPlayer] = useState(null)
    const [loading, setLoading] = useState(true)

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

        if (playerId) {
            fetchPlayer()
        }
    }, [playerId])

    if (loading) return <p>Loading...</p>
    if (!player) return <p>Player not found</p>

    const {firstName, lastName, birthday, number, team} = player

    const formattedBday = new Date(birthday + 'T00:00:00');

    return (
        <div>
            <BreadCrumb label = "Full roster" path="/roster" />
            <h2>{firstName} {lastName.slice(0,1)}.</h2>
            <p>{formattedBday.toLocaleString('en', { month: 'long', day: '2-digit', year: 'numeric' })}</p>
        </div>
    )
}

export default PlayerProfile
