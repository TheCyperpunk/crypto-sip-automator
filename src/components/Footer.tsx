
import { Github, ExternalLink, Twitter, MessageCircle } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black/20 backdrop-blur-xl border-t border-primary/20 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-yellow-400 rounded-lg flex items-center justify-center">
                <span className="font-bold text-black">S</span>
              </div>
              <span className="font-bold text-xl text-white">SIPChain</span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              The first decentralized systematic investment platform on BNB Chain. 
              Invest in crypto automatically with full control of your funds.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Product</h3>
            <ul className="space-y-2">
              <li><a href="/dashboard" className="text-gray-400 hover:text-white transition-colors">Dashboard</a></li>
              <li><a href="/create" className="text-gray-400 hover:text-white transition-colors">Create SIP</a></li>
              <li><a href="/manage" className="text-gray-400 hover:text-white transition-colors">Manage SIPs</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-white mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  BNB Testnet <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  Documentation <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              </li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary/20 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 SIPChain. Built on BNB Chain with ❤️</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
