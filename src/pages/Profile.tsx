
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useWallet } from '@/contexts/WalletContext';
import { User, Copy, ExternalLink, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Profile = () => {
  const { isConnected, address, balance } = useWallet();
  const { toast } = useToast();

  const positions = [
    { token: 'wBTC', symbol: '₿', amount: '0.0234', value: '$1,234.56', growth: '+15.2%', positive: true, color: 'from-orange-500 to-yellow-500' },
    { token: 'wETH', symbol: 'Ξ', amount: '0.845', value: '$2,156.78', growth: '+8.7%', positive: true, color: 'from-blue-500 to-purple-500' },
    { token: 'BNB', symbol: 'B', amount: '12.5', value: '$456.89', growth: '-2.1%', positive: false, color: 'from-yellow-500 to-orange-500' },
    { token: 'wSOL', symbol: 'S', amount: '45.2', value: '$890.34', growth: '+22.3%', positive: true, color: 'from-purple-500 to-pink-500' },
  ];

  const transactions = [
    { date: '2024-01-15', token: 'BTC', type: 'Swap', amount: '+0.025 wBTC', value: '$850.00', txHash: '0x1234...5678', positive: true },
    { date: '2024-01-15', token: 'USDT', type: 'Deposit', amount: '-500 USDT', value: '$500.00', txHash: '0x2345...6789', positive: false },
    { date: '2024-01-14', token: 'ETH', type: 'Swap', amount: '+0.15 wETH', value: '$375.00', txHash: '0x3456...7890', positive: true },
    { date: '2024-01-12', token: 'SOL', type: 'Swap', amount: '+8.5 wSOL', value: '$425.00', txHash: '0x4567...8901', positive: true },
    { date: '2024-01-10', token: 'USDT', type: 'Deposit', amount: '-300 USDT', value: '$300.00', txHash: '0x5678...9012', positive: false },
    { date: '2024-01-08', token: 'BNB', type: 'Swap', amount: '+5.2 BNB', value: '$190.00', txHash: '0x6789...0123', positive: true },
  ];

  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      toast({
        title: "Address Copied",
        description: "Wallet address copied to clipboard",
      });
    }
  };

  const openTransaction = (txHash: string) => {
    const bscScanUrl = `https://testnet.bscscan.com/tx/${txHash}`;
    window.open(bscScanUrl, '_blank');
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <Card className="bg-white/5 border-purple-500/20 max-w-md w-full">
          <CardContent className="p-8 text-center">
            <User className="w-16 h-16 text-purple-400 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-white mb-4">Connect Your Wallet</h2>
            <p className="text-gray-300 mb-6">
              Connect your wallet to view your profile and investment history.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const totalValue = positions.reduce((sum, pos) => sum + parseFloat(pos.value.replace('$', '').replace(',', '')), 0);
  const totalGrowth = ((totalValue - 4000) / 4000 * 100).toFixed(1); // Assuming initial investment of $4000

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Profile</h1>
          <p className="text-gray-300">Your investment portfolio overview and transaction history.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Wallet Info & Stats */}
          <div className="lg:col-span-1 space-y-6">
            {/* Wallet Address */}
            <Card className="bg-white/5 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <User className="w-5 h-5 mr-2 text-purple-400" />
                  Wallet Address
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-white/5 rounded-lg p-4 mb-4">
                  <p className="text-white font-mono text-sm break-all">{address}</p>
                </div>
                <div className="flex space-x-2">
                  <Button
                    onClick={copyAddress}
                    variant="outline"
                    size="sm"
                    className="flex-1 border-purple-500/30 text-purple-300 hover:bg-purple-600/20"
                  >
                    <Copy className="w-3 h-3 mr-1" />
                    Copy
                  </Button>
                  <Button
                    onClick={() => window.open(`https://testnet.bscscan.com/address/${address}`, '_blank')}
                    variant="outline"
                    size="sm"
                    className="flex-1 border-purple-500/30 text-purple-300 hover:bg-purple-600/20"
                  >
                    <ExternalLink className="w-3 h-3 mr-1" />
                    BSCScan
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Portfolio Stats */}
            <Card className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 border-green-500/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-green-400" />
                  Portfolio Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-300 text-sm">Total Portfolio Value</p>
                    <p className="text-2xl font-bold text-white">${totalValue.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-300 text-sm">Total Growth</p>
                    <p className={`text-xl font-bold ${parseFloat(totalGrowth) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {parseFloat(totalGrowth) >= 0 ? '+' : ''}{totalGrowth}%
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-300 text-sm">Wallet Balance</p>
                    <p className="text-lg font-semibold text-white">${balance} USDT</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Positions & Transactions */}
          <div className="lg:col-span-2 space-y-6">
            {/* Current Positions */}
            <Card className="bg-white/5 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white">Current Positions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {positions.map((position) => (
                    <div key={position.token} className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center">
                          <div className={`w-8 h-8 bg-gradient-to-r ${position.color} rounded-full flex items-center justify-center mr-3`}>
                            <span className="text-sm font-bold text-white">{position.symbol}</span>
                          </div>
                          <div>
                            <p className="text-white font-semibold">{position.token}</p>
                            <p className="text-gray-400 text-sm">{position.amount}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-white font-semibold">{position.value}</p>
                          <p className={`text-sm flex items-center ${position.positive ? 'text-green-400' : 'text-red-400'}`}>
                            {position.positive ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
                            {position.growth}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Transaction History */}
            <Card className="bg-white/5 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white">Transaction History</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b border-purple-500/20">
                      <tr>
                        <th className="text-left p-4 text-gray-300">Date</th>
                        <th className="text-left p-4 text-gray-300">Token</th>
                        <th className="text-left p-4 text-gray-300">Type</th>
                        <th className="text-left p-4 text-gray-300">Amount</th>
                        <th className="text-right p-4 text-gray-300">Value</th>
                        <th className="text-right p-4 text-gray-300">Tx Hash</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions.map((tx, index) => (
                        <tr key={index} className="border-b border-purple-500/10 hover:bg-white/5 transition-colors">
                          <td className="p-4 text-gray-300">{tx.date}</td>
                          <td className="p-4 text-white font-medium">{tx.token}</td>
                          <td className="p-4">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              tx.type === 'Swap' ? 'bg-blue-600/20 text-blue-300' : 'bg-green-600/20 text-green-300'
                            }`}>
                              {tx.type}
                            </span>
                          </td>
                          <td className="p-4 text-white">{tx.amount}</td>
                          <td className={`p-4 text-right font-medium ${tx.positive ? 'text-green-400' : 'text-red-400'}`}>
                            {tx.positive ? '+' : '-'}{tx.value}
                          </td>
                          <td className="p-4 text-right">
                            <Button
                              onClick={() => openTransaction(tx.txHash)}
                              variant="ghost"
                              size="sm"
                              className="text-purple-300 hover:text-purple-200 p-1"
                            >
                              <ExternalLink className="w-3 h-3" />
                            </Button>
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
    </div>
  );
};

export default Profile;
