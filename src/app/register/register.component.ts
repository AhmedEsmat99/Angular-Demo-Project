import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  register:FormGroup = new FormGroup({
    userName:new FormControl('',[Validators.required]),
    phone:new FormControl('',[Validators.required,Validators.pattern('^[0-9]*$')]),
    email:new FormControl('',[Validators.required,Validators.email,]),
    password:new FormControl('',[Validators.required]),
    NameRole:new FormControl('',[Validators.required]),
  })
  errors:string[] =[]
  submitform(data: FormGroup) {
    this._AuthService.register(data.value).subscribe({
      next:() => {
        this._Router.navigate(['/login']);
      },
      error: (err) => {
        this.errors =[];
        this.errors=err.error.errors
      }
    });
  }
  constructor(private _AuthService:AuthService , private _Router:Router){}
}
