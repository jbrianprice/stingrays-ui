import { routes } from "./constants/siteMap"
import { RouterProvider } from "react-router-dom"
import LoginScreen from "./pages/login"
import { useAuth } from "./utils/authProvider";

function App() {
    const { user } = useAuth();

    console.log(user)
    return (
        <>
            <RouterProvider router={routes}></RouterProvider>
        </>
    )
}

export default App
