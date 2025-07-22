import React, { useState, useEffect } from 'react';
import { BookOpen, Users, BookCheck, AlertTriangle, TrendingUp, Clock } from 'lucide-react';
import { dashboardApi } from '../../services/api';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalBooks: 0,
    totalMembers: 0,
    booksIssued: 0,
    overdueBooks: 0,
    availableBooks: 0,
    totalFines: 0
  });

  const [recentActivities, setRecentActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      // TODO: Replace with actual API calls
      // const statsData = await dashboardApi.getStats();
      // const activitiesData = await dashboardApi.getRecentActivities();
      
      // Mock data for now
      setStats({
        totalBooks: 2567,
        totalMembers: 342,
        booksIssued: 156,
        overdueBooks: 23,
        availableBooks: 2411,
        totalFines: 1250
      });
      
      setRecentActivities([
        { id: 1, type: 'issue', message: 'Book "React Guide" issued to John Doe', time: '2 hours ago' },
        { id: 2, type: 'return', message: 'Book "Java Basics" returned by Jane Smith', time: '3 hours ago' },
        { id: 3, type: 'member', message: 'New member "Alex Johnson" registered', time: '5 hours ago' },
        { id: 4, type: 'overdue', message: 'Book "Python Programming" is overdue', time: '1 day ago' }
      ]);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Books',
      value: stats.totalBooks.toLocaleString(),
      icon: BookOpen,
      color: 'bg-blue-500',
      change: '+12 this month'
    },
    {
      title: 'Active Members',
      value: stats.totalMembers.toLocaleString(),
      icon: Users,
      color: 'bg-green-500',
      change: '+5 this week'
    },
    {
      title: 'Books Issued',
      value: stats.booksIssued.toLocaleString(),
      icon: BookCheck,
      color: 'bg-purple-500',
      change: '+8 today'
    },
    {
      title: 'Overdue Books',
      value: stats.overdueBooks.toLocaleString(),
      icon: AlertTriangle,
      color: 'bg-red-500',
      change: '-3 from yesterday'
    }
  ];

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-gray-200 rounded-lg h-32"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-600">Library management overview</p>
        </div>
        <button
          onClick={loadDashboardData}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2"
        >
          <TrendingUp size={16} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
                <p className="text-sm text-gray-500 mt-1">{stat.change}</p>
              </div>
              <div className={`${stat.color} text-white p-3 rounded-lg`}>
                <stat.icon size={24} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Activities</h2>
          <div className="space-y-4">
            {recentActivities.map((activity: any) => (
              <div key={activity.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                <div className={`p-2 rounded-full ${
                  activity.type === 'issue' ? 'bg-blue-100 text-blue-600' :
                  activity.type === 'return' ? 'bg-green-100 text-green-600' :
                  activity.type === 'member' ? 'bg-purple-100 text-purple-600' :
                  'bg-red-100 text-red-600'
                }`}>
                  {activity.type === 'issue' ? <BookCheck size={16} /> :
                   activity.type === 'return' ? <BookOpen size={16} /> :
                   activity.type === 'member' ? <Users size={16} /> :
                   <AlertTriangle size={16} />}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">{activity.message}</p>
                  <p className="text-xs text-gray-500 flex items-center mt-1">
                    <Clock size={12} className="mr-1" />
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200">
              Issue Book
            </button>
            <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200">
              Return Book
            </button>
            <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors duration-200">
              Add Member
            </button>
            <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors duration-200">
              Add Book
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;