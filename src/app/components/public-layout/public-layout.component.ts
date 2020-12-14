import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-public-layout',
  templateUrl: './public-layout.component.html',
  styleUrls: ['./public-layout.component.scss']
})
export class PublicLayoutComponent implements OnInit {


  opened: boolean=false;
  username: any;
  mobile : boolean=true;
  msg: any;
 

  constructor( private authService: AuthService,
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

    this.authService.user()
    .subscribe(
      data => this.addName(data),
      error => this._router.navigate(['/login'])
    )
    }

    addName(data:any){
      this.username = data.username;
    }

  ngOnInit(): void {
  }


  onActivate(component: any) {
    console.log(component);
    this.msg = null;
    this.authService.user()
    .subscribe(
      (data:any) => {

        this.addName(data);
        this.username = data.username;
        component.username = this.username;
      }
      ,
      error => component.msg = error.error.message
      );

    }


  
  Logout(){
    this.authService.logout()
    .subscribe(
      data=>{
        this.username='';
        this.msg = 'Logout success'
        this._router.navigate(['/login'])
        .then(() => this.msg = data);
        
      },
      error => console.error(error)
    )
  }

}
