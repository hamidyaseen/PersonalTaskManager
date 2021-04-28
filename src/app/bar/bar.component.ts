import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.css']
})
export class BarComponent implements OnInit {

  constructor() { }

  @Input() color: string | null | undefined;
  @Input() name: string | undefined;
  @Input() percent: number | undefined;

  ngOnInit(): void {

  }

}
