import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/core/services/users.service';
import { ActivatedRoute } from '@angular/router';
import { UserModel } from 'src/app/core/models/auth-models/user.model';

@Component({
    selector: 'app-view-user',
    templateUrl: './view-user.component.html',
    styleUrls: ['./view-user.component.scss']
})
export class ViewUserComponent implements OnInit {
    userName: string
    user: UserModel

    constructor(
        private userService: UsersService,
        private route: ActivatedRoute,) { 
        this.userName = this.route.snapshot.params['id']
    }

    ngOnInit() {
        this.userService.getUserByName(this.userName).subscribe(data => {
            this.user = data[0]
            console.log(this.user);
            
        }) 
    }

}
