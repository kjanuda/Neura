import { useState, useEffect } from 'react';
import { LogOut, User, Settings, ChevronDown } from 'lucide-react';

// Navigation items configuration
const navItems = [
  { name: 'Home', hasDropdown: false, path: '/' },
   { name: 'About', hasDropdown: false, path: '/about' },
  { name: 'Research', hasDropdown: false, path: '/Research' },
  { name: 'Contact', hasDropdown: false, path: '/Contact' },
 
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [userProfileOpen, setUserProfileOpen] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Function to load user data
    const loadUserData = () => {
      const userData = localStorage.getItem('user');
      if (userData) {
        try {
          const parsedUser = JSON.parse(userData);
          console.log('Loaded user data:', parsedUser);
          setUser(parsedUser);
        } catch (error) {
          console.error('Error parsing user data:', error);
        }
      }
    };

    // Load user data on mount
    loadUserData();

    // Listen for storage changes (in case user logs in from another tab)
    window.addEventListener('storage', loadUserData);

    return () => {
      window.removeEventListener('storage', loadUserData);
    };
  }, []);

  const handleLogout = (): void => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    setUserProfileOpen(false);
    window.location.href = '/';
  };

  const getInitial = (name: string | undefined): string => {
    return name ? name.charAt(0).toUpperCase() : 'U';
  };

  const getUserDisplayName = (): string => {
    if (user?.name) return user.name;
    if (user?.email) return user.email.split('@')[0];
    return 'User';
  };

  const handleNavigation = (path: string): void => {
    setMobileMenuOpen(false);
    window.location.href = path;
  };

  return (
    <>
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <div className="flex items-center flex-shrink-0 cursor-pointer" onClick={() => handleNavigation('/')}>
              <img 
                src="/image.png" 
                alt="KMS Technology Logo" 
                className="h-8 lg:h-12 w-auto"
              />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <button 
                  key={item.name}
                  onClick={() => handleNavigation(item.path)}
                  className="flex items-center text-gray-900 hover:text-blue-600 transition-colors duration-200 font-medium"
                >
                  {item.name}
                </button>
              ))}
            </div>

            {/* Desktop - User Profile or Get Started Button */}
            <div className="hidden lg:flex items-center">
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setUserProfileOpen(!userProfileOpen)}
                    className="flex items-center space-x-3 bg-gray-50 hover:bg-gray-100 rounded-full pl-1 pr-4 py-1 transition-colors duration-200 border border-gray-200"
                  >
                    {user.profilePicture ? (
                      <img 
                        src={user.profilePicture} 
                        alt="Profile" 
                        className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          if (target.nextElementSibling) {
                            (target.nextElementSibling as HTMLElement).style.display = 'flex';
                          }
                        }}
                      />
                    ) : null}
                    {!user.profilePicture && (
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-lg shadow-sm">
                        {getInitial(user.name || user.email)}
                      </div>
                    )}
                    <span className="text-sm font-medium text-gray-700">{getUserDisplayName()}</span>
                    <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${userProfileOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Profile Dropdown */}
                  {userProfileOpen && (
                    <>
                      {/* Backdrop to close dropdown when clicking outside */}
                      <div 
                        className="fixed inset-0 z-40" 
                        onClick={() => setUserProfileOpen(false)}
                      />
                      <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                        <div className="px-4 py-3 border-b border-gray-100">
                          <div className="flex items-center space-x-3 mb-2">
                            {user.profilePicture ? (
                              <img 
                                src={user.profilePicture} 
                                alt="Profile" 
                                className="w-12 h-12 rounded-full object-cover border-2 border-gray-200 shadow-sm"
                              />
                            ) : (
                              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-lg shadow-sm">
                                {getInitial(user.name || user.email)}
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold text-gray-900 truncate">{getUserDisplayName()}</p>
                              <p className="text-xs text-gray-500 truncate">{user.email}</p>
                            </div>
                          </div>
                          {user.loginType === 'google' && (
                            <div className="flex items-center gap-1 text-xs text-gray-400">
                              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                              </svg>
                              <span>Signed in with Google</span>
                            </div>
                          )}
                        </div>
                        
                        <button
                          onClick={() => handleNavigation('/profile')}
                          className="w-full flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                        >
                          <User className="w-4 h-4 mr-3 text-gray-500" />
                          My Profile
                        </button>
                        
                        <button
                          onClick={() => handleNavigation('/settings')}
                          className="w-full flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                        >
                          <Settings className="w-4 h-4 mr-3 text-gray-500" />
                          Settings
                        </button>
                        
                        <div className="border-t border-gray-100 mt-2 pt-2">
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                          >
                            <LogOut className="w-4 h-4 mr-3" />
                            Logout
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <button 
                  onClick={() => handleNavigation('/login')}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-medium flex items-center transition-colors duration-200 shadow-sm hover:shadow-md"
                >
                  Get Started
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-600 transition-colors duration-200"
            >
              <span className="sr-only">Open main menu</span>
              {!mobileMenuOpen ? (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${mobileMenuOpen ? 'max-h-screen' : 'max-h-0'}`}>
          <div className="px-4 pt-2 pb-6 space-y-1 bg-white border-t border-gray-200">
            {/* Mobile User Profile */}
            {user && (
              <div className="mb-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
                <div className="flex items-center space-x-3 mb-3">
                  {user.profilePicture ? (
                    <img 
                      src={user.profilePicture} 
                      alt="Profile" 
                      className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-xl shadow-sm">
                      {getInitial(user.name || user.email)}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">{getUserDisplayName()}</p>
                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    {user.loginType === 'google' && (
                      <div className="flex items-center gap-1 text-xs text-gray-400 mt-1">
                        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                        </svg>
                        <span>Google</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="space-y-1">
                  <button
                    onClick={() => handleNavigation('/profile')}
                    className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-white rounded-lg transition-colors duration-200"
                  >
                    <User className="w-4 h-4 mr-2 text-gray-500" />
                    My Profile
                  </button>
                  
                  <button
                    onClick={() => handleNavigation('/settings')}
                    className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-white rounded-lg transition-colors duration-200"
                  >
                    <Settings className="w-4 h-4 mr-2 text-gray-500" />
                    Settings
                  </button>
                  
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </button>
                </div>
              </div>
            )}

            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  handleNavigation(item.path);
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-between w-full px-3 py-3 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50 hover:text-blue-600 transition-colors duration-200"
              >
                <span>{item.name}</span>
              </button>
            ))}
            
            {/* Mobile Get Started Button - Only show if not logged in */}
            {!user && (
              <button 
                onClick={() => handleNavigation('/login')}
                className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-medium flex items-center justify-center transition-colors duration-200 shadow-sm"
              >
                Get Started
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}