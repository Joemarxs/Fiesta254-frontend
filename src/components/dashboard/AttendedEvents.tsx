import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Star, X, MessageCircle } from 'lucide-react';
import { mockEvents } from '../../data/mockData';
import { useAppDispatch } from '../../store/hooks';
import { addReview } from '../../store/slices/reviewsSlice';
const AttendedEvents = () => {
  // In a real app, this would be fetched from the user's attended events
  // For demo purposes, we're showing some of the mock events as if they were attended
  const attendedEvents = mockEvents.slice(0, 3);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const dispatch = useAppDispatch();
  const handleOpenReviewModal = (event: any) => {
    setSelectedEvent(event);
    setShowReviewModal(true);
    setRating(5);
    setComment('');
  };
  const handleCloseReviewModal = () => {
    setShowReviewModal(false);
    setSelectedEvent(null);
  };
  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEvent) return;
    const newReview = {
      id: `new-${Date.now()}`,
      userId: 'current-user',
      userName: 'You',
      userImage: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1160&q=80',
      rating,
      comment,
      date: new Date().toISOString().split('T')[0],
      likes: 0
    };
    dispatch(addReview({
      eventId: selectedEvent.id,
      review: newReview
    }));
    handleCloseReviewModal();
    // Show success message
    alert('Your review has been submitted. Thank you!');
  };
  return <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        Events You've Attended
      </h2>
      {attendedEvents.length > 0 ? <div className="space-y-6">
          {attendedEvents.map(event => <div key={event.id} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
              <div className="flex flex-col md:flex-row gap-4">
                <img src={event.image} alt={event.title} className="w-full md:w-48 h-32 object-cover rounded-lg" />
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                    <h3 className="text-lg font-medium text-gray-800">
                      {event.title}
                    </h3>
                    <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800 mt-2 md:mt-0">
                      Attended
                    </span>
                  </div>
                  <div className="flex items-center mb-2 text-gray-600">
                    <Calendar size={16} className="mr-2" />
                    <span className="text-sm">
                      {new Date(event.date).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
                    </span>
                  </div>
                  <div className="flex items-center mb-3 text-gray-600">
                    <MapPin size={16} className="mr-2" />
                    <span className="text-sm">{event.location}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Star size={16} className="text-yellow-400 fill-yellow-400 mr-1" />
                      <span className="text-sm font-medium">
                        {event.rating} rating
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      <Link to={`/events/${event.id}`} className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                        View Details
                      </Link>
                      <button onClick={() => handleOpenReviewModal(event)} className="text-gray-600 hover:text-gray-800 text-sm font-medium">
                        Leave Review
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>)}
        </div> : <div className="text-center py-12">
          <p className="text-gray-500 mb-4">
            You haven't attended any events yet
          </p>
          <Link to="/events" className="inline-flex bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-300">
            Explore Events
          </Link>
        </div>}
      {/* Review Modal */}
      {showReviewModal && selectedEvent && <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="flex justify-between items-center border-b border-gray-200 p-4">
              <h3 className="text-xl font-semibold text-gray-800">
                Write a Review
              </h3>
              <button onClick={handleCloseReviewModal} className="text-gray-500 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>
            <div className="p-6">
              <div className="flex items-center mb-4">
                <img src={selectedEvent.image} alt={selectedEvent.title} className="w-16 h-16 object-cover rounded-lg mr-4" />
                <div>
                  <h4 className="font-medium text-gray-800">
                    {selectedEvent.title}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {new Date(selectedEvent.date).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
                  </p>
                </div>
              </div>
              <form onSubmit={handleSubmitReview}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Rating
                  </label>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map(star => <button key={star} type="button" onClick={() => setRating(star)} className="focus:outline-none">
                        <Star size={24} className={`${rating >= star ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                      </button>)}
                  </div>
                </div>
                <div className="mb-6">
                  <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Review
                  </label>
                  <textarea id="comment" rows={4} className="w-full rounded-lg border border-gray-300 p-3 text-gray-700 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500" placeholder="Share your thoughts about this event..." value={comment} onChange={e => setComment(e.target.value)} required></textarea>
                </div>
                <div className="flex justify-end space-x-3">
                  <button type="button" onClick={handleCloseReviewModal} className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                    Cancel
                  </button>
                  <button type="submit" className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                    <MessageCircle size={16} className="mr-2" />
                    Submit Review
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>}
    </div>;
};
export default AttendedEvents;