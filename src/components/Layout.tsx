import { Link, Outlet, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { useAuthStore } from '@/store/auth'
import { api } from '@/lib/api'

const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => {
  const location = useLocation()
  const isActive = location.pathname === to

  return (
    <Link 
      to={to} 
      className={cn(
        "text-gray-900 hover:text-gray-500 px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap w-[100px] text-center inline-flex items-center justify-center",
        isActive && "bg-gray-100"
      )}
    >
      {children}
    </Link>
  )
}

export default function Layout() {
  const { user, hasAravt } = useAuthStore()
  const isAdmin = user?.role === 'SuperAdmin' 
  const location = useLocation()
  const isSignUpPage = location.pathname === '/signup'
  const isLoginPage = location.pathname === '/login'

  return (
    <div className="min-h-screen flex flex-col w-full">
      {!isSignUpPage && !isLoginPage && (
        <header className="bg-white shadow w-full h-16 navbar">
          <nav className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
            <div className="flex h-full items-center flex-nowrap w-full">
              <div className="flex items-center gap-4">
                {
                  user && (hasAravt ? (
                  <div className="flex items-center gap-4 ml-8">
                    <div className="text-xl">
                      <NavLink to="/dashboard">
                        Aravt
                      </NavLink>
                    </div>
                    <NavLink to="/projects">Projects</NavLink>
                    <NavLink to="/tasks">Tasks</NavLink>
                    <NavLink to="/members">Members</NavLink>
                    <NavLink to="/browse">Browse Aravts</NavLink>
                    {isAdmin && <NavLink to="/admin">Admin</NavLink>}
                    <div className="flex items-center text-sm text-gray-500 w-[100px] text-right truncate">  
                      <NavLink to="/profile"> {user.username}</NavLink>
                    </div>
                    <button 
                      onClick={async () => {
                        await api.logout()
                        useAuthStore.getState().logout()
                      }}
                      className={cn(
                        "bg-red-600 text-white hover:bg-red-700 px-4 py-2 rounded-md text-sm font-medium transition duration-200 ease-in-out"
                      )}
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-4 ml-8">
                    <NavLink to="/browse">Browse Aravts</NavLink>
                    <NavLink to="/profile">Profile</NavLink>
                    <button 
                      onClick={async () => {
                        await api.logout()
                        useAuthStore.getState().logout()
                      }}
                      className={cn(
                        "bg-red-600 text-white hover:bg-red-700 px-4 py-2 rounded-md text-sm font-medium transition duration-200 ease-in-out"
                      )}
                    >
                      Logout
                    </button>
                  </div>
                ))
              }
              </div>
            </div>
          </nav>
        </header>
      )}

      <main className="flex-grow w-full">
        <div className="max-w-7xl w-full mx-auto py-6 sm:px-6 lg:px-8 flex flex-col">
          <Outlet />
        </div>
      </main>

      <footer className="bg-white shadow mt-auto h-[60px] flex items-center">
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm">
            © 2024 Aravt. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}