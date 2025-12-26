import React from "react";
import Header from "./Header";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen w-full bg-background text-foreground">
      <Header />
      <main className="w-full max-w-7xl mx-auto px-8 py-8 animate-fade-in">
        {children}
      </main>
    </div>
  );
};

export default Layout;
