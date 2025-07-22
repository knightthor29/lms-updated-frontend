import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, Eye, Filter } from 'lucide-react';
import { booksApi, categoriesApi } from '../../services/api';
import BookForm from './BookForm';

const BookManagement = () => {
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [viewingBook, setViewingBook] = useState(null);

  useEffect(() => {
    loadBooks();
    loadCategories();
  }, []);

  const loadBooks = async () => {
    try {
      setLoading(true);
      // TODO: Replace with actual API call
      // const booksData = await booksApi.getAll();
      
      // Mock data for now
      const mockBooks = [
        {
          id: '1',
          title: 'The Complete Guide to React',
          author: 'John Smith',
          isbn: '978-1234567890',
          category: 'Technology',
          publicationYear: 2023,
          totalCopies: 5,
          availableCopies: 3,
          description: 'A comprehensive guide to React development.',
        },
        {
          id: '2',
          title: 'Java Programming Fundamentals',
          author: 'Jane Doe',
          isbn: '978-0987654321',
          category: 'Programming',
          publicationYear: 2022,
          totalCopies: 8,
          availableCopies: 5,
          description: 'Learn Java programming from basics to advanced.',
        },
        {
          id: '3',
          title: 'Data Structures and Algorithms',
          author: 'Mike Johnson',
          isbn: '978-1122334455',
          category: 'Computer Science',
          publicationYear: 2023,
          totalCopies: 10,
          availableCopies: 7,
          description: 'Essential data structures and algorithms for programmers.',
        }
      ];
      setBooks(mockBooks);
    } catch (error) {
      console.error('Error loading books:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      // TODO: Replace with actual API call
      // const categoriesData = await categoriesApi.getAll();
      
      // Mock data for now
      setCategories([
        { id: '1', name: 'Technology' },
        { id: '2', name: 'Programming' },
        { id: '3', name: 'Computer Science' },
        { id: '4', name: 'Mathematics' },
        { id: '5', name: 'Science' }
      ]);
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  };

  const handleDelete = async (bookId: string) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        // TODO: Replace with actual API call
        // await booksApi.delete(bookId);
        setBooks(books.filter((book: any) => book.id !== bookId));
        console.log('Book deleted:', bookId);
      } catch (error) {
        console.error('Error deleting book:', error);
      }
    }
  };

  const handleSave = async (bookData: any) => {
    try {
      if (editingBook) {
        // TODO: Replace with actual API call
        // await booksApi.update(editingBook.id, bookData);
        setBooks(books.map((book: any) => 
          book.id === editingBook.id ? { ...book, ...bookData } : book
        ));
        console.log('Book updated:', bookData);
      } else {
        // TODO: Replace with actual API call
        // const newBook = await booksApi.create(bookData);
        const newBook = { ...bookData, id: Date.now().toString() };
        setBooks([newBook, ...books]);
        console.log('Book created:', bookData);
      }
      setShowForm(false);
      setEditingBook(null);
    } catch (error) {
      console.error('Error saving book:', error);
    }
  };

  const filteredBooks = books.filter((book: any) => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.isbn.includes(searchTerm);
    const matchesCategory = !selectedCategory || book.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
          <h1 className="text-2xl font-bold text-gray-800">Book Management</h1>
          <p className="text-gray-600">Manage your library's book collection</p>
        </div>
        <button
          onClick={() => {
            setEditingBook(null);
            setShowForm(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2"
        >
          <Plus size={16} />
          <span>Add Book</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search books by title, author, or ISBN..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Filter size={16} className="text-gray-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Categories</option>
              {categories.map((category: any) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Books List */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Book Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Copies
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredBooks.map((book: any) => (
                <tr key={book.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{book.title}</div>
                      <div className="text-sm text-gray-500">by {book.author}</div>
                      <div className="text-xs text-gray-400">ISBN: {book.isbn}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {book.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div>Total: {book.totalCopies}</div>
                    <div>Available: {book.availableCopies}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      book.availableCopies > 0 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {book.availableCopies > 0 ? 'Available' : 'Out of Stock'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => setViewingBook(book)}
                        className="text-blue-600 hover:text-blue-900 p-1 rounded transition-colors duration-200"
                        title="View Details"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => {
                          setEditingBook(book);
                          setShowForm(true);
                        }}
                        className="text-indigo-600 hover:text-indigo-900 p-1 rounded transition-colors duration-200"
                        title="Edit"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(book.id)}
                        className="text-red-600 hover:text-red-900 p-1 rounded transition-colors duration-200"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Book Form Modal */}
      {showForm && (
        <BookForm
          book={editingBook}
          categories={categories}
          onSave={handleSave}
          onCancel={() => {
            setShowForm(false);
            setEditingBook(null);
          }}
        />
      )}

      {/* Book View Modal */}
      {viewingBook && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-screen overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">Book Details</h2>
              <button
                onClick={() => setViewingBook(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Title</label>
                <p className="text-gray-900">{viewingBook.title}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Author</label>
                <p className="text-gray-900">{viewingBook.author}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">ISBN</label>
                <p className="text-gray-900">{viewingBook.isbn}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Category</label>
                <p className="text-gray-900">{viewingBook.category}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Publication Year</label>
                <p className="text-gray-900">{viewingBook.publicationYear}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Description</label>
                <p className="text-gray-900">{viewingBook.description || 'No description available'}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Total Copies</label>
                  <p className="text-gray-900">{viewingBook.totalCopies}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Available Copies</label>
                  <p className="text-gray-900">{viewingBook.availableCopies}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookManagement;