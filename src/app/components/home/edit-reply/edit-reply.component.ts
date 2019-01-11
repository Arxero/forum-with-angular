import { Component, OnInit } from '@angular/core';
import { ReplyModel } from 'src/app/core/models/topic-models/reply.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ReplyService } from 'src/app/core/services/reply.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-edit-reply',
    templateUrl: './edit-reply.component.html',
    styleUrls: ['./edit-reply.component.scss']
})
export class EditReplyComponent implements OnInit {
    replyModel: ReplyModel
    replyId: string
    forumId: string
    topicId: string
    

    constructor(
        public authService: AuthService,
        private route: ActivatedRoute,
        private replyService: ReplyService,
        private toastr: ToastrService,
        private router: Router) {
        this.replyId = route.snapshot.params['replyId']
        this.forumId = route.snapshot.params['forumId']
        this.topicId = route.snapshot.params['topicId']

    }

    ngOnInit() {
        this.replyService.getReplyById(this.replyId).subscribe(data => {
            this.replyModel = data
        })
    }

    editReply() {
        this.replyService.editReply(this.replyId, this.replyModel).subscribe( () => {
            this.toastr.success('Reply Edited Successfully', 'Success')
            this.router.navigate([`/view/forum/${this.forumId}/viewtopic/${this.topicId}`])
        })
    }

    addEmoji(event) {
        let emoji = event.target.innerText
        this.replyModel.content += emoji
    }
    insertImageTags() {
        this.replyModel.content += '[img][/img]'
    }
    insertVideoTags() {
        this.replyModel.content += '[video][/video]'
    }
    insertAudioTags() {
        this.replyModel.content += '[audio][/audio]'
    }

}
