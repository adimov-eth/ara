import { Link, Outlet, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { useAuthStore } from '@/store/auth'

const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => {
  const location = useLocation()
  const isActive = location.pathname === to

  return (
    <Link 
      to={to} 
      className={cn(
        "text-gray-900 hover:text-gray-500 px-3 py-2 rounded-md text-sm font-medium",
        isActive && "bg-gray-100"
      )}
    >
      {children}
    </Link>
  )
}

export default function Layout() {
  const { user } = useAuthStore()
  const isAdmin = user?.role === 'SuperAdmin' || user?.role === 'AravtLeader'

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-xl font-bold text-gray-900">
                Aravt
              </Link>
              <div className="flex space-x-4">
                <NavLink to="/dashboard">Dashboard</NavLink>
                <NavLink to="/projects">Projects</NavLink>
                <NavLink to="/tasks">Tasks</NavLink>
                <NavLink to="/members">Members</NavLink>
                <NavLink to="/browse">Browse Aravts</NavLink>
                {isAdmin && <NavLink to="/admin">Admin</NavLink>}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <span className="text-sm text-gray-500">
                    {user.username}
                  </span>
                  <button 
                    onClick={() => useAuthStore.getState().logout()}
                    className="text-gray-900 hover:text-gray-500 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link 
                  to="/login"
                  className="text-gray-900 hover:text-gray-500 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </nav>
      </header>

      <main className="flex-grow">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>

      <footer className="bg-white shadow mt-auto">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm">
            © 2024 Aravt. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
} 