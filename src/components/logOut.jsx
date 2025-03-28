import { getAuth, signOut } from "firebase/auth";
import { useAuth } from "./AuthContext";

const LogoutButton = () => {
  const { auth } = useAuth();

  const handleLogout = async () => {
    await signOut(auth);
    alert("Logged out successfully!");
  };

  return (
    <button onClick={handleLogout} className="bg-red-500 text-white py-2 px-4 rounded-lg">
      Logout
    </button>
  );
};

export default LogoutButton;
