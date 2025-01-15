import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Home, UserRound, Plus } from "lucide-react";
import { useDialog } from "@/hooks/use-dialog";
import UploadDialog from "./UploadDialog";

const Header = () => {
  const uploadDialog = useDialog();

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-50">
      <div className="max-w-screen-xl mx-auto px-4 h-full flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-primary">
          Onlyhands
        </Link>
        
        <div className="hidden md:flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={uploadDialog.onOpen}
            className="rounded-full"
          >
            <Plus className="h-5 w-5" />
          </Button>
          <Link to="/">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Home className="h-5 w-5" />
            </Button>
          </Link>
          <Link to="/profile">
            <Button variant="ghost" size="icon" className="rounded-full">
              <UserRound className="h-5 w-5" />
            </Button>
          </Link>
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