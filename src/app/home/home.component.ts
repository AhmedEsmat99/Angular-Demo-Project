import { User } from './../user';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  constructor(private auth:AuthService){}
  user:any
  ngOnInit(): void {
    this.user = this.auth.getUser();
  }
}
