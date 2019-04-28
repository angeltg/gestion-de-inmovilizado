import { State, Store, Action, StateContext, Selector } from '@ngxs/store';
import { Assignment } from '../dashboard.models';
import { AssignmentsService } from '../services/assignment.service';
import { 
  GetAssignments, 
  GetAssignmentsSuccess, 
  GetAssignmentsFailed, 
  AddAssignment, 
  AddAssignmentsSuccess, 
  AddAssignmentFailed 
} from './assignment.action';
import { tap, catchError } from 'rxjs/operators';


@State<Assignment[]>({
  name: 'assignments',
  defaults: []
})

export class AssignmentState {

  @Selector()
  static getAssignment(state: Assignment[]){
    return Object.values(state);
  }
  constructor(private store: Store, private assignmentService: AssignmentsService){}

  @Action(GetAssignments)
  GetAssignments({ dispatch }: StateContext<Assignment[]>){
    return this.assignmentService.getWallAssignments().pipe(
      tap(assignments => dispatch(new GetAssignmentsSuccess(assignments))),
      
      catchError(error => dispatch(new GetAssignmentsFailed(error.error)))
    )
  }
  
  @Action(GetAssignmentsSuccess)
  GetAssignmentsSuccess(
    { setState }: StateContext<Assignment[]>,
    { assignments }: GetAssignmentsSuccess
  ){
    setState(
      assignments['assignments'].reduce((draft, assignment) => {
        draft[assignment._id] = assignment;
        return draft;
      }, {})
    );
  }

  @Action(AddAssignment)
  AddAssignment({ dispatch }: StateContext<Assignment[]>, { assignmentRequest }: AddAssignment) {
    const currentUser = this.store.selectSnapshot(state => state.auth);

    return this.assignmentService.addAssignment(
      assignmentRequest.idEmployee,
      assignmentRequest.idProduct
      ).pipe(
      tap(assignment =>
        dispatch(
          new AddAssignmentsSuccess({
            ...assignment
          })
        )
      ),
      catchError(error => dispatch(new AddAssignmentFailed(error.error)))
    );
  }

  @Action(AddAssignmentsSuccess)
  addAssignmentSuccess(
    { setState, getState }: StateContext<Assignment[]>,
    { assignment }: AddAssignmentsSuccess
  ) {
    setState([assignment, ...getState()]);
  }

  

  @Action([GetAssignmentsFailed,AddAssignmentFailed])
  errors(ctx: StateContext<Assignment[]>, { errors }: any){
    console.log(errors);
  }

}



