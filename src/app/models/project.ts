export interface Project {
  id: number;
  name: string;
  type: string;
  //estimateWeeks: number;
  descrip: string;
  dueTasksCount?: number;
  dueTasksPercent?: number;
}
