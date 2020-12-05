import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {

  form = new FormGroup({});
  model = { };
  fields: FormlyFieldConfig[] = [
    {
      key: 'email',
      type: 'input',
      templateOptions: {
        label: 'Email address',
        placeholder: 'Enter email',
        required: true,
        appearance: 'outline'
      }
    },
    {
      key: 'name',
      type: 'input',
      templateOptions: {
        label: 'User name',
        placeholder: 'Enter name',
        required: true,
        appearance: 'outline'
      }
    },
    {
      key: 'password',
      type: 'input',
      templateOptions: {
        type: 'password',
        label: 'password',
        placeholder: 'Enter password',
        required: true,
        appearance: 'outline'
      }
    },
    {
      key: 'password2',
      type: 'input',
      templateOptions: {
        type: 'password',
        label: 'Confirm password',
        placeholder: 'Confirm password',
        required: true,
        appearance: 'outline'
      }
    }
  ];


  constructor( private authService: AuthService) { }


  onSubmit() {
    console.log(this.model);
    this.authService.register(this.model).subscribe( user =>
      console.log(user)
    ); 
  }

  ngOnInit(): void {
  }

}
