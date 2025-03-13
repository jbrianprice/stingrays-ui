import React, { useEffect } from "react"
import { useState } from "react"
import { getDocs, collection } from "firebase/firestore"
import { firestoreDB } from "../firebaseConfig"
import Select from "react-select"

const fieldPositions = [
    "Pitcher",
    "Catcher",
    "First Base",
    "Second Base",
    "Third Base",
    "Shortstop",
    "Left Field",
    "Center Field",
    "Right Field",
    "Utility",
]

export default function AddPlayer({ handleSubmit, handleCancel, currentRoster = [] }) {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        birthday: undefined,
        number: undefined,
        position: [],
        activeStatus: true,
        dateAdded: new Date(),
        dateModified: new Date(),
        team: undefined,
    })

    const [roster, setRoster] = useState([])
    const [teams, setTeams] = useState([])
    const [teamsLoading, setTeamsLoading] = useState(true)
    const [teamsError, setTeamsError] = useState()
    const [submitted, isSubmitted] = useState()
    const [duplicate, isDuplicate] = useState(false)
    const [selectedPositions, setSelectedPositions] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const getTeams = await getDocs(collection(firestoreDB, "teams"))
                const teamList = getTeams.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
                setTeams(teamList)
                if (!formData.team)
                    setFormData((prev) => ({
                        ...prev,
                        team: teamList[0],
                    }))
            } catch (e) {
                console.error(e)
                setTeamsError(e)
            } finally {
                setTeamsLoading(false)
            }
        }
        fetchData()
    }, [])

    useEffect(()=> {
        setFormData({...formData, positions: selectedPositions})
    }, [selectedPositions])

    const handleCheckboxChange = (position) => {
        setSelectedPositions((prev) =>
            prev.includes(position) ? prev.filter((pos) => pos !== position) : [...prev, position]
        )
    }

    console.log(formData)

    const handleChange = (e) => {
        const { name, value, checked } = e.target

        const getValue = () => {
            if (e.target.type === "number") return Number(value)
            if (e.target.type === "checkbox") return checked
            return value
        }

        setFormData((prev) => ({
            ...prev,
            [name]: getValue(),
        }))
    }

    const handleValidateSubmit = (e) => {
        e.preventDefault()

        const doesPlayerExist = currentRoster.some(
            (item) =>
                (formData.firstName?.toLowerCase() === item.firstName?.toLowerCase()) &
                (formData.lastName?.toLowerCase() === item.lastName?.toLowerCase())
        )

        if (doesPlayerExist) isDuplicate(true)
        else {
            isDuplicate(false)
            handleSubmit(formData)
            handleCancel()
        }
    }

    return (
        <div className="p-4 flex flex-col gap-4">
            <form onSubmit={(e) => handleValidateSubmit(e)} className="mt-4">
                <div className="flex flex-col md:flex-row gap-3">
                    <div className="input-wrapper">
                        <label>First name</label>
                        <input
                            required
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input-wrapper">
                        <label>Last name</label>
                        <input
                            required
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="flex flex-col md:flex-row gap-3">
                    <div className="input-wrapper">
                        <label>Jersey #</label>
                        <input
                            required
                            type="number"
                            name="number"
                            max="99"
                            value={formData.number}
                            onChange={handleChange}
                            placeholder="Number"
                            className="border p-2 block w-full mb-2"
                        />
                    </div>
                    <div className="input-wrapper">
                        <label>
                            Birthday <span className="font-normal">(optional)</span>
                        </label>
                        <input
                            type="date"
                            name="birthday"
                            value={formData.birthday}
                            onChange={handleChange}
                            placeholder="Number"
                        />
                    </div>
                </div>
                <div className="iput-wrapper">
                    <label>
                        Positions <span className="font-normal">(optional)</span>
                    </label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                        {fieldPositions.map((pos) => (
                            <label key={pos} className="flex items-center gap-x-2">
                                <input
                                    type="checkbox"
                                    value={pos}
                                    checked={selectedPositions.includes(pos)}
                                    onChange={() => handleCheckboxChange(pos)}
                                />
                                <span>{pos}</span>
                            </label>
                        ))}
                    </div>
                </div>
                <div className="iput-wrapper">
                    <div>
                        <label>Team</label>
                        {teamsLoading ? (
                            "...loading teams"
                        ) : (
                            <select
                                className="border p-2 block w-full mb-2"
                                name="team"
                                onChange={(e) => handleChange(e)}
                                onBlur={(e) => handleChange(e)}
                            >
                                {teams.map((t) => (
                                    <option key={t.teamName} value={JSON.stringify(t)}>
                                        {t.teamName}
                                    </option>
                                ))}
                            </select>
                        )}
                    </div>
                    <div className="flex items-center mb-2">
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                name="activeStatus"
                                defaultChecked={formData.activeStatus}
                                onChange={handleChange}
                                className="mr-2"
                            />
                            Active player
                        </label>
                    </div>
                </div>
                <div className="mt-4 ml-autox flex justify-between w-full gap-3">
                    {handleCancel && (
                        <button className="secondary w-full" onClick={handleCancel}>
                            Nevermind
                        </button>
                    )}
                    <button type="submit" className="w-full">
                        Add
                    </button>
                </div>
                {duplicate && <p className="error-message">That player may already exist</p>}
            </form>
        </div>
    )
}
