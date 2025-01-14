import { Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface LoginProps {
  onLogin: () => void;
}

const Login = ({ onLogin }: LoginProps) => {
  const { toast } = useToast();

  const handleTwitterLogin = () => {
    // Mock successful login
    toast({
      title: "Success!",
      description: "Logged in with Twitter successfully",
    });
    onLogin();
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2">
      <div className="hidden md:block">
        <img
          src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7"
          alt="Login"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex items-center justify-center p-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-primary mb-2">Onlyhands</h1>
            <p className="text-gray-600">Share your moments with the world</p>
          </div>
          <Button
            className="w-full flex items-center justify-center gap-2"
            onClick={handleTwitterLogin}
          >
            <Twitter size={20} />
            Continue with Twitter
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;