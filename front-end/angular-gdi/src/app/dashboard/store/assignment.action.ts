import { Assignment, AssignmentRequest } from '../dashboard.models';
import { Error } from 'src/app/error/error.models';

export class GetAssignments{
  static readonly type= '[Dashboard] GetAssignments';
}

export class GetAssignmentsSuccess {
  static readonly type= '[Dashboard] GetAssignmentsSuccess';
  constructor (public assignments: Assignment[]) {}
}

export class GetAssignmentsFailed{
  static readonly type = '[Dashboard] GetAssignmentsFailed';
  constructor(public errors: Error[]) {}
}

export class AddAssignment {
  static readonly type = '[Assignments] AddAssignment';
  constructor(public assignmentRequest: AssignmentRequest) {}
}

export class AddAssignmentsSuccess {
  static readonly type = '[Assignments] AddAssignmentSuccess';
  constructor(public assignment: Assignment) {}
}

export class AddAssignmentFailed {
  static readonly type = '[Assignments] AddAssignmentFailed';
  constructor(public errors: Error[]) {}
}