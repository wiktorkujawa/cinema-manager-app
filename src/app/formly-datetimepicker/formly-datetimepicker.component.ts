import { Component, OnInit } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'app-formly-datetimepicker',
  templateUrl: './formly-datetimepicker.component.html',
  styleUrls: ['./formly-datetimepicker.component.scss']
})
export class DatetimepickerFieldType extends FieldType {}