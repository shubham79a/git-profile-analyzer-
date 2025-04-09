/* eslint-disable react-hooks/rules-of-hooks */
import React, { useContext, useState } from 'react';
import { Search, Github, Code, GitBranch, Star } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AppContext } from '@/context/AppContext';
import { useNavigate } from 'react-router-dom';

interface GlassSearchProps {
  onFocus: () => void;
  onBlur: () => void;
  isFocused: boolean;
}

const GlassSearch: React.FC<GlassSearchProps> = ({
  onFocus,
  onBlur,
  isFocused
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const context = useContext(AppContext);
  if (!context) return null;
  const { username, setUsername } = context;
  const navigate = useNavigate();

  // Function to handle search submission
  const handleSearch = () => {
    if (username.trim()) {
      navigate(`/user/${username}`);
    }
  };

  // Function to handle key press events
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div
      className={`relative ${isFocused ? 'scale-105' : 'scale-100'} transition-all duration-300 ease-out `}
    >
      {/* Primary Glass Effect */}
      <div className={`absolute inset-0 rounded-full ${isDark ? 'bg-white/10' : 'bg-black/5'} backdrop-blur-xl border ${isDark ? 'border-white/10' : 'border-black/10'} shadow-xl`} />

      {/* Enhanced Glass Reflections */}
      <div className={`absolute top-0 left-1/4 right-1/4 h-px ${isDark ? 'bg-white/20' : 'bg-white/40'}`} />
      <div className={`absolute bottom-0 left-1/3 right-1/3 h-px ${isDark ? 'bg-white/5' : 'bg-black/5'}`} />

      {/* Glow Effect on Focus */}
      <div
        className={`absolute inset-0 rounded-full transition-opacity duration-500 ease-out ${isFocused ? 'opacity-100' : 'opacity-0'} ${isDark
          ? 'bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-indigo-900/20'
          : 'bg-gradient-to-r from-blue-200/30 via-purple-200/30 to-indigo-200/30'
          } blur-lg`}
      />

      <Input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter GitHub username..."
        className="w-full px-8 py-5 h-auto text-lg bg-transparent rounded-full focus:outline-none focus:ring-0 dark:text-white text-black dark:placeholder-gray-400 placeholder-gray-500 border-0 relative z-10"
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={handleKeyPress}
      />

      <Button
        size="icon"
        variant="ghost"
        className="absolute right-5 top-1/2 transform -translate-y-1/2 p-2 dark:text-white text-black hover:bg-transparent cursor-pointer z-20"
        onClick={handleSearch}
        aria-label="Search GitHub user"
      >
        <Search size={24} />
      </Button>
    </div>
  );
};

export default function Home() {
  const { theme } = useTheme();
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const isDark = theme === 'dark';

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[84vh] transition-colors duration-300 dark:bg-black bg-white">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full"
          style={{
            backgroundImage: `linear-gradient(var(--grid-color) 1px, transparent 1px), 
                            linear-gradient(90deg, var(--grid-color) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
            '--grid-color': isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
          } as React.CSSProperties}
        />
      </div>

      <div className="w-full max-w-2xl px-6 py-12 mx-4 text-center">
        <div className="flex items-center justify-center mb-4">
          <Github size={40} className="dark:text-white text-black" />
          <h1 className="text-5xl font-bold dark:text-white text-black tracking-tight ml-3">GitFinder</h1>
        </div>

        <p className="mb-10 dark:text-gray-300 text-gray-700 text-lg">
          Explore GitHub profiles, repositories, and contributions
        </p>

        <GlassSearch
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          isFocused={isFocused}
        />

        <div className="flex justify-center mt-12 space-x-12 dark:text-gray-300 text-gray-700">
          <div className="flex flex-col items-center">
            <Code size={24} className="mb-2" />
            <span className="text-sm">Repositories</span>
          </div>
          <div className="flex flex-col items-center">
            <GitBranch size={24} className="mb-2" />
            <span className="text-sm">Commits</span>
          </div>
          <div className="flex flex-col items-center">
            <Star size={24} className="mb-2" />
            <span className="text-sm">Stars</span>
          </div>
        </div>

        <p className="mt-10 dark:text-gray-400 text-gray-600 text-sm max-w-md mx-auto">
          Search any GitHub username to view their complete profile and activity
        </p>
      </div>
    </div>
  );
}