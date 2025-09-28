import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CreditCard, Landmark } from 'lucide-react';
const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    event,
    ticketCount,
    totalPrice,
    serviceFee,
    finalTotal,
    customerInfo
  } = location.state || {};
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  if (!event) {
    return <div className="text-center py-12">No booking information found</div>;
  }
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would process the payment
    // For now, we'll just navigate to the confirmation page
    navigate('/confirmation', {
      state: {
        event,
        ticketCount,
        finalTotal,
        paymentMethod
      }
    });
  };
  return <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Checkout</h1>
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Order Summary
            </h2>
            <div className="flex items-center mb-4 pb-4 border-b border-gray-200">
              <img src={event.image} alt={event.title} className="w-20 h-20 object-cover rounded-lg mr-4" />
              <div>
                <h3 className="font-medium text-gray-800">{event.title}</h3>
                <p className="text-gray-600 text-sm">
                  {new Date(event.date).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}{' '}
                  · {event.time}
                </p>
                <p className="text-gray-600 text-sm">Tickets: {ticketCount}</p>
              </div>
            </div>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-gray-800">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Service Fee</span>
                <span className="text-gray-800">${serviceFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold pt-2 border-t border-gray-200">
                <span className="text-gray-800">Total</span>
                <span className="text-indigo-600">
                  ${finalTotal.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Payment Method
            </h2>
            <div className="flex mb-6">
              <button type="button" onClick={() => setPaymentMethod('card')} className={`flex flex-1 items-center justify-center rounded-l-lg border px-4 py-3 ${paymentMethod === 'card' ? 'border-indigo-500 bg-indigo-50 text-indigo-600' : 'border-gray-300 text-gray-600'}`}>
                <CreditCard size={20} className="mr-2" />
                Credit/Debit Card
              </button>
              <button type="button" onClick={() => setPaymentMethod('mpesa')} className={`flex flex-1 items-center justify-center rounded-r-lg border px-4 py-3 ${paymentMethod === 'mpesa' ? 'border-indigo-500 bg-indigo-50 text-indigo-600' : 'border-gray-300 text-gray-600'}`}>
                <Landmark size={20} className="mr-2" />
                M-Pesa
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              {paymentMethod === 'card' ? <>
                  <div className="mb-4">
                    <label htmlFor="cardNumber" className="block text-gray-700 font-medium mb-2">
                      Card Number
                    </label>
                    <input type="text" id="cardNumber" placeholder="1234 5678 9012 3456" value={cardNumber} onChange={e => setCardNumber(e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="cardName" className="block text-gray-700 font-medium mb-2">
                      Cardholder Name
                    </label>
                    <input type="text" id="cardName" placeholder="John Doe" value={cardName} onChange={e => setCardName(e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor="expiryDate" className="block text-gray-700 font-medium mb-2">
                        Expiry Date
                      </label>
                      <input type="text" id="expiryDate" placeholder="MM/YY" value={expiryDate} onChange={e => setExpiryDate(e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
                    </div>
                    <div>
                      <label htmlFor="cvv" className="block text-gray-700 font-medium mb-2">
                        CVV
                      </label>
                      <input type="text" id="cvv" placeholder="123" value={cvv} onChange={e => setCvv(e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
                    </div>
                  </div>
                </> : <div className="mb-4">
                  <label htmlFor="mobileNumber" className="block text-gray-700 font-medium mb-2">
                    M-Pesa Mobile Number
                  </label>
                  <input type="tel" id="mobileNumber" placeholder="07XXXXXXXX" value={mobileNumber} onChange={e => setMobileNumber(e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
                  <p className="mt-2 text-sm text-gray-500">
                    You will receive a prompt on your phone to complete the
                    payment.
                  </p>
                </div>}
              <button type="submit" className="w-full bg-indigo-600 text-white rounded-lg px-4 py-3 font-medium hover:bg-indigo-700 transition duration-300">
                Pay ${finalTotal.toFixed(2)}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>;
};
export default CheckoutPage;