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

  public project: Project | undefined;
  private subParam: Subscription | undefined;
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
      this.project = this.projectService.getProject(paramMap.get('id'));
      if (!this.project) // In case directly browser route to this URL.
        this.location.back();


      if (this.project)
        this.projectForm = this.fb.group({
          ...this.project,
          name: [this.project.name],
          type: [this.project.type],
          descrip: [this.project.descrip]
        });
    });
  }
  public isEmptyProject(): boolean {
    return (this.project === undefined);
  }

  public onUpdate(): void
  {
    if (this.projectForm && this.project) {
      console.log(this.projectForm.value);
      const project = this.projectForm.value;

      if (this.project.name !== project.name ||
        this.project.type !== project.type ||
        this.project.descrip !== project.descrip)
        this.projectService.updateProject(project).subscribe(next => this.location.back(),
          error => console.log(error)
        );
    }
  }
}
