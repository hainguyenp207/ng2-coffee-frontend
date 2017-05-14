import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { BACKEND_SERVICE_HOST, BACKEND_SERVICE_PORT } from '../../_constants/config-envoriment';

@Injectable()
export class AuthenticationService {
  backendAPI = `${BACKEND_SERVICE_HOST}:${BACKEND_SERVICE_PORT}`;
  constructor(private http: Http) { }

  login(username: string, password: string) {
    return this.http.post(`${this.backendAPI}/api/v1/login`, JSON.stringify({ username: username, password: password }))
      .map((response: Response) => {
        console.log("Data:", response.headers)
        // login successful if there's a jwt token in the response
        let user = response.json();
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
      });
  }

  logout() {
    // remove user from local storage to log user out
    var token = localStorage.getItem("currentUser");
    return this.http.post('/api/v1/logout', JSON.stringify({ token: token }))
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        let user = response.json();
        localStorage.removeItem('currentUser');
      });

  }
}