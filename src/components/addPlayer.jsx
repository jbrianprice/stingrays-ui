import React, { useEffect } from "react"
import { useState } from "react"
import { doc, setDoc } from "firebase/firestore"
import { firestoreDB } from "../firebaseConfig"
import { push, ref, getDatabase } from "firebase/database"
import { useTeams } from "../utils/useTeams"
import { fieldPositions } from "../constants/positions"

export default function AddPlayer({ handleSubmit, handleCancel, currentRoster = [] }) {
    const { teams, teamsLoading, teamsError } = useTeams()
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
    const [duplicate, isDuplicate] = useState(false)
    const [duplicateTeam, isDuplicateTeam] = useState(false)
    const [selectedPositions, setSelectedPositions] = useState([])
    const [addTeam, showAddTeam] = useState(false)
    const [required, showRequired] = useState(true)

    useEffect(() => {
        setFormData({ ...formData, positions: selectedPositions })
    }, [selectedPositions])

    const handleCheckboxChange = (position) => {
        setSelectedPositions((prev) =>
            prev.includes(position) ? prev.filter((pos) => pos !== position) : [...prev, position]
        )
    }

    const handleChange = (e) => {
        const { name, value, checked, type } = e.target

        const getValue = () => {
            if (type === "number") return Number(value)
            if (type === "checkbox") return checked
            if (name === "team" && value === "add-team") {
                showAddTeam(true)
                return null
            }
            if (name === "team" && value && value !== "add-team") {
                showAddTeam(false)
                return JSON.parse(value)
            }
            if (name === "newTeam") {
                const generatePushId = () => {
                    const db = getDatabase()
                    const newPostRef = push(ref(db, "teams"))
                    return newPostRef.key
                }
                const pushId = generatePushId()
                return {
                    id: pushId,
                    teamName: value,
                }
            }
            return value
        }

        const getPropertyName = () => {
            if (name === "newTeam") return "team"
            return name
        }

        setFormData((prev) => ({
            ...prev,
            [getPropertyName()]: getValue(),
        }))
    }

    const handleAddTeam = async () => {
        const collectionName = "teams"
        const { id, teamName } = formData.team
        const docRef = doc(firestoreDB, collectionName, id)
        await setDoc(docRef, {
            teamName: teamName,
        })
    }

    const handleValidateSubmit = (e) => {
        e.preventDefault()

        const doesPlayerExist = currentRoster.some(
            (item) =>
                (formData.firstName?.toLowerCase() === item.firstName?.toLowerCase()) &
                (formData.lastName?.toLowerCase() === item.lastName?.toLowerCase())
        )

        if (doesPlayerExist) isDuplicate(true)
        if (!duplicateTeam) {
            // isDuplicate(false)
            // isDuplicateTeam(false)
            // handleSubmit(formData)
            // handleCancel()
            handleAddTeam()
        }
    }

    const handleValidateAddTeam = (e) => {
        e.preventDefault()

        const doesTeamExist = teams.some(
            (item) => formData?.team?.teamName?.toLowerCase() === item?.teamName?.toLowerCase()
        )

        if (doesTeamExist && addTeam) isDuplicateTeam(true)
        else {
            isDuplicateTeam(false)
        }
    }

    return (
        <div className="p-4 flex flex-col gap-4">
            <form onSubmit={(e) => handleValidateSubmit(e)} className="mt-4">
                <div className="flex flex-col md:flex-row gap-3">
                    <div className="input-wrapper">
                        <label>First name</label>
                        <input
                            required={required}
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input-wrapper">
                        <label>Last name</label>
                        <input
                            required={required}
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
                            required={required}
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
                                required
                                className="border p-2 block w-full mb-2"
                                name="team"
                                onChange={(e) => handleChange(e)}
                                onBlur={(e) => handleChange(e)}
                                defaultValue={""}
                            >
                                <option value="" disabled selected>
                                    Select an option...
                                </option>
                                {teams?.map((t) => (
                                    <option key={t.teamName} value={JSON.stringify(t)}>
                                        {t.teamName}
                                    </option>
                                ))}
                                <option key={"add-team"} value={"add-team"}>
                                    -- add new team --
                                </option>
                            </select>
                        )}
                    </div>
                    {addTeam && (
                        <div>
                            <label>Team name</label>
                            <input
                                required={required}
                                type="text"
                                name="newTeam"
                                defaultValue=""
                                onChange={handleChange}
                                onBlur={handleValidateAddTeam}
                                className={`border p-2 block w-full mb-2 ${
                                    duplicateTeam ? "invalid" : ""
                                }`}
                            />
                            {duplicateTeam && (
                                <p className="error-message">That team may already exist</p>
                            )}
                        </div>
                    )}
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
