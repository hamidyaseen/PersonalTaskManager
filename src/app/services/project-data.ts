import { Project } from '../models/project';

export class ProjectsData {
  static Projects: Project[] = [
    { id: 1, name: "Contoso Website", type: "website", descrip: 'Company personal website' },
    { id: 2, name: "Contoso Android App", type: "mobileApplication", descrip: 'Company Android application' },
    { id: 3, name: "Contoso IOS Applicaiton", type: "mobileApplicaton", descrip: 'Company IOS Application' }
  ];

}
