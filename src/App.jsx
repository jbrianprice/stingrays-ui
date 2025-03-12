import { routes } from "./constants/siteMap"
import { RouterProvider } from "react-router-dom"

function App() {
    return (
        <>
            <RouterProvider router={routes}></RouterProvider>
        </>
    )
}

export default App
