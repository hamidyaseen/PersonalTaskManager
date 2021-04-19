import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Project } from '../../models/project';
import { ProjectsService } from '../projects.service';

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.css']
})
export class ProjectCreateComponent implements OnInit {

  constructor(private gb: FormBuilder, public location: Location, private projectsService: ProjectsService) { }

  // public aProjectForm = new FormGroup({});
  public projectForm = this.gb.group({
    name: ['', Validators.required],
    type: [''],
    descrip: ['']
  });

  ngOnInit(): void {
  }

  onSubmit(): void {
    const p = {
      ...this.projectForm.value, name: this.projectForm.value.name.trim(),
      type: this.projectForm.value.type.trim(), descrip: this.projectForm.value.descrip.trim()
    } as Project;

    if (!p.name) return;

    this.projectsService.createProject(p).subscribe(next => this.location.back(), error => console.log(error));
  }
}
