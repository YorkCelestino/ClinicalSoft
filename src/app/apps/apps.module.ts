import { NgModule } from '@angular/core';

import { SharedModule } from './../shared/shared.module';

import { routing } from './apps-routing.module';

import { MessagesComponent } from './email/messages/messages.component';
import { NoMessagesComponent } from './email/no-messages/no-messages.component';
import { EmailListComponent } from './email/list/list.component';
import { ContactListComponent } from './email/contact-list/contact-list.component';
import { EmailComponent } from './email/email/email.component';
import { ChatComponent } from './chat/chat/chat.component';
import { ContactsComponent } from './contacts/contacts/contacts.component';
import { TodoComponent } from './todo/todo/todo.component';
import { MapsComponent } from './maps/maps/maps.component';
import { AppCalendarComponent } from './calendar/calendar/calendar.component';
import { NotesComponent } from './notes/notes/notes.component';

import { TodoModule } from './todo/todo.module';
import { MapsModule } from './maps/maps.module';
import { EmailModule } from './email/email.module';
import { ContactsModule } from './contacts/contacts.module';
import { ChatModule } from './chat/chat.module';
import { CalendarAppModule } from './calendar/calendar.module';
import { NotesModule } from './notes/notes.module';
import { SpotifyModule } from './spotify/spotify.module';
import { UsersComponent } from './users/users.component';
import { UsersDataComponent } from './users/users-data/users-data.component';

// flex layout module
import { FlexLayoutModule } from '@angular/flex-layout';


// angular material modules
import { MatDialogModule } from '@angular/material/dialog';
import { PatientComponent } from './patient/patient.component';
import { PatientDataComponent } from './patient/patient-data/patient-data.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { AppointmentDataComponent } from './appointment/appointment-data/appointment-data.component';
import { TreatmentComponent } from './treatment/treatment.component';
import { TreatmentDataComponent } from './treatment/treatment-data/treatment-data.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PaymentComponent } from './payment/payment.component';
import { NgxMaskModule } from 'ngx-mask';
import { QueryComponent } from './query/query.component';
import { RecordComponent } from './record/record.component';
import { TodaysdateComponent } from './todaysdate/todaysdate.component';







@NgModule({
  imports: [
    SharedModule,
    routing,
    ChatModule,
    ContactsModule,
    EmailModule,
    MapsModule,
    TodoModule,
    CalendarAppModule,
    NotesModule,
    SpotifyModule,
    MatDialogModule,
    FlexLayoutModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'})
  ],
  declarations: [
    UsersComponent,
    UsersDataComponent,
    PatientComponent,
    PatientDataComponent,
    AppointmentComponent,
    AppointmentDataComponent,
    TreatmentComponent,
    TreatmentDataComponent,
    PaymentComponent,
    QueryComponent,
    RecordComponent,
    TodaysdateComponent,

  
  ],
  entryComponents: [
    UsersDataComponent,
    PatientDataComponent,
    AppointmentDataComponent,
    TreatmentDataComponent,
 
  ]
})
export class AppsModule { }
