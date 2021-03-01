import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { AuthService } from 'src/app/services/auth.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  form = new FormGroup({});
  userData = { };
  mobile!: boolean;
  msg: String = '';
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
  
  constructor(private authService: AuthService,
    private _router:Router,
    private breakpointObserver: BreakpointObserver) {
      this.breakpointObserver.observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ]).subscribe(result => {
        if (result.matches) {
          result.breakpoints[Breakpoints.XSmall] ?
            this.mobile = true :
            this.mobile = false;
          
        }
      });

    }

  onSubmit(){
  
    this.authService.login(JSON.stringify(this.userData))
    .subscribe(
      data => {
        this._router.navigate(['/']);
      } ,
      error => this.msg = error.error.message
    )
    
  }

  ngOnInit(): void {}

}
