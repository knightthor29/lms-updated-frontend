import React from 'react';
import { Code2, Github, BookOpen, User, Sparkles } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="glass-card" style={{ 
      margin: '20px', 
      padding: '16px 24px',
      borderRadius: '20px',
      position: 'relative',
      zIndex: 10
    }}>
      <div className="flex items-center justify-between">
        {/* Logo and Title */}
        <div className="flex items-center space-x-4">
          <div style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            padding: '12px',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 20px rgba(102, 126, 234, 0.3)'
          }}>
            <Code2 size={28} color="white" />
          </div>
          <div>
            <h1 className="gradient-text" style={{ 
              fontSize: '28px', 
              fontWeight: '700',
              letterSpacing: '-0.02em'
            }}>
              KANG
            </h1>
            <p style={{ 
              color: 'rgba(255, 255, 255, 0.7)', 
              fontSize: '14px',
              fontWeight: '500'
            }}>
              Modern Programming Language
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a
            href="#explore"
            className="transition-all"
            style={{
              color: 'rgba(255, 255, 255, 0.8)',
              textDecoration: 'none',
              fontWeight: '500',
              fontSize: '15px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              borderRadius: '12px',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'white';
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)';
              e.currentTarget.style.background = 'transparent';
            }}
          >
            <BookOpen size={16} />
            <span>Explore</span>
          </a>
          <a
            href="#about"
            className="transition-all"
            style={{
              color: 'rgba(255, 255, 255, 0.8)',
              textDecoration: 'none',
              fontWeight: '500',
              fontSize: '15px',
              padding: '8px 16px',
              borderRadius: '12px',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'white';
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)';
              e.currentTarget.style.background = 'transparent';
            }}
          >
            About
          </a>
          <a
            href="#github"
            className="transition-all"
            style={{
              color: 'rgba(255, 255, 255, 0.8)',
              textDecoration: 'none',
              fontWeight: '500',
              fontSize: '15px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              borderRadius: '12px',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'white';
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)';
              e.currentTarget.style.background = 'transparent';
            }}
          >
            <Github size={16} />
            <span>GitHub</span>
          </a>
        </nav>

        {/* User Actions */}
        <div className="flex items-center space-x-4">
          <button 
            className="btn-primary"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '14px'
            }}
          >
            <Sparkles size={16} />
            <span className="hidden sm:inline">Get Started</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;