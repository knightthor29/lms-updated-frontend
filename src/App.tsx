import React, { useState } from 'react';
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';
import Dashboard from './components/Dashboard/Dashboard';
import BookManagement from './components/Books/BookManagement';
import MemberManagement from './components/Members/MemberManagement';
import IssueReturn from './components/Issues/IssueReturn';
import CategoryManagement from './components/Categories/CategoryManagement';
import Search from './components/Search/Search';
import Reports from './components/Reports/Reports';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'books':
        return <BookManagement />;
      case 'members':
        return <MemberManagement />;
      case 'issues':
        return <IssueReturn />;
      case 'categories':
        return <CategoryManagement />;
      case 'search':
        return <Search />;
      case 'reports':
        return <Reports />;
      case 'settings':
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Settings</h1>
            <div className="bg-white rounded-lg shadow-md p-6">
              <p className="text-gray-600">Settings panel will be implemented with backend integration.</p>
            </div>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'w-16' : 'w-64'} flex-shrink-0`}>
        <Sidebar
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          isCollapsed={sidebarCollapsed}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onToggleSidebar={toggleSidebar} />
        
        <main className="flex-1 overflow-y-auto">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}

export default App;