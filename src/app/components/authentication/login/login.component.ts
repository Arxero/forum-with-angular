import { Component, OnInit } from '@angular/core';
import { LoginModel } from 'src/app/core/models/auth-models/login.model';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    loginModel: LoginModel

    constructor(private authService : AuthService) {
        this.loginModel = new LoginModel('', '', false);
     }

    ngOnInit() {
    }

    login() {
        this.authService.loginUser(this.loginModel).subscribe()
    }

}
