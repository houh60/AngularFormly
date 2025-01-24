import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { DataService } from '../core/data.service';
import { startWith, switchMap } from 'rxjs';

@Component({
  selector: 'app-hero-form-reactive',
  standalone: false,

  templateUrl: './hero-form-reactive.component.html',
  styleUrl: './hero-form-reactive.component.scss'
})
export class HeroFormReactiveComponent implements OnInit {

  constructor(private dataService: DataService) {}

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
    this.fields = [
      {
        key: 'firstname',
        type: 'input',
        templateOptions: {
          label: 'First Name'
        }
      },
      {
        key: 'age',
        type: 'input',
        templateOptions: {
          type: 'number',
          label: 'Age'
        }
      },
      {
        key: 'nationId',
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
      }
    ];
  }

  onSubmit({ valid, value }) {
    console.log("valid: ", valid);
    console.log(value);
  }
}
