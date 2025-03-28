import { signOut } from "firebase/auth";
import { useAuth } from "../utils/authProvider";

const LogoutButton = () => {
  const { auth } = useAuth();

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <div onClick={handleLogout} className="contents text-inherit!">
      Logout
    </div>
  );
};

export default LogoutButton;
