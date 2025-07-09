
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Wallet, TrendingUp, Settings, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useWallet } from '@/contexts/WalletContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { isConnected, address, connectWallet, disconnectWallet } = useWallet();

  const navigation = [
    { name: 'Home', href: '/', icon: TrendingUp },
    { name: 'Dashboard', href: '/dashboard', icon: Settings },
    { name: 'Create SIP', href: '/create', icon: TrendingUp },
    { name: 'Manage', href: '/manage', icon: Settings },
    { name: 'Profile', href: '/profile', icon: User },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-black/20 backdrop-blur-xl border-b border-purple-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl text-white">SIPChain</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(item.href)
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/25'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Wallet Connect Button */}
          <div className="flex items-center space-x-4">
            {isConnected ? (
              <div className="flex items-center space-x-2">
                <div className="hidden sm:block text-sm text-gray-300">
                  {address?.slice(0, 6)}...{address?.slice(-4)}
                </div>
                <Button
                  onClick={disconnectWallet}
                  variant="outline"
                  size="sm"
                  className="bg-red-600/20 border-red-500/30 text-red-300 hover:bg-red-600/30"
                >
                  Disconnect
                </Button>
              </div>
            ) : (
              <Button
                onClick={connectWallet}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg shadow-purple-500/25"
              >
                <Wallet className="w-4 h-4 mr-2" />
                Connect Wallet
              </Button>
            )}

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-black/95 backdrop-blur-xl border-b border-purple-500/20">
          <div className="px-4 py-2 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  isActive(item.href)
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <item.icon className="w-4 h-4 mr-3" />
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
