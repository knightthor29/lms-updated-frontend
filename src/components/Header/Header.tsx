import React from 'react';
import { Code2, Github, BookOpen, User } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-2 rounded-lg">
              <Code2 size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">KANG</h1>
              <p className="text-xs text-gray-400">Programming Language</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a
              href="#explore"
              className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center space-x-1"
            >
              <BookOpen size={16} />
              <span>Explore</span>
            </a>
            <a
              href="#about"
              className="text-gray-300 hover:text-white transition-colors duration-200"
            >
              About
            </a>
            <a
              href="#github"
              className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center space-x-1"
            >
              <Github size={16} />
              <span>GitHub</span>
            </a>
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-2">
              <User size={16} />
              <span className="hidden sm:inline">Login</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;