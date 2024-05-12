import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  constructor(private Auth:AuthService){}
  islogin:boolean=false
  role:boolean=false
  ngOnInit(): void {
    this.Auth.CurrentUser.subscribe({
      next:()=>{
        if(this.Auth.CurrentUser.getValue() != null)
          this.islogin=true
        else
          this.islogin=false;
      }
    })
    this.Auth.roledecode.subscribe({
      next:()=>{
        if(this.Auth.roledecode.getValue() == 'Admin' || this.Auth.roledecode.getValue() == 'admin' ){
          this.role = true
        }
        else{
          this.role = false
        }
      }
    })
  }
  logout(){
    this.Auth.logout()
  }
}
