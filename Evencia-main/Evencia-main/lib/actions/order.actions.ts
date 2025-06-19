"use server"

import Stripe from 'stripe';
import { CheckoutOrderParams, CreateOrderParams, GetOrdersByEventParams, GetOrdersByUserParams } from "@/types"
import { redirect } from 'next/navigation';
import { handleError } from '../utils';
import { connectToDatabase } from '../database';
import { registrations, events, users } from '../database/schema';
import { eq, and, ilike, desc, count } from 'drizzle-orm';

export const checkoutOrder = async (order: CheckoutOrderParams) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  const price = order.isFree ? 0 : Number(order.price) * 100;

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'usd',
            unit_amount: price,
            product_data: {
              name: order.eventTitle
            }
          },
          quantity: 1
        },
      ],
      metadata: {
        eventId: order.eventId,
        buyerId: order.buyerId,
      },
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/profile`,
      cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/`,
    });

    redirect(session.url!)
  } catch (error) {
    throw error;
  }
}

export const createOrder = async (order: CreateOrderParams) => {
  try {
    const db = await connectToDatabase();
    
    const [newOrder] = await db.insert(registrations).values({
      userId: parseInt(order.buyerId),
      scheduleId: parseInt(order.eventId), // Note: This might need adjustment based on your schedule implementation
      totalAmount: order.totalAmount,
      status: 'confirmed',
    }).returning();

    return JSON.parse(JSON.stringify(newOrder));
  } catch (error) {
    handleError(error);
  }
}

// GET ORDERS BY EVENT
export async function getOrdersByEvent({ searchString, eventId }: GetOrdersByEventParams) {
  try {
    const db = await connectToDatabase()

    if (!eventId) throw new Error('Event ID is required')

    const orders = await db.select({
      registrationId: registrations.registrationId,
      totalAmount: registrations.totalAmount,
      createdAt: registrations.createdAt,
      eventTitle: events.title,
      eventId: events.eventId,
      buyer: users.firstName,
      buyerLastName: users.lastName,
    })
    .from(registrations)
    .leftJoin(users, eq(registrations.userId, users.userId))
    .leftJoin(events, eq(registrations.scheduleId, events.eventId)) // This might need adjustment
    .where(and(
      eq(events.eventId, parseInt(eventId)),
      searchString ? ilike(users.firstName, `%${searchString}%`) : undefined
    ))

    return JSON.parse(JSON.stringify(orders))
  } catch (error) {
    handleError(error)
  }
}

// GET ORDERS BY USER
export async function getOrdersByUser({ userId, limit = 3, page }: GetOrdersByUserParams) {
  try {
    const db = await connectToDatabase()

    const skipAmount = (Number(page) - 1) * limit

    const orders = await db.select({
      registrationId: registrations.registrationId,
      totalAmount: registrations.totalAmount,
      createdAt: registrations.createdAt,
      eventId: events.eventId,
      eventTitle: events.title,
      eventDescription: events.description,
      eventImageUrl: events.imageUrl,
      organizerFirstName: users.firstName,
      organizerLastName: users.lastName,
    })
    .from(registrations)
    .leftJoin(events, eq(registrations.scheduleId, events.eventId)) // This might need adjustment
    .leftJoin(users, eq(events.createdBy, users.userId))
    .where(eq(registrations.userId, parseInt(userId)))
    .orderBy(desc(registrations.createdAt))
    .offset(skipAmount)
    .limit(limit)

    const [ordersCount] = await db.select({ count: count() })
      .from(registrations)
      .where(eq(registrations.userId, parseInt(userId)))

    return { 
      data: JSON.parse(JSON.stringify(orders)), 
      totalPages: Math.ceil(ordersCount.count / limit) 
    }
  } catch (error) {
    handleError(error)
  }
}

