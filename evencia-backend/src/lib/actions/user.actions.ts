'use server'

const mockUsers = [
  { userId: 1, name: 'John Doe', email: 'john@example.com', role: 'admin', username: 'johndoe', phone: '+1234567890' },
  { userId: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'user', username: 'janesmith', phone: '+1234567891' },
  { userId: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'user', username: 'bobjohnson', phone: '+1234567892' },
  { userId: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'user', username: 'alicebrown', phone: '+1234567893' },
  { userId: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'user', username: 'charliewilson', phone: '+1234567894' }
]

const isDemoMode = process.env.DEMO_MODE === 'true' || !process.env.NEON_DATABASE_URL

export async function createUser(userData: any) {
  if (isDemoMode) {
    const newUser = {
      userId: mockUsers.length + 1,
      username: userData.username,
      name: userData.firstName + ' ' + userData.lastName,
      email: userData.email,
      role: 'user',
      phone: userData.phone || '',
    }
    mockUsers.push(newUser)
    return { success: true, user: newUser }
  }
  
  try {
    // Database operations...
    return { success: true, user: userData }
  } catch (error) {
    console.error('Database error:', error)
    return { success: false, error: 'Failed to create user' }
  }
}

export async function getUserById(userId: string) {
  if (isDemoMode) {
    return mockUsers.find(user => user.userId.toString() === userId) || null
  }
  
  try {
    // Database operations...
    return mockUsers.find(user => user.userId.toString() === userId) || null
  } catch (error) {
    console.error('Database error:', error)
    return null
  }
}

export async function updateUser(userId: string, userData: any) {
  if (isDemoMode) {
    const index = mockUsers.findIndex(user => user.userId.toString() === userId)
    if (index !== -1) {
      mockUsers[index] = { ...mockUsers[index], ...userData }
      return { success: true, user: mockUsers[index] }
    }
    return { success: false, error: 'User not found' }
  }
  
  try {
    // Database operations...
    return { success: true, user: userData }
  } catch (error) {
    console.error('Database error:', error)
    return { success: false, error: 'Failed to update user' }
  }
}

export async function getAllUsers() {
  return mockUsers
}

