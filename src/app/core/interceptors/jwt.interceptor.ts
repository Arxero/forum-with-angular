import {
    HttpResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest
} from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, pipe } from 'rxjs'
import { tap } from 'rxjs/operators'
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

const APP_KEY = 'kid_HkUANrtxV'
const APP_SECRET = '2ae495c1e2924ce8b81a5a730d4021be'
const APP_MASTER_SECRET = '06a4d33a83f6460eabe479f71a977d41'
const ADMIN_ROLE = 'edcd0c4e-6625-4896-bacb-e8ea4c2f8e91'


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(
        private toastr: ToastrService,
        private router: Router,
        private authService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler)
        : Observable<HttpEvent<any>> {

        //setting headers for register and login requests
        if (request.url.endsWith('/') || request.url.endsWith('login')) {
            request = request.clone({
                setHeaders: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + btoa(APP_KEY + ':' + APP_SECRET)
                }
            })
        } else if ( request.url.includes('forumId') || request.url.includes('topics') || request.url.includes('?query={"username":') || request.url.includes('replies') || (request.url.includes('user') && !request.url.endsWith('_logout')) || request.url.endsWith(ADMIN_ROLE) && request.method === 'GET') {
            request = request.clone({ //when we try to load the topics about the certain forum
                setHeaders: {
                    'Content-Type': 'application/json',
                    'Authorization': "Basic " + btoa(APP_KEY + ":" + APP_MASTER_SECRET)
                }
            })
        } else {
            request = request.clone({ //always except both scenarious above
                setHeaders: {
                    'Content-Type': 'application/json',
                    'Authorization': "Kinvey " + this.authService.user().authtoken
                }
            })
        }



        return next.handle(request)
            .pipe(tap((res: any) => {
                if (res instanceof HttpResponse && res.url.endsWith('/')) {
                    this.toastr.success('You have successfully registered', 'Success')
                    this.router.navigate(['/'])
                    this.saveUser(res.body)
                } else if (res instanceof HttpResponse && res.url.endsWith('login')) {
                    //check if 'remember me' is checked
                    if (request.body.isRemembered) {
                        this.saveUserLocalStorage(res.body)
                    } else {
                        this.saveUser(res.body)
                    }
                    this.toastr.success('You are logged in', 'Success')
                    this.router.navigate(['/'])
                } else if (res instanceof HttpResponse && res.url.endsWith('_logout')) {
                    sessionStorage.clear()
                    localStorage.clear()
                    this.toastr.success('You are logged out', 'Success')
                    this.router.navigate(['/'])
                } else if (res instanceof HttpResponse && res.url.endsWith('topics') && res.statusText == 'Created') {
                    this.toastr.success('Topic created successfully', 'Success')
                    this.router.navigate([`/view/forum/${res.body.forumId}`])
                }
            }))
    }


    private saveUser(data) {
        if (data._kmd.roles) { // in case user have been an admin
            if (data._kmd.roles.length > 0) { // in case user is admin atm
                sessionStorage.setItem('user', JSON.stringify({
                    'username': data.username,
                    'authtoken': data._kmd.authtoken,
                    'id': data._id,
                    'role': data._kmd.roles[0].roleId,
                    'image': data.image,
                }))
            } else if (data._kmd.roles.length === 0) { // in case user have been an admin, but not anymore
                sessionStorage.setItem('user', JSON.stringify({
                    'username': data.username,
                    'authtoken': data._kmd.authtoken,
                    'id': data._id,
                    'image': data.image,
                }))
            }
        } else {
            sessionStorage.setItem('user', JSON.stringify({ // normal user
                'username': data.username,
                'authtoken': data._kmd.authtoken,
                'id': data._id,
                'image': data.image,
            }))
        }
    }

    private saveUserLocalStorage(data) {
        if (data._kmd.roles) { // in case user have been an admin
            if (data._kmd.roles.length > 0) { // in case user is admin atm
                localStorage.setItem('user', JSON.stringify({
                    'username': data.username,
                    'authtoken': data._kmd.authtoken,
                    'id': data._id,
                    'role': data._kmd.roles[0].roleId,
                    'image': data.image,
                }))
            } else if (data._kmd.roles.length === 0) { // in case user have been an admin, but not anymore
                localStorage.setItem('user', JSON.stringify({
                    'username': data.username,
                    'authtoken': data._kmd.authtoken,
                    'id': data._id,
                    'image': data.image,
                }))
            }
        } else {
            localStorage.setItem('user', JSON.stringify({ // normal user
                'username': data.username,
                'authtoken': data._kmd.authtoken,
                'id': data._id,
                'image': data.image,
            }))
        }
    }

}