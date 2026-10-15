export type OrderDetails = {
  name: string;
  country: string;
  city: string;
  card: string;
  month: string;
  year: string;
};

export const sampleOrder: OrderDetails = {
  name: 'Nita Test',
  country: 'India',
  city: 'Pune',
  card: '4242424242424242',
  month: '12',
  year: '2028',
};
