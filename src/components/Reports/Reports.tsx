import React, { useState } from 'react';
import { BarChart3, Download, Calendar, Users, BookOpen, TrendingUp } from 'lucide-react';

const Reports = () => {
  const [selectedReport, setSelectedReport] = useState('overview');
  const [dateRange, setDateRange] = useState('month');

  const reportTypes = [
    { id: 'overview', label: 'Library Overview', icon: BarChart3 },
    { id: 'books', label: 'Book Statistics', icon: BookOpen },
    { id: 'members', label: 'Member Analysis', icon: Users },
    { id: 'circulation', label: 'Circulation Report', icon: TrendingUp },
  ];

  const mockData = {
    overview: {
      totalBooks: 2567,
      totalMembers: 342,
      booksIssued: 156,
      overdueBooks: 23,
      monthlyIssues: [45, 52, 38, 64, 71, 59, 78, 65, 82, 76, 89, 92],
      popularCategories: [
        { name: 'Technology', count: 125, percentage: 35 },
        { name: 'Programming', count: 89, percentage: 25 },
        { name: 'Science', count: 78, percentage: 22 },
        { name: 'Mathematics', count: 64, percentage: 18 },
      ]
    },
    books: {
      totalBooks: 2567,
      availableBooks: 2411,
      issuedBooks: 156,
      categoriesData: [
        { category: 'Technology', total: 125, available: 98, issued: 27 },
        { category: 'Programming', total: 89, available: 72, issued: 17 },
        { category: 'Science', total: 78, available: 65, issued: 13 },
        { category: 'Mathematics', total: 64, available: 52, issued: 12 },
      ],
      recentAdditions: [
        { title: 'Advanced React Patterns', author: 'John Smith', date: '2023-12-15' },
        { title: 'Python Machine Learning', author: 'Jane Doe', date: '2023-12-14' },
        { title: 'Data Structures Guide', author: 'Mike Johnson', date: '2023-12-13' },
      ]
    },
    members: {
      totalMembers: 342,
      activeMembers: 298,
      suspendedMembers: 15,
      membershipTypes: [
        { type: 'Student', count: 245, percentage: 72 },
        { type: 'Faculty', count: 67, percentage: 20 },
        { type: 'General', count: 30, percentage: 8 },
      ],
      monthlyRegistrations: [12, 15, 8, 22, 18, 14, 25, 19, 31, 28, 24, 33],
      topMembers: [
        { name: 'John Doe', books: 12, type: 'Faculty' },
        { name: 'Jane Smith', books: 8, type: 'Student' },
        { name: 'Mike Johnson', books: 7, type: 'General' },
      ]
    },
    circulation: {
      totalIssues: 1847,
      totalReturns: 1691,
      currentlyIssued: 156,
      overdueBooks: 23,
      monthlyCirculation: [89, 95, 78, 102, 118, 94, 125, 109, 134, 128, 145, 167],
      popularBooks: [
        { title: 'React Complete Guide', issues: 23 },
        { title: 'Java Fundamentals', issues: 19 },
        { title: 'Python Basics', issues: 17 },
      ],
      finesCollected: 1250,
    }
  };

  const exportReport = () => {
    // TODO: Implement actual export functionality
    console.log(`Exporting ${selectedReport} report for ${dateRange}`);
    alert('Report export functionality will be implemented with backend integration');
  };

  const renderOverviewReport = () => {
    const data = mockData.overview;
    return (
      <div className="space-y-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Total Books</p>
                <p className="text-2xl font-bold text-blue-900">{data.totalBooks.toLocaleString()}</p>
              </div>
              <BookOpen className="text-blue-600" size={24} />
            </div>
          </div>
          
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Total Members</p>
                <p className="text-2xl font-bold text-green-900">{data.totalMembers}</p>
              </div>
              <Users className="text-green-600" size={24} />
            </div>
          </div>
          
          <div className="bg-purple-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">Books Issued</p>
                <p className="text-2xl font-bold text-purple-900">{data.booksIssued}</p>
              </div>
              <TrendingUp className="text-purple-600" size={24} />
            </div>
          </div>
          
          <div className="bg-red-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-600">Overdue Books</p>
                <p className="text-2xl font-bold text-red-900">{data.overdueBooks}</p>
              </div>
              <Calendar className="text-red-600" size={24} />
            </div>
          </div>
        </div>

        {/* Popular Categories */}
        <div className="bg-white rounded-lg border p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Popular Categories</h3>
          <div className="space-y-3">
            {data.popularCategories.map((category, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-gray-700">{category.name}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${category.percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 w-12">{category.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Issues Chart Placeholder */}
        <div className="bg-white rounded-lg border p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Monthly Issues Trend</h3>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <BarChart3 size={48} className="text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">Chart visualization will be implemented</p>
              <p className="text-sm text-gray-400">Average: {Math.round(data.monthlyIssues.reduce((a, b) => a + b) / data.monthlyIssues.length)} issues/month</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderBooksReport = () => {
    const data = mockData.books;
    return (
      <div className="space-y-6">
        {/* Book Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-sm font-medium text-blue-600">Total Books</p>
            <p className="text-2xl font-bold text-blue-900">{data.totalBooks}</p>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <p className="text-sm font-medium text-green-600">Available</p>
            <p className="text-2xl font-bold text-green-900">{data.availableBooks}</p>
          </div>
          <div className="bg-orange-50 rounded-lg p-4">
            <p className="text-sm font-medium text-orange-600">Currently Issued</p>
            <p className="text-2xl font-bold text-orange-900">{data.issuedBooks}</p>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="bg-white rounded-lg border p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Books by Category</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Category</th>
                  <th className="text-left py-2">Total</th>
                  <th className="text-left py-2">Available</th>
                  <th className="text-left py-2">Issued</th>
                  <th className="text-left py-2">Utilization</th>
                </tr>
              </thead>
              <tbody>
                {data.categoriesData.map((cat, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-2">{cat.category}</td>
                    <td className="py-2">{cat.total}</td>
                    <td className="py-2">{cat.available}</td>
                    <td className="py-2">{cat.issued}</td>
                    <td className="py-2">
                      <span className={`px-2 py-1 rounded text-sm ${
                        (cat.issued / cat.total) > 0.3 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {Math.round((cat.issued / cat.total) * 100)}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Additions */}
        <div className="bg-white rounded-lg border p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Additions</h3>
          <div className="space-y-3">
            {data.recentAdditions.map((book, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b last:border-b-0">
                <div>
                  <p className="font-medium text-gray-900">{book.title}</p>
                  <p className="text-sm text-gray-500">by {book.author}</p>
                </div>
                <span className="text-sm text-gray-500">{book.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderMembersReport = () => {
    const data = mockData.members;
    return (
      <div className="space-y-6">
        {/* Member Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-sm font-medium text-blue-600">Total Members</p>
            <p className="text-2xl font-bold text-blue-900">{data.totalMembers}</p>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <p className="text-sm font-medium text-green-600">Active</p>
            <p className="text-2xl font-bold text-green-900">{data.activeMembers}</p>
          </div>
          <div className="bg-red-50 rounded-lg p-4">
            <p className="text-sm font-medium text-red-600">Suspended</p>
            <p className="text-2xl font-bold text-red-900">{data.suspendedMembers}</p>
          </div>
        </div>

        {/* Membership Types */}
        <div className="bg-white rounded-lg border p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Membership Distribution</h3>
          <div className="space-y-3">
            {data.membershipTypes.map((type, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">{type.type}</span>
                <div className="flex items-center space-x-3">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-purple-600 h-2 rounded-full" 
                      style={{ width: `${type.percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 w-12">{type.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Members */}
        <div className="bg-white rounded-lg border p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Most Active Members</h3>
          <div className="space-y-3">
            {data.topMembers.map((member, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b last:border-b-0">
                <div>
                  <p className="font-medium text-gray-900">{member.name}</p>
                  <p className="text-sm text-gray-500">{member.type}</p>
                </div>
                <span className="text-sm font-medium text-blue-600">{member.books} books</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderCirculationReport = () => {
    const data = mockData.circulation;
    return (
      <div className="space-y-6">
        {/* Circulation Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-sm font-medium text-blue-600">Total Issues</p>
            <p className="text-2xl font-bold text-blue-900">{data.totalIssues}</p>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <p className="text-sm font-medium text-green-600">Total Returns</p>
            <p className="text-2xl font-bold text-green-900">{data.totalReturns}</p>
          </div>
          <div className="bg-orange-50 rounded-lg p-4">
            <p className="text-sm font-medium text-orange-600">Currently Issued</p>
            <p className="text-2xl font-bold text-orange-900">{data.currentlyIssued}</p>
          </div>
          <div className="bg-red-50 rounded-lg p-4">
            <p className="text-sm font-medium text-red-600">Overdue</p>
            <p className="text-2xl font-bold text-red-900">{data.overdueBooks}</p>
          </div>
        </div>

        {/* Popular Books */}
        <div className="bg-white rounded-lg border p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Most Popular Books</h3>
          <div className="space-y-3">
            {data.popularBooks.map((book, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b last:border-b-0">
                <span className="font-medium text-gray-900">{book.title}</span>
                <span className="text-sm font-medium text-green-600">{book.issues} issues</span>
              </div>
            ))}
          </div>
        </div>

        {/* Financial Summary */}
        <div className="bg-white rounded-lg border p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Financial Summary</h3>
          <div className="bg-yellow-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-yellow-800">Total Fines Collected</span>
              <span className="text-2xl font-bold text-yellow-900">${data.finesCollected}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderReport = () => {
    switch (selectedReport) {
      case 'books': return renderBooksReport();
      case 'members': return renderMembersReport();
      case 'circulation': return renderCirculationReport();
      default: return renderOverviewReport();
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Reports & Analytics</h1>
          <p className="text-gray-600">Comprehensive library management insights</p>
        </div>
        <button
          onClick={exportReport}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2"
        >
          <Download size={16} />
          <span>Export Report</span>
        </button>
      </div>

      {/* Report Controls */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {reportTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <button
                    key={type.id}
                    onClick={() => setSelectedReport(type.id)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                      selectedReport === type.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <Icon size={16} />
                    <span>{type.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="week">Last Week</option>
              <option value="month">Last Month</option>
              <option value="quarter">Last Quarter</option>
              <option value="year">Last Year</option>
            </select>
          </div>
        </div>
      </div>

      {/* Report Content */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            {reportTypes.find(type => type.id === selectedReport)?.label}
          </h2>
          <p className="text-sm text-gray-500">
            Data for the {dateRange === 'week' ? 'last week' : dateRange === 'month' ? 'last month' : dateRange === 'quarter' ? 'last quarter' : 'last year'}
          </p>
        </div>
        
        {renderReport()}
      </div>
    </div>
  );
};

export default Reports;