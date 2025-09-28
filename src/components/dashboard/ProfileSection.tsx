import React, { useState } from 'react';
import { Camera, Save, X } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { updateUserProfileAsync } from '../../store/slices/usersSlice';

const ProfileSection = () => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.users.currentUser);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    bio: currentUser?.bio || '',
    phone: currentUser?.phone || '',
    location: currentUser?.location || '',
    profileImage: currentUser?.profileImage || '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(updateUserProfileAsync(formData));
    setIsEditing(false);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          profileImage: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">My Profile</h2>
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left side: Profile image */}
        <div className="w-full md:w-1/3">
          <div className="flex flex-col items-center">
            <div className="relative mb-4">
              <img
                src={
                  formData.profileImage ||
                  'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80'
                }
                alt="Profile"
                className="w-40 h-40 rounded-full object-cover border-4 border-gray-100 shadow-sm"
              />
              {isEditing && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <label className="w-full h-full rounded-full bg-black bg-opacity-50 flex items-center justify-center cursor-pointer">
                    <Camera size={24} className="text-white" />
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </label>
                </div>
              )}
            </div>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300"
              >
                Edit Profile
              </button>
            ) : (
              <div className="flex space-x-2">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition duration-300 flex items-center"
                >
                  <X size={16} className="mr-1" />
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right side: Info / Form */}
        <div className="w-full md:w-2/3">
          {!isEditing ? (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Name</h3>
                <p className="text-gray-800 font-medium">{formData.name}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Email</h3>
                <p className="text-gray-800">{formData.email}</p>
              </div>
              {formData.phone && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Phone</h3>
                  <p className="text-gray-800">{formData.phone}</p>
                </div>
              )}
              {formData.location && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Location
                  </h3>
                  <p className="text-gray-800">{formData.location}</p>
                </div>
              )}
              {formData.bio && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Bio</h3>
                  <p className="text-gray-800">{formData.bio}</p>
                </div>
              )}
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Account Type
                </h3>
                <p className="text-gray-800">
                  {currentUser?.isHost ? 'Event Host' : 'Attendee'}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Member Since
                </h3>
                <p className="text-gray-800">
                  {new Date(currentUser?.createdAt || '').toLocaleDateString(
                    'en-US',
                    {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    }
                  )}
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              <div>
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="City, Country"
                />
              </div>
              <div>
                <label
                  htmlFor="bio"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Bio
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Tell us a little about yourself..."
                />
              </div>
              <div className="pt-4">
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300 flex items-center"
                >
                  <Save size={16} className="mr-2" />
                  Save Changes
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
