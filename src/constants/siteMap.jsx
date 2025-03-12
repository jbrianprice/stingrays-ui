import Home from "../pages/home";
import Roster from "../pages/roster";
import PlayerProfile from '../pages/playerProfile'
import { createBrowserRouter } from "react-router-dom";
import PageWrapper from "../components/pageWrapper";



export const routes  = createBrowserRouter([
    {
      path: '/',
      element: <PageWrapper><Home /></PageWrapper>,
    },
    {
      path: '/roster',
      element: <PageWrapper><Roster /></PageWrapper>,
    },
    {
      path: '/player/:playerId',
      element: <PageWrapper><PlayerProfile /></PageWrapper>,
    },
  ]);
