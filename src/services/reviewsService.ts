import apiClient from './apiClient';
import { Review } from '../store/slices/reviewsSlice';
// Define the API endpoints for reviews
const REVIEWS_URL = '/reviews';
// Get reviews by event ID
export const getReviewsByEventId = async (eventId: string) => {
  /*
  const response = await apiClient.get(`${REVIEWS_URL}/event/${eventId}`)
  return response.data
  */
  // Mock implementation - replace with actual API call
  return Promise.resolve([]);
};
// Add review
export const addReview = async (eventId: string, review: Omit<Review, 'id' | 'date' | 'likes'>) => {
  /*
  const response = await apiClient.post(`${REVIEWS_URL}/event/${eventId}`, review)
  return response.data
  */
  // Mock implementation - replace with actual API call
  return Promise.resolve({});
};
// Update review
export const updateReview = async (reviewId: string, reviewData: Partial<Review>) => {
  /*
  const response = await apiClient.put(`${REVIEWS_URL}/${reviewId}`, reviewData)
  return response.data
  */
  // Mock implementation - replace with actual API call
  return Promise.resolve({});
};
// Delete review
export const deleteReview = async (reviewId: string) => {
  /*
  const response = await apiClient.delete(`${REVIEWS_URL}/${reviewId}`)
  return response.data
  */
  // Mock implementation - replace with actual API call
  return Promise.resolve({});
};
// Like review
export const likeReview = async (reviewId: string) => {
  /*
  const response = await apiClient.post(`${REVIEWS_URL}/${reviewId}/like`)
  return response.data
  */
  // Mock implementation - replace with actual API call
  return Promise.resolve({});
};