import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { DataService } from '../core/data.service';
import { startWith, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-hero-form-reactive',
  standalone: false,

  templateUrl: './hero-form-reactive.component.html',
  styleUrl: './hero-form-reactive.component.scss'
})
export class HeroFormReactiveComponent implements OnInit {

  constructor(private dataService: DataService, private http: HttpClient) {}

  form = new FormGroup({});
  model = {
    firstname: 'Juri',
    age: 34,
    nationId: 1,
    cityId: 1,
    zipCode: 39100,
    phoneNumbers: [{ contactTypeId: 1, number: '' }]
  };
  fields: FormlyFieldConfig[];

  ngOnInit(): void {
    // this.http.get<FormlyFieldConfig[]>('/dynamic-form.json')
    //   .subscribe(fields => {
    //     this.fields = fields;
    //   });

    this.fields = [
      {
        key: 'id'
      },
      {
        key: 'firstname',
        type: 'input',
        templateOptions: {
          label: 'Firstname',
          required: true
        }
      },
      {
        key: 'age',
        type: 'input',
        templateOptions: {
          type: 'number',
          label: 'Age',
          min: 18
        },
        validation: {
          messages: {
            min: 'Sorry, you have to be older than 18'
          }
        }
      },
      {
        key: 'nationId',
        // type: 'my-autocomplete',
        type: 'select',
        templateOptions: {
          label: 'Nation',
          options: this.dataService.getNations()
        }
      },
      {
        key: 'cityId',
        type: 'select',
        templateOptions: {
          label: 'Cities',
          options: []
        },
        expressionProperties: {
          'templateOptions.disabled': model => !model.nationId,
          'model.cityId': '!model.nationId ? null : model.cityId'
        },
        hideExpression: model => !model.nationId,
        hooks: {
          onInit: (field: FormlyFieldConfig) => {
            field.props.options = field.form
              .get('nationId')
              .valueChanges.pipe(
                startWith(this.model.nationId),
                switchMap(nationId => this.dataService.getCities(nationId))
              );
          }
        }
      },
      {
        key: 'ip',
        type: 'input',
        templateOptions: {
          label: 'IP Address',
          required: true
        },
        validators: {
          // validation: ['ip']
          ip2: {
            expression: (c: { value: string; }) => !c.value || /(\d{1,3}\.){3}\d{1,3}/.test(c.value),
            message: (error: any, field: FormlyFieldConfig) =>
              `"${field.formControl.value}" is not valid`
          }
        }
      }
    ];
  }

  onSubmit({ valid, value }) {
    console.log("valid: ", valid);
    console.log(value);
  }
}
