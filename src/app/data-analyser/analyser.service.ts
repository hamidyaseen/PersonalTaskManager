import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { EnDayCalendar } from './enDayCalendar'; 
import { EnLine } from './enLine';

@Injectable({
  providedIn: 'root'
})
export class AnalyserService {
  private linesData: EnLine[] = [];

  private lineSubject = new Subject<EnLine[]>();
  lines$ = this.lineSubject.asObservable();


  constructor() { }
  //daysCalendar$ = this.line$
  //  .pipe(
  //    tap(l => console.log(l))
  //  );

  //private interpret(dayVales: string[]): EnDayCalendar {

  //  let date = new Date();
  //  date.setMonth(0);
  //  date.setDate(1);

  //  let col1 = parseInt(dayVales?.[0]);
  //  if (dayVales?.[0]?.length <= 2 && col1 !== NaN) {
  //    date.setDate(col1);

  //    let col2 = parseInt(dayVales?.[1]);
  //    if (dayVales?.[1]?.length <= 2 && col2 !== NaN && col2 > 0 && col2 <= 12)
  //      date.setMonth(col2);
  //  }
  //  //else if (dayVales?.[0]?.length <= 5 && parseInt(dayVales?.[0]) !== NaN) {
  //  //  date.setDate(parseInt(dayVales?.[0]));

  //  //  if (dayVales?.[1]?.length <= 2 && parseInt(dayVales?.[1]) !== NaN)
  //  //    date.setMonth(parseInt(dayVales?.[1]));
  //  //}
  //  else
  //    date = new Date(dayVales?.[0]);

  //  return { date: date } as EnDayCalendar;
  //}
  
  public textData(txt: string): void {
    let lineNumber = 0;
    this.linesData = [];
    let lastLineText: string[];

    let LinesOfToken: EnLine[] = [];
    let lines = txt.split('\n');   
    lines.forEach(line => {
      line = line?.trim();
      if (line?.length > 0) {
        let lineText = line.replace(/\t|\s/ig, ';').split(';');
        
        // first replace the " charater if use in the any column
        lineText.forEach((colText: string, index: number) => {
          if (colText === '"')
            lineText[index] = lastLineText?.[index];
        });        
        lastLineText = lineText;
        LinesOfToken.push({lineNo: ++lineNumber, text: lineText});
      }
    });
    this.FindDateColumn(LinesOfToken);

    
    // lineText.push(date.toLocaleDateString());
    //this.linesData.push({
    //      lineNo: ++lineNumber,
    //      text: lineText 
    //    });
    if (LinesOfToken?.length > 0)
      this.lineSubject.next(LinesOfToken);
  }
  private isMonthColumn(lines: EnLine[]): number | undefined
  {
    const cols = lines?.[0]?.text?.length;
    for (let i = 0; i < cols; i++)
      if (lines?.[0]?.text?.[i]?.length <= 2 && parseInt(lines?.[0]?.text?.[i]) !== NaN) {

        let row1 = parseInt(lines?.[0]?.text?.[i]);
        let row2 = parseInt(lines?.[1]?.text?.[i]);
        let row3 = parseInt(lines?.[2]?.text?.[i]);
        let row4 = parseInt(lines?.[3]?.text?.[i]);

        if (row1 === row2 && row2 === row3 && row3 === row4)
          return i;
      }
    return undefined;
  }

