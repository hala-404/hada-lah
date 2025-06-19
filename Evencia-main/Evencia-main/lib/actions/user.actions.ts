'use server'

import { revalidatePath } from 'next/cache'
import { userAPI } from '@/lib/api'
import { handleError } from '@/lib/utils'
import { CreateUserParams, UpdateUserParams } from '@/types'

export async function createUser(user: CreateUserParams) {
  try {
    const newUser = await userAPI.create(user)
    return JSON.parse(JSON.stringify(newUser))
  } catch (error) {
    handleError(error)
  }
}

export async function getUserById(userId: string) {
  try {
    const user = await userAPI.getById(userId)
    if (!user) throw new Error('User not found')
    return JSON.parse(JSON.stringify(user))
  } catch (error) {
    handleError(error)
  }
}

export async function getUserByClerkId(clerkId: string) {
  try {
    const user = await userAPI.getByClerkId(clerkId)
    if (!user) throw new Error('User not found')
    return JSON.parse(JSON.stringify(user))
  } catch (error) {
    handleError(error)
  }
}

export async function updateUser(clerkId: string, user: UpdateUserParams) {
  try {
    // First get user by clerk ID to get the actual user ID
    const existingUser = await userAPI.getByClerkId(clerkId)
    if (!existingUser) throw new Error('User not found')
    
    const updatedUser = await userAPI.update(existingUser.userId, user)
    if (!updatedUser) throw new Error('User update failed')
    return JSON.parse(JSON.stringify(updatedUser))
  } catch (error) {
    handleError(error)
  }
}

export async function deleteUser(clerkId: string) {
  try {
    // First get user by clerk ID to get the actual user ID
    const existingUser = await userAPI.getByClerkId(clerkId)
    if (!existingUser) throw new Error('User not found')
    
    const deletedUser = await userAPI.delete(existingUser.userId)
    revalidatePath('/')
    
    return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null
  } catch (error) {
    handleError(error)
  }
}

