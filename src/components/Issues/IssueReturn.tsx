import React, { useState, useEffect } from 'react';
import { BookCheck, BookX, Search, Calendar, AlertTriangle, DollarSign } from 'lucide-react';
import { issuesApi, booksApi, membersApi } from '../../services/api';
import IssueBookModal from './IssueBookModal';
import ReturnBookModal from './ReturnBookModal';

const IssueReturn = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showIssueModal, setShowIssueModal] = useState(false);
  const [showReturnModal, setShowReturnModal] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState(null);

  useEffect(() => {
    loadIssues();
  }, []);

  const loadIssues = async () => {
    try {
      setLoading(true);
      // TODO: Replace with actual API call
      // const issuesData = await issuesApi.getAll();
      
      // Mock data for now
      const mockIssues = [
        {
          id: '1',
          bookId: '1',
          memberId: '1',
          issueDate: '2023-12-01',
          dueDate: '2023-12-15',
          returnDate: null,
          status: 'ISSUED',
          fine: 0,
          book: {
            id: '1',
            title: 'The Complete Guide to React',
            author: 'John Smith',
            isbn: '978-1234567890',
          },
          member: {
            id: '1',
            name: 'John Doe',
            email: 'john.doe@email.com',
            membershipType: 'STUDENT',
          }
        },
        {
          id: '2',
          bookId: '2',
          memberId: '2',
          issueDate: '2023-11-20',
          dueDate: '2023-12-04',
          returnDate: null,
          status: 'OVERDUE',
          fine: 50,
          book: {
            id: '2',
            title: 'Java Programming Fundamentals',
            author: 'Jane Doe',
            isbn: '978-0987654321',
          },
          member: {
            id: '2',
            name: 'Jane Smith',
            email: 'jane.smith@email.com',
            membershipType: 'FACULTY',
          }
        },
        {
          id: '3',
          bookId: '3',
          memberId: '1',
          issueDate: '2023-11-10',
          dueDate: '2023-11-24',
          returnDate: '2023-11-22',
          status: 'RETURNED',
          fine: 0,
          book: {
            id: '3',
            title: 'Data Structures and Algorithms',
            author: 'Mike Johnson',
            isbn: '978-1122334455',
          },
          member: {
            id: '1',
            name: 'John Doe',
            email: 'john.doe@email.com',
            membershipType: 'STUDENT',
          }
        }
      ];
      setIssues(mockIssues);
    } catch (error) {
      console.error('Error loading issues:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleIssueBook = async (issueData: any) => {
    try {
      // TODO: Replace with actual API call
      // const newIssue = await issuesApi.issueBook(issueData.bookId, issueData.memberId);
      
      const newIssue = {
        id: Date.now().toString(),
        ...issueData,
        issueDate: new Date().toISOString().split('T')[0],
        status: 'ISSUED',
        fine: 0,
      };
      setIssues([newIssue, ...issues]);
      setShowIssueModal(false);
      console.log('Book issued:', issueData);
    } catch (error) {
      console.error('Error issuing book:', error);
    }
  };

  const handleReturnBook = async (issueId: string, returnData: any) => {
    try {
      // TODO: Replace with actual API call
      // await issuesApi.returnBook(issueId);
      
      setIssues(issues.map((issue: any) => 
        issue.id === issueId 
          ? { 
              ...issue, 
              status: 'RETURNED',
              returnDate: new Date().toISOString().split('T')[0],
              fine: returnData.fine || 0
            }
          : issue
      ));
      setShowReturnModal(false);
      setSelectedIssue(null);
      console.log('Book returned:', issueId);
    } catch (error) {
      console.error('Error returning book:', error);
    }
  };

  const filteredIssues = issues.filter((issue: any) => {
    const matchesSearch = 
      issue.book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.book.isbn.includes(searchTerm);
    const matchesStatus = !statusFilter || issue.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ISSUED': return 'bg-blue-100 text-blue-800';
      case 'RETURNED': return 'bg-green-100 text-green-800';
      case 'OVERDUE': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date() && !selectedIssue;
  };

  const calculateDaysOverdue = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = today.getTime() - due.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="bg-gray-200 rounded-lg h-20"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Issue & Return</h1>
          <p className="text-gray-600">Manage book transactions and returns</p>
        </div>
        <button
          onClick={() => setShowIssueModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2"
        >
          <BookCheck size={16} />
          <span>Issue Book</span>
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600">Currently Issued</p>
              <p className="text-2xl font-bold text-blue-900">
                {issues.filter((issue: any) => issue.status === 'ISSUED').length}
              </p>
            </div>
            <BookCheck className="text-blue-600" size={24} />
          </div>
        </div>

        <div className="bg-red-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-red-600">Overdue</p>
              <p className="text-2xl font-bold text-red-900">
                {issues.filter((issue: any) => issue.status === 'OVERDUE').length}
              </p>
            </div>
            <AlertTriangle className="text-red-600" size={24} />
          </div>
        </div>

        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600">Returned Today</p>
              <p className="text-2xl font-bold text-green-900">
                {issues.filter((issue: any) => 
                  issue.status === 'RETURNED' && 
                  issue.returnDate === new Date().toISOString().split('T')[0]
                ).length}
              </p>
            </div>
            <BookX className="text-green-600" size={24} />
          </div>
        </div>

        <div className="bg-yellow-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-yellow-600">Total Fines</p>
              <p className="text-2xl font-bold text-yellow-900">
                ${issues.reduce((total: number, issue: any) => total + (issue.fine || 0), 0)}
              </p>
            </div>
            <DollarSign className="text-yellow-600" size={24} />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by book title, member name, or ISBN..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Status</option>
              <option value="ISSUED">Issued</option>
              <option value="RETURNED">Returned</option>
              <option value="OVERDUE">Overdue</option>
            </select>
          </div>
        </div>
      </div>

      {/* Issues List */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Book & Member
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dates
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fine
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredIssues.map((issue: any) => (
                <tr key={issue.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{issue.book.title}</div>
                      <div className="text-sm text-gray-500">by {issue.book.author}</div>
                      <div className="text-xs text-gray-400">Member: {issue.member.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center space-x-1">
                      <Calendar size={14} />
                      <span>Issued: {issue.issueDate}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar size={14} />
                      <span>Due: {issue.dueDate}</span>
                    </div>
                    {issue.returnDate && (
                      <div className="flex items-center space-x-1 text-green-600">
                        <Calendar size={14} />
                        <span>Returned: {issue.returnDate}</span>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(issue.status)}`}>
                      {issue.status}
                      {issue.status === 'OVERDUE' && (
                        <span className="ml-1">({calculateDaysOverdue(issue.dueDate)}d)</span>
                      )}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {issue.fine > 0 ? (
                      <span className="text-red-600 font-medium">${issue.fine}</span>
                    ) : (
                      <span className="text-gray-400">$0</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {issue.status === 'ISSUED' || issue.status === 'OVERDUE' ? (
                      <button
                        onClick={() => {
                          setSelectedIssue(issue);
                          setShowReturnModal(true);
                        }}
                        className="text-green-600 hover:text-green-900 px-3 py-1 border border-green-600 rounded hover:bg-green-50 transition-colors duration-200"
                      >
                        Return
                      </button>
                    ) : (
                      <span className="text-gray-400">Completed</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Issue Book Modal */}
      {showIssueModal && (
        <IssueBookModal
          onIssue={handleIssueBook}
          onCancel={() => setShowIssueModal(false)}
        />
      )}

      {/* Return Book Modal */}
      {showReturnModal && selectedIssue && (
        <ReturnBookModal
          issue={selectedIssue}
          onReturn={(returnData) => handleReturnBook(selectedIssue.id, returnData)}
          onCancel={() => {
            setShowReturnModal(false);
            setSelectedIssue(null);
          }}
        />
      )}
    </div>
  );
};

export default IssueReturn;