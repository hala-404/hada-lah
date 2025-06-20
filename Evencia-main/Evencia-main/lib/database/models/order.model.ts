export interface IOrder {
  orderId: number;
  createdAt: string;
  stripeId: string;
  totalAmount: string;
  event: {
    eventId: number;
    title: string;
  };
  buyer: {
    userId: number;
    firstName: string;
    lastName: string;
  };
}

// Optionally, if you use a simplified order item elsewhere:
export type IOrderItem = {
  orderId: number;
  totalAmount: string;
  createdAt: string;
  eventTitle: string;
  eventId: number;
  buyer: string;
};