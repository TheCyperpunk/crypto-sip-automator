
import { ArrowRight, Shield, Zap, Repeat, ChevronRight, Bitcoin, Coins } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const Index = () => {
  const features = [
    {
      icon: Shield,
      title: 'Non-Custodial',
      description: 'Your funds, your keys. Complete control over your investments.',
    },
    {
      icon: Zap,
      title: 'Automated via Chainlink',
      description: 'Reliable automation powered by decentralized oracles.',
    },
    {
      icon: Repeat,
      title: 'Uses PancakeSwap',
      description: 'Best liquidity and rates through established DEX.',
    },
    {
      icon: Bitcoin,
      title: 'Cancel Anytime',
      description: 'Full flexibility to modify or stop your investments.',
    },
  ];

  const tokens = [
    { name: 'Bitcoin', symbol: 'wBTC', icon: '₿', color: 'from-orange-500 to-yellow-500' },
    { name: 'Ethereum', symbol: 'wETH', icon: 'Ξ', color: 'from-primary to-yellow-400' },
    { name: 'Solana', symbol: 'wSOL', icon: 'S', color: 'from-yellow-400 to-primary' },
    { name: 'BNB', symbol: 'BNB', icon: 'B', color: 'from-primary to-yellow-600' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-yellow-400/10 animate-pulse"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-fade-in">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
                Invest in Crypto
                <span className="block bg-gradient-to-r from-primary to-yellow-400 bg-clip-text text-transparent">
                  Automatically
                </span>
                <span className="block text-3xl md:text-5xl lg:text-6xl mt-2">
                  On-Chain
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
                Create a decentralized SIP using stablecoins on BNB Chain. 
                Dollar-cost average into your favorite crypto assets with full control.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/create">
                  <Button className="bg-gradient-to-r from-primary to-yellow-400 hover:from-yellow-500 hover:to-primary text-black px-8 py-3 text-lg shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300 hover:scale-105">
                    Get Started
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/dashboard">
                  <Button variant="outline" className="border-primary/30 text-primary hover:bg-primary/20 px-8 py-3 text-lg">
                    View Dashboard
                    <ChevronRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Why Choose SIPChain?
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Built for the future of decentralized finance with security and automation at its core.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={feature.title} 
                className="bg-white/5 border-primary/20 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/20 animate-fade-in"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary to-yellow-400 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-6 h-6 text-black" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-300">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Supported Tokens */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Supported Assets
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Invest in the most popular wrapped crypto assets with automated dollar-cost averaging.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {tokens.map((token, index) => (
              <Card 
                key={token.symbol} 
                className="bg-white/5 border-primary/20 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/20 animate-fade-in group cursor-pointer"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 bg-gradient-to-r ${token.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                    <span className="text-2xl font-bold text-white">{token.icon}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-1">{token.name}</h3>
                  <p className="text-primary">{token.symbol}</p>
                  <div className="mt-2 text-xs text-gray-400 bg-primary/20 px-2 py-1 rounded-full">
                    Wrapped
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Card className="bg-gradient-to-r from-primary/20 to-yellow-400/20 border-primary/30">
            <CardContent className="p-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Start Your Journey?
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Join thousands of users who are building wealth through systematic crypto investing.
              </p>
              <Link to="/create">
                <Button className="bg-gradient-to-r from-primary to-yellow-400 hover:from-yellow-500 hover:to-primary text-black px-8 py-3 text-lg shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300 hover:scale-105">
                  Create Your First SIP
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Index;
