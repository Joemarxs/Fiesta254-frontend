import React from 'react';
export const mockEvents = [{
  id: '1',
  title: 'Summer Music Festival',
  description: 'Join us for three days of amazing music performances featuring top artists from around the world. This outdoor festival will have multiple stages, food vendors, and camping options.',
  category: 'Music',
  date: '2023-07-15',
  time: '12:00 PM',
  endDate: '2023-07-17',
  endTime: '11:00 PM',
  location: 'Central Park, New York',
  price: 149.99,
  capacity: 5000,
  attendees: 3245,
  image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
  likes: 342,
  rating: 4.8,
  host: {
    id: '101',
    name: 'EventPro Productions',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    bio: 'Professional event organizer with 10+ years of experience in music festivals.',
    rating: 4.9,
    eventsHosted: 45
  }
}, {
  id: '2',
  title: 'Tech Conference 2023',
  description: 'A premier tech conference featuring keynote speakers, workshops, and networking opportunities with industry leaders.',
  category: 'Technology',
  date: '2023-09-22',
  time: '9:00 AM',
  endDate: '2023-09-24',
  endTime: '5:00 PM',
  location: 'Convention Center, San Francisco',
  price: 299.99,
  capacity: 2000,
  attendees: 1875,
  image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
  likes: 187,
  rating: 4.7,
  host: {
    id: '102',
    name: 'TechEvents Inc.',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    bio: 'Specialized in organizing technology conferences and workshops since 2010.',
    rating: 4.8,
    eventsHosted: 32
  }
}, {
  id: '3',
  title: 'Cooking Masterclass',
  description: 'Learn to cook gourmet meals with our expert chef in this hands-on masterclass. All ingredients and tools provided.',
  category: 'Food & Drink',
  date: '2023-08-05',
  time: '2:00 PM',
  endDate: '2023-08-05',
  endTime: '6:00 PM',
  location: 'Culinary Institute, Chicago',
  price: 89.99,
  capacity: 30,
  attendees: 28,
  image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
  likes: 56,
  rating: 4.9,
  host: {
    id: '103',
    name: 'Chef Maria Rodriguez',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    bio: 'Award-winning chef with 15 years of experience in fine dining restaurants.',
    rating: 5.0,
    eventsHosted: 64
  }
}, {
  id: '4',
  title: 'Yoga Retreat Weekend',
  description: 'Escape the city for a weekend of yoga, meditation, and relaxation in a beautiful natural setting.',
  category: 'Wellness',
  date: '2023-10-13',
  time: '4:00 PM',
  endDate: '2023-10-15',
  endTime: '2:00 PM',
  location: 'Mountain View Resort, Colorado',
  price: 399.99,
  capacity: 50,
  attendees: 42,
  image: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
  likes: 128,
  rating: 4.9,
  host: {
    id: '104',
    name: 'Serene Wellness Co.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=761&q=80',
    bio: 'Wellness retreat organizers specializing in yoga and mindfulness experiences.',
    rating: 4.8,
    eventsHosted: 28
  }
}, {
  id: '5',
  title: 'Business Networking Mixer',
  description: 'Expand your professional network at this evening mixer with entrepreneurs and executives from various industries.',
  category: 'Business',
  date: '2023-08-18',
  time: '6:30 PM',
  endDate: '2023-08-18',
  endTime: '9:30 PM',
  location: 'Grand Hotel, Boston',
  price: 25.0,
  capacity: 150,
  attendees: 132,
  image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1198&q=80',
  likes: 45,
  rating: 4.6,
  host: {
    id: '105',
    name: 'Business Connect',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    bio: 'Professional networking organization dedicated to connecting business leaders.',
    rating: 4.7,
    eventsHosted: 87
  }
}, {
  id: '6',
  title: 'Art Exhibition Opening Night',
  description: 'Be among the first to experience this stunning new art exhibition featuring works from emerging local artists.',
  category: 'Art',
  date: '2023-09-08',
  time: '7:00 PM',
  endDate: '2023-09-08',
  endTime: '10:00 PM',
  location: 'Modern Art Gallery, Los Angeles',
  price: 15.0,
  capacity: 200,
  attendees: 178,
  image: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
  likes: 89,
  rating: 4.8,
  host: {
    id: '106',
    name: 'LA Art Collective',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80',
    bio: 'Non-profit organization supporting local artists through exhibitions and events.',
    rating: 4.9,
    eventsHosted: 23
  }
}, {
  id: '7',
  title: 'Marathon Charity Run',
  description: "Join thousands of runners in this annual charity marathon to raise funds for children's education.",
  category: 'Sports',
  date: '2023-11-05',
  time: '7:00 AM',
  endDate: '2023-11-05',
  endTime: '2:00 PM',
  location: 'Downtown, Seattle',
  price: 50.0,
  capacity: 3000,
  attendees: 2654,
  image: 'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1174&q=80',
  likes: 312,
  rating: 4.7,
  host: {
    id: '107',
    name: 'RunForCause Foundation',
    image: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    bio: 'Charity organization that has raised over $2 million through sporting events.',
    rating: 4.8,
    eventsHosted: 18
  }
}, {
  id: '8',
  title: 'Comedy Night Special',
  description: 'Laugh the night away with performances from top stand-up comedians in this special event.',
  category: 'Entertainment',
  date: '2023-08-25',
  time: '8:00 PM',
  endDate: '2023-08-25',
  endTime: '11:00 PM',
  location: 'Laugh Factory, Austin',
  price: 35.0,
  capacity: 250,
  attendees: 243,
  image: 'https://images.unsplash.com/photo-1527224857830-43a7acc85260?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80',
  likes: 156,
  rating: 4.9,
  host: {
    id: '108',
    name: 'Laugh Out Loud Productions',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    bio: 'Entertainment company bringing the best comedy talent to venues nationwide.',
    rating: 4.8,
    eventsHosted: 52
  }
}];
export const eventCategories = [{
  id: '1',
  name: 'Music',
  icon: '🎵',
  color: 'bg-purple-500'
}, {
  id: '2',
  name: 'Technology',
  icon: '💻',
  color: 'bg-blue-500'
}, {
  id: '3',
  name: 'Food & Drink',
  icon: '🍷',
  color: 'bg-red-500'
}, {
  id: '4',
  name: 'Wellness',
  icon: '🧘',
  color: 'bg-green-500'
}, {
  id: '5',
  name: 'Business',
  icon: '💼',
  color: 'bg-gray-700'
}, {
  id: '6',
  name: 'Art',
  icon: '🎨',
  color: 'bg-yellow-500'
}, {
  id: '7',
  name: 'Sports',
  icon: '⚽',
  color: 'bg-orange-500'
}, {
  id: '8',
  name: 'Entertainment',
  icon: '🎭',
  color: 'bg-pink-500'
}];
export const mockReviews = {
  '1': [{
    id: '101',
    userId: '201',
    userName: 'Sarah Johnson',
    userImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    rating: 5,
    comment: "Absolutely amazing festival! The lineup was incredible and the atmosphere was electric. Can't wait for next year!",
    date: '2023-07-18',
    likes: 24
  }, {
    id: '102',
    userId: '202',
    userName: 'Mike Thompson',
    userImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    rating: 4,
    comment: 'Great music and vibes! Only giving 4 stars because the food options were a bit limited for the price.',
    date: '2023-07-17',
    likes: 8
  }, {
    id: '103',
    userId: '203',
    userName: 'Emily Davis',
    userImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    rating: 5,
    comment: "Best festival I've ever attended! The organization was perfect and all the performances were on time. Will definitely be back!",
    date: '2023-07-16',
    likes: 17
  }],
  '2': [{
    id: '201',
    userId: '204',
    userName: 'David Wilson',
    userImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    rating: 5,
    comment: 'Incredible conference with top-notch speakers. I learned so much and made valuable connections.',
    date: '2023-09-25',
    likes: 12
  }, {
    id: '202',
    userId: '205',
    userName: 'Jennifer Lee',
    userImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80',
    rating: 4,
    comment: 'Great content and networking opportunities. The venue was a bit crowded at times, but overall a valuable experience.',
    date: '2023-09-24',
    likes: 5
  }]
};
export const mockUsers = [{
  id: '1',
  name: 'John Smith',
  email: 'john@example.com',
  password: 'password123',
  profileImage: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
  isHost: true,
  createdAt: '2023-01-15'
}, {
  id: '2',
  name: 'Sarah Johnson',
  email: 'sarah@example.com',
  password: 'password123',
  profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
  isHost: false,
  createdAt: '2023-02-20'
}, {
  id: '3',
  name: 'Michael Chen',
  email: 'michael@example.com',
  password: 'password123',
  profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
  isHost: true,
  createdAt: '2023-03-10'
}];