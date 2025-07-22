import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface BookFormProps {
  book?: any;
  categories: any[];
  onSave: (book: any) => void;
  onCancel: () => void;
}

const BookForm: React.FC<BookFormProps> = ({ book, categories, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    isbn: '',
    category: '',
    publicationYear: new Date().getFullYear(),
    totalCopies: 1,
    availableCopies: 1,
    description: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (book) {
      setFormData({
        title: book.title || '',
        author: book.author || '',
        isbn: book.isbn || '',
        category: book.category || '',
        publicationYear: book.publicationYear || new Date().getFullYear(),
        totalCopies: book.totalCopies || 1,
        availableCopies: book.availableCopies || 1,
        description: book.description || '',
      });
    }
  }, [book]);

  const validateForm = () => {
    const newErrors: any = {};

    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.author.trim()) newErrors.author = 'Author is required';
    if (!formData.isbn.trim()) newErrors.isbn = 'ISBN is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (formData.publicationYear < 1000 || formData.publicationYear > new Date().getFullYear()) {
      newErrors.publicationYear = 'Invalid publication year';
    }
    if (formData.totalCopies < 1) newErrors.totalCopies = 'Total copies must be at least 1';
    if (formData.availableCopies < 0) newErrors.availableCopies = 'Available copies cannot be negative';
    if (formData.availableCopies > formData.totalCopies) {
      newErrors.availableCopies = 'Available copies cannot exceed total copies';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'totalCopies' || name === 'availableCopies' || name === 'publicationYear' 
        ? parseInt(value) || 0 
        : value
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-screen overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">
            {book ? 'Edit Book' : 'Add New Book'}
          </h2>
          <button
            onClick={onCancel}
            className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.title ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Enter book title"
              />
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
            </div>

            <div>
              <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">
                Author *
              </label>
              <input
                type="text"
                id="author"
                name="author"
                value={formData.author}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.author ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Enter author name"
              />
              {errors.author && <p className="text-red-500 text-sm mt-1">{errors.author}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="isbn" className="block text-sm font-medium text-gray-700 mb-1">
                ISBN *
              </label>
              <input
                type="text"
                id="isbn"
                name="isbn"
                value={formData.isbn}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.isbn ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Enter ISBN"
              />
              {errors.isbn && <p className="text-red-500 text-sm mt-1">{errors.isbn}</p>}
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Category *
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.category ? 'border-red-300' : 'border-gray-300'
                }`}
              >
                <option value="">Select Category</option>
                {categories.map((cat: any) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
              {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="publicationYear" className="block text-sm font-medium text-gray-700 mb-1">
                Publication Year *
              </label>
              <input
                type="number"
                id="publicationYear"
                name="publicationYear"
                value={formData.publicationYear}
                onChange={handleChange}
                min="1000"
                max={new Date().getFullYear()}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.publicationYear ? 'border-red-300' : 'border-gray-300'
                }`}
              />
              {errors.publicationYear && <p className="text-red-500 text-sm mt-1">{errors.publicationYear}</p>}
            </div>

            <div>
              <label htmlFor="totalCopies" className="block text-sm font-medium text-gray-700 mb-1">
                Total Copies *
              </label>
              <input
                type="number"
                id="totalCopies"
                name="totalCopies"
                value={formData.totalCopies}
                onChange={handleChange}
                min="1"
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.totalCopies ? 'border-red-300' : 'border-gray-300'
                }`}
              />
              {errors.totalCopies && <p className="text-red-500 text-sm mt-1">{errors.totalCopies}</p>}
            </div>

            <div>
              <label htmlFor="availableCopies" className="block text-sm font-medium text-gray-700 mb-1">
                Available Copies *
              </label>
              <input
                type="number"
                id="availableCopies"
                name="availableCopies"
                value={formData.availableCopies}
                onChange={handleChange}
                min="0"
                max={formData.totalCopies}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.availableCopies ? 'border-red-300' : 'border-gray-300'
                }`}
              />
              {errors.availableCopies && <p className="text-red-500 text-sm mt-1">{errors.availableCopies}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter book description (optional)"
            />
          </div>

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
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              {book ? 'Update Book' : 'Add Book'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookForm;