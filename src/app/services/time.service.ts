import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimeService {

  constructor() { }

  formatDateToString(date: Date): string {
    let dateString = new Date(date).toLocaleDateString().split("/").reverse().join("-");
    console.log('date', dateString)

    return dateString;
  } 
}
