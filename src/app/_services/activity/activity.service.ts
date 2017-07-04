import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { Activity } from '../../_models/activity';
import { BACKEND_SERVICE_HOST, BACKEND_SERVICE_PORT } from '../../_constants/config-envoriment';

@Injectable()
export class ActivityService {
    backendAPI = `${BACKEND_SERVICE_HOST}:${BACKEND_SERVICE_PORT}/api/v1/activities/`;

    constructor(private http: Http) { }
    getTokenFromLocalStorage() {
        return localStorage.getItem("token");
    }
    getHeaders() {
        return new Headers({
            'Content-Type': '   ',
            "x-authorization": this.getTokenFromLocalStorage(),

        }, )
    }

    getAll() {
        return this.http.get(this.backendAPI, this.jwt()).map((response: Response) => response);
    }

    getActivitiesPaging(page: number, size: number) {
        return this.http.get(this.backendAPI + `?page=${page}&size=${size}`, this.jwt()).map((response: Response) => response);
    }

    getById(id: string) {
        return this.http.get(this.backendAPI + id, this.jwt()).map((response: Response) => response);
    }

    // Lay danh hoat dong theo user
    // getActivityByUser(userId: string) {
    //     return this.http.get(this.backendAPI + "user/" + userId, this.jwt()).map((response: Response) => response);

    // }

    // Lay danh hoat dong theo to chuc


    getActivityByOrg(orgId: string) {
        return this.http.get(this.backendAPI + "org/" + orgId, this.jwt()).map((response: Response) => response);
    }
    getActivityByOrgPaging(orgId: string, page: number, size: number) {
        return this.http.get(this.backendAPI + `org/${orgId}?page=${page}&size=${size}`, this.jwt()).map((response: Response) => response);
    }
    // Lấy danh sách các hoạt động để đăng ký
    getActivityPoint(orgId: string, page: number, size: number) {
        return this.http.get(this.backendAPI + `org/${orgId}/points?page=${page}&size=${size}`, this.jwt()).map((response: Response) => response);
    }
    countActivity() {
        return this.http.get(this.backendAPI + "count", this.jwt()).map((response: Response) => response);
    }
    countActivityOrg(orgId: string) {
        return this.http.get(`${this.backendAPI}count?org=${orgId}`, this.jwt()).map((response: Response) => response);
    }
    countActivityOrgConfirm(orgId: string) {
        return this.http.get(`${this.backendAPI}count/confirm?org=${orgId}`, this.jwt()).map((response: Response) => response);
    }
    countActivityConfirm() {
        return this.http.get(this.backendAPI + "count/confirm", this.jwt()).map((response: Response) => response);
    }
    /**
     * Activities public
     * @param orgId
     */
    countActivityOrgPublic(orgId: string) {
        return this.http.get(`${this.backendAPI}count/public?org=${orgId}`, this.jwt()).map((response: Response) => response);
    }
    countActivityPublic() {
        return this.http.get(this.backendAPI + "count/public", this.jwt()).map((response: Response) => response);
    }
    getActivitiesPublicOrgPaging(orgId: string, page: number, size: number) {
        return this.http.get(this.backendAPI + `organizations/${orgId}/public?page=${page}&size=${size}`, this.jwt()).map((response: Response) => response);
    }
    getActivitiesPublicPaging(page: number, size: number) {
        return this.http.get(this.backendAPI + `public?page=${page}&size=${size}`, this.jwt()).map((response: Response) => response);
    }
    create(activity: any) {
        return this.http.post(this.backendAPI, activity, this.jwt2()).map((response: Response) => response);
    }

    update(activity: Activity) {
        return this.http.put(this.backendAPI + activity.id, activity, this.jwt()).map((response: Response) => response);
    }

    delete(id: string) {
        return this.http.delete(this.backendAPI + id, this.jwt()).map((response: Response) => response);
    }

    searchActivities(keyword: string, page: Number, size: Number) {
        return this.http.get(this.backendAPI + `public/search?q=${keyword}&page=${page}&size=${size}`, this.jwt()).map((response: Response) => response);
    }
    searchActivitiesByOrg(keyword: string, orgId: string, page: Number, size: Number) {
        return this.http.get(this.backendAPI + `public/search?q=${keyword}&organization_id=${orgId}&page=${page}&size=${size}`, this.jwt()).map((response: Response) => response);
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
    private jwt2() {
        // create authorization header with jwt token
        let token = localStorage.getItem('token');

        let headers = new Headers();
        // headers.append('Content-Type', 'multipart/form-data');
        //headers.append('Accept', 'application/json');
        //headers.append('enctype', 'multipart/form-data')
        //headers.append('Content-Type', undefined);
        headers.append('x-authorization', token);
        return new RequestOptions({ headers: headers });

    }
}