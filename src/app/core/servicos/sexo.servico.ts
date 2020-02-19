import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams  } from '@angular/common/http';

import { Observable } from 'rxjs';

import { HttpParamsHelper } from '../helpers/http-params-helper';
import { AppConfig } from 'src/app/app.config';
import { Sexo } from '../modelos/sexo.model';


@Injectable({
    providedIn: 'root'
})
export class SexoServico {

    constructor(private http: HttpClient) { }

    filtrar(params?: FiltrarParams, ignoreLoading?: boolean): Observable<Sexo[]> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json; charset=utf-8',
            'App-Ignore-Loading': ignoreLoading ? 'true' : 'false'
        });

        let body = new HttpParams();
        body = HttpParamsHelper.setObject(body, params);

        return this.http.get<Sexo[]>(`${AppConfig.api}/sexo`, {
            params : body,
            headers
          });
    }
}

interface FiltrarParams {
    descricao?: string[] | string;
}
