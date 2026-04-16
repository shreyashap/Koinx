import React from "react";
import { Navbar } from "./Navbar";

interface AppShellProps {
    children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({ children }) => {
    return (
        <div className="min-h-screen bg-background text-foreground font-sans">
            <Navbar />
            <main className="max-w-[1400px] mx-auto px-4 md:px-14 py-8">
                {children}
            </main>
        </div>
    );
};
