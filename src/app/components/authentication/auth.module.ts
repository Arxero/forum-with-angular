import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'

//Components
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

//Modules
import { AppRoutingModule } from 'src/app/app-routing.module';

//Service
import { AuthService } from 'src/app/core/services/auth.service';
import { ProfileComponent } from './profile/profile.component';
import { MyTopicsComponent } from './my-topics/my-topics.component';


@NgModule({
    declarations: [
        RegisterComponent,
        LoginComponent,
        ProfileComponent,
        MyTopicsComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        AppRoutingModule
    ],
    providers: [
        AuthService
    ]

})
export class AuthModule { }
