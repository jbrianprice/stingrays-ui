import { routes } from "./constants/siteMap"
import { RouterProvider } from "react-router-dom"
import { TeamProvider } from "./utils/useTeamContext"
import LoginScreen from "./pages/login"
import { useAuth } from "./utils/authProvider";

function App() {
    const { user } = useAuth();

    console.log(user)
    return (
        <>
            <TeamProvider>
                <RouterProvider router={routes}></RouterProvider>
            </TeamProvider>
        </>
    )
}

export default App
