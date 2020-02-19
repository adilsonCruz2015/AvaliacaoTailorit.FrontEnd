import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams  } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { HttpParamsHelper } from '../helpers/http-params-helper';
import { AppConfig } from 'src/app/app.config';
import { Usuario } from '../modelos/usuario.model';

@Injectable({
    providedIn: 'root'
})
export class UsuarioServico {

    constructor(private http: HttpClient) { }

    filtrar(params: FiltrarParams, ignoreLoading?: boolean) : Observable<Usuario[]> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json; charset=utf-8',
            'App-Ignore-Loading': ignoreLoading ? 'true' : 'false'
        });

        let body = new HttpParams();
        body = HttpParamsHelper.setObject(body, params);

        return this.http.get<Usuario[]>(`${AppConfig.api}/usuario`, {
            params : body,
            headers
          });
    }

    inserir(params: InserirParams, ignoreLoading?: boolean): Observable<string> {
        const headers = new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
          'App-Ignore-Loading': ignoreLoading ? 'true' : 'false'
        });

        let body = new HttpParams();
        body = HttpParamsHelper.setObject(body, params);

        return this.http.post<Usuario>(`${AppConfig.api}/usuario`, body, {
          headers
        }).pipe(map(dados => dados['id']));
      }
}

interface FiltrarParams {
    nome?: string[] | string;
    ativo?: boolean[] | boolean;
  }

interface InserirParams {
   nome?: string;
   dataNascimento?: string;
   email?: string;
   senha?: string;
   sexo?: number;
   ativo?: boolean;
}
