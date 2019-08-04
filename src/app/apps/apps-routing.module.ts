import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders, Component } from '@angular/core';

import { NotesComponent } from './notes/notes/notes.component';
import { AppCalendarComponent } from './calendar/calendar/calendar.component';
import { TodoComponent } from './todo/todo/todo.component';
import { MapsComponent } from './maps/maps/maps.component';
import { ContactsComponent } from './contacts/contacts/contacts.component';
import { ChatComponent } from './chat/chat/chat.component';
import { MessagesComponent } from './email/messages/messages.component';
import { NoMessagesComponent } from './email/no-messages/no-messages.component';
import { EmailListComponent } from './email/list/list.component';
import { ContactListComponent } from './email/contact-list/contact-list.component';
import { EmailComponent } from './email/email/email.component';
import { SpotifyComponent } from './spotify/components/spotify/spotify.component';

import { SpotifyAuthService } from './spotify/guards/spotify-auth.service';
import { UsersComponent } from './users/users.component';
import { PatientComponent } from './patient/patient.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { TreatmentComponent } from './treatment/treatment.component';
import { PaymentComponent } from './payment/payment.component';
import { QueryComponent } from './query/query.component';
import { RecordComponent } from './record/record.component';



const routes: Routes = [{
  path: 'email',
  component: EmailComponent,
  children: [{
    path: 'contacts',
    component: ContactListComponent,
    outlet: 'list'
  }, {
    path: ':list',
    component: EmailListComponent,
    outlet: 'list'
  }, {
    path: 'none',
    component: NoMessagesComponent,
    outlet: 'messages'
  }, {
    path: ':id',
    component: MessagesComponent,
    outlet: 'messages'
  }]
}, {
  path: 'chat',
  component: ChatComponent,
  data: {
    title: 'Chat'
  }
}, {
    component: SpotifyComponent,
    path: 'spotify',
    canActivate: [
      SpotifyAuthService
    ],
    data: {
      title: 'Spotify'
    }
  }, {
  path: 'contacts',
  component: ContactsComponent,
  data: {
    title: 'Contact'
  }
}, {
  path: 'maps',
  component: MapsComponent,
  data: {
    title: 'Maps'
  }
}, {
  path: 'todo',
  component: TodoComponent,
  data: {
    title: 'Todo'
  }
}, {
  path: 'calendar',
  component: AppCalendarComponent,
  data: {
    title: 'Calendar'
  }
}, {
  path: 'notes',
  component: NotesComponent,
  data: {
    title: 'Notes'
  }
},
{
  path: 'usuarios',
  component: UsersComponent,
  data: {
    title: 'Usuarios'
  }
},
{
  path: 'pacientes',
  component: PatientComponent,
  data: {
    title: 'Pacientes'
  }
},
{
  path: 'cita',
  component: AppointmentComponent,
  data: {
    title: 'Cita'
  }
},
{
  path: 'treatment',
  component: TreatmentComponent,
  data: {
    title: 'Tratamientos'
  }
},
{
  path: 'payment',
  component: PaymentComponent,
  data: {
    title: 'Pagos'
  }
},
{
  path: 'query',
  component: QueryComponent,
  data:{
    title: 'Consultas'
  }
},
{
  path: 'record',
  component: RecordComponent,
  data:{
    title: 'Record'
  }
}
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
