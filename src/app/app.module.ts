import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FORMLY_CONFIG, FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import { FormControl, ReactiveFormsModule, ValidationErrors } from '@angular/forms';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ButtonTypesExampleComponent } from './button-types-example/button-types-example.component';
import { FormlyComponent } from './formly/formly.component';
import { HeroFormReactiveComponent } from './hero-form-reactive/hero-form-reactive.component';
import { SharedModule } from './shared/shared.module';
import { DebugComponent } from './debug/debug.component';
import { NgSelectTypeComponent } from './ng-select.type/ng-select.type.component';
import { dataCyExtension } from './data-cy.extension';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateLoader, TranslateModule, TranslateService, TranslateStore } from '@ngx-translate/core';
import { registerTranslateExtension } from './translate.extension';
import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, 'assets/i18n/', '.json');
}

export function minValidationMessage(err: { min: any; actual: any; }, field: FormlyFieldConfig) {
  return `Please provide a value bigger than ${err.min}. You provided ${err.actual}`;
}

export function ipValidationMessage(err: any, field: FormlyFieldConfig) {
  return `"${field.formControl.value}" is not a valid IP address`;
}

export function IpValidator(control: FormControl): ValidationErrors {
  return !control.value || /(\d{1,3}\.){3}\d{1,3}/.test(control.value)
    ? null
    : { ip: true };
}
@NgModule({
  declarations: [
    AppComponent,
    ButtonTypesExampleComponent,
    FormlyComponent,
    HeroFormReactiveComponent,
    DebugComponent,
    NgSelectTypeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgSelectModule,
    FormlyModule.forRoot({
      validators: [
        {
          name: 'ip',
          validation: IpValidator
        }
      ],
      validationMessages: [
        {
          name: 'required',
          message: 'This field is required'
        },
        {
          name: 'min',
          message: minValidationMessage
        },
        {
          name: 'ip',
          message: ipValidationMessage
        }
      ],
      types: [
        {
          name: 'my-autocomplete',
          component: NgSelectTypeComponent
        }
      ],
      extensions: [
        {
          name: 'data-cy-extension',
          extension: dataCyExtension
        }
      ]
    }),
    ReactiveFormsModule,
    FormlyMaterialModule,
    SharedModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  providers: [
    provideAnimationsAsync(),
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: FORMLY_CONFIG,
      multi: true,
      useFactory: registerTranslateExtension,
      deps: [TranslateService]
    },
    TranslateStore
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

