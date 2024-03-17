import { Time } from "@angular/common";

export interface signUp {
  name: string;
  email: string;
  password: string;
}

export interface login {
  email: String;
  password: String;
}
export interface product {
  name: string,
  price: number,
  category: string,
  color: string,
  image: string,
  description: string,
  id: number,
  quantity: undefined | number,
  productId: undefined | number
}

export interface category {
  name: string,
  id: number,
}

export interface cart {
  name: string,
  price: number,
  category: string,
  color: string,
  image: string,
  description: string,
  id: number | undefined,
  quantity: undefined | number,
  productId: number,
  userId: number
}

export interface priceSummary {
  price: number,
  discount: number,
  tax: number,
  delivery: number,
  total: number,
  discountFromVoucher: number
}

export interface orderItem {
  name: string;
  price: number;
  quantity: number;
  image: string;
}
export interface order {
  email: string;
  address: string;
  contact: string;
  totalPrice: number;
  userId: string;
  id: number;
  status: string;
  items: orderItem[];
  user?: any;
  paymentMethod: string; 
}

export interface voucher {
  code: string;
  discountType: string;
  discountValue: number;
  validUntil: Date;
  description: string;
  maxUses: number;
  id: string;
}

