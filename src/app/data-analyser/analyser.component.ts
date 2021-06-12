import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AnalyserService } from './analyser.service';

@Component({
  selector: 'app-analyser',
  templateUrl: './analyser.component.html',
  styleUrls: ['./analyser.component.css']
})
export class AnalyserComponent implements OnInit {

  constructor(private analyser: AnalyserService) {
  }

  salahTimes: FormControl = new FormControl('');
  daysCalendar$ = this.analyser.lines$
    .pipe(
      tap(days => console.log(days))
    );

  ngOnInit(): void {
    this.salahTimes.valueChanges.subscribe((txt: string) => this.analyser.textData(txt) );
     //console.log(txt);
  }
}
