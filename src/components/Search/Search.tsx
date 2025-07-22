import React, { useState, useEffect } from 'react';
import { Search as SearchIcon, Filter, BookOpen, Users, Calendar, Tag } from 'lucide-react';
import { booksApi, membersApi, issuesApi } from '../../services/api';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('books');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    category: '',
    status: '',
    membershipType: '',
    year: '',
  });

  useEffect(() => {
    if (searchTerm.trim()) {
      performSearch();
    } else {
      setResults([]);
    }
  }, [searchTerm, searchType, filters]);

  const performSearch = async () => {
    if (!searchTerm.trim()) return;

    try {
      setLoading(true);
      
      // TODO: Replace with actual API calls
      let searchResults = [];
      
      if (searchType === 'books') {
        // Mock book search results
        const mockBooks = [
          {
            id: '1',
            title: 'The Complete Guide to React',
            author: 'John Smith',
            isbn: '978-1234567890',
            category: 'Technology',
            publicationYear: 2023,
            availableCopies: 3,
            totalCopies: 5,
          },
          {
            id: '2',
            title: 'Java Programming Fundamentals',
            author: 'Jane Doe',
            isbn: '978-0987654321',
            category: 'Programming',
            publicationYear: 2022,
            availableCopies: 5,
            totalCopies: 8,
          }
        ];
        
        searchResults = mockBooks.filter(book =>
          book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.isbn.includes(searchTerm)
        );
        
        if (filters.category) {
          searchResults = searchResults.filter(book => book.category === filters.category);
        }
        if (filters.year) {
          searchResults = searchResults.filter(book => book.publicationYear.toString() === filters.year);
        }
        
      } else if (searchType === 'members') {
        // Mock member search results
        const mockMembers = [
          {
            id: '1',
            name: 'John Doe',
            email: 'john.doe@email.com',
            phone: '+1234567890',
            membershipType: 'STUDENT',
            status: 'ACTIVE',
            totalBooksIssued: 3,
            joinDate: '2023-01-15',
          },
          {
            id: '2',
            name: 'Jane Smith',
            email: 'jane.smith@email.com',
            phone: '+1234567891',
            membershipType: 'FACULTY',
            status: 'ACTIVE',
            totalBooksIssued: 2,
            joinDate: '2022-08-20',
          }
        ];
        
        searchResults = mockMembers.filter(member =>
          member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          member.phone.includes(searchTerm)
        );
        
        if (filters.membershipType) {
          searchResults = searchResults.filter(member => member.membershipType === filters.membershipType);
        }
        if (filters.status) {
          searchResults = searchResults.filter(member => member.status === filters.status);
        }
        
      } else if (searchType === 'transactions') {
        // Mock transaction search results
        const mockTransactions = [
          {
            id: '1',
            book: { title: 'The Complete Guide to React', author: 'John Smith' },
            member: { name: 'John Doe', email: 'john.doe@email.com' },
            issueDate: '2023-12-01',
            dueDate: '2023-12-15',
            status: 'ISSUED',
          },
          {
            id: '2',
            book: { title: 'Java Programming Fundamentals', author: 'Jane Doe' },
            member: { name: 'Jane Smith', email: 'jane.smith@email.com' },
            issueDate: '2023-11-20',
            dueDate: '2023-12-04',
            status: 'OVERDUE',
          }
        ];
        
        searchResults = mockTransactions.filter(transaction =>
          transaction.book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          transaction.member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          transaction.member.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
        
        if (filters.status) {
          searchResults = searchResults.filter(transaction => transaction.status === filters.status);
        }
      }
      
      setResults(searchResults);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      status: '',
      membershipType: '',
      year: '',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE': case 'ISSUED': return 'bg-green-100 text-green-800';
      case 'SUSPENDED': case 'OVERDUE': return 'bg-red-100 text-red-800';
      case 'EXPIRED': return 'bg-yellow-100 text-yellow-800';
      case 'RETURNED': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderResults = () => {
    if (loading) {
      return (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-gray-200 animate-pulse rounded-lg h-24"></div>
          ))}
        </div>
      );
    }

    if (!searchTerm.trim()) {
      return (
        <div className="text-center py-12">
          <SearchIcon size={48} className="text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">Enter a search term to find books, members, or transactions</p>
        </div>
      );
    }

    if (results.length === 0) {
      return (
        <div className="text-center py-12">
          <SearchIcon size={48} className="text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No results found for "{searchTerm}"</p>
          <p className="text-sm text-gray-400 mt-2">Try adjusting your search terms or filters</p>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {results.map((result: any, index) => (
          <div key={result.id || index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
            {searchType === 'books' && (
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 text-blue-600 p-2 rounded-lg">
                    <BookOpen size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{result.title}</h3>
                    <p className="text-gray-600">by {result.author}</p>
                    <p className="text-sm text-gray-500">ISBN: {result.isbn}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                        {result.category}
                      </span>
                      <span className="text-sm text-gray-500">{result.publicationYear}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Available: {result.availableCopies}/{result.totalCopies}</p>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    result.availableCopies > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {result.availableCopies > 0 ? 'Available' : 'Out of Stock'}
                  </span>
                </div>
              </div>
            )}

            {searchType === 'members' && (
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 text-green-600 p-2 rounded-lg">
                    <Users size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{result.name}</h3>
                    <p className="text-gray-600">{result.email}</p>
                    <p className="text-sm text-gray-500">{result.phone}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        result.membershipType === 'STUDENT' ? 'bg-blue-100 text-blue-800' :
                        result.membershipType === 'FACULTY' ? 'bg-purple-100 text-purple-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {result.membershipType}
                      </span>
                      <span className="text-sm text-gray-500">Since {result.joinDate}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Books Issued: {result.totalBooksIssued}</p>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(result.status)}`}>
                    {result.status}
                  </span>
                </div>
              </div>
            )}

            {searchType === 'transactions' && (
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="bg-purple-100 text-purple-600 p-2 rounded-lg">
                    <Calendar size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{result.book.title}</h3>
                    <p className="text-gray-600">by {result.book.author}</p>
                    <p className="text-sm text-gray-500">Member: {result.member.name}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <span className="text-sm text-gray-500">Issued: {result.issueDate}</span>
                      <span className="text-sm text-gray-500">Due: {result.dueDate}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(result.status)}`}>
                    {result.status}
                  </span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Search</h1>
        <p className="text-gray-600">Find books, members, and transactions</p>
      </div>

      {/* Search Controls */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <SearchIcon size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for books, members, or transactions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                />
              </div>
            </div>
            
            <div className="flex space-x-2">
              {['books', 'members', 'transactions'].map((type) => (
                <button
                  key={type}
                  onClick={() => setSearchType(type)}
                  className={`px-4 py-2 rounded-lg capitalize transition-colors duration-200 ${
                    searchType === type
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-200">
            <div className="flex items-center space-x-2">
              <Filter size={16} className="text-gray-400" />
              <span className="text-sm font-medium text-gray-700">Filters:</span>
            </div>
            
            {searchType === 'books' && (
              <>
                <select
                  value={filters.category}
                  onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
                  className="px-3 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Categories</option>
                  <option value="Technology">Technology</option>
                  <option value="Programming">Programming</option>
                  <option value="Science">Science</option>
                </select>
                <select
                  value={filters.year}
                  onChange={(e) => setFilters(prev => ({ ...prev, year: e.target.value }))}
                  className="px-3 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Years</option>
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                  <option value="2021">2021</option>
                </select>
              </>
            )}
            
            {searchType === 'members' && (
              <>
                <select
                  value={filters.membershipType}
                  onChange={(e) => setFilters(prev => ({ ...prev, membershipType: e.target.value }))}
                  className="px-3 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Types</option>
                  <option value="STUDENT">Student</option>
                  <option value="FACULTY">Faculty</option>
                  <option value="GENERAL">General</option>
                </select>
                <select
                  value={filters.status}
                  onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                  className="px-3 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Status</option>
                  <option value="ACTIVE">Active</option>
                  <option value="SUSPENDED">Suspended</option>
                  <option value="EXPIRED">Expired</option>
                </select>
              </>
            )}
            
            {searchType === 'transactions' && (
              <select
                value={filters.status}
                onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                className="px-3 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Status</option>
                <option value="ISSUED">Issued</option>
                <option value="RETURNED">Returned</option>
                <option value="OVERDUE">Overdue</option>
              </select>
            )}
            
            {(filters.category || filters.status || filters.membershipType || filters.year) && (
              <button
                onClick={clearFilters}
                className="px-3 py-1 text-sm text-red-600 hover:text-red-800 underline"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Search Results */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Search Results {searchTerm && `for "${searchTerm}"`}
          </h2>
          {results.length > 0 && (
            <p className="text-sm text-gray-600">
              {results.length} result{results.length !== 1 ? 's' : ''} found
            </p>
          )}
        </div>
        
        {renderResults()}
      </div>
    </div>
  );
};

export default Search;