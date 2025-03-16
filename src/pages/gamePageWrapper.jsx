import { useParams } from "react-router-dom"
import { gamesMeta } from "../constants/games"
import BreadCrumb from "../components/breadCrumb"
import TeamSelector from "../components/teamSelector"
import { useTeamContext } from "../utils/useTeamContext"

const GamePage = () => {
    const { gameId } = useParams()
    const { selectedTeams } = useTeamContext()
    const game = gamesMeta.find((g) => g.statType === gameId)

    return (
        <div>
            <BreadCrumb label="All games" path="/" />
            <div className="flex gap-3  text-cyan-700 dark:text-cyan-400 pt-10 pb-6 border-b border-neutral-200 dark:border-neutral-800">
                <div className="scale-200">{game.img} </div>
                <div>
                    <h1 className="flex items-baseline gap-2">{game.name}</h1>
                    <p className="text-sm text-neutral-700 dark:text-neutral-400">
                        {game.description}
                    </p>
                </div>
            </div>
            <TeamSelector />
            {selectedTeams.length > 0 && game.app}
        </div>
    )
}

export default GamePage
