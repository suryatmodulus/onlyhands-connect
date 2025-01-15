import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Home, UserRound, Plus, LogOut } from "lucide-react";
import { useDialog } from "@/hooks/use-dialog";
import UploadDialog from "./UploadDialog";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";

const Header = () => {
  const uploadDialog = useDialog();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check auth state on component mount
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/login");
      }
    };

    checkAuth();

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT' || event === 'TOKEN_REFRESHED' && !session) {
        navigate("/login");
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

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
      // If we get a refresh token error, force redirect to login
      if (error.message?.includes('refresh_token')) {
        navigate("/login");
      }
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-50">
      <div className="max-w-screen-xl mx-auto px-4 h-full flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-primary hover:opacity-90 transition-opacity">
          OnlyHands
        </Link>
        
        <div className="hidden md:flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={uploadDialog.onOpen}
            className="rounded-full hover:bg-gray-100"
            title="Upload"
          >
            <Plus className="h-5 w-5" />
          </Button>
          <Link to="/">
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full hover:bg-gray-100"
              title="Home"
            >
              <Home className="h-5 w-5" />
            </Button>
          </Link>
          <Link to="/profile">
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full hover:bg-gray-100"
              title="Profile"
            >
              <UserRound className="h-5 w-5" />
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleLogout}
            className="rounded-full hover:bg-gray-100"
            title="Logout"
          >
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>
      <UploadDialog 
        open={uploadDialog.isOpen} 
        onOpenChange={(open) => open ? uploadDialog.onOpen() : uploadDialog.onClose()} 
      />
    </header>
  );
};

export default Header;