'use server'

// Mock data for demonstration when database is not available
const mockEvents = [
  {
    id: '1',
    title: 'Tech Conference 2024',
    description: 'Join us for the biggest tech conference of the year featuring industry leaders and cutting-edge innovations in AI, blockchain, and cloud computing.',
    imageUrl: '/assets/images/hero.png',
    startDateTime: new Date('2024-07-15T09:00:00'),
    endDateTime: new Date('2024-07-15T17:00:00'),
    price: '99.00',
    isFree: false,
    category: { name: 'Technology' },
    venue: { name: 'Convention Center', address: '123 Main St, City' }
  },
  {
    id: '2',
    title: 'Music Festival Summer',
    description: 'Experience amazing live music from top artists in a beautiful outdoor setting. Food trucks, art installations, and family-friendly activities.',
    imageUrl: '/assets/images/hero.png',
    startDateTime: new Date('2024-08-20T18:00:00'),
    endDateTime: new Date('2024-08-20T23:00:00'),
    price: '0.00',
    isFree: true,
    category: { name: 'Music' },
    venue: { name: 'Central Park', address: 'Central Park, City' }
  },
  {
    id: '3',
    title: 'Sports Championship',
    description: 'Watch the most exciting sports championship with top athletes competing for the title. Professional commentary and live streaming available.',
    imageUrl: '/assets/images/hero.png',
    startDateTime: new Date('2024-09-10T14:00:00'),
    endDateTime: new Date('2024-09-10T18:00:00'),
    price: '45.00',
    isFree: false,
    category: { name: 'Sports' },
    venue: { name: 'Sports Arena', address: '456 Sports Ave, City' }
  },
  {
    id: '4',
    title: 'Business Networking Event',
    description: 'Connect with industry professionals, entrepreneurs, and investors. Includes keynote speeches, panel discussions, and networking sessions.',
    imageUrl: '/assets/images/hero.png',
    startDateTime: new Date('2024-10-05T19:00:00'),
    endDateTime: new Date('2024-10-05T22:00:00'),
    price: '25.00',
    isFree: false,
    category: { name: 'Business' },
    venue: { name: 'Business Center', address: '789 Business Blvd, City' }
  },
  {
    id: '5',
    title: 'Educational Workshop',
    description: 'Learn new skills in our comprehensive workshop series. Expert instructors, hands-on activities, and certification available.',
    imageUrl: '/assets/images/hero.png',
    startDateTime: new Date('2024-11-12T10:00:00'),
    endDateTime: new Date('2024-11-12T16:00:00'),
    price: '0.00',
    isFree: true,
    category: { name: 'Education' },
    venue: { name: 'Learning Center', address: '321 Education St, City' }
  }
]

const mockCategories = [
  { id: '1', name: 'Technology' },
  { id: '2', name: 'Music' },
  { id: '3', name: 'Sports' },
  { id: '4', name: 'Business' },
  { id: '5', name: 'Education' },
  { id: '6', name: 'Health' },
  { id: '7', name: 'Arts' },
  { id: '8', name: 'Food' }
]

const mockVenues = [
  { id: '1', name: 'Convention Center', address: '123 Main St, City', capacity: 500, description: 'Large convention center with modern facilities' },
  { id: '2', name: 'Central Park', address: 'Central Park, City', capacity: 1000, description: 'Beautiful outdoor venue' },
  { id: '3', name: 'Sports Arena', address: '456 Sports Ave, City', capacity: 2000, description: 'Professional sports facility' },
  { id: '4', name: 'Business Center', address: '789 Business Blvd, City', capacity: 200, description: 'Modern business conference facility' },
  { id: '5', name: 'Learning Center', address: '321 Education St, City', capacity: 100, description: 'Educational workshop space' }
]

const mockUsers = [
  { userId: 1, name: 'John Doe', email: 'john@example.com', role: 'admin', username: 'johndoe' },
  { userId: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'user', username: 'janesmith' },
  { userId: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'user', username: 'bobjohnson' }
]

