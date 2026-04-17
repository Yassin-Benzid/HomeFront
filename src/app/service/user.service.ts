import { Injectable } from '@angular/core';    
import { HttpClient, HttpHeaders } from '@angular/common/http';  @Injectable({  
providedIn: 'root'  
})  
export class UserService {  private apiUrl = 'http://localhost:3000/users';

constructor(private http: HttpClient) {}

// ================= HEADERS JWT =================
private getHeaders() {
const token = localStorage.getItem('token');

return {
headers: new HttpHeaders({
Authorization: 'Bearer ' + token
})
};

}

// ================= PROFILE =================
getProfile() {
return this.http.get(
this.apiUrl + '/profile',
this.getHeaders()
);
}

// ================= UPDATE PROFILE =================
updateProfile(user: any) {
return this.http.put(
this.apiUrl + '/profile',
user,
this.getHeaders()
);
}

// ================= ADMIN USERS =================
getUsers() {
return this.http.get(this.apiUrl, this.getHeaders());
}

getUserById(id: number) {
return this.http.get(this.apiUrl + '/' + id, this.getHeaders());
}

addUser(user: any) {
return this.http.post(this.apiUrl + '/register', user);
}

deleteUser(id: number) {
return this.http.delete(this.apiUrl + '/' + id, this.getHeaders());
}
}