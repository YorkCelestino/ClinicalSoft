import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MomentModule } from 'ngx-moment';
// Modules.
import { SharedMaterialModule } from './shared-material.module';

// Components.
import { ExampleWithCodeComponent } from './example-with-code/example-with-code.component';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';

// SweetAlert2
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

// Mask
import { NgxMaskModule } from 'ngx-mask';



declare var hljs: any;

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    SharedMaterialModule,
    MomentModule,
    SweetAlert2Module.forRoot({
      buttonsStyling: false,
      customClass: 'modal-content',
      confirmButtonClass: 'btn btn-primary',
      cancelButtonClass: 'btn'
  }),
  SweetAlert2Module.forRoot(),
  NgxMaskModule.forRoot(),
  ],
  declarations: [
    ExampleWithCodeComponent,
    AutocompleteComponent
  ],
  exports: [
    CommonModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    SharedMaterialModule,
    ExampleWithCodeComponent,
    MomentModule,
    AutocompleteComponent,
    SweetAlert2Module,
    NgxMaskModule
  ]
})
export class SharedModule {
  constructor() {
    hljs.registerLanguage('typescript', require('highlight.js/lib/languages/typescript'));
    hljs.registerLanguage('scss', require('highlight.js/lib/languages/scss'));
    hljs.registerLanguage('xml', require('highlight.js/lib/languages/xml'));
  }
}

