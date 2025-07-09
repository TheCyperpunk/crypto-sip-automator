
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useWallet } from '@/contexts/WalletContext';
import { Play, Pause, Trash2, DollarSign, Clock, TrendingUp, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ManageSIP = () => {
  const { isConnected } = useWallet();
  const { toast } = useToast();
  const [sips, setSips] = useState([
    {
      id: 1,
      name: 'Balanced Portfolio',
      allocations: [
        { token: 'BTC', percentage: 40, color: 'from-orange-500 to-yellow-500' },
        { token: 'ETH', percentage: 30, color: 'from-blue-500 to-purple-500' },
        { token: 'BNB', percentage: 20, color: 'from-yellow-500 to-orange-500' },
        { token: 'SOL', percentage: 10, color: 'from-purple-500 to-pink-500' },
      ],
      frequency: 'Weekly',
      amount: '500',
      totalInvested: '2,500',
      nextExecution: '2h 34m',
      status: 'active',
      growth: '+12.5%',
      created: '2024-01-01'
    },
    {
      id: 2,
      name: 'ETH Focus',
      allocations: [
        { token: 'ETH', percentage: 60, color: 'from-blue-500 to-purple-500' },
        { token: 'BTC', percentage: 40, color: 'from-orange-500 to-yellow-500' },
      ],
      frequency: 'Monthly',
      amount: '300',
      totalInvested: '1,200',
      nextExecution: '12d 5h',
      status: 'paused',
      growth: '+8.2%',
      created: '2024-01-15'
    },
    {
      id: 3,
      name: 'DeFi Tokens',
      allocations: [
        { token: 'BNB', percentage: 50, color: 'from-yellow-500 to-orange-500' },
        { token: 'SOL', percentage: 50, color: 'from-purple-500 to-pink-500' },
      ],
      frequency: 'Bi-weekly',
      amount: '200',
      totalInvested: '800',
      nextExecution: '5d 12h',
      status: 'active',
      growth: '+15.7%',
      created: '2024-02-01'
    },
  ]);

  const handlePauseSIP = (id: number) => {
    setSips(prev => prev.map(sip => 
      sip.id === id ? { ...sip, status: sip.status === 'active' ? 'paused' : 'active' } : sip
    ));
    
    const sip = sips.find(s => s.id === id);
    toast({
      title: `SIP ${sip?.status === 'active' ? 'Paused' : 'Resumed'}`,
      description: `${sip?.name} has been ${sip?.status === 'active' ? 'paused' : 'resumed'} successfully`,
    });
  };

  const handleCancelSIP = (id: number) => {
    const sip = sips.find(s => s.id === id);
    setSips(prev => prev.filter(sip => sip.id !== id));
    
    toast({
      title: "SIP Cancelled",
      description: `${sip?.name} has been cancelled and funds are being withdrawn`,
    });
  };

  const handleWithdrawFunds = (id: number) => {
    const sip = sips.find(s => s.id === id);
    toast({
      title: "Withdrawal Initiated",
      description: `Withdrawing funds from ${sip?.name}. Transaction will be processed shortly.`,
    });
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <Card className="bg-white/5 border-purple-500/20 max-w-md w-full">
          <CardContent className="p-8 text-center">
            <Settings className="w-16 h-16 text-purple-400 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-white mb-4">Connect Your Wallet</h2>
            <p className="text-gray-300 mb-6">
              Connect your wallet to manage your SIP investments.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Manage SIPs</h1>
          <p className="text-gray-300">Control your systematic investment plans - pause, resume, or modify your investments.</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-blue-500/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-300 text-sm">Active SIPs</p>
                  <p className="text-2xl font-bold text-white">{sips.filter(s => s.status === 'active').length}</p>
                </div>
                <Play className="w-8 h-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-600/20 to-red-600/20 border-orange-500/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-300 text-sm">Paused SIPs</p>
                  <p className="text-2xl font-bold text-white">{sips.filter(s => s.status === 'paused').length}</p>
                </div>
                <Pause className="w-8 h-8 text-orange-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 border-green-500/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-300 text-sm">Total Value</p>
                  <p className="text-2xl font-bold text-white">$4,500</p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* SIP Cards */}
        <div className="space-y-6">
          {sips.map((sip) => (
            <Card key={sip.id} className="bg-white/5 border-purple-500/20 hover:bg-white/10 transition-all duration-300">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <CardTitle className="text-white text-xl mb-1">{sip.name}</CardTitle>
                    <p className="text-gray-400 text-sm">Created: {sip.created}</p>
                  </div>
                  <div className="flex items-center space-x-2 mt-4 sm:mt-0">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      sip.status === 'active'
                        ? 'bg-green-600/20 text-green-400 border border-green-500/30'
                        : 'bg-orange-600/20 text-orange-400 border border-orange-500/30'
                    }`}>
                      {sip.status === 'active' ? 'Active' : 'Paused'}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Allocation and Stats */}
                  <div>
                    <h4 className="text-white font-semibold mb-3">Token Allocation</h4>
                    <div className="space-y-2 mb-4">
                      {sip.allocations.map((allocation) => (
                        <div key={allocation.token} className="flex items-center justify-between bg-white/5 rounded-lg p-3">
                          <div className="flex items-center">
                            <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${allocation.color} mr-3`}></div>
                            <span className="text-white font-medium">{allocation.token}</span>
                          </div>
                          <span className="text-purple-300 font-semibold">{allocation.percentage}%</span>
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="bg-white/5 rounded-lg p-3">
                        <p className="text-gray-400 mb-1">Frequency</p>
                        <p className="text-white font-semibold">{sip.frequency}</p>
                      </div>
                      <div className="bg-white/5 rounded-lg p-3">
                        <p className="text-gray-400 mb-1">Amount per cycle</p>
                        <p className="text-white font-semibold">${sip.amount}</p>
                      </div>
                    </div>
                  </div>

                  {/* Performance and Actions */}
                  <div>
                    <h4 className="text-white font-semibold mb-3">Performance</h4>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-white/5 rounded-lg p-3">
                        <div className="flex items-center text-gray-400 mb-1">
                          <DollarSign className="w-4 h-4 mr-1" />
                          <span className="text-sm">Total Invested</span>
                        </div>
                        <p className="text-white font-bold text-lg">${sip.totalInvested}</p>
                      </div>
                      <div className="bg-white/5 rounded-lg p-3">
                        <div className="flex items-center text-gray-400 mb-1">
                          <TrendingUp className="w-4 h-4 mr-1" />
                          <span className="text-sm">Growth</span>
                        </div>
                        <p className="text-green-400 font-bold text-lg">{sip.growth}</p>
                      </div>
                    </div>

                    {sip.status === 'active' && (
                      <div className="bg-purple-600/20 rounded-lg p-3 mb-6">
                        <div className="flex items-center text-purple-300 mb-1">
                          <Clock className="w-4 h-4 mr-1" />
                          <span className="text-sm">Next Execution</span>
                        </div>
                        <p className="text-white font-semibold">{sip.nextExecution}</p>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <Button
                        onClick={() => handlePauseSIP(sip.id)}
                        variant="outline"
                        size="sm"
                        className={`${
                          sip.status === 'active'
                            ? 'border-orange-500/30 text-orange-300 hover:bg-orange-600/20'
                            : 'border-green-500/30 text-green-300 hover:bg-green-600/20'
                        }`}
                      >
                        {sip.status === 'active' ? (
                          <>
                            <Pause className="w-3 h-3 mr-1" />
                            Pause
                          </>
                        ) : (
                          <>
                            <Play className="w-3 h-3 mr-1" />
                            Resume
                          </>
                        )}
                      </Button>
                      
                      <Button
                        onClick={() => handleWithdrawFunds(sip.id)}
                        variant="outline"
                        size="sm"
                        className="border-blue-500/30 text-blue-300 hover:bg-blue-600/20"
                      >
                        <DollarSign className="w-3 h-3 mr-1" />
                        Withdraw
                      </Button>
                      
                      <Button
                        onClick={() => handleCancelSIP(sip.id)}
                        variant="outline"
                        size="sm"
                        className="border-red-500/30 text-red-300 hover:bg-red-600/20"
                      >
                        <Trash2 className="w-3 h-3 mr-1" />
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {sips.length === 0 && (
          <Card className="bg-white/5 border-purple-500/20">
            <CardContent className="p-12 text-center">
              <Settings className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">No SIPs Found</h3>
              <p className="text-gray-300 mb-6">You haven't created any systematic investment plans yet.</p>
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
                Create Your First SIP
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ManageSIP;
