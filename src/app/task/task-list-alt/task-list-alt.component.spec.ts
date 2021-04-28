import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskListAltComponent } from './task-list-alt.component';

describe('TaskListAltComponent', () => {
  let component: TaskListAltComponent;
  let fixture: ComponentFixture<TaskListAltComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskListAltComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskListAltComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
