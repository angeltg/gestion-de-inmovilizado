import { Employee, EmployeeRequest } from '../dashboard.models';
import { Error } from 'src/app/error/error.models';

export class GetEmployees{
  static readonly type= '[Dashboard] GetEmployees';
}

export class GetEmployeesSuccess {
  static readonly type= '[Dashboard] GetEmployeesSuccess';
  constructor (public employees: Employee[]) {}
}

export class GetEmployeesFailed{
  static readonly type = '[Dashboard] GetEmployeesFailed';
  constructor(public errors: Error[]) {}
}

export class AddEmployee {
  static readonly type = '[Employees] AddEmployee';
  constructor(public employeeRequest: EmployeeRequest) {}
}

export class AddEmployeeSuccess {
  static readonly type = '[Employees] AddEmployeeSuccess';
  constructor(public employee: Employee) {}
}

export class AddEmployeeFailed {
  static readonly type = '[Employees] AddEmployeeFailed';
  constructor(public errors: Error[]) {}
}

export class DelEmployee {
  static readonly type = '[Employees] Del Employee';
  constructor(public employeeId: string) {}
}

export class DelEmployeeSuccess {
  static readonly type = '[Employees] Del Employee Success';
  constructor(public employeeId: string) {}
}

export class DelEmployeeFailed {
  static readonly type = '[Employee] Del Employee Failed';
  constructor(public errors: Error[]) {}
}

