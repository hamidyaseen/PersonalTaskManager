export interface Task {
  id: number;
  title: string; // just a short name
  description: string;
  stateTypeId: number;
  state?: string;
  createDate: string;
  dueDate: string;
  dueDT?: Date;
  remindDate: string;
  categoryId: number;
  projectId: number;
  project?: string;
}
