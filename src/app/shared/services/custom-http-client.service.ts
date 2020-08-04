import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface IRequestOptions {
  headers?: HttpHeaders;
  observe?: 'body';
  params?: HttpParams;
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
  body?: any;
  api?: string;
}

@Injectable({
  providedIn: 'root',
})
export class CustomHttpClient {
  private api = 'https://randomuser.me/api/';

  constructor(private http: HttpClient) {}

  public get<T>(endPoint: string, options?: IRequestOptions): Observable<T> {
    const api = options && options.api ? options.api : this.api;
    return this.http.get<T>(api + endPoint, options);
  }

  public post<T>(endPoint: string, params?: object, options?: IRequestOptions): Observable<T> {
    const api = options && options.api ? options.api : this.api;
    return this.http.post<T>(api + endPoint, params, options);
  }

  public put<T>(endPoint: string, params?: object, options?: IRequestOptions): Observable<T> {
    const api = options && options.api ? options.api : this.api;
    return this.http.put<T>(api + endPoint, params, options);
  }

  public delete<T>(endPoint: string, options?: IRequestOptions): Observable<T> {
    const api = options && options.api ? options.api : this.api;
    return this.http.delete<T>(api + endPoint, options);
  }
}

export function customHttpClientCreator(http: HttpClient) {
  return new CustomHttpClient(http);
}
