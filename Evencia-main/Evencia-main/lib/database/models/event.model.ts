export interface IEvent {
  eventId: number;
  title: string;
  description?: string;
  location?: string;
  createdAt: string;
  imageUrl: string;
  startDateTime: string;
  endDateTime: string;
  price: string;
  isFree: boolean;
  url?: string;
  category: {
    categoryId: number;
    name: string;
  };
  organizer: {
    userId: number;
    firstName: string;
    lastName: string;
  };
}