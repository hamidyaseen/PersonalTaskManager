import { StateType } from '../models/stateType';

export class TaskStateType {
  static States: StateType[] = [
    { id: 1, name: 'Created' },
    { id: 2, name: 'Assigned' },
    { id: 3, name: 'InProgress' },
    { id: 4, name: 'Pending' },
    { id: 5, name: 'Completed' }
  ];
}
