import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  activateToit:boolean = true;
  activateEtageTwo:boolean = false;
  activateEtageOne:boolean = false;
  activateRdc:boolean = false;
  activateCardContent:boolean = false;

  constructor() { }


  toogletagToit() {
    this.activateToit = true;
    this.activateEtageTwo = false;
    this.activateEtageOne = false;
    this.activateRdc = false;
  }

  toogletagEtageOne() {
    this.activateEtageOne = true;
    this.activateToit = false;
    this.activateEtageTwo = false;
    this.activateRdc = false;
  }

  toogletagEtageTwo() {
    this.activateEtageTwo = true;
    this.activateEtageOne = false;
    this.activateRdc = false;
    this.activateToit = false;

  }

  toogletagRdc() {
    this.activateRdc = true;
    this.activateToit = false;
    this.activateEtageTwo = false;
    this.activateEtageOne = false;
  }

}
