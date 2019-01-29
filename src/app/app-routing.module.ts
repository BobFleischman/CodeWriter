import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DataComponent } from './dataapp/data/data.component';
import { CodeComponent } from './dataapp/code/code.component';

const routes: Routes = [
  { path: 'data', component: DataComponent },
  { path: 'code', component: CodeComponent },
  { path: '',
    redirectTo: '/code',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
