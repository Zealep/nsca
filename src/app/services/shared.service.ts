import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class SharedService {

  private title = new BehaviorSubject('')


  getTitle = this.title.asObservable();

  constructor() { }

  setTitle(val: string) {
    this.title.next(val)
    sessionStorage.setItem('title', val)
  }



}
