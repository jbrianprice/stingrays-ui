import { routes } from "./constants/siteMap"
import { RouterProvider } from "react-router-dom"
import { TeamProvider } from "./utils/useTeamContext"
import LoginScreen from "./pages/login"
import { useAuth } from "./utils/authProvider";

function App() {
    const { user } = useAuth();

    if (!user) return <LoginScreen />

    return (
        <>
            <TeamProvider>
                <RouterProvider router={routes}></RouterProvider>
            </TeamProvider>
        </>
    )
}

export default App
