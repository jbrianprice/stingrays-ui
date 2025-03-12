import Stopwatch from "../components/stopWatch"

const Games = ()=> {

    return (
        <>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="card flex flex-col gap-3 items-center text-center">
                <h3 className="w-full">18.3 meter dash</h3>
                <p>Go from home to first as fast as you can</p>
            </div>
            <div className="card flex flex-col gap-3 items-center text-center">
                <h3 className="w-full">Singles are boring</h3>
                <p>Go from home to second as fast as you can</p>
            </div>
            <div className="card flex flex-col gap-3 items-center text-center">
                <h3 className="w-full">It's not stealing if you own it</h3>
                <p>Get a good jump and steal a base</p>
            </div>
            <div className="card flex flex-col gap-3 items-center text-center">
                <h3 className="w-full">I can throw a ball over a mountain</h3>
                <p>Throw the ball as fast as you can</p>
            </div>
            <div className="card flex flex-col gap-3 items-center text-center">
                <h3 className="w-full">Frickin laser beams</h3>
                <p>How hard can you pitch</p>
            </div>
            <div className="card flex flex-col gap-3 items-center text-center">
                <h3 className="w-full">Juuuuust a bit inside</h3>
                <p>Test your pitching accuracy</p>
            </div>
        </div>
        <Stopwatch />
        </>
    )
}

export default Games