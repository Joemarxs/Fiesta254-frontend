// Mock data for development
export const mockEvents = [{
  id: '1',
  title: 'Summer Music Festival',
  description: 'A weekend of amazing music performances by top artists.',
  category: 'Music',
  date: '2023-07-15',
  time: '14:00',
  endDate: '2023-07-16',
  endTime: '23:00',
  location: 'Central Park, New York',
  price: 149.99,
  capacity: 5000,
  attendees: 3200,
  image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
  likes: 423,
  rating: 4.8,
  host: {
    id: '101',
    name: 'EventMasters Inc.',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    bio: 'Professional event organizers with over 10 years of experience.',
    rating: 4.9,
    eventsHosted: 42
  }
}, {
  id: '2',
  title: 'Tech Conference 2023',
  description: 'Join industry leaders for discussions on the latest tech trends.',
  category: 'Technology',
  date: '2023-08-10',
  time: '09:00',
  endDate: '2023-08-12',
  endTime: '17:00',
  location: 'Convention Center, San Francisco',
  price: 299.99,
  capacity: 2000,
  attendees: 1500,
  image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
  likes: 287,
  rating: 4.7,
  host: {
    id: '102',
    name: 'TechCorp',
    image: 'https://images.unsplash.com/photo-1560525821-d5615ef80c69?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    bio: 'Leading technology conference organizers.',
    rating: 4.8,
    eventsHosted: 28
  }
}];
export const eventCategories = [{
  id: '1',
  name: 'Music',
  icon: 'music'
}, {
  id: '2',
  name: 'Technology',
  icon: 'cpu'
}, {
  id: '3',
  name: 'Sports',
  icon: 'activity'
}, {
  id: '4',
  name: 'Food & Drink',
  icon: 'coffee'
}, {
  id: '5',
  name: 'Arts & Culture',
  icon: 'image'
}, {
  id: '6',
  name: 'Business',
  icon: 'briefcase'
}, {
  id: '7',
  name: 'Education',
  icon: 'book'
}, {
  id: '8',
  name: 'Health & Wellness',
  icon: 'heart'
}, {
  id: '9',
  name: 'Charity',
  icon: 'gift'
}, {
  id: '10',
  name: 'Other',
  icon: 'grid'
}];