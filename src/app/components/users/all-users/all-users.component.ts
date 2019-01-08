import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/core/services/users.service';
import { UserModel } from 'src/app/core/models/auth-models/user.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
    selector: 'app-all-users',
    templateUrl: './all-users.component.html',
    styleUrls: ['./all-users.component.scss']
})
export class AllUsersComponent implements OnInit {
    users: UserModel[]
    adminRole: string = 'edcd0c4e-6625-4896-bacb-e8ea4c2f8e91'

    constructor(
        private userService: UsersService,
        public authService: AuthService,
        private toastr: ToastrService,
        private router: Router) { }

    ngOnInit() {
        this.userService.getAllUsers().subscribe(data => {
            this.users = data
        })
    }

    adminUser(selectedUser: UserModel) {
        if (confirm(`Make user ${selectedUser.username} an admin?`)) {
            this.userService.adminUserById(selectedUser._id).subscribe(() => {
                this.toastr.success(`${selectedUser.username} is an admin now`, 'Success')
                this.router.navigate(['/user/all'])
            })
        }
    }

    unAdminUser(selectedUser: UserModel) {
        if (confirm(`Remove admin from user ${selectedUser.username}?`)) {
            this.userService.unAdminUser(selectedUser._id).subscribe(() => {
                this.toastr.success(`${selectedUser.username} is a member now`, 'Success')
                this.router.navigate(['/user/all'])
            })
        }
    }

    deleteUser(selectedUser) {
        if (confirm(`DELETE user ${selectedUser.username}?`)) {
            this.userService.deleteUser(selectedUser._id).subscribe(() => {
                this.toastr.success(`User ${selectedUser.username} Deleted Successfully!`, 'Success!')
                this.router.navigate(['/user/all'])
            })
        }
    }

}
