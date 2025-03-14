import Stopwatch from "../components/stopWatch"
import { gamesMeta } from "../constants/games"
import { useNavigate } from "react-router-dom"

const Games = () => {
    const navigate = useNavigate()
    return (
        <>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {gamesMeta.map((g) => (
                    <button onClick={()=> navigate(`game/${g.statType}`)} key={g.name} className="bg-white! dark:bg-neutral-950! secondary card border-0! flex flex-col gap-3 items-center text-center text-cyan-800 dark:text-cyan-400">
                        {g.img}
                        <h3 className="w-full">{g.name}</h3>
                        <p>{g.description}</p>
                    </button>
                ))}
            </div>
        </>
    )
}

export default Games


