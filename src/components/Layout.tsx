import { Outlet } from "react-router-dom";
import Header from "./Header";
import MobileNav from "./MobileNav";

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-16 pb-16 md:pb-0">
        <Outlet />
      </main>
      <MobileNav />
    </div>
  );
};

export default Layout;