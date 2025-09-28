import apiClient from './apiClient';
import { Category } from '../store/slices/categoriesSlice';
// Define the API endpoints for categories
const CATEGORIES_URL = '/categories';
// Get all categories
export const getAllCategories = async () => {
  /*
  const response = await apiClient.get(CATEGORIES_URL)
  return response.data
  */
  // Mock implementation - replace with actual API call
  return Promise.resolve([]);
};
// Create new category
export const createCategory = async (category: Omit<Category, 'id'>) => {
  /*
  const response = await apiClient.post(CATEGORIES_URL, category)
  return response.data
  */
  // Mock implementation - replace with actual API call
  return Promise.resolve({});
};
// Update category
export const updateCategory = async (id: string, category: Partial<Category>) => {
  /*
  const response = await apiClient.put(`${CATEGORIES_URL}/${id}`, category)
  return response.data
  */
  // Mock implementation - replace with actual API call
  return Promise.resolve({});
};
// Delete category
export const deleteCategory = async (id: string) => {
  /*
  const response = await apiClient.delete(`${CATEGORIES_URL}/${id}`)
  return response.data
  */
  // Mock implementation - replace with actual API call
  return Promise.resolve({});
};