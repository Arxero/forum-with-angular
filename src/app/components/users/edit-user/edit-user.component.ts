import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/core/services/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserModel } from 'src/app/core/models/auth-models/user.model';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-edit-user',
    templateUrl: './edit-user.component.html',
    styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
    userId: string
    userModel: UserModel

    constructor(
        private userService: UsersService,
        private route: ActivatedRoute,
        private toastr: ToastrService,
        private router: Router ) {
            this.userId = this.route.snapshot.params['id']
         }

    ngOnInit() {
        this.userService.getUserById(this.userId).subscribe(data => {
            this.userModel = data
        })
    }

    editUser() {
        this.userService.editUserById(this.userModel, this.userModel._id).subscribe(() => {
            this.toastr.success(`User ${this.userModel.username} edited successfully`, 'Success')
            if (this.userModel._kmd['roles']) {
                this.router.navigate(['/login'])
                sessionStorage.clear()
                localStorage.clear()
            } else {
                this.router.navigate(['/user/all'])
            }
        })
    }
    
}