  private FindDateColumn(lines: EnLine[]) {
    let monthColumn: number | undefined;
    let dayColumn: number | undefined;
    let date: Date | undefined;

    if (lines[0]?.text?.[0]?.length <= 2 && parseInt(lines[0]?.text?.[0]) !== NaN) {
      let row1 = parseInt(lines[0]?.text?.[0]);
      let row2 = parseInt(lines[1]?.text?.[0]);
      let row3 = parseInt(lines[2]?.text?.[0]);
      let row4 = parseInt(lines[3]?.text?.[0]);

      if (row1 === row2 && row2 === row3 && row3 === row4)
        monthColumn = 0;
      else if (row1 + 1 === row2 && row2 + 1 === row3 && row3 + 1 === row4)
        dayColumn = 0;

      if (lines[0]?.text?.[1]?.length <= 2 && parseInt(lines[0]?.text?.[1]) !== NaN) {
        let row1 = parseInt(lines[0]?.text?.[1]);
        let row2 = parseInt(lines[1]?.text?.[1]);
        let row3 = parseInt(lines[2]?.text?.[1]);
        let row4 = parseInt(lines[3]?.text?.[1]);

        if (monthColumn === undefined && row1 === row2 && row2 === row3 && row3 === row4)
          monthColumn = 1;
        else if (dayColumn === undefined && row1 + 1 === row2 && row2 + 1 === row3 && row3 + 1 === row4)
          dayColumn = 1;
      }
    }
    else if (lines[0].text?.[0]?.length > 5)
      date = new Date(lines[0].text?.[0]);

    // let localDate: string | undefined;
    let lastDay: number = 0;
    let lastMonth: number = 1;
    
    lines.forEach((line: EnLine, lineIndex: number) =>
    {
      let columns: string[] = [];
      let aText: RegExpMatchArray | null;
      let aTime: string[];

      line.text.forEach((text: string, colIndex: number) =>
      {
        if (text === 'am')  '';
        else if (text === 'pm') {
          if (columns?.length > 0) {
            let time = columns?.[columns?.length-1]?.split(/(:|\.|-)/ig);            
            columns[columns?.length-1] = `${parseInt(time?.[0])+12}:${time?.[2]}`;
          }
        }
        else if (aText = text.match(/(\d)+(\:|\.|-)(\d)+(?=am)/i)) {
          aTime = aText?.[0]?.split(/(:|\.|-)/ig);          
          columns.push(`${aTime?.[0]}:${aTime?.[2]}`);
        }
        else if (aText = text.match(/(\d)+(\:|\.|-)(\d)+(?=pm)/i)) {
          aTime = aText?.[0]?.split(/(:|\.|-)/ig);
          columns.push(`${parseInt(aTime?.[0]) + 12}:${aTime?.[2]}`); 
        }
        else
          columns.push(text);
      });
      line.text = columns;

      if (date)
        line.text?.push((new Date(line.text?.[0])).toLocaleDateString());
      else {
        let day = (dayColumn !== undefined) ? parseInt(line.text?.[dayColumn]) : ++lastDay;
        if (day < lastDay) lastMonth += 1;
        let month = (monthColumn !== undefined) ? parseInt(line.text?.[monthColumn]) : lastMonth;

        //line.text?.push(`${month}/${day}/${year}`);
        line.text = this.insertAt<string>(line.text, 0, `${month}/${day}/${2020}`);
        lastDay = day;
      }   
      //{
      //  let firstDate = new Date();

      //  index += 1; // change zero based index to 1-based
      //  let m = Math.floor(index / 32);
      //  let d = ((index-31) > 0) ? (index % 31) : 1;
      //  //if (index === 31)
      //  //  console.log(line.text?.[0], index, m, d);

      //  if (monthColumn !== undefined)
      //    firstDate.setMonth(parseInt(line.text?.[monthColumn]) - 1);
      //  else
      //    firstDate.setMonth(m);

      //  if (dayColumn != undefined)
      //    firstDate.setDate(parseInt(line.text?.[dayColumn]));
      //  else
      //    firstDate.setDate(d);

      //  line.text?.push(firstDate.toLocaleDateString());
      //}     
    });
  }
  
  private insertAt<T>(arr: T[], index: number, newItem: T): T[] {
    return [...arr.slice(0, index), newItem, ...arr.slice(index)];
  }

  private interpret(dayVales: string[]): EnDayCalendar {

    let date = new Date();
    date.setMonth(0);
    date.setDate(1);

    let col1 = parseInt(dayVales?.[0]);
    if (dayVales?.[0]?.length <= 2 && col1 !== NaN) {
      date.setDate(col1);

      let col2 = parseInt(dayVales?.[1]);
      if (dayVales?.[1]?.length <= 2 && col2 !== NaN && col2 > 0 && col2 <= 12)
        date.setMonth(col2);
    }
    //else if (dayVales?.[0]?.length <= 5 && parseInt(dayVales?.[0]) !== NaN) {
    //  date.setDate(parseInt(dayVales?.[0]));

    //  if (dayVales?.[1]?.length <= 2 && parseInt(dayVales?.[1]) !== NaN)
    //    date.setMonth(parseInt(dayVales?.[1]));
    //}
    else
      date = new Date(dayVales?.[0]);

    return { date: date } as EnDayCalendar;
  }
}
