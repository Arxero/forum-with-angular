import { Component, OnInit } from '@angular/core';
import { RegisterModel } from 'src/app/core/models/auth-models/register-model';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    registerModel : RegisterModel;
    emailRegex : string = '^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$'
    
    constructor(private authService: AuthService) {
        this.registerModel = new RegisterModel('', '', '', '');
     }

    ngOnInit() {
    }

    register(){
        this.authService.registerUser(this.registerModel).subscribe()
    }
}
