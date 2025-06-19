'use server'

import { revalidatePath } from 'next/cache'
import { eventAPI } from '@/lib/api'
import { handleError } from '@/lib/utils'

import {
  CreateEventParams,
  UpdateEventParams,
  DeleteEventParams,
  GetAllEventsParams,
  GetEventsByUserParams,
  GetRelatedEventsByCategoryParams,
} from '@/types'

// CREATE
export async function createEvent({ userId, event, path }: CreateEventParams) {
  try {
    const eventData = {
      ...event,
      createdBy: parseInt(userId),
      categoryId: parseInt(event.categoryId),
    }
    
    const newEvent = await eventAPI.create(eventData)
    revalidatePath(path)

    return JSON.parse(JSON.stringify(newEvent))
  } catch (error) {
    handleError(error)
  }
}

// GET ONE EVENT BY ID
export async function getEventById(eventId: string) {
  try {
    const event = await eventAPI.getById(eventId)
    if (!event) throw new Error('Event not found')
    return JSON.parse(JSON.stringify(event))
  } catch (error) {
    handleError(error)
  }
}

// UPDATE
export async function updateEvent({ userId, event, path }: UpdateEventParams) {
  try {
    const eventData = {
      ...event,
      categoryId: parseInt(event.categoryId),
    }
    
    const updatedEvent = await eventAPI.update(event._id, eventData)
    revalidatePath(path)

    return JSON.parse(JSON.stringify(updatedEvent))
  } catch (error) {
    handleError(error)
  }
}

// DELETE
export async function deleteEvent({ eventId, path }: DeleteEventParams) {
  try {
    await eventAPI.delete(eventId)
    revalidatePath(path)
  } catch (error) {
    handleError(error)
  }
}

// GET ALL EVENTS
export async function getAllEvents({ query, limit = 6, page, category }: GetAllEventsParams) {
  try {
    const events = await eventAPI.getAll({
      query,
      category,
      limit,
      page,
    })

    return events
  } catch (error) {
    handleError(error)
  }
}

// GET EVENTS BY ORGANIZER
export async function getEventsByUser({ userId, limit = 6, page }: GetEventsByUserParams) {
  try {
    // For now, we'll use the general getAll endpoint with a filter
    // This would need to be implemented in the backend
    const events = await eventAPI.getAll({
      limit,
      page,
    })

    // Filter by user on the frontend for now
    const filteredEvents = events.data.filter((event: any) => event.createdBy === parseInt(userId))
    
    return { 
      data: JSON.parse(JSON.stringify(filteredEvents)), 
      totalPages: Math.ceil(filteredEvents.length / limit) 
    }
  } catch (error) {
    handleError(error)
  }
}

// GET RELATED EVENTS: EVENTS WITH SAME CATEGORY
export async function getRelatedEventsByCategory({
  categoryId,
  eventId,
  limit = 3,
  page = 1,
}: GetRelatedEventsByCategoryParams) {
  try {
    const events = await eventAPI.getAll({
      limit,
      page,
    })

    // Filter by category and exclude current event on the frontend for now
    const filteredEvents = events.data.filter((event: any) => 
      event.categoryId === parseInt(categoryId) && event.eventId !== parseInt(eventId)
    )
    
    return { 
      data: JSON.parse(JSON.stringify(filteredEvents)), 
      totalPages: Math.ceil(filteredEvents.length / limit) 
    }
  } catch (error) {
    handleError(error)
  }
}

