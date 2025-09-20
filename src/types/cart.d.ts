export interface CartItem {
  key: string;
  name: string;
  price: number;
  qty: number;
}

interface Order {
  key: string;
  orderId: string;
  date: string;
  total: number;
  status: string;
}
