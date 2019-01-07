import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

//providers
import { UsersService } from 'src/app/core/services/users.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { ViewUserComponent } from './view-user/view-user.component';
import { UsersRoutingModule } from './users-routing.module';
import { AllUsersComponent } from './all-users/all-users.component';
import { EditUserComponent } from './edit-user/edit-user.component';

@NgModule({
    declarations: [
        ViewUserComponent,
        AllUsersComponent,
        EditUserComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        UsersRoutingModule
    ],
    providers: [
        UsersService,
        AuthService
    ]
})

export class UsersModule { }