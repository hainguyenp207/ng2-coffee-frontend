import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { Register } from '../../_models/index';
import { BACKEND_SERVICE_HOST, BACKEND_SERVICE_PORT } from '../../_constants/config-envoriment';

@Injectable()
export class RegisterService {
    backendActivity = `${BACKEND_SERVICE_HOST}:${BACKEND_SERVICE_PORT}/api/v1/activities/`;
    backendRegister = `${BACKEND_SERVICE_HOST}:${BACKEND_SERVICE_PORT}/api/v1/registers/`;

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

    // Lấy danh sách người đăng ký theo hoạt động
    getAll(idActivity: string) {
        return this.http.get(this.backendActivity + idActivity + "/registers", this.jwt()).map((response: Response) => response);
    }

    // Chi tiết người đăng ký theo hoạt động
    getById(idActivity: string, idRegister: string) {
        return this.http.get(this.backendActivity + idActivity + "/registers/" + idRegister, this.jwt()).map((response: Response) => response);
    }

    create(register: Register) {
        return this.http.post(this.backendActivity, register, this.jwt()).map((response: Response) => response);
    }

    update(register: Register) {
        return this.http.put(this.backendRegister + register.id, register, this.jwt()).map((response: Response) => response);
    }

    delete(id: string) {
        return this.http.delete(this.backendRegister + id, this.jwt()).map((response: Response) => response);
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