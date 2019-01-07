import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/core/services/users.service';
import { UserModel } from 'src/app/core/models/auth-models/user.model';
import { AuthService } from 'src/app/core/services/auth.service';

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
        public authService: AuthService,) { }

    ngOnInit() {
        this.userService.getAllUsers().subscribe(data => {
            this.users = data
        })
    }

    

}
