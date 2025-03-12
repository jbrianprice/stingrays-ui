import { routes } from './constants/siteMap';
import { RouterProvider } from 'react-router-dom';

function App() {
  return (
    <div className=' p-6 md:pl-10 w-full'>
        <RouterProvider router={routes}>
        </RouterProvider>
    </div>
  )
}

export default App

