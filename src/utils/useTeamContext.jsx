import { useContext, useEffect, createContext, useState } from "react"

const TeamContext = createContext()

export const TeamProvider = ({ children }) => {
    const [selectedTeams, setSelectedTeams] = useState(() => {
      return JSON.parse(localStorage.getItem("selectedTeams")) || [];
    });
  
    useEffect(() => {
      localStorage.setItem("selectedTeams", JSON.stringify(selectedTeams));
    }, [selectedTeams]);
  
    return (
      <TeamContext.Provider value={{ selectedTeams, setSelectedTeams }}>
        {children}
      </TeamContext.Provider>
    );
  };

export const useTeamContext = () => {
    const context = useContext(TeamContext)
    if (!context) {
        throw new Error("useTeam must be used within a TeamProvider")
    }
    return context
}
