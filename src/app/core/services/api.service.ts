import {
    HttpClient,
    HttpHeaders,
    HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
    Params,
    Router,
    UrlSerializer,
    UrlTree,
} from '@angular/router';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    private headers: HttpHeaders = new HttpHeaders({
        'Content-Type': 'application/json',
    });

    constructor(
        private _http: HttpClient,
        private _router: Router,
        private _serializer: UrlSerializer
    ) {}

    get(
        path?: string,
        params?: HttpParams | Params
    ): Observable<any> {
        return this._http.get(`${environment.apiUrl}${path}`, {
            params,
            ...this._options(),
        });
    }

    put(path: string, body: any = {}): Observable<any> {
        return this._http.put(
            `${environment.apiUrl}${path}`,
            JSON.stringify(body),
            this._options()
        );
    }

    post(path: string, body: any = {}): Observable<any> {
        return this._http.post(
            `${environment.apiUrl}${path}`,
            JSON.stringify(body),
            this._options()
        );
    }

    delete(path: string): Observable<any> {
        return this._http.delete(
            `${environment.apiUrl}${path}`,
            this._options()
        );
    }

    patch(path: string, body: any = {}): Observable<any> {
        return this._http.patch(
            `${environment.apiUrl}${path}`,
            JSON.stringify(body),
            this._options()
        );
    }

    /**
     * Build http request query params
     *
     * @param {string[]} uri
     * @param {Params} params
     * @returns {string}
     * @memberof ApiService
     */
    buildQueryString(uri: string[], params: Params): string {
        const tree: UrlTree = this._router.createUrlTree(uri, {
            queryParams: params,
        });
        const url: string = this._serializer.serialize(tree);
        return url.slice(1, url.length);
    }

    private _options() {
        return { headers: this.headers, withCredentials: true };
    }
}
