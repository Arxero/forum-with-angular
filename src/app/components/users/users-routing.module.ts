import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../core/guards/auth.guard';
import { ViewUserComponent } from './view-user/view-user.component';

const userRoutes : Routes = [
    {path: 'details/:id', component: ViewUserComponent },
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