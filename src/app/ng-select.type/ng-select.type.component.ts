import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'formly-ng-select',
  standalone: false,

  templateUrl: './ng-select.type.component.html',
  styleUrl: './ng-select.type.component.scss'
})
export class NgSelectTypeComponent extends FieldType {
}
