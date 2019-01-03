import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { AuthService } from './auth.service';
import { UserModel } from '../models/auth-models/user.model';

const USER_URL = 'https://baas.kinvey.com/user/kid_HkUANrtxV'

@Injectable({
    providedIn: 'root'
})

export class UsersService {
    constructor(private http: HttpClient,
        private authService: AuthService, ) { }

    getAllUsers() {
        return this.http.get<UserModel[]>(USER_URL)
    }

    getUserByName(username: string) {
        return this.http.get<UserModel>(USER_URL + '/' + `?query={"username":"${username}"}`)
    }

    getUserById (id: string) {
        return this.http.get<UserModel>(USER_URL + '/' + id)
    }

    editUserById(body: Object, id: string) {
        return this.http.put(USER_URL + '/' + id, body)
    }


}