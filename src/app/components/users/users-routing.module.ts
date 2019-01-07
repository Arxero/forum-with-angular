import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../core/guards/auth.guard';
import { ViewUserComponent } from './view-user/view-user.component';
import { AllUsersComponent } from './all-users/all-users.component';
import { EditUserComponent } from './edit-user/edit-user.component';

const userRoutes : Routes = [
    {path: 'details/:id', component: ViewUserComponent },
    {path: 'all', component: AllUsersComponent },
    {path: 'edit/:id', component: EditUserComponent },
]

@NgModule({
    imports: [
        RouterModule.forChild(userRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class UsersRoutingModule { }