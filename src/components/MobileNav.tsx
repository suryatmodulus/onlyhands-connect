import { Home, PlusSquare, User, LogOut } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import UploadDialog from "./UploadDialog";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const MobileNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate("/login");
      toast({
        title: "Logged out successfully",
        description: "See you soon!",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to log out. Please try again.",
      });
    }
  };

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-gray-200 md:hidden">
        <div className="grid grid-cols-4 h-full">
          <Link
            to="/"
            className={`flex flex-col items-center justify-center gap-1 ${
              location.pathname === "/" ? "text-primary" : "text-gray-500"
            }`}
          >
            <Home size={24} />
          </Link>
          <button
            className="flex flex-col items-center justify-center gap-1 text-gray-500"
            onClick={() => setUploadDialogOpen(true)}
          >
            <PlusSquare size={24} />
          </button>
          <Link
            to="/profile"
            className={`flex flex-col items-center justify-center gap-1 ${
              location.pathname === "/profile" ? "text-primary" : "text-gray-500"
            }`}
          >
            <User size={24} />
          </Link>
          <button
            onClick={handleLogout}
            className="flex flex-col items-center justify-center gap-1 text-gray-500"
          >
            <LogOut size={24} />
          </button>
        </div>
      </nav>
      <UploadDialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen} />
    </>
  );
};

export default MobileNav;