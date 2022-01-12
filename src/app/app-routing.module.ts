import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/todo/to-do',
    pathMatch: 'full',
  },
  {
    path: 'todo',
    loadChildren: () =>
      import('../app/modules/todo/todo.module').then((m) => m.TodoModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}