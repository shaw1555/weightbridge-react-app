// components/Header.tsx
import { Link, useNavigate } from "react-router-dom";
import { AuthService } from "../services/AuthService";
import { UserCircle } from "lucide-react"; // profile icon
import Button from "./Button";

interface HeaderLink {
  label: string;
  path: string;
  public?: boolean; // optional, true = visible even when not logged in
  permission?: string; // required permission (if any)
}

interface HeaderProps {
  links: HeaderLink[];
}

const Header: React.FC<HeaderProps> = ({ links }) => {
  const navigate = useNavigate();
  const token = AuthService.getToken();
  const user = AuthService.getUser();

  const handleLogout = () => {
    AuthService.logout();
    navigate("/login");
  };

  return (
    <header className="bg-gray-800 text-white p-3 flex gap-4 items-center">
      {links.map((link) => {
        // If the link is public (like Login), show it when not logged in
        // If the link is not public, show only when logged in
        if (!token && !link.public) return null;
        // hide Login if already logged in
        if (token && link.label === "Login") return null;
        // hide if permission is required but missing
        if (link.permission && !AuthService.hasPermission(link.permission)) {
          return null;
        }

        return (
          <Link key={link.path} to={link.path} className="hover:underline">
            {link.label}
          </Link>
        );
      })}

      {token && user && (
        <div className="ml-auto flex items-center gap-3">
          <div className="flex items-center gap-2">
            <UserCircle size={24} />
            <span>{user.username}</span>
          </div>
          <Button
            color="red"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      )}
    </header>
  );
};

export default Header;
