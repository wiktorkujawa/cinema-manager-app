import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {

  form = new FormGroup({});
  userData = { };

  mobile!: boolean;
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
      key: 'username',
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


  constructor( private authService: AuthService,
    private _router: Router,
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
  
    this.authService.register(JSON.stringify(this.userData))
    .subscribe(
      data => {
        this._router.navigate(['/login']);
      } ,
      error=>console.error(error)
    )
    
  }

  ngOnInit(): void {
  }

}
