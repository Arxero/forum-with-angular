import { Component, OnInit, Input } from '@angular/core';
import { ReplyModel } from 'src/app/core/models/topic-models/reply.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { ReplyService } from 'src/app/core/services/reply.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-add-reply',
    templateUrl: './add-reply.component.html',
    styleUrls: ['./add-reply.component.scss']
})
export class AddReplyComponent implements OnInit {
    replyModel : ReplyModel
    replies : Observable<ReplyModel[]>
    adminRole: string = 'edcd0c4e-6625-4896-bacb-e8ea4c2f8e91'

    @Input ('topicId') topicId: string;
    @Input ('topicTitle') topicTitle: string;
    @Input ('forumId') forumId: string;

    constructor(
        private replyService: ReplyService,
        public authService: AuthService,) {
            let author = ''
            if (authService.isLoggedIn()) {
                author = authService.user().username
            }
            this.replyModel = new ReplyModel('','', author, '')
        }

    ngOnInit() {
        this.replyModel.topicId = this.topicId
        this.replyModel.topicTitle = this.topicTitle
        this.replies = this.replyService.getCommentsByTopicId(this.replyModel.topicId)
    }

    addReply() {
        this.replyService.addReply(this.replyModel).subscribe(() => {
            this.replies = this.replyService.getCommentsByTopicId(this.replyModel.topicId)
            this.replyModel.content = ''
        })
    }

    addEmoji(event) {
        let emoji = event.target.innerText
        this.replyModel.content += emoji
    }

}
