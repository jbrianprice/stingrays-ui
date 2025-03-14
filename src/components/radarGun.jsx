import { useRoster } from "../utils/useRoster"
import Loader from "./loader"
import RadarData from './radarData'


const RadarGun = ({ statType, minValue, maxValue}) => {
    const { roster, loading, error } = useRoster()

    if (loading) {
        return <Loader message="...loading players" />
    }

    if (error) {
        return <p>Error: {error.message}</p>
    }

    return (
        <ul className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4 py-4">
            {roster.map((player) => (
                <RadarData
                    key={player.id}
                    player={player}
                    statType={statType}
                    minValue={minValue}
                    maxValue={maxValue}
                />
            ))}
        </ul>
    )
}

export default RadarGun