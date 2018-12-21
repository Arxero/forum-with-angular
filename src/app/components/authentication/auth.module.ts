import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'

//Components
import { RegisterComponent } from './register/register.component';

//Modules
import { AppRoutingModule } from 'src/app/app-routing.module';
import { LoginComponent } from './login/login.component';
import { AuthService } from 'src/app/core/services/auth.service';

@NgModule({
    declarations: [
        RegisterComponent,
        LoginComponent
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
