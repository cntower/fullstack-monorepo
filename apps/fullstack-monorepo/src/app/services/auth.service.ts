import { Injectable } from '@angular/core';
import { Api } from './api.service';
const TOKEN_NAME = 'POST_TOKEN';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private apiService: Api) { }
  login(){
  }
  get token() {
    return localStorage.getItem(TOKEN_NAME);
  }
  set token(val: string) {
    localStorage.setItem(TOKEN_NAME, val);
  }
}
