import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Tag } from 'lucide-react';
import { categoriesApi } from '../../services/api';
import CategoryForm from './CategoryForm';

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      setLoading(true);
      // TODO: Replace with actual API call
      // const categoriesData = await categoriesApi.getAll();
      
      // Mock data for now
      const mockCategories = [
        {
          id: '1',
          name: 'Technology',
          description: 'Books related to technology, software, and computing',
          bookCount: 125,
        },
        {
          id: '2',
          name: 'Programming',
          description: 'Programming languages, frameworks, and development',
          bookCount: 89,
        },
        {
          id: '3',
          name: 'Computer Science',
          description: 'Computer science theory, algorithms, and data structures',
          bookCount: 67,
        },
        {
          id: '4',
          name: 'Mathematics',
          description: 'Mathematical concepts, theory, and applications',
          bookCount: 45,
        },
        {
          id: '5',
          name: 'Science',
          description: 'General science books and research materials',
          bookCount: 78,
        },
        {
          id: '6',
          name: 'Business',
          description: 'Business management, entrepreneurship, and economics',
          bookCount: 34,
        }
      ];
      setCategories(mockCategories);
    } catch (error) {
      console.error('Error loading categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (categoryId: string) => {
    if (window.confirm('Are you sure you want to delete this category? This action cannot be undone.')) {
      try {
        // TODO: Replace with actual API call
        // await categoriesApi.delete(categoryId);
        setCategories(categories.filter((category: any) => category.id !== categoryId));
        console.log('Category deleted:', categoryId);
      } catch (error) {
        console.error('Error deleting category:', error);
      }
    }
  };

  const handleSave = async (categoryData: any) => {
    try {
      if (editingCategory) {
        // TODO: Replace with actual API call
        // await categoriesApi.update(editingCategory.id, categoryData);
        setCategories(categories.map((category: any) => 
          category.id === editingCategory.id 
            ? { ...category, ...categoryData }
            : category
        ));
        console.log('Category updated:', categoryData);
      } else {
        // TODO: Replace with actual API call
        // const newCategory = await categoriesApi.create(categoryData);
        const newCategory = { 
          ...categoryData, 
          id: Date.now().toString(),
          bookCount: 0,
        };
        setCategories([newCategory, ...categories]);
        console.log('Category created:', categoryData);
      }
      setShowForm(false);
      setEditingCategory(null);
    } catch (error) {
      console.error('Error saving category:', error);
    }
  };

  const getRandomColor = (index: number) => {
    const colors = [
      'bg-blue-100 text-blue-800',
      'bg-green-100 text-green-800',
      'bg-purple-100 text-purple-800',
      'bg-yellow-100 text-yellow-800',
      'bg-pink-100 text-pink-800',
      'bg-indigo-100 text-indigo-800',
      'bg-red-100 text-red-800',
      'bg-gray-100 text-gray-800'
    ];
    return colors[index % colors.length];
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-gray-200 rounded-lg h-32"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Category Management</h1>
          <p className="text-gray-600">Organize books by categories and topics</p>
        </div>
        <button
          onClick={() => {
            setEditingCategory(null);
            setShowForm(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2"
        >
          <Plus size={16} />
          <span>Add Category</span>
        </button>
      </div>

      {/* Categories Stats */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">{categories.length}</p>
            <p className="text-sm text-gray-600">Total Categories</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">
              {categories.reduce((total: number, cat: any) => total + cat.bookCount, 0)}
            </p>
            <p className="text-sm text-gray-600">Total Books</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">
              {Math.round(categories.reduce((total: number, cat: any) => total + cat.bookCount, 0) / Math.max(categories.length, 1))}
            </p>
            <p className="text-sm text-gray-600">Avg Books/Category</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-orange-600">
              {Math.max(...categories.map((cat: any) => cat.bookCount), 0)}
            </p>
            <p className="text-sm text-gray-600">Largest Category</p>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category: any, index) => (
          <div key={category.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getRandomColor(index)}`}>
                  <Tag size={14} className="mr-1" />
                  {category.name}
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {
                      setEditingCategory(category);
                      setShowForm(true);
                    }}
                    className="text-blue-600 hover:text-blue-900 p-1 rounded transition-colors duration-200"
                    title="Edit Category"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(category.id)}
                    className="text-red-600 hover:text-red-900 p-1 rounded transition-colors duration-200"
                    title="Delete Category"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              
              <p className="text-gray-600 text-sm mb-4 min-h-[40px]">
                {category.description}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-800">{category.bookCount}</p>
                  <p className="text-xs text-gray-500">Books</p>
                </div>
                
                <div className="flex-1 mx-4">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${Math.min((category.bookCount / Math.max(...categories.map((cat: any) => cat.bookCount), 1)) * 100, 100)}%`
                      }}
                    />
                  </div>
                </div>
                
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-700">
                    {categories.length > 0 ? Math.round((category.bookCount / categories.reduce((total: number, cat: any) => total + cat.bookCount, 0)) * 100) : 0}%
                  </p>
                  <p className="text-xs text-gray-500">of total</p>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Add Category Card */}
        <div 
          onClick={() => {
            setEditingCategory(null);
            setShowForm(true);
          }}
          className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 border-2 border-dashed border-gray-300 hover:border-blue-400 cursor-pointer"
        >
          <div className="p-6 flex flex-col items-center justify-center h-full min-h-[200px] text-gray-500 hover:text-blue-500 transition-colors duration-200">
            <Plus size={48} className="mb-4" />
            <p className="text-lg font-medium">Add New Category</p>
            <p className="text-sm text-center">Create a new category to organize your books</p>
          </div>
        </div>
      </div>

      {/* Category Form Modal */}
      {showForm && (
        <CategoryForm
          category={editingCategory}
          onSave={handleSave}
          onCancel={() => {
            setShowForm(false);
            setEditingCategory(null);
          }}
        />
      )}
    </div>
  );
};

export default CategoryManagement;