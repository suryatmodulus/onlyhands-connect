import { Home, PlusSquare, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const MobileNav = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-gray-200 md:hidden">
      <div className="grid grid-cols-3 h-full">
        <Link
          to="/"
          className={`flex items-center justify-center ${
            location.pathname === "/" ? "text-primary" : "text-gray-500"
          }`}
        >
          <Home size={24} />
        </Link>
        <button
          className="flex items-center justify-center text-gray-500"
          onClick={() => {
            // TODO: Implement upload modal
            console.log("Open upload modal");
          }}
        >
          <PlusSquare size={24} />
        </button>
        <Link
          to="/profile"
          className={`flex items-center justify-center ${
            location.pathname === "/profile" ? "text-primary" : "text-gray-500"
          }`}
        >
          <User size={24} />
        </Link>
      </div>
    </nav>
  );
};

export default MobileNav;