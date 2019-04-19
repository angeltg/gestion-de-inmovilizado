import { Auth } from '../auth/auth.models';


export interface Employee {
	firstName: string;
	secondName: string;
	email: string;
	password: string;
	phone: string;
  roll: string;
  _id: string;
}

export interface ProductCollection{
  [key: string]: ProductResponse;
}

export interface ProductResponse{
  name: string;
  price: number;
  category: string;
  createdAt: number;
  _id: string;
}

export interface Assignment{
  idEmployee: string;
  idProdutc: string;
  description: string;
  createdAt: number;
}