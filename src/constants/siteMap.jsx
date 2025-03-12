import Home from "../pages/home";
import Roster from "../pages/roster";
import Games from "../pages/games";
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
    // {
    //   path: '/games',
    //   element: <PageWrapper><Games /></PageWrapper>,
    // },
  ]);
