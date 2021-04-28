import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Project } from '../../models/project';
import { ProjectsService } from '../projects.service';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css']
})
export class ProjectEditComponent implements OnInit {

 // public project: Project | undefined;
  private subParam: Subscription | undefined;
  private subProject: Subscription | undefined;
  public projectForm: FormGroup | undefined;

  constructor(private aRoute: ActivatedRoute,
    private projectService: ProjectsService,
    public location: Location,
    private fb: FormBuilder ) {
  }

  ngOnDestroy(): void {
    if (this.subParam) this.subParam.unsubscribe();
  }

  ngOnInit(): void {
    this.subParam = this.aRoute.paramMap.subscribe(paramMap => {

      //this.project = this.projectService.getProject(paramMap.get('id'));
     // if (!this.project) // In case directly browser route to this URL.
     //   this.location.back();         

      this.subProject = this.projectService.project$.subscribe(project =>
        this.projectForm = (project?.id) ? this.fb.group({
          ...project,
          name: [project.name],
          type: [project.type],
          descrip: [project.descrip]
        }) : undefined
        ,
        err => this.projectForm = undefined);

      this.projectService.changeSelectedProject(parseInt(paramMap?.get('id')!));
    });
  }
  //public isEmptyProject(): boolean {
  //  return (this.project === undefined);
  //}

  public onUpdate(): void
  {
      // && this.project
    if (this.projectForm ) {
      console.log(this.projectForm.value);
      const project = this.projectForm.value;
      //if (this.project.name !== project.name ||
      //  this.project.type !== project.type ||
      //  this.project.descrip !== project.descrip)
      if (this.projectForm.valid && this.projectForm.dirty)        
        this.projectService.updateProject(project).subscribe(next => this.location.back(),
          error => console.log(error)
        );
    }
  }
}
