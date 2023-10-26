import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DelaguilaComponent } from './components/delaguila/delaguila.component';
import { DelaguilaCrearComponent } from './components/delaguila/delaguila-crear/delaguila-crear.component';

const routes: Routes = [
  {
    path: 'delaguila', component: DelaguilaComponent, children: [
      { path: 'nuevo', component: DelaguilaCrearComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
