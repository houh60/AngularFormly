import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatTabGroup } from '@angular/material/tabs';

@Component({
  selector: 'app-debug',
  standalone: false,

  templateUrl: './debug.component.html',
  styleUrl: './debug.component.scss'
})
export class DebugComponent implements OnInit {
  @Input() form: any;
  @Input() model: any;

  submittedValue = null;
  isExpanded = false;
  selectedIndex = 0;
  submittedDate = null;

  @ViewChild(MatTabGroup, { static: true }) tabGroup: MatTabGroup;

  constructor() {}

  ngOnInit() {
    this.isExpanded = sessionStorage.getItem("debug-expanded") === "true";
  }

  onExpandedChange(isExpanded) {
    sessionStorage.setItem("debug-expanded", isExpanded);
  }
}
