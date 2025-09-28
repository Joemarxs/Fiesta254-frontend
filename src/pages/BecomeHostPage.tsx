import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Calendar, DollarSign, Users, Award, PieChart, Shield, HelpCircle, ChevronDown, Check, Star, ArrowLeft, ArrowRight, Upload, X, CreditCard, Landmark, MapPin, Clock, Plus } from 'lucide-react';
import { eventCategories } from '../data/mockData';
import useUserStore from '../store/useUserStore';
interface TicketType {
  id: string;
  name: string;
  price: string;
  discount: string;
  availableFrom: string;
  description: string;
}
const BecomeHostPage = () => {
  const navigate = useNavigate();
  const {
    isAuthenticated
  } = useUserStore();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    date: '',
    time: '',
    endDate: '',
    endTime: '',
    location: '',
    price: '',
    capacity: '',
    images: [] as string[]
  });
  // Custom ticket types
  const [ticketTypes, setTicketTypes] = useState<TicketType[]>([{
    id: '1',
    name: 'Standard',
    price: '',
    discount: '0',
    availableFrom: '',
    description: 'Regular admission ticket'
  }]);
  const [paymentMethod, setPaymentMethod] = useState('card');
  // Check if user is authenticated
  useEffect(() => {
    if (!isAuthenticated && currentStep > 1) {
      navigate('/login');
    }
  }, [isAuthenticated, currentStep, navigate]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      // In a real app, this would upload the image to a server
      // For this mock, we'll just create a URL for the image
      const newImages = Array.from(e.target.files).map(file => URL.createObjectURL(file));
      setFormData({
        ...formData,
        images: [...formData.images, ...newImages]
      });
    }
  };
  const removeImage = (index: number) => {
    const newImages = [...formData.images];
    newImages.splice(index, 1);
    setFormData({
      ...formData,
      images: newImages
    });
  };
  const addTicketType = () => {
    setTicketTypes([...ticketTypes, {
      id: `${ticketTypes.length + 1}`,
      name: '',
      price: '',
      discount: '0',
      availableFrom: '',
      description: ''
    }]);
  };
  const updateTicketType = (id: string, field: keyof TicketType, value: string) => {
    setTicketTypes(ticketTypes.map(ticket => ticket.id === id ? {
      ...ticket,
      [field]: value
    } : ticket));
  };
  const removeTicketType = (id: string) => {
    if (ticketTypes.length > 1) {
      setTicketTypes(ticketTypes.filter(ticket => ticket.id !== id));
    }
  };
  const nextStep = () => {
    setCurrentStep(currentStep + 1);
    window.scrollTo(0, 0);
  };
  const prevStep = () => {
    setCurrentStep(currentStep - 1);
    window.scrollTo(0, 0);
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would submit the form data to the server
    // For now, we'll just navigate to the host dashboard
    navigate('/host-dashboard');
  };
  // Render different steps based on currentStep
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Event Details
            </h2>
            <div className="mb-6">
              <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
                Event Title
              </label>
              <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Give your event a clear, descriptive title" required />
            </div>
            <div className="mb-6">
              <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
                Event Description
              </label>
              <textarea id="description" name="description" rows={6} value={formData.description} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Describe your event in detail. What can attendees expect?" required></textarea>
            </div>
            <div className="mb-6">
              <label htmlFor="category" className="block text-gray-700 font-medium mb-2">
                Category
              </label>
              <select id="category" name="category" value={formData.category} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" required>
                <option value="">Select a category</option>
                {eventCategories.map(cat => <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>)}
              </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="date" className="block text-gray-700 font-medium mb-2">
                  Start Date
                </label>
                <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
              </div>
              <div>
                <label htmlFor="time" className="block text-gray-700 font-medium mb-2">
                  Start Time
                </label>
                <input type="time" id="time" name="time" value={formData.time} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="endDate" className="block text-gray-700 font-medium mb-2">
                  End Date
                </label>
                <input type="date" id="endDate" name="endDate" value={formData.endDate} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
              </div>
              <div>
                <label htmlFor="endTime" className="block text-gray-700 font-medium mb-2">
                  End Time
                </label>
                <input type="time" id="endTime" name="endTime" value={formData.endTime} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
              </div>
            </div>
            <div className="mb-6">
              <label htmlFor="location" className="block text-gray-700 font-medium mb-2">
                Location
              </label>
              <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Venue name, address, city, etc." required />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">
                Event Images
              </label>
              <div className="flex flex-wrap gap-4 mb-4">
                {formData.images.map((image, index) => <div key={index} className="relative w-24 h-24">
                    <img src={image} alt={`Event image ${index + 1}`} className="w-full h-full object-cover rounded-lg" />
                    <button type="button" onClick={() => removeImage(index)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1">
                      <X size={14} />
                    </button>
                  </div>)}
                <label className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50">
                  <Upload size={24} className="text-gray-400 mb-1" />
                  <span className="text-xs text-gray-500">Upload</span>
                  <input type="file" accept="image/*" className="hidden" multiple onChange={handleImageUpload} />
                </label>
              </div>
              <p className="text-sm text-gray-500">
                Upload at least one image for your event. Maximum 5 images.
              </p>
            </div>
            <div className="flex justify-end">
              <button type="button" onClick={nextStep} className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition duration-300 flex items-center">
                Next: Pricing & Tickets
                <ArrowRight size={18} className="ml-2" />
              </button>
            </div>
          </div>;
      case 2:
        return <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Pricing & Tickets
            </h2>
            {/* Capacity */}
            <div className="mb-6">
              <label htmlFor="capacity" className="block text-gray-700 font-medium mb-2">
                Total Event Capacity
              </label>
              <input type="number" id="capacity" name="capacity" value={formData.capacity} onChange={handleChange} min="1" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Maximum number of attendees" required />
            </div>
            {/* Custom Ticket Types */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Ticket Types
                </h3>
                <button type="button" onClick={addTicketType} className="flex items-center text-indigo-600 hover:text-indigo-800">
                  <Plus size={16} className="mr-1" />
                  Add Ticket Type
                </button>
              </div>
              {ticketTypes.map(ticket => <div key={ticket.id} className="bg-gray-50 rounded-lg p-4 mb-4 border border-gray-200">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="font-medium text-gray-700">
                      Ticket Type {ticket.id}
                    </h4>
                    {ticketTypes.length > 1 && <button type="button" onClick={() => removeTicketType(ticket.id)} className="text-red-500 hover:text-red-700">
                        <X size={16} />
                      </button>}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Name
                      </label>
                      <input type="text" value={ticket.name} onChange={e => updateTicketType(ticket.id, 'name', e.target.value)} placeholder="e.g., Standard, VIP, Early Bird" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Price ($)
                      </label>
                      <input type="number" value={ticket.price} onChange={e => updateTicketType(ticket.id, 'price', e.target.value)} placeholder="0.00" min="0" step="0.01" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Available From Date
                      </label>
                      <input type="date" value={ticket.availableFrom} onChange={e => updateTicketType(ticket.id, 'availableFrom', e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                      <p className="mt-1 text-xs text-gray-500">
                        When this ticket will become available for purchase
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Discount (%)
                      </label>
                      <input type="number" value={ticket.discount} onChange={e => updateTicketType(ticket.id, 'discount', e.target.value)} placeholder="0" min="0" max="100" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <input type="text" value={ticket.description} onChange={e => updateTicketType(ticket.id, 'description', e.target.value)} placeholder="What's included with this ticket" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                  </div>
                </div>)}
            </div>
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Promotional Options
              </h3>
              <div className="flex items-center mb-3">
                <input type="checkbox" id="promo" className="mr-2" checked readOnly />
                <label htmlFor="promo" className="text-gray-700">
                  Enable promotional codes
                </label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="group" className="mr-2" checked readOnly />
                <label htmlFor="group" className="text-gray-700">
                  Enable group discounts (5+ tickets)
                </label>
              </div>
            </div>
            <div className="flex justify-between">
              <button type="button" onClick={prevStep} className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition duration-300 flex items-center">
                <ArrowLeft size={18} className="mr-2" />
                Back
              </button>
              <button type="button" onClick={nextStep} className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition duration-300 flex items-center">
                Next: Review & Publish
                <ArrowRight size={18} className="ml-2" />
              </button>
            </div>
          </div>;
      case 3:
        return <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Review & Publish
            </h2>
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Event Summary
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-500 mb-1">
                      Event Title
                    </h4>
                    <p className="text-gray-800">
                      {formData.title || 'Not specified'}
                    </p>
                  </div>
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-500 mb-1">
                      Category
                    </h4>
                    <p className="text-gray-800">
                      {formData.category || 'Not specified'}
                    </p>
                  </div>
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-500 mb-1">
                      Date & Time
                    </h4>
                    <div className="flex items-center text-gray-800">
                      <Calendar size={16} className="mr-1 text-gray-500" />
                      <span>
                        {formData.date ? new Date(formData.date).toLocaleDateString() : 'Not specified'}{' '}
                        at {formData.time || 'Not specified'}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-800 mt-1">
                      <Clock size={16} className="mr-1 text-gray-500" />
                      <span>
                        Until{' '}
                        {formData.endDate ? new Date(formData.endDate).toLocaleDateString() : 'Not specified'}{' '}
                        at {formData.endTime || 'Not specified'}
                      </span>
                    </div>
                  </div>
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-500 mb-1">
                      Location
                    </h4>
                    <div className="flex items-center text-gray-800">
                      <MapPin size={16} className="mr-1 text-gray-500" />
                      <span>{formData.location || 'Not specified'}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-500 mb-1">
                      Capacity
                    </h4>
                    <div className="flex items-center text-gray-800">
                      <Users size={16} className="mr-1 text-gray-500" />
                      <span>{formData.capacity || '0'} attendees</span>
                    </div>
                  </div>
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-500 mb-1">
                      Ticket Options
                    </h4>
                    <ul className="list-disc list-inside text-gray-800">
                      {ticketTypes.map(ticket => <li key={ticket.id}>
                          {ticket.name || `Ticket Type ${ticket.id}`}: $
                          {ticket.price || '0.00'}
                          {ticket.discount !== '0' && ticket.discount && <span className="text-green-600 ml-1">
                              ({ticket.discount}% off)
                            </span>}
                        </li>)}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-500 mb-2">
                  Event Images
                </h4>
                <div className="flex flex-wrap gap-3">
                  {formData.images.length > 0 ? formData.images.map((image, index) => <img key={index} src={image} alt={`Event preview ${index + 1}`} className="w-20 h-20 object-cover rounded-md" />) : <p className="text-gray-500 italic">No images uploaded</p>}
                </div>
              </div>
            </div>
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Payment Setup
              </h3>
              <div className="mb-6">
                <p className="text-gray-600 mb-4">
                  Select how you want to receive payments for ticket sales:
                </p>
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
                {paymentMethod === 'card' ? <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-800 mb-2">
                      Card Payment Setup
                    </h4>
                    <p className="text-sm text-gray-600 mb-4">
                      Your attendees will be able to pay with any major credit
                      or debit card. Funds will be deposited to your connected
                      bank account.
                    </p>
                    <button className="text-indigo-600 text-sm hover:underline">
                      Connect Bank Account
                    </button>
                  </div> : <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-800 mb-2">
                      M-Pesa Setup
                    </h4>
                    <p className="text-sm text-gray-600 mb-4">
                      Your attendees will be able to pay using M-Pesa mobile
                      money. Funds will be sent to your registered M-Pesa
                      account.
                    </p>
                    <div className="flex items-center">
                      <input type="text" placeholder="Enter M-Pesa number" className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 mr-2" />
                      <button className="text-indigo-600 text-sm hover:underline">
                        Verify
                      </button>
                    </div>
                  </div>}
              </div>
            </div>
            <div className="flex justify-between">
              <button type="button" onClick={prevStep} className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition duration-300 flex items-center">
                <ArrowLeft size={18} className="mr-2" />
                Back
              </button>
              <button type="submit" onClick={handleSubmit} className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition duration-300">
                Publish Event
              </button>
            </div>
          </div>;
      default:
        return null;
    }
  };
  return <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <Link to="/" className="flex items-center text-indigo-600 mb-6">
          <ArrowLeft size={18} className="mr-2" />
          Back to Home
        </Link>
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Create Your Event
            </h1>
            <p className="text-gray-600">
              Share your event with thousands of potential attendees
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
            <div className="flex items-center justify-between">
              <div className={`flex-1 text-center ${currentStep >= 1 ? 'text-indigo-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center mb-1 ${currentStep >= 1 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                  1
                </div>
                <span className="text-sm font-medium">Event Details</span>
              </div>
              <div className={`h-1 flex-1 mx-2 ${currentStep >= 2 ? 'bg-indigo-600' : 'bg-gray-200'}`}></div>
              <div className={`flex-1 text-center ${currentStep >= 2 ? 'text-indigo-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center mb-1 ${currentStep >= 2 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                  2
                </div>
                <span className="text-sm font-medium">Pricing & Tickets</span>
              </div>
              <div className={`h-1 flex-1 mx-2 ${currentStep >= 3 ? 'bg-indigo-600' : 'bg-gray-200'}`}></div>
              <div className={`flex-1 text-center ${currentStep >= 3 ? 'text-indigo-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center mb-1 ${currentStep >= 3 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                  3
                </div>
                <span className="text-sm font-medium">Review & Publish</span>
              </div>
            </div>
          </div>
          <form onSubmit={handleSubmit}>{renderStep()}</form>
          <div className="mt-12 bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Why Host with EventHub?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center">
                <div className="bg-indigo-100 rounded-full p-4 mb-3">
                  <Users size={24} className="text-indigo-600" />
                </div>
                <h3 className="font-medium text-gray-800 mb-2">
                  Reach More People
                </h3>
                <p className="text-sm text-gray-600">
                  Connect with thousands of potential attendees interested in
                  events like yours.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="bg-indigo-100 rounded-full p-4 mb-3">
                  <DollarSign size={24} className="text-indigo-600" />
                </div>
                <h3 className="font-medium text-gray-800 mb-2">
                  Easy Payment Processing
                </h3>
                <p className="text-sm text-gray-600">
                  Accept payments securely with multiple options including cards
                  and mobile money.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="bg-indigo-100 rounded-full p-4 mb-3">
                  <PieChart size={24} className="text-indigo-600" />
                </div>
                <h3 className="font-medium text-gray-800 mb-2">
                  Powerful Analytics
                </h3>
                <p className="text-sm text-gray-600">
                  Track ticket sales, attendance, and other metrics to improve
                  your events.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-8 bg-indigo-50 rounded-lg p-6">
            <div className="flex items-start">
              <div className="mr-4">
                <HelpCircle size={24} className="text-indigo-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-800 mb-2">Need Help?</h3>
                <p className="text-sm text-gray-600 mb-2">
                  Our team is available to assist you with creating and managing
                  your event.
                </p>
                <a href="#" className="text-indigo-600 text-sm font-medium hover:underline">
                  Contact Support
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Testimonials Section */}
      <section className="py-16 bg-white mt-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-12">
            What Our Hosts Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />)}
                </div>
              </div>
              <p className="text-gray-600 mb-6">
                "EventHub made it so easy to create and promote my workshop. I
                sold out all tickets within days and the payment process was
                seamless!"
              </p>
              <div className="flex items-center">
                <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=761&q=80" alt="Host" className="h-10 w-10 rounded-full object-cover mr-3" />
                <div>
                  <h4 className="font-medium text-gray-800">Sarah Johnson</h4>
                  <p className="text-sm text-gray-500">Yoga Instructor</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />)}
                </div>
              </div>
              <p className="text-gray-600 mb-6">
                "The analytics dashboard helps me understand my audience better.
                I've been able to grow my tech meetup from 20 to over 200
                attendees!"
              </p>
              <div className="flex items-center">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80" alt="Host" className="h-10 w-10 rounded-full object-cover mr-3" />
                <div>
                  <h4 className="font-medium text-gray-800">David Chen</h4>
                  <p className="text-sm text-gray-500">Tech Entrepreneur</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />)}
                </div>
              </div>
              <p className="text-gray-600 mb-6">
                "I love that attendees can pay via M-Pesa. It's made my local
                music events accessible to everyone and simplified the entire
                payment process."
              </p>
              <div className="flex items-center">
                <img src="https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80" alt="Host" className="h-10 w-10 rounded-full object-cover mr-3" />
                <div>
                  <h4 className="font-medium text-gray-800">Michael Omondi</h4>
                  <p className="text-sm text-gray-500">Event Organizer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>;
};
export default BecomeHostPage;