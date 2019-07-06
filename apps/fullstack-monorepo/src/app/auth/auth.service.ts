import { Injectable } from '@angular/core';
import { HttpRequest } from '@angular/common/http';
const TOKEN_NAME = 'FS_AUTH_TOKEN';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  cachedRequests: Array<HttpRequest<any>> = [];
  public collectFailedRequest(request): void {
    this.cachedRequests.push(request);
  }
  public retryFailedRequests(): void {
    // retry the requests. this method can
    // be called after the token is refreshed
  }
  get token() {
    return localStorage.getItem(TOKEN_NAME);
  }
  set token(val: string) {
    localStorage.setItem(TOKEN_NAME, val);
  }
  constructor() { }
}
