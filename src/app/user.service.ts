import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // defaultFilters = '0000000000000000';

  constructor(private http: Http) { }

  getAllUsers() {
    return this.http.get('/api/users');
  }
  
  // getUser(id: string) {
  //   return this.http.get('/api/users/${id}');
  // }

  getUsers(user) {
    return this.http.get(`/api/users/${user.id}`);
  }

  addUser(user) {
    return this.http.post('/api/users',{
      "email": user.email,
      "password": user.password,
      "filters": user.filters
    });
  }

  // Use backtick when using $
  editUser(user) {
    return this.http.patch(`/api/users/${user.id}`, {
      "email": user.email,
      "password": user.password,
      "filters": user.filters
    });
  }

  deleteUser(user){
    return this.http.delete('/api/users/' + user.id);
  }
}

