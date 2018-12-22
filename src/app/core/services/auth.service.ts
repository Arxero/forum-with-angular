import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterModel } from '../models/auth-models/register.model';
import { LoginModel } from '../models/auth-models/login.model';


const REGISTER_URL = 'https://baas.kinvey.com/user/kid_HkUANrtxV/';
const LOGIN_URL = 'https://baas.kinvey.com/user/kid_HkUANrtxV/login';
const LOGOUT_URL = 'https://baas.kinvey.com/user/kid_HkUANrtxV/_logout';
const EDIT_URL = 'https://baas.kinvey.com/user/kid_HkUANrtxV/';

@Injectable()
export class AuthService {
    constructor(private http: HttpClient) { }

    registerUser(body: RegisterModel) {
        return this.http.post(REGISTER_URL, body)
    }
    loginUser(body: LoginModel) {
        return this.http.post(LOGIN_URL, body)
    }
    logoutUser(body: Object = {}) {
        return this.http.post(LOGOUT_URL, body)
    }

    user() {
        return JSON.parse(sessionStorage.getItem('user') || localStorage.getItem('user'))
    }

    isLoggedIn(): boolean {
        if (sessionStorage.getItem('user') || localStorage.getItem('user')) {
            return true
        }
        return false
    }

}
