import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface LoginProps {
  onLogin: () => void;
}

const Login = ({ onLogin }: LoginProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        onLogin();
        navigate("/");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, onLogin]);

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
          <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            providers={["twitter"]}
            theme="light"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;