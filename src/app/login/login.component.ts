import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  errors:string=""
  constructor(private _AuthService:AuthService,private _Router:Router){}
  login:FormGroup = new FormGroup({
    email:new FormControl('',[Validators.required,Validators.email,]),
    password:new FormControl('',[Validators.required])
  })
  submitform(data:FormGroup){
    this._AuthService.login(data.value).subscribe({
      next:(res)=>{
        localStorage.setItem('token',res.token)
        this._AuthService.SaveCurrentUser()
        if(this._AuthService.getUserRole() == 'Admin'||this._AuthService.getUserRole() == 'admin')
        {
          this._Router.navigate(['/home'])
        }
        else{
          this._Router.navigate(['/emp'])
        }
      },
      error:(err)=>{
        this.errors=err.error.error
      }
    })
  }
}
