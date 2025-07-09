
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useWallet } from '@/contexts/WalletContext';
import { Calendar, ChevronDown, DollarSign, Percent, Repeat, Wallet as WalletIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const CreateSIP = () => {
  const { isConnected, connectWallet } = useWallet();
  const { toast } = useToast();
  const [selectedTokens, setSelectedTokens] = useState<string[]>([]);
  const [depositAmount, setDepositAmount] = useState('');
  const [stablecoin, setStablecoin] = useState('USDT');
  const [frequency, setFrequency] = useState('');
  const [allocations, setAllocations] = useState<Record<string, number>>({});

  const tokens = [
    { symbol: 'BTC', name: 'Bitcoin', icon: '₿', color: 'from-orange-500 to-yellow-500' },
    { symbol: 'ETH', name: 'Ethereum', icon: 'Ξ', color: 'from-blue-500 to-purple-500' },
    { symbol: 'BNB', name: 'BNB', icon: 'B', color: 'from-yellow-500 to-orange-500' },
    { symbol: 'SOL', name: 'Solana', icon: 'S', color: 'from-purple-500 to-pink-500' },
  ];

  const quickAllocations = [25, 50, 75, 100];
  const frequencies = [
    { value: '1d', label: '1 Day' },
    { value: '1w', label: '1 Week' },
    { value: '1m', label: '1 Month' },
    { value: 'custom', label: 'Custom' },
  ];

  const toggleToken = (tokenSymbol: string) => {
    setSelectedTokens(prev => 
      prev.includes(tokenSymbol) 
        ? prev.filter(t => t !== tokenSymbol)
        : [...prev, tokenSymbol]
    );
  };

  const setQuickAllocation = (percentage: number) => {
    if (selectedTokens.length === 0) return;
    
    const allocationPerToken = percentage / selectedTokens.length;
    const newAllocations: Record<string, number> = {};
    selectedTokens.forEach(token => {
      newAllocations[token] = allocationPerToken;
    });
    setAllocations(newAllocations);
  };

  const handleAllocationChange = (token: string, value: string) => {
    const numValue = parseFloat(value) || 0;
    setAllocations(prev => ({
      ...prev,
      [token]: numValue
    }));
  };

  const getTotalAllocation = () => {
    return Object.values(allocations).reduce((sum, val) => sum + val, 0);
  };

  const handleCreateSIP = () => {
    if (!isConnected) {
      connectWallet();
      return;
    }

    if (selectedTokens.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one token",
        variant: "destructive",
      });
      return;
    }

    if (!depositAmount || parseFloat(depositAmount) <= 0) {
      toast({
        title: "Error",
        description: "Please enter a valid deposit amount",
        variant: "destructive",
      });
      return;
    }

    if (getTotalAllocation() !== 100) {
      toast({
        title: "Error",
        description: "Total allocation must equal 100%",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "SIP Created Successfully!",
      description: "Your systematic investment plan has been set up",
    });
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <Card className="bg-white/5 border-purple-500/20 max-w-md w-full">
          <CardContent className="p-8 text-center">
            <WalletIcon className="w-16 h-16 text-purple-400 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-white mb-4">Connect Your Wallet</h2>
            <p className="text-gray-300 mb-6">
              Connect your wallet to create your first SIP investment plan.
            </p>
            <Button 
              onClick={connectWallet}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white w-full"
            >
              <WalletIcon className="w-4 h-4 mr-2" />
              Connect Wallet
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Create SIP</h1>
          <p className="text-gray-300">Set up your systematic investment plan for automated crypto investing.</p>
        </div>

        <div className="space-y-8">
          {/* Token Selection */}
          <Card className="bg-white/5 border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-white">Select Investment Tokens</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {tokens.map((token) => (
                  <div
                    key={token.symbol}
                    onClick={() => toggleToken(token.symbol)}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:scale-105 ${
                      selectedTokens.includes(token.symbol)
                        ? 'border-purple-500 bg-purple-600/20'
                        : 'border-gray-600 bg-white/5 hover:border-purple-400'
                    }`}
                  >
                    <div className={`w-12 h-12 bg-gradient-to-r ${token.color} rounded-full flex items-center justify-center mx-auto mb-3`}>
                      <span className="text-xl font-bold text-white">{token.icon}</span>
                    </div>
                    <p className="text-white font-semibold text-center">{token.symbol}</p>
                    <p className="text-gray-400 text-sm text-center">{token.name}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Deposit Amount */}
          <Card className="bg-white/5 border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <DollarSign className="w-5 h-5 mr-2 text-purple-400" />
                Deposit Amount
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-4">
                <div className="flex-1">
                  <Label className="text-gray-300">Amount</Label>
                  <Input
                    type="number"
                    placeholder="100"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    className="bg-white/10 border-purple-500/30 text-white placeholder-gray-400"
                  />
                </div>
                <div className="w-32">
                  <Label className="text-gray-300">Stablecoin</Label>
                  <Select value={stablecoin} onValueChange={setStablecoin}>
                    <SelectTrigger className="bg-white/10 border-purple-500/30 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-900 border-purple-500/30">
                      <SelectItem value="USDT">USDT</SelectItem>
                      <SelectItem value="BUSD">BUSD</SelectItem>
                      <SelectItem value="USDC">USDC</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Allocation */}
          {selectedTokens.length > 0 && (
            <Card className="bg-white/5 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Percent className="w-5 h-5 mr-2 text-purple-400" />
                  Token Allocation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <Label className="text-gray-300 mb-2 block">Quick Allocation</Label>
                  <div className="grid grid-cols-4 gap-2">
                    {quickAllocations.map((percentage) => (
                      <Button
                        key={percentage}
                        variant="outline"
                        size="sm"
                        onClick={() => setQuickAllocation(percentage)}
                        className="border-purple-500/30 text-purple-300 hover:bg-purple-600/20"
                      >
                        {percentage}%
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  {selectedTokens.map((tokenSymbol) => {
                    const token = tokens.find(t => t.symbol === tokenSymbol)!;
                    return (
                      <div key={tokenSymbol} className="flex items-center space-x-3">
                        <div className={`w-8 h-8 bg-gradient-to-r ${token.color} rounded-full flex items-center justify-center`}>
                          <span className="text-sm font-bold text-white">{token.icon}</span>
                        </div>
                        <span className="text-white w-16">{tokenSymbol}</span>
                        <div className="flex-1">
                          <Input
                            type="number"
                            placeholder="0"
                            value={allocations[tokenSymbol] || ''}
                            onChange={(e) => handleAllocationChange(tokenSymbol, e.target.value)}
                            className="bg-white/10 border-purple-500/30 text-white"
                            max="100"
                            min="0"
                          />
                        </div>
                        <span className="text-gray-400 w-8">%</span>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-4 p-3 bg-purple-600/20 rounded-lg">
                  <p className="text-purple-300">
                    Total Allocation: <span className={getTotalAllocation() === 100 ? 'text-green-400' : 'text-red-400'}>{getTotalAllocation()}%</span>
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Frequency */}
          <Card className="bg-white/5 border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Repeat className="w-5 h-5 mr-2 text-purple-400" />
                Investment Frequency
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={frequency} onValueChange={setFrequency}>
                <SelectTrigger className="bg-white/10 border-purple-500/30 text-white">
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-purple-500/30">
                  {frequencies.map((freq) => (
                    <SelectItem key={freq.value} value={freq.value}>
                      {freq.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {frequency === 'custom' && (
                <div className="mt-4">
                  <Button variant="outline" className="border-purple-500/30 text-purple-300 hover:bg-purple-600/20">
                    <Calendar className="w-4 h-4 mr-2" />
                    Select Custom Date
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Wallet Source */}
          <Card className="bg-white/5 border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-white">Wallet Source</CardTitle>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="border-purple-500/30 text-purple-300 hover:bg-purple-600/20 w-full">
                <WalletIcon className="w-4 h-4 mr-2" />
                Wallet Native
              </Button>
            </CardContent>
          </Card>

          {/* Create Button */}
          <Card className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 border-purple-500/30">
            <CardContent className="p-6">
              <Button
                onClick={handleCreateSIP}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white w-full py-3 text-lg shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 hover:scale-105"
              >
                Create SIP Investment Plan
              </Button>
              <p className="text-center text-gray-300 mt-3 text-sm">
                By creating a SIP, you agree to our terms and the automated execution of your investment plan.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CreateSIP;
