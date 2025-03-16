import { routes } from "./constants/siteMap"
import { RouterProvider } from "react-router-dom"
import { TeamProvider } from "./utils/useTeamContext"

function App() {
    return (
        <>
            <TeamProvider>
                <RouterProvider router={routes}></RouterProvider>
            </TeamProvider>
        </>
    )
}

export default App
