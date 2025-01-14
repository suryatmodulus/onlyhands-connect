import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-50">
      <div className="max-w-screen-xl mx-auto px-4 h-full flex items-center justify-center">
        <Link to="/" className="text-2xl font-bold text-primary">
          Onlyhands
        </Link>
      </div>
    </header>
  );
};

export default Header;