import { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ListChecks, 
  PieChart, 
  Calendar, 
  Coins, 
  CreditCard, 
  MessageSquarePlus,
  ChevronLeft,
  Menu,
  User
} from 'lucide-react';

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const navigation = [
    { name: 'Create Assessment', href: '/new-assessment', icon: LayoutDashboard },
    { name: 'All Assessments', href: '/assessments', icon: ListChecks },
    { name: 'Results', href: '/results', icon: PieChart },
    { name: 'Interview Scheduler', href: '/scheduler', icon: Calendar },
    { name: 'Credits', href: '/credits', icon: Coins },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between px-4 h-16 border-b">
            <span className="text-xl font-semibold text-blue-600">AssessAI</span>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 lg:hidden"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-2 py-4 space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({ isActive }) => `
                    flex items-center px-3 py-2 text-sm font-medium rounded-md
                    ${isActive
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }
                  `}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {item.name}
                </NavLink>
              );
            })}
          </nav>

          {/* Bottom section */}
          <div className="p-4 border-t space-y-2">
            <button
              onClick={() => navigate('/feedback')}
              className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900"
            >
              <MessageSquarePlus className="w-5 h-5 mr-3" />
              Submit Feedback
            </button>
            
            <button
              className="flex items-center w-full px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              <CreditCard className="w-5 h-5 mr-3" />
              Upgrade Plan
            </button>

            <div className="flex items-center px-3 py-2">
              <div className="p-1 rounded-full bg-gray-100">
                <User className="w-5 h-5 text-gray-600" />
              </div>
              <span className="ml-3 text-sm text-gray-500">Demo User</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu button */}
      <div className="fixed top-0 left-0 z-40 lg:hidden">
        <button
          onClick={() => setSidebarOpen(true)}
          className={`p-2 m-2 rounded-md text-gray-400 hover:text-gray-500 ${
            sidebarOpen ? 'hidden' : 'block'
          }`}
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Main content */}
      <div className={`${sidebarOpen ? 'lg:pl-64' : ''} flex flex-col min-h-screen`}>
        <main className="flex-1 py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}