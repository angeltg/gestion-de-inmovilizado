import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { LegalComponent } from './legal/legal.component';

const routes: Routes = [
   {
     path: '',
     redirectTo: 'welcome',
     pathMatch: 'full'
   },
   {
     path: 'aviso-legal',
     component: LegalComponent
   }
  //  ,
  //   {
  //     path: '**',
  //     component: PageNotFoundComponent
  //   }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

