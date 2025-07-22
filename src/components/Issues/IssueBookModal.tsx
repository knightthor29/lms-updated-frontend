import React, { useState, useEffect } from 'react';
import { X, Search } from 'lucide-react';
import { booksApi, membersApi } from '../../services/api';

interface IssueBookModalProps {
  onIssue: (issueData: any) => void;
  onCancel: () => void;
}

const IssueBookModal: React.FC<IssueBookModalProps> = ({ onIssue, onCancel }) => {
  const [books, setBooks] = useState([]);
  const [members, setMembers] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null);
  const [bookSearch, setBookSearch] = useState('');
  const [memberSearch, setMemberSearch] = useState('');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    loadBooks();
    loadMembers();
    
    // Set default due date (14 days from today)
    const defaultDueDate = new Date();
    defaultDueDate.setDate(defaultDueDate.getDate() + 14);
    setDueDate(defaultDueDate.toISOString().split('T')[0]);
  }, []);

  const loadBooks = async () => {
    try {
      // TODO: Replace with actual API call
      // const booksData = await booksApi.getAll();
      
      // Mock data for now
      const mockBooks = [
        {
          id: '1',
          title: 'The Complete Guide to React',
          author: 'John Smith',
          isbn: '978-1234567890',
          availableCopies: 3,
        },
        {
          id: '2',
          title: 'Java Programming Fundamentals',
          author: 'Jane Doe',
          isbn: '978-0987654321',
          availableCopies: 5,
        },
        {
          id: '3',
          title: 'Data Structures and Algorithms',
          author: 'Mike Johnson',
          isbn: '978-1122334455',
          availableCopies: 7,
        }
      ];
      setBooks(mockBooks.filter((book: any) => book.availableCopies > 0));
    } catch (error) {
      console.error('Error loading books:', error);
    }
  };

  const loadMembers = async () => {
    try {
      // TODO: Replace with actual API call
      // const membersData = await membersApi.getAll();
      
      // Mock data for now
      const mockMembers = [
        {
          id: '1',
          name: 'John Doe',
          email: 'john.doe@email.com',
          membershipType: 'STUDENT',
          status: 'ACTIVE',
          totalBooksIssued: 3,
          maxBooksAllowed: 5,
        },
        {
          id: '2',
          name: 'Jane Smith',
          email: 'jane.smith@email.com',
          membershipType: 'FACULTY',
          status: 'ACTIVE',
          totalBooksIssued: 2,
          maxBooksAllowed: 10,
        }
      ];
      setMembers(mockMembers.filter((member: any) => 
        member.status === 'ACTIVE' && member.totalBooksIssued < member.maxBooksAllowed
      ));
    } catch (error) {
      console.error('Error loading members:', error);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedBook && selectedMember && dueDate) {
      onIssue({
        bookId: selectedBook.id,
        memberId: selectedMember.id,
        dueDate,
        book: selectedBook,
        member: selectedMember,
      });
    }
  };

  const filteredBooks = books.filter((book: any) =>
    book.title.toLowerCase().includes(bookSearch.toLowerCase()) ||
    book.author.toLowerCase().includes(bookSearch.toLowerCase()) ||
    book.isbn.includes(bookSearch)
  );

  const filteredMembers = members.filter((member: any) =>
    member.name.toLowerCase().includes(memberSearch.toLowerCase()) ||
    member.email.toLowerCase().includes(memberSearch.toLowerCase())
  );

  const canIssue = selectedBook && selectedMember && dueDate;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-screen overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">Issue Book</h2>
          <button
            onClick={onCancel}
            className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Book Selection */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Select Book</h3>
              
              <div className="mb-4">
                <div className="relative">
                  <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search books..."
                    value={bookSearch}
                    onChange={(e) => setBookSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="border border-gray-300 rounded-lg max-h-64 overflow-y-auto">
                {filteredBooks.map((book: any) => (
                  <div
                    key={book.id}
                    onClick={() => setSelectedBook(book)}
                    className={`p-3 cursor-pointer border-b border-gray-100 hover:bg-gray-50 ${
                      selectedBook?.id === book.id ? 'bg-blue-50 border-blue-200' : ''
                    }`}
                  >
                    <div className="font-medium text-gray-900">{book.title}</div>
                    <div className="text-sm text-gray-500">by {book.author}</div>
                    <div className="text-xs text-gray-400">
                      ISBN: {book.isbn} • {book.availableCopies} copies available
                    </div>
                  </div>
                ))}
              </div>

              {selectedBook && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-900">Selected Book:</h4>
                  <p className="text-blue-800">{selectedBook.title}</p>
                  <p className="text-sm text-blue-600">by {selectedBook.author}</p>
                </div>
              )}
            </div>

            {/* Member Selection */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Select Member</h3>
              
              <div className="mb-4">
                <div className="relative">
                  <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search members..."
                    value={memberSearch}
                    onChange={(e) => setMemberSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="border border-gray-300 rounded-lg max-h-64 overflow-y-auto">
                {filteredMembers.map((member: any) => (
                  <div
                    key={member.id}
                    onClick={() => setSelectedMember(member)}
                    className={`p-3 cursor-pointer border-b border-gray-100 hover:bg-gray-50 ${
                      selectedMember?.id === member.id ? 'bg-blue-50 border-blue-200' : ''
                    }`}
                  >
                    <div className="font-medium text-gray-900">{member.name}</div>
                    <div className="text-sm text-gray-500">{member.email}</div>
                    <div className="text-xs text-gray-400">
                      {member.membershipType} • {member.totalBooksIssued}/{member.maxBooksAllowed} books
                    </div>
                  </div>
                ))}
              </div>

              {selectedMember && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-900">Selected Member:</h4>
                  <p className="text-blue-800">{selectedMember.name}</p>
                  <p className="text-sm text-blue-600">
                    {selectedMember.totalBooksIssued}/{selectedMember.maxBooksAllowed} books issued
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Due Date */}
          <div>
            <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-2">
              Due Date *
            </label>
            <input
              type="date"
              id="dueDate"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!canIssue}
              className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                canIssue
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Issue Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default IssueBookModal;