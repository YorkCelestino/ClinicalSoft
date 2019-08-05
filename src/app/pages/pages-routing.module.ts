import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [{
  path: 'profile',
  component: ProfileComponent,
  data: {
    title: 'Perfil'
  }
}];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
