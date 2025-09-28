import React from 'react';
import { Star, MessageCircle } from 'lucide-react';
import { mockReviews } from '../../data/mockData';
const HostReviews = () => {
  // Combine all reviews from all events
  const allReviews = Object.values(mockReviews).flat();
  return <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        Reviews from Attendees
      </h2>
      {allReviews.length > 0 ? <div className="space-y-6">
          {allReviews.map(review => <div key={review.id} className="border-b border-gray-200 pb-6">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <img src={review.userImage} alt={review.userName} className="h-10 w-10 rounded-full object-cover mr-3" />
                  <div>
                    <h4 className="font-medium text-gray-800">
                      {review.userName}
                    </h4>
                    <div className="flex items-center">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => <Star key={i} size={16} className={`${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />)}
                      </div>
                      <span className="ml-2 text-sm text-gray-500">
                        {review.date}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  Event:{' '}
                  <span className="font-medium">Summer Music Festival</span>
                </div>
              </div>
              <p className="text-gray-600">{review.comment}</p>
              <div className="mt-3 flex justify-end">
                <button className="flex items-center text-sm text-indigo-600 hover:text-indigo-800">
                  <MessageCircle size={16} className="mr-1" />
                  Reply
                </button>
              </div>
            </div>)}
        </div> : <div className="text-center py-12">
          <p className="text-gray-500">No reviews yet</p>
        </div>}
    </div>;
};
export default HostReviews;