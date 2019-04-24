import { State, Store, Action, StateContext, Selector } from '@ngxs/store';
import { Employee } from '../dashboard.models';
import { EmployeesService } from '../services/employees.service';
import { 
  GetEmployees, 
  GetEmployeesSuccess, 
  GetEmployeesFailed, 
  AddEmployee, 
  AddEmployeeFailed, 
  AddEmployeeSuccess 
} from './employee.action';
import { tap, catchError } from 'rxjs/operators';


@State<Employee[]>({
  name: 'employees',
  defaults: []
})

export class EmployeeState {

  @Selector()
  static getEmployee(state: Employee[]){
    return Object.values(state);
  }
  constructor(private store: Store, private employeeService: EmployeesService){}

  @Action(GetEmployees)
  GetEmployees({ dispatch }: StateContext<Employee[]>){
    return this.employeeService.getWallEmployees().pipe(
      tap(employees => dispatch(new GetEmployeesSuccess(employees))),
      
      catchError(error => dispatch(new GetEmployeesFailed(error.error)))
    )
  }
  
  @Action(GetEmployeesSuccess)
  GetEmployeesSuccess(
    { setState }: StateContext<Employee[]>,
    { employees }: GetEmployeesSuccess
  ){
    setState(
      employees['employees'].reduce((draft, employee) => {
        draft[employee._id] = employee;
        return draft;
      }, {})
    );
  }

  @Action(AddEmployee)
  addEmployee({ dispatch }: StateContext<Employee[]>, { employeeRequest }: AddEmployee) {
    const currentUser = this.store.selectSnapshot(state => state.auth);

    return this.employeeService.addEmployee(
      employeeRequest.email,
      employeeRequest.firstName,
      employeeRequest.password,
      employeeRequest.phone,
      employeeRequest.roll,
      employeeRequest.secondName 
      ).pipe(
      tap(employee =>
        dispatch(
          new AddEmployeeSuccess({
            ...employee
          })
        )
      ),
      catchError(error => dispatch(new AddEmployeeFailed(error.error)))
    );
  }

  @Action(AddEmployeeSuccess)
  addEmployeeSuccess(
    { setState, getState }: StateContext<Employee[]>,
    { employee }: AddEmployeeSuccess
  ) {
    setState([employee, ...getState()]);
  }

  

  @Action([GetEmployeesFailed,AddEmployeeFailed])
  errors(ctx: StateContext<Employee[]>, { errors }: any){
    console.log(errors);
  }

}



