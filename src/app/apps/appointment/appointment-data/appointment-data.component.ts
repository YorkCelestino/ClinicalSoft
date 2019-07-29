import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {Observable} from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-appointment-data',
  templateUrl: './appointment-data.component.html',
  styleUrls: ['./appointment-data.component.scss']
})
export class AppointmentDataComponent implements OnInit {
  myControl = new FormControl();
  myControlD = new FormControl();

  options: string[] = ['One', 'Two'];
  optionsD: string[] = ['One1', 'Two1'];
  filteredOptions: Observable<string[]>;
  filteredOptionsD: Observable<string[]>;
  constructor() { }

  ngOnInit() {
    //Paciente
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
    //Doctor
   this.filteredOptionsD = this.myControlD.valueChanges.pipe(
     startWith(''),
      map(value=> this._filterD(value))
    )
    
  }
  //Paciente
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }
  //Doctor
  private _filterD(valueD: string): string[] {
    const filterValueD = valueD.toLowerCase();

    return this.optionsD.filter(optionD => optionD.toLowerCase().indexOf(filterValueD) === 0);
 }

}