// Check if we're in demo mode
const isDemoMode = process.env.DEMO_MODE === 'true' || !process.env.NEON_DATABASE_URL

export async function getAllEvents() {
  if (isDemoMode) {
    return mockEvents
  }
  
  // Original database code would go here
  try {
    // Database operations...
    return mockEvents // Fallback to mock data
  } catch (error) {
    console.error('Database error, using mock data:', error)
    return mockEvents
  }
}

export async function getEventById(eventId: string) {
  if (isDemoMode) {
    return mockEvents.find(event => event.id === eventId) || null
  }
  
  try {
    // Database operations...
    return mockEvents.find(event => event.id === eventId) || null
  } catch (error) {
    console.error('Database error, using mock data:', error)
    return mockEvents.find(event => event.id === eventId) || null
  }
}

export async function createEvent(eventData: any) {
  if (isDemoMode) {
    const newEvent = {
      id: (mockEvents.length + 1).toString(),
      title: eventData.title,
      description: eventData.description,
      imageUrl: eventData.imageUrl || '/assets/images/hero.png',
      startDateTime: eventData.startDateTime,
      endDateTime: eventData.endDateTime,
      price: eventData.price || '0.00',
      isFree: eventData.isFree,
      category: { name: mockCategories.find(c => c.id === eventData.categoryId)?.name || 'General' },
      venue: { name: mockVenues.find(v => v.id === eventData.venueId)?.name || 'TBD', address: 'TBD' }
    }
    mockEvents.push(newEvent)
    return { success: true, event: newEvent }
  }
  
  try {
    // Database operations...
    return { success: true, event: eventData }
  } catch (error) {
    console.error('Database error:', error)
    return { success: false, error: 'Failed to create event' }
  }
}

export async function updateEvent(eventId: string, eventData: any) {
  if (isDemoMode) {
    const index = mockEvents.findIndex(event => event.id === eventId)
    if (index !== -1) {
      mockEvents[index] = { ...mockEvents[index], ...eventData }
      return { success: true, event: mockEvents[index] }
    }
    return { success: false, error: 'Event not found' }
  }
  
  try {
    // Database operations...
    return { success: true, event: eventData }
  } catch (error) {
    console.error('Database error:', error)
    return { success: false, error: 'Failed to update event' }
  }
}

export async function deleteEvent(eventId: string) {
  if (isDemoMode) {
    const index = mockEvents.findIndex(event => event.id === eventId)
    if (index !== -1) {
      mockEvents.splice(index, 1)
      return { success: true }
    }
    return { success: false, error: 'Event not found' }
  }
  
  try {
    // Database operations...
    return { success: true }
  } catch (error) {
    console.error('Database error:', error)
    return { success: false, error: 'Failed to delete event' }
  }
}

export async function getAllCategories() {
  return mockCategories
}

export async function createCategory(name: string, description?: string) {
  const newCategory = {
    id: (mockCategories.length + 1).toString(),
    name: name
  }
  mockCategories.push(newCategory)
  return { success: true, category: newCategory }
}

export async function getAllVenues() {
  return mockVenues
}

export async function createVenue(venueData: any) {
  const newVenue = {
    id: (mockVenues.length + 1).toString(),
    name: venueData.name,
    address: venueData.address,
    capacity: parseInt(venueData.capacity),
    description: venueData.description
  }
  mockVenues.push(newVenue)
  return { success: true, venue: newVenue }
}

export async function searchEvents(query: string, category?: string) {
  let results = mockEvents
  
  if (query) {
    results = results.filter(event => 
      event.title.toLowerCase().includes(query.toLowerCase()) ||
      event.description.toLowerCase().includes(query.toLowerCase())
    )
  }
  
  if (category && category !== 'All') {
    results = results.filter(event => event.category.name === category)
  }
  
  return results
}

