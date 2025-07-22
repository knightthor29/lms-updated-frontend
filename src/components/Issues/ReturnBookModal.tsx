import React, { useState } from 'react';
import { X, Calendar, DollarSign, AlertTriangle } from 'lucide-react';

interface ReturnBookModalProps {
  issue: any;
  onReturn: (returnData: any) => void;
  onCancel: () => void;
}

const ReturnBookModal: React.FC<ReturnBookModalProps> = ({ issue, onReturn, onCancel }) => {
  const [returnDate, setReturnDate] = useState(new Date().toISOString().split('T')[0]);
  const [condition, setCondition] = useState('GOOD');
  const [notes, setNotes] = useState('');

  const calculateFine = () => {
    const due = new Date(issue.dueDate);
    const returnDateObj = new Date(returnDate);
    
    if (returnDateObj <= due) {
      return 0;
    }
    
    const overdueDays = Math.ceil((returnDateObj.getTime() - due.getTime()) / (1000 * 60 * 60 * 24));
    const finePerDay = 2; // $2 per day
    
    // Additional fine for poor condition
    const conditionFine = condition === 'DAMAGED' ? 20 : condition === 'LOST' ? 100 : 0;
    
    return (overdueDays * finePerDay) + conditionFine;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const fine = calculateFine();
    
    onReturn({
      returnDate,
      condition,
      notes,
      fine,
    });
  };

  const fine = calculateFine();
  const isOverdue = new Date(returnDate) > new Date(issue.dueDate);
  const daysOverdue = isOverdue ? Math.ceil((new Date(returnDate).getTime() - new Date(issue.dueDate).getTime()) / (1000 * 60 * 60 * 24)) : 0;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-screen overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">Return Book</h2>
          <button
            onClick={onCancel}
            className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
          >
            <X size={24} />
          </button>
        </div>

        {/* Book and Member Info */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Book Details</h3>
              <p className="text-sm text-gray-700">{issue.book.title}</p>
              <p className="text-xs text-gray-500">by {issue.book.author}</p>
              <p className="text-xs text-gray-500">ISBN: {issue.book.isbn}</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Member Details</h3>
              <p className="text-sm text-gray-700">{issue.member.name}</p>
              <p className="text-xs text-gray-500">{issue.member.email}</p>
              <p className="text-xs text-gray-500">{issue.member.membershipType}</p>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center space-x-6 text-sm">
              <div className="flex items-center space-x-1">
                <Calendar size={14} className="text-gray-400" />
                <span>Issued: {issue.issueDate}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar size={14} className="text-gray-400" />
                <span>Due: {issue.dueDate}</span>
              </div>
              {issue.status === 'OVERDUE' && (
                <div className="flex items-center space-x-1 text-red-600">
                  <AlertTriangle size={14} />
                  <span>Overdue</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="returnDate" className="block text-sm font-medium text-gray-700 mb-1">
                Return Date *
              </label>
              <input
                type="date"
                id="returnDate"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                max={new Date().toISOString().split('T')[0]}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label htmlFor="condition" className="block text-sm font-medium text-gray-700 mb-1">
                Book Condition *
              </label>
              <select
                id="condition"
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="EXCELLENT">Excellent</option>
                <option value="GOOD">Good</option>
                <option value="FAIR">Fair</option>
                <option value="DAMAGED">Damaged</option>
                <option value="LOST">Lost</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
              Notes (Optional)
            </label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Any additional notes about the return..."
            />
          </div>

          {/* Fine Calculation */}
          <div className={`rounded-lg p-4 ${fine > 0 ? 'bg-red-50 border border-red-200' : 'bg-green-50 border border-green-200'}`}>
            <div className="flex items-center space-x-2 mb-2">
              <DollarSign size={20} className={fine > 0 ? 'text-red-600' : 'text-green-600'} />
              <h3 className={`font-medium ${fine > 0 ? 'text-red-900' : 'text-green-900'}`}>
                Fine Calculation
              </h3>
            </div>
            
            <div className="space-y-1 text-sm">
              {isOverdue && (
                <div className="flex justify-between">
                  <span className="text-red-700">Overdue fine ({daysOverdue} days × $2/day):</span>
                  <span className="text-red-700">${daysOverdue * 2}</span>
                </div>
              )}
              
              {condition === 'DAMAGED' && (
                <div className="flex justify-between">
                  <span className="text-red-700">Damage fee:</span>
                  <span className="text-red-700">$20</span>
                </div>
              )}
              
              {condition === 'LOST' && (
                <div className="flex justify-between">
                  <span className="text-red-700">Book replacement fee:</span>
                  <span className="text-red-700">$100</span>
                </div>
              )}
              
              <div className={`flex justify-between font-medium pt-2 border-t ${
                fine > 0 ? 'border-red-200 text-red-900' : 'border-green-200 text-green-900'
              }`}>
                <span>Total Fine:</span>
                <span>${fine}</span>
              </div>
            </div>
          </div>

          {/* Condition Information */}
          <div className="bg-blue-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-blue-900 mb-2">Book Condition Guidelines:</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• <strong>Excellent:</strong> Like new condition</li>
              <li>• <strong>Good:</strong> Minor wear, no damage</li>
              <li>• <strong>Fair:</strong> Visible wear but still readable</li>
              <li>• <strong>Damaged:</strong> Significant damage (additional $20 fee)</li>
              <li>• <strong>Lost:</strong> Book cannot be returned ($100 replacement fee)</li>
            </ul>
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
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
            >
              Process Return
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReturnBookModal;