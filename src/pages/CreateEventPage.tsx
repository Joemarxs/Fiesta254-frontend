import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, X, Plus, Calendar, DollarSign } from 'lucide-react';
import { eventCategories } from '../data/mockData';
import useUserStore from '../store/useUserStore';
interface TicketOption {
  id: string;
  name: string;
  price: string;
  availableFrom: string;
  availableTo: string;
  description: string;
}
const CreateEventPage = () => {
  const navigate = useNavigate();
  const {
    currentUser,
    isAuthenticated
  } = useUserStore();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [endDate, setEndDate] = useState('');
  const [endTime, setEndTime] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [capacity, setCapacity] = useState('');
  const [images, setImages] = useState<string[]>([]);
  // Custom ticket options
  const [ticketOptions, setTicketOptions] = useState<TicketOption[]>([{
    id: '1',
    name: 'Standard',
    price: '',
    availableFrom: '',
    availableTo: '',
    description: 'Regular admission ticket'
  }]);
  // Check if user is authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      // In a real app, this would upload the image to a server
      // For this mock, we'll just create a URL for the image
      const newImages = Array.from(e.target.files).map(file => URL.createObjectURL(file));
      setImages([...images, ...newImages]);
    }
  };
  const removeImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };
  const addTicketOption = () => {
    const newTicket: TicketOption = {
      id: `${ticketOptions.length + 1}`,
      name: '',
      price: '',
      availableFrom: '',
      availableTo: '',
      description: ''
    };
    setTicketOptions([...ticketOptions, newTicket]);
  };
  const updateTicketOption = (id: string, field: keyof TicketOption, value: string) => {
    setTicketOptions(ticketOptions.map(ticket => ticket.id === id ? {
      ...ticket,
      [field]: value
    } : ticket));
  };
  const removeTicketOption = (id: string) => {
    if (ticketOptions.length > 1) {
      setTicketOptions(ticketOptions.filter(ticket => ticket.id !== id));
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would create the event on the server
    // For now, we'll just navigate back to the host dashboard
    navigate('/host-dashboard');
  };
  return <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <Link to="/host-dashboard" className="flex items-center text-indigo-600 mb-6">
          <ArrowLeft size={18} className="mr-2" />
          Back to Dashboard
        </Link>
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">
              Create New Event
            </h1>
            <form onSubmit={handleSubmit}>
              {/* Event Title */}
              <div className="mb-6">
                <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
                  Event Title
                </label>
                <input type="text" id="title" value={title} onChange={e => setTitle(e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Give your event a clear, descriptive title" required />
              </div>
              {/* Event Description */}
              <div className="mb-6">
                <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
                  Event Description
                </label>
                <textarea id="description" rows={6} value={description} onChange={e => setDescription(e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Describe your event in detail. What can attendees expect?" required></textarea>
              </div>
              {/* Category */}
              <div className="mb-6">
                <label htmlFor="category" className="block text-gray-700 font-medium mb-2">
                  Category
                </label>
                <select id="category" value={category} onChange={e => setCategory(e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" required>
                  <option value="">Select a category</option>
                  {eventCategories.map(cat => <option key={cat.id} value={cat.name}>
                      {cat.name}
                    </option>)}
                </select>
              </div>
              {/* Date and Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="date" className="block text-gray-700 font-medium mb-2">
                    Start Date
                  </label>
                  <input type="date" id="date" value={date} onChange={e => setDate(e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
                </div>
                <div>
                  <label htmlFor="time" className="block text-gray-700 font-medium mb-2">
                    Start Time
                  </label>
                  <input type="time" id="time" value={time} onChange={e => setTime(e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="endDate" className="block text-gray-700 font-medium mb-2">
                    End Date
                  </label>
                  <input type="date" id="endDate" value={endDate} onChange={e => setEndDate(e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
                </div>
                <div>
                  <label htmlFor="endTime" className="block text-gray-700 font-medium mb-2">
                    End Time
                  </label>
                  <input type="time" id="endTime" value={endTime} onChange={e => setEndTime(e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
                </div>
              </div>
              {/* Location */}
              <div className="mb-6">
                <label htmlFor="location" className="block text-gray-700 font-medium mb-2">
                  Location
                </label>
                <input type="text" id="location" value={location} onChange={e => setLocation(e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Venue name, address, city, etc." required />
              </div>
              {/* Ticket Options */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-800">
                    Ticket Options
                  </h2>
                  <button type="button" onClick={addTicketOption} className="flex items-center text-indigo-600 hover:text-indigo-800">
                    <Plus size={16} className="mr-1" />
                    Add Ticket Type
                  </button>
                </div>
                {ticketOptions.map(ticket => <div key={ticket.id} className="mb-6 bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="font-medium text-gray-700">
                        Ticket Type {ticket.id}
                      </h3>
                      {ticketOptions.length > 1 && <button type="button" onClick={() => removeTicketOption(ticket.id)} className="text-red-500 hover:text-red-700">
                          <X size={16} />
                        </button>}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Name
                        </label>
                        <input type="text" value={ticket.name} onChange={e => updateTicketOption(ticket.id, 'name', e.target.value)} placeholder="e.g., Standard, VIP, Early Bird" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Price ($)
                        </label>
                        <input type="number" value={ticket.price} onChange={e => updateTicketOption(ticket.id, 'price', e.target.value)} placeholder="0.00" min="0" step="0.01" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Available From
                        </label>
                        <input type="date" value={ticket.availableFrom} onChange={e => updateTicketOption(ticket.id, 'availableFrom', e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Available Until
                        </label>
                        <input type="date" value={ticket.availableTo} onChange={e => updateTicketOption(ticket.id, 'availableTo', e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <input type="text" value={ticket.description} onChange={e => updateTicketOption(ticket.id, 'description', e.target.value)} placeholder="What's included with this ticket" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                    </div>
                  </div>)}
              </div>
              {/* Capacity */}
              <div className="mb-6">
                <label htmlFor="capacity" className="block text-gray-700 font-medium mb-2">
                  Total Capacity
                </label>
                <input type="number" id="capacity" value={capacity} onChange={e => setCapacity(e.target.value)} min="1" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Maximum number of attendees" required />
              </div>
              {/* Image Upload */}
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">
                  Event Images
                </label>
                <div className="flex flex-wrap gap-4 mb-4">
                  {images.map((image, index) => <div key={index} className="relative w-24 h-24">
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
              {/* Submit Button */}
              <div className="flex justify-end space-x-4">
                <Link to="/host-dashboard" className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition duration-300">
                  Cancel
                </Link>
                <button type="submit" className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition duration-300">
                  Create Event
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>;
};
export default CreateEventPage;