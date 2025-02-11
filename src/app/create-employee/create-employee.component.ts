import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';

@Component({
  selector: 'app-create-employee',
  standalone: false,

  templateUrl: './create-employee.component.html',
  styleUrl: './create-employee.component.scss'
})
export class CreateEmployeeComponent implements OnInit {

  form = new FormGroup({});
  model = {
    fullName: 'William Hou',
    email: 'williamhou38@yahoo.com',
    phoneNumber: '8562810647',
    contactPreference: 'phoneNumber',
    gender: 'male',
    isActive: 'yes',
    department: null,
    dateOfBirth: '1993/3/27',
    photoPath: 'images/john.png',
    image: 'images/john.png'
  };
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[];

  ngOnInit(): void {
    this.fields = [
      {
        key: 'id'
      },
      {
        key: 'fullName',
        type: 'input',
        props: {
          label: 'Full Name',
          required: true
        }
      },
      {
        key: 'email',
        type: 'input',
        props: {
          label: 'Email',
          type: 'email',
          required: true
        }
      },
      {
        key: 'phoneNumber',
        type: 'input',
        props: {
          label: 'Phone Number',
          type: 'text',
          required: true
        }
      },
      {
        key: 'contactPreference',
        type: 'radio',
        props: {
          label: 'Contact Preference',
          options: [
            { label: 'Email', value: 'email' },
            { label: 'Phone', value: 'phoneNumber' }
          ],
          className: 'custom-radio-group',
          required: true
        }
      },
      {
        key: 'gender',
        type: 'radio',
        props: {
          label: 'Gender',
          options: [
            { label: 'Male', value: 'male' },
            { label: 'Female', value: 'female' }
          ],
          className: 'custom-radio-group',
          required: true
        }
      },
      {
        key: 'isActive',
        type: 'radio',
        props: {
          label: 'Is Active',
          options: [
            { label: 'Yes', value: 'yes' },
            { label: 'No', value: 'no' }
          ],
          className: 'custom-radio-group',
          required: true
        }
      },
      {
        key: 'department',
        type: 'select',
        props: {
          label: 'Department',
          options: [
            { label: 'Select Department', value: null },
            { label: 'Help Desk', value: '1' },
            { label: 'HR', value: '2' },
            { label: 'IT', value: '3' },
            { label: 'Payroll', value: '4' },
            { label: 'Admin', value: '5' }
          ],
          required: true
        }
      },
      {
        key: 'dateOfBirth',
        type: 'datepicker',
        props: {
          label: 'Date Of Birth',
          required: true
        }
      },
      {
        key: 'photoPath',
        type: 'input',
        props: {
          label: 'Photo Path',
          required: true
        }
      },
    ]
  }

  onSubmit({ valid, value }) {
    console.log("valid: ", valid);
    console.log(value);
  }
}
