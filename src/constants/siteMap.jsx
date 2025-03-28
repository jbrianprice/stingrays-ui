import Roster from "../pages/roster";
import Games from "../pages/games";
import GamePageWrapper from "../pages/gamePageWrapper";
import PlayerProfile from '../pages/playerProfile'
import { createBrowserRouter } from "react-router-dom";
import PageWrapper from "../components/pageWrapper";



export const routes  = createBrowserRouter([
    {
      path: '/',
      element: <PageWrapper><Games /></PageWrapper>,
    },
    {
      path: '/roster',
      element: <PageWrapper><Roster /></PageWrapper>,
    },
    {
      path: '/player/:playerId',
      element: <PageWrapper><PlayerProfile /></PageWrapper>,
    },
    {
      path: '/game/:gameId',
      element: <PageWrapper><GamePageWrapper /></PageWrapper>,
    },
    // {
    //   path: '/games',
    //   element: <PageWrapper><Games /></PageWrapper>,
    // },
  ]);
