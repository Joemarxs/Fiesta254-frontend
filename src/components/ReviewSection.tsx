import React, { useMemo } from 'react';
import { Star } from 'lucide-react';
import { useAppSelector } from '../store/hooks';
import { mockReviews } from '../data/mockData';

interface ReviewSectionProps {
  eventId: string;
}

const ReviewSection = ({ eventId }: ReviewSectionProps) => {
  // Use Redux state for reviews
  const storeReviews = useAppSelector(
    (state) => state.reviews.reviews[eventId] || []
  );

  // Use mock reviews for initial data
  const initialReviews =
    mockReviews[eventId as keyof typeof mockReviews] || [];

  // Memoize combined reviews to avoid new references on every render
  const reviews = useMemo(
    () => [...initialReviews, ...storeReviews],
    [initialReviews, storeReviews]
  );

  return (
    <div className="mt-12">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          Reviews ({reviews.length})
        </h2>
      </div>
      <div className="space-y-6">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div
              key={review.id}
              className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0"
            >
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center">
                  <img
                    src={review.userImage}
                    alt={review.userName}
                    className="h-10 w-10 rounded-full object-cover mr-3"
                  />
                  <div>
                    <h4 className="font-medium text-gray-800">
                      {review.userName}
                    </h4>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={`${
                            i < review.rating
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                      <span className="ml-2 text-sm text-gray-500">
                        {review.date}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-gray-600">{review.comment}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No reviews yet.</p>
        )}
      </div>
    </div>
  );
};

export default ReviewSection;
