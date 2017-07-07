import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { BACKEND_SERVICE_HOST, BACKEND_SERVICE_PORT } from '../_constants/config-envoriment';

@Injectable()
export class BaseService {
    backendAPI = `${BACKEND_SERVICE_HOST}/api/v1/users/`;

    constructor(private http: Http) { }
    getTokenFromLocalStorage() {
        return localStorage.getItem("token");
    }
    getHeaders() {
        return new Headers({
            'Content-Type': 'application/json',
            "x-authorization": this.getTokenFromLocalStorage()
        }, )
    }

    getAll() {
        return this.http.get(this.backendAPI, this.jwt()).map((response: Response) => response);
    }

    getById(id: string) {
        return this.http.get(this.backendAPI + id, this.jwt()).map((response: Response) => response);
    }

    create(data: any) {
        return this.http.post(this.backendAPI, data, this.jwt()).map((response: Response) => response);
    }

    update(data: any) {
        return this.http.put(this.backendAPI + data.username ? data.username : data.id, data, this.jwt()).map((response: Response) => response);
    }

    delete(id: string) {
        return this.http.delete(this.backendAPI + id, this.jwt()).map((response: Response) => response);
    }

    // private helper methods

    private jwt() {
        // create authorization header with jwt token
        let token = localStorage.getItem('token');

        let headers = new Headers();
        headers.append('content-type', 'application/json', );
        headers.append('x-authorization', token);
        return new RequestOptions({ headers: headers });

    }
}