import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Contact } from '../models/contact.model';

@Component({
  selector: 'app-formly',
  standalone: false,

  templateUrl: './formly.component.html',
  styleUrl: './formly.component.scss'
})
export class FormlyComponent implements OnInit {
  constactForm: FormGroup;
  contactModel: Contact;
  contactFields: Array<FormlyFieldConfig>;

  constructor() {
  }

  ngOnInit(): void {
    this.constactForm = new FormGroup({});
    this.contactModel = new Contact();
    this.contactFields = this.contactModel.FormFields();
  }

  submitForm(contact: Contact) {
    console.log("contact.name: ", contact.name);
    console.log("contact.phoneNumber: ", contact.phoneNumber);
    console.log("contact.email: ", contact.email);
  }
}
