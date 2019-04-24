import { State, Store, Action, StateContext, Selector } from '@ngxs/store';
import { EmployeeCollection } from '../dashboard.models';
import { EmployeesService } from '../services/employees.service';
import { GetEmployees, GetEmployeesSuccess, GetEmployeesFailed } from './employee.action';
import { tap, catchError } from 'rxjs/operators';


@State<EmployeeCollection>({
  name: 'employees',
  defaults: { }
})

export class EmployeeState {

  @Selector()
  static getEmployee(state: EmployeeCollection){
    return Object.values(state);
  }
  constructor(private store: Store, private employeeService: EmployeesService){}

  @Action(GetEmployees)
  GetEmployees({ dispatch }: StateContext<EmployeeCollection>){
    return this.employeeService.getWallEmployees().pipe(
      tap(employees => dispatch(new GetEmployeesSuccess(employees))),
      
      catchError(error => dispatch(new GetEmployeesFailed(error.error)))
    )
  }
  
  @Action(GetEmployeesSuccess)
  GetEmployeesSuccess(
    { setState }: StateContext<EmployeeCollection>,
    { employees }: GetEmployeesSuccess
  ){
    setState(
      employees['employees'].reduce((draft, employee) => {
        draft[employee._id] = employee;
        return draft;
      }, {})
    );
  }

  @Action([GetEmployeesFailed])
  errors(ctx: StateContext<EmployeeCollection>, { errors }: GetEmployeesFailed){
    console.log(errors);
  }

}



