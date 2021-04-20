import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {

  constructor() { }

  @Input() opened: boolean | undefined = false;
  @Input() title: string | undefined;
  @Output() toggle: EventEmitter<any> = new EventEmitter<any>();
  ngOnInit(): void { }

  editTask(): void { }
}
