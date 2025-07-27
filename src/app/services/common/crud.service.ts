import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';

export class CrudService<T> extends HttpService {
  constructor(protected override http: HttpClient) {
    super(http);
  }

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(this.baseUrl);
  }

  getById(id: string): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${id}`);
  }

  create(entity: T): Observable<T> {
    return this.http.post<T>(this.baseUrl, entity);
  }

  update(id: string, entity: T): Observable<T> {
    return this.http.patch<T>(`${this.baseUrl}/${id}`, entity);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
