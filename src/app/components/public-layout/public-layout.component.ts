import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-public-layout',
  templateUrl: './public-layout.component.html',
  styleUrls: ['./public-layout.component.scss']
})
export class PublicLayoutComponent implements OnInit {

  opened: boolean=false;
  user: any;
  mobile : boolean=true;
  // environment: string = environment.apiUrl;
 

  constructor( private authService: AuthService,
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

  ngOnInit(): void {
  }

  onOutletLoaded(component: any) {
    this.authService.getUser().subscribe( user => {
      this.user = user;
      component.user = this.user;
    })
    console.log(component);
  } 

}
