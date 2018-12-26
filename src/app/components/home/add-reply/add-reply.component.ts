import { Component, OnInit, Input } from '@angular/core';
import { ReplyModel } from 'src/app/core/models/topic-models/reply.model';
import { TopicService } from 'src/app/core/services/topic.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
    selector: 'app-add-reply',
    templateUrl: './add-reply.component.html',
    styleUrls: ['./add-reply.component.scss']
})
export class AddReplyComponent implements OnInit {
    replyModel : ReplyModel
    @Input ('topicId') topicId: string;

    constructor(
        private topicService: TopicService,
        public authService: AuthService,) { 
            this.replyModel = new ReplyModel('', '', '')
        }

    ngOnInit() {
    }

    addReply() {

    }

}
