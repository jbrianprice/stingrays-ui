import { CheckCircle2, Circle } from "lucide-react"
import { useRoster } from "../utils/useRoster"
import { useTeamContext } from "../utils/useTeamContext"
import { useState } from "react"

const TeamSelector = () => {
    const { selectedTeams, setSelectedTeams } = useTeamContext()
    const { groupedByTeam } = useRoster()
    const [selector, showSelector] = useState()

    const handleSelectionChange = (team) => {
        setSelectedTeams((prevTeams) =>
            prevTeams.includes(team) ? prevTeams.filter((t) => t !== team) : [...prevTeams, team]
        )
    }

    return (
        <div className="py-4 flex flex-col gap-4">
            <div className="flex justify-between gap-4 align-baseline">
                {selectedTeams.length > 0 && !selector && (
                    <>
                        <h2 className=" text-lg! font-bold! mb-2">
                            {selectedTeams.length > 1
                                ? `${selectedTeams.length} teams playing`
                                : selectedTeams}
                        </h2>
                        <button
                            onClick={() => showSelector(!selector)}
                            className="tertiary text-xs"
                        >
                            {selector ? "Close" : "Change teams"}
                        </button>
                    </>
                )}
            </div>
            {(selector || selectedTeams.length === 0) && (
                <form className="contents" onClick={() => showSelector(!selector)}>
                    <div className="flex flex-col gap-4 text-center border-b pb-6 mb-6 border-neutral-200 dark:border-neutral-800 ">
                        <h3 className="font-semibold text-stone-500 py-2">Who's playing?</h3>

                        <div className="card flex flex-col gap-4">
                            <ul className="flex flex-col gap-2">
                                {Object.entries(groupedByTeam).map(([teamName, players]) => (
                                    <li
                                        key={teamName}
                                        className="text-left tertiary cardx flex gap-3 border-b last:border-none border-neutral-200 dark:border-neutral-800 pb-2 last:pb-0"
                                        onClick={() => handleSelectionChange(teamName)}
                                    >
                                        {selectedTeams.includes(teamName) ? (
                                            <CheckCircle2 className=" text-cyan-600x text-white bg-green-500 rounded-full" />
                                        ) : (
                                            <Circle className="text-stone-500" />
                                        )}

                                        <div>
                                            <h4 className="text-normal text-neutral-950x dark:text-whitex font-semibold">
                                                {teamName}
                                            </h4>
                                            <p>{players.length} players</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            {selector && selectedTeams.length > 0 && (
                                <button type="submit" className="secondary w-full">
                                    Apply
                                </button>
                            )}
                        </div>
                    </div>
                </form>
            )}
        </div>
    )
}

export default TeamSelector
