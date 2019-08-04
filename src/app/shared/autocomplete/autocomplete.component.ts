import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
// tslint:disable-next-line:rxjs-no-wholesale
import { Observable, Subject } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { MatOptionSelectionChange } from '@angular/material';

export interface AutoCompleteOption<MetaType = any> {
  title?: string;
  data?: MetaType;
}

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteComponent implements OnInit {
  @Input() editable: any = true;
  @Input() value: any;
  @Output() valueChange: any = new EventEmitter<any>();
  @Input() placeholder: any;
  @Input() options: AutoCompleteOption[];
  @Input() onParentSelect: Subject<any>;
  filteredControl: FormControl = new FormControl('');
  title: FormControl = new FormControl();
  filteredOptions: Observable<any>;

  constructor() { }
  // estabas creando un componente para el autocomplete
  ngOnInit(): any {
    this.filteredOptions = this.filteredControl.valueChanges
    .pipe(
      startWith(''),
      map(val => this.filter(val))
    );
    if (this.value) {
      const option = this.options.filter(element => element.data.id === this.value.id)[0];
      // console.log(option)
      this.filteredControl.setValue(option);
      if (!this.editable) {
        this.title.setValue(option.title);
      }
    }
  }



// tslint:disable-next-line: use-life-cycle-interface
  // ngAfterViewInit(): any {
  //   this.onParentSelect.subscribe(event => {
  //     this.filteredControl.reset();
  //     this.filteredOptions = this.filteredControl.valueChanges
  //     .pipe(
  //       startWith(''),
  //       map(val => this.filter(val))
  //     );
  //   });
  // }

  private getDisplayFn(): any {
    return (val) => this.display(val);
  }

  private display(option: any): string {
    // access component "this" here
    return option ? option.title : option;
  }

  onSelect($event: any): any {
    // console.log($event);
    this.valueChange.emit($event.option.value.data);
  }

  selected({
    source
  }: MatOptionSelectionChange): void {
    // console.log(source)
    //  this.value = source.value.data;
    //  this.valueChange.emit(source.value.data);
  }
  // private selected(option) {
  //  console.log(option)
  //  // send to parent or do whatever you want to do
  // }

  filter(val: any): AutoCompleteOption[] {
    let quer;
    if (typeof val === 'string') {
      quer = val.toLowerCase();
    } else {
      quer = val.title.toLowerCase();
    }
    return this.options.filter( option => option.title.toLowerCase().indexOf(quer) === 0);
  }

}
