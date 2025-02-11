import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ButtonTypesExampleComponent } from './button-types-example/button-types-example.component';
import { FormlyComponent } from './formly/formly.component';
import { HeroFormReactiveComponent } from './hero-form-reactive/hero-form-reactive.component';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';

const routes: Routes = [
  { path: 'formly', component: FormlyComponent },
  { path: 'buttons', component: ButtonTypesExampleComponent },
  { path: 'createEmployee', component: CreateEmployeeComponent },
  { path: 'heroForm', component: HeroFormReactiveComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
