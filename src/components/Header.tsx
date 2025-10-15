import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthService } from "../services/AuthService";
import { UserCircle, ChevronDown } from "lucide-react";
import Button from "./Button";
import { type HeaderLink } from "../types/navigation"; // ✅ import shared type
 
interface HeaderProps {
  links: HeaderLink[];
}

const Header: React.FC<HeaderProps> = ({ links }) => {
  const navigate = useNavigate();
  const token = AuthService.getToken();
  const user = AuthService.getUser();

  const [openMenu, setOpenMenu] = useState<string | null>(null);
  let hoverTimeout: ReturnType<typeof setTimeout>;

  const handleLogout = () => {
    AuthService.logout();
    navigate("/login");
  };

  const canShowLink = (link: HeaderLink) => {
    if (!token && !link.public) return false;
    if (token && link.label === "Login") return false;
    if (link.permission && !AuthService.hasPermission(link.permission))
      return false;
    return true;
  };

  const handleMouseEnter = (label: string) => {
    clearTimeout(hoverTimeout);
    setOpenMenu(label);
  };

  const handleMouseLeave = () => {
    hoverTimeout = setTimeout(() => setOpenMenu(null), 150);
  };

  const handleToggleClick = (label: string) => {
    // Toggle dropdown for mobile
    setOpenMenu((prev) => (prev === label ? null : label));
  };

  return (
    <header className="bg-gray-800 text-white p-3 flex flex-wrap items-center gap-6 relative">
      {links.map((link) => {
        if (!canShowLink(link)) return null;

        // Dropdown menu with hover + click support
        if (link.children && link.children.length > 0) {
          return (
            <div
              key={link.label}
              className="relative"
              onMouseEnter={() => handleMouseEnter(link.label)}
              onMouseLeave={handleMouseLeave}
            >
              {/* Button: works for both hover and click */}
              <button
                className="flex items-center gap-1 hover:underline"
                onClick={() => handleToggleClick(link.label)}
              >
                {link.label} <ChevronDown size={16} />
              </button>

              {/* Dropdown */}
              {openMenu === link.label && (
                <div
                  className="
                    absolute left-0 mt-2 bg-gray-700 rounded shadow-lg min-w-[160px] z-50
                    flex flex-col py-1
                  "
                >
                  {link.children.map((sub) => {
                    if (!canShowLink(sub)) return null;
                    return (
                      <Link
                        key={sub.path}
                        to={sub.path!}
                        className="px-4 py-2 hover:bg-gray-600 whitespace-nowrap"
                        onClick={() => setOpenMenu(null)} // close after navigation
                      >
                        {sub.label}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        }

        // Normal link
        return (
          <Link key={link.path} to={link.path!} className="hover:underline">
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
          <Button color="red" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      )}
    </header>
  );
};

export default Header;
