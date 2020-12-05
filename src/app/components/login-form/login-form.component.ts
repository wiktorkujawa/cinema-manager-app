import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  form = new FormGroup({});
  model = { };
  user: any = {};
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
      key: 'password',
      type: 'input',
      templateOptions: {
        type: 'password',
        label: 'password',
        placeholder: 'Enter password',
        required: true,
        appearance: 'outline'
      }
    }
  ];
  
  constructor(private authService: AuthService) { }

  onSubmit() {
    console.log(this.model);
    this.authService.login(this.model).subscribe( user =>

      console.log(user)
    ); 
  }

  ngOnInit(): void {}

}
