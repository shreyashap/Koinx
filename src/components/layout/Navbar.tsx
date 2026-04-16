import React from "react";

export const Navbar: React.FC = () => {
    return (
        <nav className="w-full border-b border-border bg-[#0B1222] h-16 flex items-center px-4 md:px-14 sticky top-0 z-50">
            <div className="flex items-center gap-1">
                <span className="text-2xl font-bold text-[#eff1f4]">Koin</span>
                <span className="text-2xl font-bold text-[#FBBF24]">X</span>
            </div>
        </nav>
    );
};
