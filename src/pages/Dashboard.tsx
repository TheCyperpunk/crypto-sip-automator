
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useWallet } from '@/contexts/WalletContext';
import { TrendingUp, DollarSign, Clock, ArrowUpRight, ArrowDownRight, Wallet } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { isConnected, address, balance, connectWallet } = useWallet();
  const [nextExecution, setNextExecution] = useState('2h 34m');

  useEffect(() => {
    const timer = setInterval(() => {
      // Simulate countdown
      const randomMinutes = Math.floor(Math.random() * 60);
      const randomHours = Math.floor(Math.random() * 24);
      setNextExecution(`${randomHours}h ${randomMinutes}m`);
    }, 10000);

    return () => clearInterval(timer);
  }, []);

  const activeSIPs = [
    {
      id: 1,
      allocations: [
        { token: 'BTC', percentage: 40, color: 'from-orange-500 to-yellow-500' },
        { token: 'ETH', percentage: 30, color: 'from-blue-500 to-purple-500' },
        { token: 'BNB', percentage: 20, color: 'from-yellow-500 to-orange-500' },
        { token: 'SOL', percentage: 10, color: 'from-purple-500 to-pink-500' },
      ],
      frequency: 'Weekly',
      totalInvested: '2,500',
      nextExecution,
    },
    {
      id: 2,
      allocations: [
        { token: 'ETH', percentage: 60, color: 'from-blue-500 to-purple-500' },
        { token: 'BTC', percentage: 40, color: 'from-orange-500 to-yellow-500' },
      ],
      frequency: 'Monthly',
      totalInvested: '1,200',
      nextExecution: '12d 5h',
    },
  ];

  const transactions = [
    { date: '2024-01-15', type: 'Swap', token: 'BTC', amount: '+0.025', value: '+$850.00', positive: true },
    { date: '2024-01-14', type: 'Deposit', token: 'USDT', amount: '-500', value: '-$500.00', positive: false },
    { date: '2024-01-10', type: 'Swap', token: 'ETH', amount: '+0.15', value: '+$375.00', positive: true },
    { date: '2024-01-08', type: 'Swap', token: 'SOL', amount: '+8.5', value: '+$425.00', positive: true },
  ];

  if (!isConnected) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <Card className="bg-white/5 border-purple-500/20 max-w-md w-full">
          <CardContent className="p-8 text-center">
            <Wallet className="w-16 h-16 text-purple-400 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-white mb-4">Connect Your Wallet</h2>
            <p className="text-gray-300 mb-6">
              Connect your wallet to view your dashboard and manage your SIP investments.
            </p>
            <Button 
              onClick={connectWallet}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white w-full"
            >
              <Wallet className="w-4 h-4 mr-2" />
              Connect Wallet
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-gray-300">Welcome back! Here's your investment overview.</p>
        </div>

        {/* Wallet Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 border-purple-500/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-white flex items-center">
                <Wallet className="w-5 h-5 mr-2 text-purple-400" />
                Connected Wallet
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-white mb-1">{address?.slice(0, 8)}...{address?.slice(-6)}</p>
              <p className="text-purple-300">BNB Chain</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 border-green-500/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-white flex items-center">
                <DollarSign className="w-5 h-5 mr-2 text-green-400" />
                Net Worth
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-white mb-1">${balance} USDT</p>
              <p className="text-green-300 flex items-center">
                <ArrowUpRight className="w-4 h-4 mr-1" />
                +12.5% this month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-600/20 to-red-600/20 border-orange-500/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-white flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-orange-400" />
                Total Invested
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-white mb-1">$3,700 USDT</p>
              <p className="text-orange-300">Across 2 SIPs</p>
            </CardContent>
          </Card>
        </div>

        {/* Active SIPs */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Active SIPs</h2>
            <Link to="/create">
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
                Create New SIP
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {activeSIPs.map((sip) => (
              <Card key={sip.id} className="bg-white/5 border-purple-500/20 hover:bg-white/10 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-white flex items-center justify-between">
                    <span>SIP #{sip.id}</span>
                    <span className="text-sm text-purple-300">{sip.frequency}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Token Allocations */}
                  <div className="mb-4">
                    <p className="text-gray-300 mb-2">Allocations:</p>
                    <div className="grid grid-cols-2 gap-2">
                      {sip.allocations.map((allocation) => (
                        <div key={allocation.token} className="flex items-center justify-between bg-white/5 rounded-lg p-2">
                          <div className="flex items-center">
                            <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${allocation.color} mr-2`}></div>
                            <span className="text-white text-sm">{allocation.token}</span>
                          </div>
                          <span className="text-purple-300 text-sm">{allocation.percentage}%</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-400">Total Invested</p>
                      <p className="text-white font-semibold">${sip.totalInvested}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        Next Execution
                      </p>
                      <p className="text-purple-300 font-semibold">{sip.nextExecution}</p>
                    </div>
                  </div>

                  <div className="mt-4 flex space-x-2">
                    <Link to="/manage" className="flex-1">
                      <Button variant="outline" size="sm" className="w-full border-purple-500/30 text-purple-300 hover:bg-purple-600/20">
                        Manage
                      </Button>
                    </Link>
                    <Button variant="outline" size="sm" className="border-red-500/30 text-red-300 hover:bg-red-600/20">
                      Pause
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Transaction History */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">Recent Transactions</h2>
          <Card className="bg-white/5 border-purple-500/20">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-purple-500/20">
                    <tr>
                      <th className="text-left p-4 text-gray-300">Date</th>
                      <th className="text-left p-4 text-gray-300">Type</th>
                      <th className="text-left p-4 text-gray-300">Token</th>
                      <th className="text-left p-4 text-gray-300">Amount</th>
                      <th className="text-right p-4 text-gray-300">Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((tx, index) => (
                      <tr key={index} className="border-b border-purple-500/10 hover:bg-white/5 transition-colors">
                        <td className="p-4 text-gray-300">{tx.date}</td>
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            tx.type === 'Swap' ? 'bg-blue-600/20 text-blue-300' : 'bg-green-600/20 text-green-300'
                          }`}>
                            {tx.type}
                          </span>
                        </td>
                        <td className="p-4 text-white font-medium">{tx.token}</td>
                        <td className="p-4 text-white">{tx.amount}</td>
                        <td className={`p-4 text-right font-medium flex items-center justify-end ${
                          tx.positive ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {tx.positive ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownRight className="w-4 h-4 mr-1" />}
                          {tx.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
