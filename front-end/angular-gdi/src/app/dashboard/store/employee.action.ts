import { EmployeeResponse } from '../dashboard.models';
import { Error } from 'src/app/error/error.models';

export class GetEmployees{
  static readonly type= '[Dashboard] GetEmployees';
}

export class GetEmployeesSuccess {
  static readonly type= '[Dashboard] GetEmployeesSuccess';
  constructor (public employees: EmployeeResponse[]) {}
}

export class GetEmployeesFailed{
  static readonly type = '[Dashboard] GetEmployeesFailed';
  constructor(public errors: Error[]) {}
}