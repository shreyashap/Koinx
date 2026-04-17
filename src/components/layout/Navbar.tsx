import { MoonIcon, SunIcon } from "lucide-react";
import React, { useEffect, useState } from "react";

export const Navbar: React.FC = () => {
    const [theme, setTheme] = useState<'light' | 'dark'>('dark');

    useEffect(() => {
        const bodyElem = document.querySelector('body');
        if (!bodyElem.classList.contains('light') && !bodyElem.classList.contains('dark')) {
            bodyElem.classList.add('dark');
            setTheme('dark');
        }
    }, [])
    const handleThemeToggle = () => {
        const bodyElem = document.querySelector('body');
        if (theme === 'dark') {
            bodyElem.classList.remove('dark');
            bodyElem.classList.add('light');
            setTheme('light')
        } else {
            bodyElem.classList.remove('light');
            bodyElem.classList.add('dark');
            setTheme("dark")
        }

    }
    return (
        <nav className="w-full border-b border-border bg-white dark:bg-gray-900 h-16 flex items-center justify-between px-4 md:px-14 sticky top-0 z-50">
            <div className="flex items-center gap-1">
                <span className="text-2xl font-bold text-blue-600 ">Koin</span>
                <span className="text-2xl font-bold text-[#FBBF24]">X</span>
            </div>
            <div>
                {
                    theme === 'dark' ? <SunIcon className="w-5 h-5 text-black dark:text-white cursor-pointer" onClick={handleThemeToggle} /> :
                        <MoonIcon className="w-5 h-5 text-black dark:text-white cursor-pointer" onClick={handleThemeToggle} />
                }
            </div>
        </nav>
    );
};