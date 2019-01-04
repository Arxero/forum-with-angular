import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/core/models/auth-models/user.model';
import { UsersService } from 'src/app/core/services/users.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
    userModel: UserModel

    constructor(
        private userService: UsersService,
        private authService: AuthService,
        private toastr: ToastrService,
        private router: Router,) { }

    ngOnInit() {
        this.userService.getUserById(this.authService.user().id).subscribe(data => {
            this.userModel = data
        })
    }

    editUser() {
        this.userService.editUserById(this.userModel, this.userModel._id).subscribe(() => {
            this.toastr.success('Profile edited successfully', 'Success')
            sessionStorage.clear()
            localStorage.clear()
            this.router.navigate(['/login'])
        })
    }

}
