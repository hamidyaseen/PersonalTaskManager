import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-desktop',
  templateUrl: './desktop.component.html',
  styleUrls: ['./desktop.component.css']
})
export class DesktopComponent implements OnInit {

  public title = 'PTM';
  constructor() { }

  ngOnInit(): void {
  }

}
