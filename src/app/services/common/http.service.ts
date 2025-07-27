import { HttpClient, HttpContext, HttpHeaders, HttpParams } from '@angular/common/http';

export class HttpService {
  protected baseUrl = 'http://localhost:3000';
  protected options: {
    headers?: HttpHeaders | Record<string, string | string[]>;
    context?: HttpContext;
    observe?: 'body';
    params?: HttpParams;
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
    transferCache?:
      | {
          includeHeaders?: string[];
        }
      | boolean;
  } = {};

  constructor(protected http: HttpClient) {}
}
