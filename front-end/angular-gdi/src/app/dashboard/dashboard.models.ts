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

export interface EmployeeRequest {
  firstName: string;
  secondName: string;
  email: string;
  password: string;
  phone: string;
  roll: string;
}

export interface Product{
  name: string;
  price: number;
  category: string;
  createdAt: number;
  idemployee: string;
  amortiztionAt: string;
  _id: string;
}
export interface ProductRequest {
  name: string;
  price: number;
  category: string;
  description: string;
  serialNumber: string;
  amortizationAt: string;
}

export interface Assignment{
  idEmployee: string;
  idProduct: string;
  description: string;
  createdAt: number;
}

export interface AssignmentRequest{
  idEmployee: string;
  idProduct: string;
}