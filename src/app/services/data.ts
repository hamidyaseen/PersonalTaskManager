import { StateType } from '../models/stateType';
import { Task } from "../models/task";

export const tasks_data: Task[] = [
  {
    id: 1,
    title: 'Planing Task',
    description: 'Project Planing',
    stateTypeId: 1,
    createDate: '2021-04-16T14:24:40.840Z',
    remindDate: '2021-04-21T14:24:40.840Z',
    dueDate: '2021-04-23T14:24:40.840Z',
    categoryId: 3,
    projectId: 1
  } as Task,
  {
    id: 2,
    title: 'Defining Task',
    description: 'Define Project scope',
    stateTypeId: 1,
    createDate: '2021-04-16T14:24:40.840Z',
    remindDate: '2021-04-24T14:24:40.840Z',
    dueDate: '2021-04-26T14:24:40.840Z',
    categoryId: 4,
    projectId: 2
  } as Task,
  {
    id: 3,
    title: 'Design Elloboration Task',
    description: 'Design description',
    stateTypeId: 1,
    createDate: '2021-04-16T14:24:40.840Z',
    remindDate: '2021-04-25T14:24:40.840Z',
    dueDate: '2021-04-27T14:24:40.840Z',
    categoryId: 4,
    projectId: 3
  } as Task,
  {
    id: 11,
    title: 'Identitify Task',
    description: 'Identify resources to be monitored',
    stateTypeId: 1,
    createDate: '2021-04-19T14:24:40.840Z',
    remindDate: '2021-04-21T14:24:40.840Z',
    dueDate: '2021-04-23T14:24:40.840Z',
    categoryId: 4,
    projectId: 2
  } as Task,
  {
    id: 12,
    title: 'Identitify Task',
    description: 'Identify event sources by resource type',
    stateTypeId: 1,
    createDate: '2021-04-19T14:24:40.840Z',
    remindDate: '2021-04-23T14:24:40.840Z',
    dueDate: '2021-04-26T14:24:40.840Z',
    categoryId: 4,
    projectId: 2
  } as Task,
  {
    id: 12,
    title: 'Identitify Task',
    description: 'Define the relationship between resources and business systems',
    stateTypeId: 1,
    createDate: '2021-04-19T14:24:40.840Z',
    remindDate: '2021-04-23T14:24:40.840Z',
    dueDate: '2021-04-26T14:24:40.840Z',
    categoryId: 4,
    projectId: 2
  } as Task,
  {
    id: 23,
    title: 'Define and Elloboration',
    description: 'Define users and workflow',
    stateTypeId: 1,
    createDate: '2021-04-16T14:24:40.840Z',
    remindDate: '2021-04-25T14:24:40.840Z',
    dueDate: '2021-04-27T14:24:40.840Z',
    categoryId: 4,
    projectId: 3
  } as Task,
  {
    id: 16,
    title: 'Define and Elloboration',
    description: 'Define the server configuration',
    stateTypeId: 1,
    createDate: '2021-04-16T14:24:40.840Z',
    remindDate: '2021-04-25T14:24:40.840Z',
    dueDate: '2021-04-27T14:24:40.840Z',
    categoryId: 4,
    projectId: 3
  } as Task,
  {
    id: 4,
    title: 'Implementation Decision',
    description: 'Selecting a Front platform',
    stateTypeId: 1,
    createDate: '2021-04-17T14:24:40.840Z',
    remindDate: '2021-04-24T14:24:40.840Z',
    dueDate: '2021-04-26T14:24:40.840Z',
    categoryId: 4,
    projectId: 1
  } as Task,
  {
    id: 5,
    title: 'Task 5',
    description: 'Initial Testing',
    stateTypeId: 1,
    createDate: '2021-04-18T14:24:40.840Z',
    remindDate: '2021-04-28T14:24:40.840Z',
    dueDate: '2021-04-30T14:24:40.840Z',
    categoryId: 4,
    projectId: 1
  } as Task,
  {
    id: 6,
    title: 'Implementation Decision',
    description: 'Identify tasks and URLs by resource type',
    stateTypeId: 1,
    createDate: '2021-04-17T14:24:40.840Z',
    remindDate: '2021-04-24T14:24:40.840Z',
    dueDate: '2021-04-26T14:24:40.840Z',
    categoryId: 4,
    projectId: 1
  } as Task,
];

export const task_states: StateType[] = [
  { id: 1, name: 'Created' } as StateType,
  { id: 2, name: 'Assigned' } as StateType,
  { id: 3, name: 'InProgress' } as StateType,
  { id: 4, name: 'Pending' } as StateType,
  { id: 5, name: 'Completed' } as StateType
];

export const projects_data = [
  { id: 1, name: "Contoso Website", type: "website", descrip: 'Company personal website' },
  { id: 2, name: "Contoso Android App", type: "mobileApplication", descrip: 'Company Android application' },
  { id: 3, name: "Contoso IOS Applicaiton", type: "mobileApplicaton", descrip: 'Company IOS Application' }
];
