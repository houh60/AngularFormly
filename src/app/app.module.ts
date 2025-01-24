import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormlyModule } from '@ngx-formly/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ButtonTypesExampleComponent } from './button-types-example/button-types-example.component';
import { FormlyComponent } from './formly/formly.component';
import { HeroFormReactiveComponent } from './hero-form-reactive/hero-form-reactive.component';
import { SharedModule } from './shared/shared.module';
import { DebugComponent } from './debug/debug.component';

@NgModule({
  declarations: [
    AppComponent,
    ButtonTypesExampleComponent,
    FormlyComponent,
    HeroFormReactiveComponent,
    DebugComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormlyModule.forRoot(),
    ReactiveFormsModule,
    FormlyMaterialModule,
    SharedModule
  ],
  providers: [
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

