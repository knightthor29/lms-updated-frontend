import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, Eye, UserCheck, UserX } from 'lucide-react';
import { membersApi } from '../../services/api';
import MemberForm from './MemberForm';

const MemberManagement = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [viewingMember, setViewingMember] = useState(null);

  useEffect(() => {
    loadMembers();
  }, []);

  const loadMembers = async () => {
    try {
      setLoading(true);
      // TODO: Replace with actual API call
      // const membersData = await membersApi.getAll();
      
      // Mock data for now
      const mockMembers = [
        {
          id: '1',
          name: 'John Doe',
          email: 'john.doe@email.com',
          phone: '+1234567890',
          address: '123 Main St, City, State',
          membershipType: 'STUDENT',
          joinDate: '2023-01-15',
          status: 'ACTIVE',
          totalBooksIssued: 3,
          maxBooksAllowed: 5,
        },
        {
          id: '2',
          name: 'Jane Smith',
          email: 'jane.smith@email.com',
          phone: '+1234567891',
          address: '456 Oak Ave, City, State',
          membershipType: 'FACULTY',
          joinDate: '2022-08-20',
          status: 'ACTIVE',
          totalBooksIssued: 2,
          maxBooksAllowed: 10,
        },
        {
          id: '3',
          name: 'Mike Johnson',
          email: 'mike.johnson@email.com',
          phone: '+1234567892',
          address: '789 Pine St, City, State',
          membershipType: 'GENERAL',
          joinDate: '2023-03-10',
          status: 'SUSPENDED',
          totalBooksIssued: 1,
          maxBooksAllowed: 3,
        }
      ];
      setMembers(mockMembers);
    } catch (error) {
      console.error('Error loading members:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (memberId: string) => {
    if (window.confirm('Are you sure you want to delete this member?')) {
      try {
        // TODO: Replace with actual API call
        // await membersApi.delete(memberId);
        setMembers(members.filter((member: any) => member.id !== memberId));
        console.log('Member deleted:', memberId);
      } catch (error) {
        console.error('Error deleting member:', error);
      }
    }
  };

  const handleStatusChange = async (memberId: string, newStatus: string) => {
    try {
      // TODO: Replace with actual API call
      // await membersApi.update(memberId, { status: newStatus });
      setMembers(members.map((member: any) => 
        member.id === memberId ? { ...member, status: newStatus } : member
      ));
      console.log(`Member ${memberId} status changed to ${newStatus}`);
    } catch (error) {
      console.error('Error updating member status:', error);
    }
  };

  const handleSave = async (memberData: any) => {
    try {
      if (editingMember) {
        // TODO: Replace with actual API call
        // await membersApi.update(editingMember.id, memberData);
        setMembers(members.map((member: any) => 
          member.id === editingMember.id ? { ...member, ...memberData } : member
        ));
        console.log('Member updated:', memberData);
      } else {
        // TODO: Replace with actual API call
        // const newMember = await membersApi.create(memberData);
        const newMember = { 
          ...memberData, 
          id: Date.now().toString(),
          joinDate: new Date().toISOString().split('T')[0],
          totalBooksIssued: 0,
        };
        setMembers([newMember, ...members]);
        console.log('Member created:', memberData);
      }
      setShowForm(false);
      setEditingMember(null);
    } catch (error) {
      console.error('Error saving member:', error);
    }
  };

  const filteredMembers = members.filter((member: any) => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.phone.includes(searchTerm);
    const matchesStatus = !statusFilter || member.status === statusFilter;
    const matchesType = !typeFilter || member.membershipType === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'bg-green-100 text-green-800';
      case 'SUSPENDED': return 'bg-red-100 text-red-800';
      case 'EXPIRED': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'STUDENT': return 'bg-blue-100 text-blue-800';
      case 'FACULTY': return 'bg-purple-100 text-purple-800';
      case 'GENERAL': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
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
          <h1 className="text-2xl font-bold text-gray-800">Member Management</h1>
          <p className="text-gray-600">Manage library members and their profiles</p>
        </div>
        <button
          onClick={() => {
            setEditingMember(null);
            setShowForm(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2"
        >
          <Plus size={16} />
          <span>Add Member</span>
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
                placeholder="Search members by name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex space-x-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Status</option>
              <option value="ACTIVE">Active</option>
              <option value="SUSPENDED">Suspended</option>
              <option value="EXPIRED">Expired</option>
            </select>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Types</option>
              <option value="STUDENT">Student</option>
              <option value="FACULTY">Faculty</option>
              <option value="GENERAL">General</option>
            </select>
          </div>
        </div>
      </div>

      {/* Members List */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Member Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Books
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
              {filteredMembers.map((member: any) => (
                <tr key={member.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{member.name}</div>
                      <div className="text-sm text-gray-500">{member.email}</div>
                      <div className="text-xs text-gray-400">{member.phone}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(member.membershipType)}`}>
                      {member.membershipType}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div>{member.totalBooksIssued}/{member.maxBooksAllowed}</div>
                    <div className="text-xs text-gray-500">issued/allowed</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(member.status)}`}>
                      {member.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => setViewingMember(member)}
                        className="text-blue-600 hover:text-blue-900 p-1 rounded transition-colors duration-200"
                        title="View Details"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => {
                          setEditingMember(member);
                          setShowForm(true);
                        }}
                        className="text-indigo-600 hover:text-indigo-900 p-1 rounded transition-colors duration-200"
                        title="Edit"
                      >
                        <Edit size={16} />
                      </button>
                      {member.status === 'ACTIVE' ? (
                        <button
                          onClick={() => handleStatusChange(member.id, 'SUSPENDED')}
                          className="text-yellow-600 hover:text-yellow-900 p-1 rounded transition-colors duration-200"
                          title="Suspend"
                        >
                          <UserX size={16} />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleStatusChange(member.id, 'ACTIVE')}
                          className="text-green-600 hover:text-green-900 p-1 rounded transition-colors duration-200"
                          title="Activate"
                        >
                          <UserCheck size={16} />
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(member.id)}
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

      {/* Member Form Modal */}
      {showForm && (
        <MemberForm
          member={editingMember}
          onSave={handleSave}
          onCancel={() => {
            setShowForm(false);
            setEditingMember(null);
          }}
        />
      )}

      {/* Member View Modal */}
      {viewingMember && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-screen overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">Member Details</h2>
              <button
                onClick={() => setViewingMember(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Name</label>
                  <p className="text-gray-900">{viewingMember.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Email</label>
                  <p className="text-gray-900">{viewingMember.email}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Phone</label>
                  <p className="text-gray-900">{viewingMember.phone}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Membership Type</label>
                  <p className="text-gray-900">{viewingMember.membershipType}</p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Address</label>
                <p className="text-gray-900">{viewingMember.address}</p>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Join Date</label>
                  <p className="text-gray-900">{viewingMember.joinDate}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Status</label>
                  <p className="text-gray-900">{viewingMember.status}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Books Issued</label>
                  <p className="text-gray-900">{viewingMember.totalBooksIssued}/{viewingMember.maxBooksAllowed}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemberManagement;