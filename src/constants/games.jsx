import CatchSvg from "../assets/catch.svg?react"
import FieldSVG from "../assets/field.svg?react"
import HitSvg from "../assets/hit.svg?react"
import PitchSvg from "../assets/pitch.svg?react"
import RunSvg from "../assets/run.svg?react"
import StealSvg from "../assets/steal.svg?react"
import ThrowSvg from "../assets/throw.svg?react"
// import Hit2Svg  from "../assets/hit2.svg?react"
// import Hit3Svg  from "../assets/hit3.svg?react"
// import Hit4Svg  from "../assets/hit4.svg?react"
// import Run2Svg  from "../assets/run2.svg?react"
// import PlayerSvg from "../assets/player.svg?react"
import React from 'react';

export const gamesMeta = [
    {
        statType: "homeToFirstTime",
        name: "18.3 meter dash",
        description: "Go from home to first as fast as you can",
        img: <RunSvg className="h-11 max-w-11" />,
    },
    {
        statType: "homeToSecondTime",
        name: "Singles are boring",
        description: "Go from home to second as fast as you can",
        img: <HitSvg className="h-11 max-w-11" />,
    },
    {
        statType: "stealingTime",
        name: "It's not stealing if you own it",
        description: "Get a good jump and steal a base",
        img: <StealSvg className="h-11 max-w-11" />,
    },
    {
        statType: "throwSpeed",
        name: "I can throw a ball over a mountain",
        description: "Throw the ball as fast as you can",
        img: <ThrowSvg className="h-11 max-w-11" />,
    },
    {
        statType: "pichSpeed",
        name: "Frickin' laser beams",
        description: "How hard can you pitch",
        img: <PitchSvg className="h-11 max-w-11" />,
    },
    {
        statType: "pitchAccuracy",
        name: "Juuuuust a bit inside",
        description: "Test your pitching accuracy",
        img: <CatchSvg className="h-11 max-w-11" />,
    },
    {
        statType: "starDrillDefenseProficiency",
        name: "Star drill",
        description: "Make as many outs as you can before the runner scores.",
        img: <FieldSVG className="h-11 max-w-11" />,
    },
]
