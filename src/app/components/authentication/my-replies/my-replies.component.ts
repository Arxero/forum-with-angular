import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { ReplyService } from 'src/app/core/services/reply.service';
import { ReplyModel } from 'src/app/core/models/topic-models/reply.model';

@Component({
    selector: 'app-my-replies',
    templateUrl: './my-replies.component.html',
    styleUrls: ['./my-replies.component.scss']
})
export class MyRepliesComponent implements OnInit {
    replies: ReplyModel[]

    constructor(
        private authService: AuthService,
        private replyService: ReplyService) { }

    ngOnInit() {
        this.replyService.getMyReplies(this.authService.user().username).subscribe(data => {
            this.replies = data
        })
    }

}
