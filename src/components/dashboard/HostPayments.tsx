import React, { useState } from 'react';
import { DollarSign, Download, ArrowDown, ArrowUp, Plus, CreditCard, Smartphone, ChevronRight, X } from 'lucide-react';
// Define types for withdrawal methods
interface WithdrawalMethod {
  id: string;
  type: 'card' | 'mpesa';
  name: string;
  details: string;
  isDefault: boolean;
}
const HostPayments = () => {
  const [activeTab, setActiveTab] = useState('earnings');
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [showAddMethodModal, setShowAddMethodModal] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [selectedMethodId, setSelectedMethodId] = useState<string | null>(null);
  const [withdrawalMethods, setWithdrawalMethods] = useState<WithdrawalMethod[]>([{
    id: '1',
    type: 'card',
    name: 'Visa ending in 4242',
    details: '****4242',
    isDefault: true
  }, {
    id: '2',
    type: 'mpesa',
    name: 'M-Pesa',
    details: '+254 712 345678',
    isDefault: false
  }]);
  // New method form
  const [newMethod, setNewMethod] = useState({
    type: 'card' as 'card' | 'mpesa',
    cardNumber: '',
    cardName: '',
    cardExpiry: '',
    cardCvv: '',
    mpesaNumber: '',
    mpesaName: ''
  });
  // Mock earnings data
  const earnings = [{
    id: '1',
    eventTitle: 'Summer Music Festival',
    date: '2023-07-05',
    amount: 1349.91,
    status: 'paid',
    tickets: 9
  }, {
    id: '2',
    eventTitle: 'Tech Conference 2023',
    date: '2023-07-03',
    amount: 599.98,
    status: 'pending',
    tickets: 2
  }, {
    id: '3',
    eventTitle: 'Cooking Masterclass',
    date: '2023-06-28',
    amount: 809.91,
    status: 'paid',
    tickets: 9
  }];
  // Mock withdrawals data
  const withdrawals = [{
    id: '1',
    date: '2023-07-01',
    amount: 1200.0,
    status: 'completed',
    method: 'Bank Transfer'
  }, {
    id: '2',
    date: '2023-06-15',
    amount: 850.0,
    status: 'completed',
    method: 'PayPal'
  }, {
    id: '3',
    date: '2023-05-28',
    amount: 725.5,
    status: 'processing',
    method: 'Bank Transfer'
  }];
  // Calculate total earnings and available balance
  const totalEarnings = earnings.reduce((total, earning) => total + earning.amount, 0);
  const pendingEarnings = earnings.filter(earning => earning.status === 'pending').reduce((total, earning) => total + earning.amount, 0);
  const availableBalance = totalEarnings - pendingEarnings - withdrawals.filter(withdrawal => withdrawal.status === 'completed').reduce((total, withdrawal) => total + withdrawal.amount, 0);
  // Handle withdrawal
  const handleWithdraw = () => {
    setShowWithdrawModal(true);
    // Default to the default method if available
    const defaultMethod = withdrawalMethods.find(method => method.isDefault);
    if (defaultMethod) {
      setSelectedMethodId(defaultMethod.id);
    } else if (withdrawalMethods.length > 0) {
      setSelectedMethodId(withdrawalMethods[0].id);
    }
  };
  const processWithdrawal = () => {
    // In a real app, this would send a request to process the withdrawal
    console.log('Processing withdrawal:', {
      amount: withdrawAmount,
      methodId: selectedMethodId
    });
    // Close modal and reset form
    setShowWithdrawModal(false);
    setWithdrawAmount('');
    setSelectedMethodId(null);
    // Show success message or redirect
    alert('Withdrawal request submitted successfully!');
  };
  const handleAddMethod = () => {
    setShowAddMethodModal(true);
  };
  const saveNewMethod = () => {
    // Validate form based on selected type
    if (newMethod.type === 'card') {
      if (!newMethod.cardNumber || !newMethod.cardName || !newMethod.cardExpiry) {
        alert('Please fill in all card details');
        return;
      }
    } else if (newMethod.type === 'mpesa') {
      if (!newMethod.mpesaNumber || !newMethod.mpesaName) {
        alert('Please fill in all M-Pesa details');
        return;
      }
    }
    // Create new method
    const newWithdrawalMethod: WithdrawalMethod = {
      id: `${withdrawalMethods.length + 1}`,
      type: newMethod.type,
      name: newMethod.type === 'card' ? `Card ending in ${newMethod.cardNumber.slice(-4)}` : `M-Pesa (${newMethod.mpesaNumber})`,
      details: newMethod.type === 'card' ? `****${newMethod.cardNumber.slice(-4)}` : newMethod.mpesaNumber,
      isDefault: withdrawalMethods.length === 0 // Make default if it's the first method
    };
    setWithdrawalMethods([...withdrawalMethods, newWithdrawalMethod]);
    setSelectedMethodId(newWithdrawalMethod.id); // Select the newly added method
    setShowAddMethodModal(false);
    // Reset form
    setNewMethod({
      type: 'card',
      cardNumber: '',
      cardName: '',
      cardExpiry: '',
      cardCvv: '',
      mpesaNumber: '',
      mpesaName: ''
    });
  };
  const setDefaultMethod = (id: string) => {
    setWithdrawalMethods(withdrawalMethods.map(method => ({
      ...method,
      isDefault: method.id === id
    })));
  };
  const deleteMethod = (id: string) => {
    const isDefault = withdrawalMethods.find(method => method.id === id)?.isDefault;
    const filtered = withdrawalMethods.filter(method => method.id !== id);
    // If we deleted the default method and there are other methods, make the first one default
    if (isDefault && filtered.length > 0) {
      filtered[0].isDefault = true;
    }
    setWithdrawalMethods(filtered);
    // If the deleted method was selected, reset selection
    if (selectedMethodId === id) {
      setSelectedMethodId(filtered.length > 0 ? filtered[0].id : null);
    }
  };
  return <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-500 text-sm">Total Earnings</h3>
            <DollarSign size={20} className="text-green-500" />
          </div>
          <p className="text-2xl font-bold text-gray-800">
            ${totalEarnings.toFixed(2)}
          </p>
          <p className="text-sm text-gray-500 mt-1">Lifetime earnings</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-500 text-sm">Pending</h3>
            <ArrowDown size={20} className="text-yellow-500" />
          </div>
          <p className="text-2xl font-bold text-gray-800">
            ${pendingEarnings.toFixed(2)}
          </p>
          <p className="text-sm text-gray-500 mt-1">To be released</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-500 text-sm">Available Balance</h3>
            <ArrowUp size={20} className="text-indigo-500" />
          </div>
          <p className="text-2xl font-bold text-gray-800">
            ${availableBalance.toFixed(2)}
          </p>
          <div className="mt-2">
            <button className="text-sm text-white bg-indigo-600 px-3 py-1 rounded hover:bg-indigo-700 transition duration-300" onClick={handleWithdraw}>
              Withdraw
            </button>
          </div>
        </div>
      </div>

      {/* Withdrawal Methods */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">
            Withdrawal Methods
          </h3>
          <button onClick={handleAddMethod} className="flex items-center text-indigo-600 hover:text-indigo-800 text-sm">
            <Plus size={16} className="mr-1" />
            Add Method
          </button>
        </div>
        {withdrawalMethods.length === 0 ? <div className="text-center py-8 border border-dashed border-gray-300 rounded-lg">
            <p className="text-gray-500 mb-2">
              No withdrawal methods added yet
            </p>
            <button onClick={handleAddMethod} className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
              Add your first withdrawal method
            </button>
          </div> : <div className="space-y-3">
            {withdrawalMethods.map(method => <div key={method.id} className="flex items-center justify-between border border-gray-200 rounded-lg p-4">
                <div className="flex items-center">
                  {method.type === 'card' ? <CreditCard size={20} className="text-gray-500 mr-3" /> : <Smartphone size={20} className="text-gray-500 mr-3" />}
                  <div>
                    <p className="font-medium text-gray-800">{method.name}</p>
                    <p className="text-sm text-gray-500">{method.details}</p>
                  </div>
                  {method.isDefault && <span className="ml-3 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                      Default
                    </span>}
                </div>
                <div className="flex items-center space-x-3">
                  {!method.isDefault && <button onClick={() => setDefaultMethod(method.id)} className="text-sm text-indigo-600 hover:text-indigo-800">
                      Set Default
                    </button>}
                  <button onClick={() => deleteMethod(method.id)} className="text-sm text-red-600 hover:text-red-800">
                    Delete
                  </button>
                </div>
              </div>)}
          </div>}
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="flex border-b border-gray-200">
          <button onClick={() => setActiveTab('earnings')} className={`flex-1 py-4 px-6 text-center font-medium ${activeTab === 'earnings' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}>
            Earnings
          </button>
          <button onClick={() => setActiveTab('withdrawals')} className={`flex-1 py-4 px-6 text-center font-medium ${activeTab === 'withdrawals' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}>
            Withdrawals
          </button>
        </div>
        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'earnings' ? <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Event
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tickets Sold
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {earnings.map(earning => <tr key={earning.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                        {earning.eventTitle}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(earning.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {earning.tickets}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-medium">
                        ${earning.amount.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${earning.status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                          {earning.status === 'paid' ? 'Paid' : 'Pending'}
                        </span>
                      </td>
                    </tr>)}
                </tbody>
              </table>
            </div> : <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Method
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Receipt
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {withdrawals.map(withdrawal => <tr key={withdrawal.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(withdrawal.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-medium">
                        ${withdrawal.amount.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {withdrawal.method}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${withdrawal.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                          {withdrawal.status === 'completed' ? 'Completed' : 'Processing'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button className="text-indigo-600 hover:text-indigo-900">
                          <Download size={16} />
                        </button>
                      </td>
                    </tr>)}
                </tbody>
              </table>
            </div>}
        </div>
      </div>

      {/* Withdraw Modal */}
      {showWithdrawModal && <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="flex justify-between items-center border-b border-gray-200 p-4">
              <h3 className="text-xl font-semibold text-gray-800">
                Withdraw Funds
              </h3>
              <button onClick={() => setShowWithdrawModal(false)} className="text-gray-500 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>
            <div className="p-6">
              <div className="mb-6">
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                  Amount to withdraw
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    $
                  </span>
                  <input type="number" id="amount" value={withdrawAmount} onChange={e => setWithdrawAmount(e.target.value)} placeholder="0.00" min="1" max={availableBalance} step="0.01" className="pl-8 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" required />
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  Available balance: ${availableBalance.toFixed(2)}
                </p>
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select withdrawal method
                </label>
                {withdrawalMethods.length === 0 ? <div className="text-center py-4 border border-dashed border-gray-300 rounded-lg">
                    <p className="text-gray-500 mb-2">
                      No withdrawal methods available
                    </p>
                    <button onClick={() => {
                setShowWithdrawModal(false);
                setShowAddMethodModal(true);
              }} className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                      Add a withdrawal method
                    </button>
                  </div> : <div className="space-y-2">
                    {withdrawalMethods.map(method => <div key={method.id} className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer ${selectedMethodId === method.id ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:bg-gray-50'}`} onClick={() => setSelectedMethodId(method.id)}>
                        <div className="flex items-center">
                          {method.type === 'card' ? <CreditCard size={20} className="text-gray-500 mr-3" /> : <Smartphone size={20} className="text-gray-500 mr-3" />}
                          <div>
                            <p className="font-medium text-gray-800">
                              {method.name}
                            </p>
                            <p className="text-sm text-gray-500">
                              {method.details}
                            </p>
                          </div>
                        </div>
                        {method.isDefault && <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                            Default
                          </span>}
                      </div>)}
                    <button onClick={() => {
                setShowWithdrawModal(false);
                setShowAddMethodModal(true);
              }} className="flex items-center justify-center w-full p-3 border border-dashed border-gray-300 rounded-lg text-indigo-600 hover:bg-indigo-50">
                      <Plus size={16} className="mr-2" />
                      Add New Method
                    </button>
                  </div>}
              </div>
              <div className="flex justify-end space-x-3">
                <button onClick={() => setShowWithdrawModal(false)} className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                  Cancel
                </button>
                <button onClick={processWithdrawal} disabled={!withdrawAmount || !selectedMethodId || Number(withdrawAmount) <= 0 || Number(withdrawAmount) > availableBalance} className={`px-4 py-2 bg-indigo-600 text-white rounded-lg ${!withdrawAmount || !selectedMethodId || Number(withdrawAmount) <= 0 || Number(withdrawAmount) > availableBalance ? 'opacity-50 cursor-not-allowed' : 'hover:bg-indigo-700'}`}>
                  Withdraw Funds
                </button>
              </div>
            </div>
          </div>
        </div>}

      {/* Add Method Modal */}
      {showAddMethodModal && <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="flex justify-between items-center border-b border-gray-200 p-4">
              <h3 className="text-xl font-semibold text-gray-800">
                Add Withdrawal Method
              </h3>
              <button onClick={() => setShowAddMethodModal(false)} className="text-gray-500 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>
            <div className="p-6">
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Method Type
                </label>
                <div className="flex mb-4">
                  <button type="button" onClick={() => setNewMethod({
                ...newMethod,
                type: 'card'
              })} className={`flex flex-1 items-center justify-center rounded-l-lg border px-4 py-3 ${newMethod.type === 'card' ? 'border-indigo-500 bg-indigo-50 text-indigo-600' : 'border-gray-300 text-gray-600'}`}>
                    <CreditCard size={20} className="mr-2" />
                    Credit/Debit Card
                  </button>
                  <button type="button" onClick={() => setNewMethod({
                ...newMethod,
                type: 'mpesa'
              })} className={`flex flex-1 items-center justify-center rounded-r-lg border px-4 py-3 ${newMethod.type === 'mpesa' ? 'border-indigo-500 bg-indigo-50 text-indigo-600' : 'border-gray-300 text-gray-600'}`}>
                    <Smartphone size={20} className="mr-2" />
                    M-Pesa
                  </button>
                </div>
              </div>
              {newMethod.type === 'card' ? <div>
                  <div className="mb-4">
                    <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                      Card Number
                    </label>
                    <input type="text" id="cardNumber" value={newMethod.cardNumber} onChange={e => setNewMethod({
                ...newMethod,
                cardNumber: e.target.value
              })} placeholder="1234 5678 9012 3456" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" required />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
                      Name on Card
                    </label>
                    <input type="text" id="cardName" value={newMethod.cardName} onChange={e => setNewMethod({
                ...newMethod,
                cardName: e.target.value
              })} placeholder="John Smith" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" required />
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor="cardExpiry" className="block text-sm font-medium text-gray-700 mb-1">
                        Expiry Date
                      </label>
                      <input type="text" id="cardExpiry" value={newMethod.cardExpiry} onChange={e => setNewMethod({
                  ...newMethod,
                  cardExpiry: e.target.value
                })} placeholder="MM/YY" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" required />
                    </div>
                    <div>
                      <label htmlFor="cardCvv" className="block text-sm font-medium text-gray-700 mb-1">
                        CVV
                      </label>
                      <input type="text" id="cardCvv" value={newMethod.cardCvv} onChange={e => setNewMethod({
                  ...newMethod,
                  cardCvv: e.target.value
                })} placeholder="123" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" required />
                    </div>
                  </div>
                </div> : <div>
                  <div className="mb-4">
                    <label htmlFor="mpesaNumber" className="block text-sm font-medium text-gray-700 mb-1">
                      M-Pesa Phone Number
                    </label>
                    <input type="text" id="mpesaNumber" value={newMethod.mpesaNumber} onChange={e => setNewMethod({
                ...newMethod,
                mpesaNumber: e.target.value
              })} placeholder="+254 712 345678" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" required />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="mpesaName" className="block text-sm font-medium text-gray-700 mb-1">
                      Registered Name
                    </label>
                    <input type="text" id="mpesaName" value={newMethod.mpesaName} onChange={e => setNewMethod({
                ...newMethod,
                mpesaName: e.target.value
              })} placeholder="John Smith" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" required />
                  </div>
                </div>}
              <div className="flex justify-end space-x-3 mt-6">
                <button onClick={() => setShowAddMethodModal(false)} className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                  Cancel
                </button>
                <button onClick={saveNewMethod} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                  Save Method
                </button>
              </div>
            </div>
          </div>
        </div>}
    </div>;
};
export default HostPayments;