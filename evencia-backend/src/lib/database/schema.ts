import { pgTable, bigint, text, integer, decimal, date, time, timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Users table
export const users = pgTable('users', {
  userId: bigint('user_id', { mode: 'number' }).primaryKey().notNull(),
  clerkId: text('clerk_id').notNull().unique(),
  email: text('email').notNull().unique(),
  username: text('username').notNull().unique(),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  photo: text('photo').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

// Event categories table
export const eventCategories = pgTable('event_categories', {
  categoryId: bigint('category_id', { mode: 'number' }).primaryKey().notNull(),
  name: text('name').notNull().unique(),
  createdAt: timestamp('created_at').defaultNow(),
});

// Venues table (from source_code, keeping as is for now)
export const venues = pgTable('venues', {
  venueId: bigint('venue_id', { mode: 'number' }).primaryKey().notNull(),
  name: text('name').notNull(),
  address: text('address').notNull(),
  latitude: text('latitude'),
  longitude: text('longitude'),
  capacity: integer('capacity').notNull(),
  description: text('description'),
  amenities: text('amenities'),
  contactInfo: text('contact_info'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Events table
export const events = pgTable('events', {
  eventId: bigint('event_id', { mode: 'number' }).primaryKey().notNull(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  categoryId: bigint('category_id', { mode: 'number' }).references(() => eventCategories.categoryId).notNull(),
  createdBy: bigint('created_by', { mode: 'number' }).references(() => users.userId).notNull(),
  imageUrl: text('image_url'),
  status: text('status').notNull().default('active'),
  price: decimal('price', { precision: 10, scale: 2 }).default('0.00'),
  isFree: text('is_free').notNull().default('true'),
  url: text('url'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Schedules table
export const schedules = pgTable('schedules', {
  scheduleId: bigint('schedule_id', { mode: 'number' }).primaryKey().notNull(),
  eventId: bigint('event_id', { mode: 'number' }).references(() => events.eventId).notNull(),
  venueId: bigint('venue_id', { mode: 'number' }).references(() => venues.venueId).notNull(),
  date: date('date').notNull(),
  startTime: time('start_time').notNull(),
  endTime: time('end_time').notNull(),
  availableSeats: integer('available_seats').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

// Registrations table
export const registrations = pgTable('registrations', {
  registrationId: bigint('registration_id', { mode: 'number' }).primaryKey().notNull(),
  userId: bigint('user_id', { mode: 'number' }).references(() => users.userId).notNull(),
  scheduleId: bigint('schedule_id', { mode: 'number' }).references(() => schedules.scheduleId).notNull(),
  registrationDate: timestamp('registration_date').defaultNow(),
  numberOfSeats: integer('number_of_seats').notNull().default(1),
  status: text('status').notNull().default('confirmed'),
  totalAmount: decimal('total_amount', { precision: 10, scale: 2 }).default('0.00'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Payments table
export const payments = pgTable('payments', {
  paymentId: bigint('payment_id', { mode: 'number' }).primaryKey().notNull(),
  registrationId: bigint('registration_id', { mode: 'number' }).references(() => registrations.registrationId).notNull(),
  amount: decimal('amount', { precision: 10, scale: 2 }).notNull(),
  paymentMethod: text('payment_method').notNull(),
  paymentStatus: text('payment_status').notNull().default('pending'),
  paymentDate: timestamp('payment_date').defaultNow(),
  stripePaymentId: text('stripe_payment_id'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Feedback table
export const feedback = pgTable('feedback', {
  feedbackId: bigint('feedback_id', { mode: 'number' }).primaryKey().notNull(),
  userId: bigint('user_id', { mode: 'number' }).references(() => users.userId).notNull(),
  eventId: bigint('event_id', { mode: 'number' }).references(() => events.eventId).notNull(),
  rating: integer('rating').notNull(),
  comment: text('comment'),
  feedbackDate: timestamp('feedback_date').defaultNow(),
  createdAt: timestamp('created_at').defaultNow(),
});

// Favorites table
export const favorites = pgTable('favorites', {
  favoriteId: bigint('favorite_id', { mode: 'number' }).primaryKey().notNull(),
  userId: bigint('user_id', { mode: 'number' }).references(() => users.userId).notNull(),
  eventId: bigint('event_id', { mode: 'number' }).references(() => events.eventId).notNull(),
  addedDate: timestamp('added_date').defaultNow(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  events: many(events),
  registrations: many(registrations),
  feedback: many(feedback),
  favorites: many(favorites),
}));

export const eventCategoriesRelations = relations(eventCategories, ({ many }) => ({
  events: many(events),
}));

export const venuesRelations = relations(venues, ({ many }) => ({
  schedules: many(schedules),
}));

export const eventsRelations = relations(events, ({ one, many }) => ({
  category: one(eventCategories, {
    fields: [events.categoryId],
    references: [eventCategories.categoryId],
  }),
  creator: one(users, {
    fields: [events.createdBy],
    references: [users.userId],
  }),
  schedules: many(schedules),
  feedback: many(feedback),
  favorites: many(favorites),
}));

export const schedulesRelations = relations(schedules, ({ one, many }) => ({
  event: one(events, {
    fields: [schedules.eventId],
    references: [events.eventId],
  }),
  venue: one(venues, {
    fields: [schedules.venueId],
    references: [venues.venueId],
  }),
  registrations: many(registrations),
}));

export const registrationsRelations = relations(registrations, ({ one, many }) => ({
  user: one(users, {
    fields: [registrations.userId],
    references: [users.userId],
  }),
  schedule: one(schedules, {
    fields: [registrations.scheduleId],
    references: [schedules.scheduleId],
  }),
  payments: many(payments),
}));

export const paymentsRelations = relations(payments, ({ one }) => ({
  registration: one(registrations, {
    fields: [payments.registrationId],
    references: [registrations.registrationId],
  }),
}));

export const feedbackRelations = relations(feedback, ({ one }) => ({
  user: one(users, {
    fields: [feedback.userId],
    references: [users.userId],
  }),
  event: one(events, {
    fields: [feedback.eventId],
    references: [events.eventId],
  }),
}));

export const favoritesRelations = relations(favorites, ({ one }) => ({
  user: one(users, {
    fields: [favorites.userId],
    references: [users.userId],
  }),
  event: one(events, {
    fields: [favorites.eventId],
    references: [events.eventId],
  }),
}));


