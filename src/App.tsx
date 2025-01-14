import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import React from 'react';

const queryClient = new QueryClient();

// TODO: Implement proper auth check
const isAuthenticated = false;

const App = () => {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Routes>
              <Route
                path="/login"
                element={isAuthenticated ? <Navigate to="/" /> : <Login />}
              />
              <Route
                element={isAuthenticated ? <Layout /> : <Navigate to="/login" />}
              >
                <Route path="/" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
              </Route>
            </Routes>
            <Toaster />
            <Sonner />
          </TooltipProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
};

export default App;