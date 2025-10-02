import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Calendar, MapPin, Upload, X, Plus, ArrowLeft } from 'lucide-react'
import { eventCategories } from '../data/mockData'
import useUserStore from '../store/useUserStore'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from '../store'
import { createEvent as createEventService } from '../services/eventsService'
import { CreateEventPayload } from '../store/slices/events/hostSlice'
import { submitEvent } from '../store/slices/events/hostSlice'

import {
  setFormField,
  addImage,
  removeImage,
  addTicketType,
  updateTicketType,
  removeTicketType,
  resetHostForm,
} from '../store/slices/events/hostSlice'

interface TicketType {
  id: string
  name: string
  price: string
  discount: string
  description: string
}

const InputField = ({
  label,
  type = 'text',
  name,
  value,
  onChange,
  placeholder = '',
  min,
  max,
  step,
  icon: Icon,
}: any) => (
  <div className="mb-5">
    <label className="block text-gray-700 font-medium mb-2">{label}</label>
    <div className={Icon ? 'relative' : ''}>
      {Icon && <Icon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        min={min}
        max={max}
        step={step}
        className={`w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
          Icon ? 'pl-10' : ''
        }`}
        required
      />
    </div>
  </div>
)

const TicketTypeForm = ({
  ticket,
  updateTicketType,
  removeTicketType,
  canRemove,
}: any) => (
  <div className="bg-gray-50 rounded-lg p-4 mb-4 border border-gray-200">
    <div className="flex justify-between items-start mb-4">
      <h4 className="font-medium text-gray-700">Ticket Type {ticket.id}</h4>
      {canRemove && (
        <button
          type="button"
          onClick={() => removeTicketType(ticket.id)}
          className="text-red-500 hover:text-red-700"
        >
          <X size={16} />
        </button>
      )}
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      <InputField
        label="Name"
        value={ticket.name}
        onChange={(e: any) => updateTicketType(ticket.id, 'name', e.target.value)}
        placeholder="Standard, VIP..."
      />
      <InputField
        label="Price ($)"
        type="number"
        value={ticket.price}
        onChange={(e: any) => updateTicketType(ticket.id, 'price', e.target.value)}
        placeholder="0.00"
        min="0"
        step="0.01"
      />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <InputField
        label="Discount (%)"
        type="number"
        value={ticket.discount}
        onChange={(e: any) => updateTicketType(ticket.id, 'discount', e.target.value)}
        placeholder="0"
        min="0"
        max="100"
      />
      <InputField
        label="Description"
        value={ticket.description}
        onChange={(e: any) => updateTicketType(ticket.id, 'description', e.target.value)}
        placeholder="What's included"
      />
    </div>
  </div>
)

const BecomeHostPage = () => {
  const navigate = useNavigate()
  const { isAuthenticated } = useUserStore()
  const dispatch = useDispatch<AppDispatch>()
  const { formData, ticketTypes } = useSelector((state: RootState) => state.host)

  useEffect(() => {
    if (!isAuthenticated) navigate('/login')
  }, [isAuthenticated, navigate])

  const handleChange = (e: React.ChangeEvent<any>) => {
    const { name, value } = e.target
    dispatch(setFormField({ field: name, value }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      Array.from(e.target.files).forEach(file => {
        const url = URL.createObjectURL(file)
        dispatch(addImage(url))
      })
    }
  }

  const removeImageByIndex = (index: number) => {
    dispatch(removeImage(index))
  }

  const addNewTicketType = () => dispatch(addTicketType())
  const updateTicket = (id: string, field: keyof TicketType, value: string) =>
    dispatch(updateTicketType({ id, field, value }))
  const removeTicket = (id: string) => dispatch(removeTicketType(id))


const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()

  try {
    await dispatch(submitEvent()).unwrap() // unwrap() will throw if rejected
    dispatch(resetHostForm())
    navigate('/dashboard')
  } catch (err) {
    console.error('Failed to create event:', err)
    // optionally show a toast notification here
  }
}



  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <Link to="/" className="flex items-center text-indigo-600 mb-6">
          <ArrowLeft size={18} className="mr-2" /> Back to Home
        </Link>
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Become an Event Host</h1>
          <p className="text-gray-600 mb-8">Create and manage your events</p>
          <form onSubmit={handleSubmit}>
            <InputField
              label="Event Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Clear, descriptive title"
            />
            <div className="mb-5">
              <label className="block text-gray-700 font-medium mb-2">Event Description</label>
              <textarea
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Describe your event"
                required
              />
            </div>
            <div className="mb-5">
              <label className="block text-gray-700 font-medium mb-2">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              >
                <option value="">Select a category</option>
                {eventCategories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
              </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <InputField label="Start Date" type="date" name="date" value={formData.date} onChange={handleChange} icon={Calendar} />
              <InputField label="Start Time" type="time" name="time" value={formData.time} onChange={handleChange} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
              <InputField label="End Date" type="date" name="endDate" value={formData.endDate} onChange={handleChange} icon={Calendar} />
              <InputField label="End Time" type="time" name="endTime" value={formData.endTime} onChange={handleChange} />
            </div>
            <InputField label="Location" name="location" value={formData.location} onChange={handleChange} icon={MapPin} placeholder="Venue, address" />
            <InputField label="Total Capacity" type="number" name="capacity" value={formData.capacity} onChange={handleChange} min="1" placeholder="Max attendees" />

            {/* Images */}
            <div className="mb-5">
              <label className="block text-gray-700 font-medium mb-2">Event Images</label>
              <div className="flex flex-wrap gap-4 mb-4">
                {formData.images.map((image: string, index: number) => (
                  <div key={index} className="relative w-24 h-24">
                    <img src={image} alt="" className="w-full h-full object-cover rounded-lg" />
                    <button type="button" onClick={() => removeImageByIndex(index)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1">
                      <X size={14} />
                    </button>
                  </div>
                ))}
                <label className="w-24 h-24 border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50">
                  <Upload size={24} className="text-gray-400 mb-1" />
                  <span className="text-xs text-gray-500">Upload</span>
                  <input type="file" accept="image/*" multiple className="hidden" onChange={handleImageUpload} />
                </label>
              </div>
            </div>

            {/* Tickets */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800 pb-2 border-b border-gray-200">Ticket Types</h2>
                <button type="button" onClick={addNewTicketType} className="flex items-center text-indigo-600 hover:text-indigo-800">
                  <Plus size={16} className="mr-1" /> Add Ticket Type
                </button>
              </div>
              {ticketTypes.map(t => (
                <TicketTypeForm key={t.id} ticket={t} updateTicketType={updateTicket} removeTicketType={removeTicket} canRemove={ticketTypes.length > 1} />
              ))}
            </div>

            <div className="flex justify-end">
              <button type="submit" className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-indigo-700 transition duration-300">
                Submit Application
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default BecomeHostPage
