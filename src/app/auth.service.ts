import { User } from './user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Register } from './register';
import { Employee } from './employee';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private _HttpClient:HttpClient , private _Router:Router) {
    if (typeof localStorage !== 'undefined' && localStorage.getItem('token') !== null) {
      this.SaveCurrentUser()
    }
  }
  baseurl:string='https://localhost:44307/api/'
  deleteEmployee(id: number): Observable<any> {
    const url = `${this.baseurl}Employee?id=${id}`;
    return this._HttpClient.delete(url);
  }
  updateEmployee(employee: Employee): Observable<any> {
    const url = `${this.baseurl}Employee?id=${employee.id}`;
    return this._HttpClient.put(url, employee);
  }
  register(data:Employee):Observable<any>
  {
    return this._HttpClient.post(`${this.baseurl}Account/Register`,data)
  }
  GetEmployees():Observable<Employee[]>
  {
    return this._HttpClient.get<Employee[]>(`${this.baseurl}Employee`)
  }
  GetEmployeeByName(name:string):Observable<any>
  {
    return this._HttpClient.get<any>(`${this.baseurl}Employee/GetByName?name=${name}`)
  }
  insertEmployee(data:Employee):Observable<any>
  {
    return this._HttpClient.post(`${this.baseurl}Employee`,data)
  }
  login(data:Register):Observable<any>{
    return this._HttpClient.post(`${this.baseurl}Account/login`,data)
  }
  isLoggedIn():boolean {
    return typeof localStorage !== 'undefined' && localStorage.getItem('token') !== null;
  }
  getUserRole(){
    if (typeof localStorage != 'undefined') {
      let token = localStorage.getItem('token');
      if (token) {
        let decode: any = jwtDecode(token);
        return decode.role;
      }
    }
    return null;
  }
  getUser(): User | null {
    if (typeof localStorage != 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        const decoded: any = jwtDecode(token);
        if (decoded) {
          return {
            UserName: decoded.UserName || "N/A",
            Email: decoded.Email || "N/A",
            PhoneNumber: decoded.PhoneNumber || "N/A",
            role: decoded.role || "N/A"
          };
        }
      }
    }
    return null;
  }
  CurrentUser = new BehaviorSubject<any>(null);
  roledecode = new BehaviorSubject<any>(null);
  SaveCurrentUser(){
    let token = JSON.stringify(localStorage.getItem('token'))
    let decode:any =jwtDecode(token)
    this.CurrentUser.next(decode)
    this.roledecode.next(decode.role)
  }
  getCurrentUser() {
    return this.CurrentUser.asObservable();
  }
  logout(){
    localStorage.removeItem('token')
    this.CurrentUser.next(null)
    this.roledecode.next(null)
    this._Router.navigate(['/login'])
  }
}
