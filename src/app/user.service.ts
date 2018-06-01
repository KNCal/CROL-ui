import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // defaultFilters = '0000000000000000';
  // user: User;
  
  constructor(private http: HttpClient) { }

  getUsername(user) {
    console.log(user.username);
    // console.log(`${user.username}`);
    return this.http.get(`api/users/find/${user.username}`);
  }

  getAllUsers() {
    return this.http.get('/api/users');
  }
  
  getUserByID(id) {
    return this.http.get('api/users/' + id);
  }

  getUser(user) {
    console.log(user.id);
    return this.http.get(`/api/users/${user}`);
    // return this.http.get(`/api/users/` + user.id);
  }

  addUser(user) {
    return this.http.post('/api/users',{
      "username": user.username,
      "password": user.password,
      "filters": user.filters
    });
  }

  // Use backtick when using $
  editUser(userId,user) {
    return this.http.patch('/api/users/' + userId, {
      "id" : userId,
      "username": user.username,
      "password": user.password,
      "filters": user.filters
    });
  }

  deleteUser(user){
    return this.http.delete('/api/users/' + user.id);
  }
}

