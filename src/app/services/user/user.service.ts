import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CrudService } from '../common/crud.service';
import { User } from '../../dto/user.dto';

@Injectable({
  providedIn: 'root',
})
export class UserService extends CrudService<User> {
  constructor(http: HttpClient) {
    super(http);
    this.baseUrl += '/users';
  }
}
