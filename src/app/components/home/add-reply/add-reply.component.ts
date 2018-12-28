import { Component, OnInit, Input } from '@angular/core';
import { ReplyModel } from 'src/app/core/models/topic-models/reply.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { ReplyService } from 'src/app/core/services/reply.service';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { TopicService } from 'src/app/core/services/topic.service';
import { AddTopicModel } from 'src/app/core/models/topic-models/add-topic.model';

@Component({
    selector: 'app-add-reply',
    templateUrl: './add-reply.component.html',
    styleUrls: ['./add-reply.component.scss']
})
export class AddReplyComponent implements OnInit {
    replyModel: ReplyModel
    //replies : Observable<ReplyModel[]>
    replies: ReplyModel[]
    adminRole: string = 'edcd0c4e-6625-4896-bacb-e8ea4c2f8e91'
    topicModel: AddTopicModel
    replyAuthor: any
    user: any = []

    @Input('topicId') topicId: string;
    @Input('topicTitle') topicTitle: string;
    @Input('forumId') forumId: string;

    constructor(
        private replyService: ReplyService,
        public authService: AuthService,
        private toastr: ToastrService,
        private router: Router,
        private topicService: TopicService) {
        let author = ''
        if (authService.isLoggedIn()) {
            author = authService.user().username
        }
        this.replyModel = new ReplyModel('', '', author, '')
    }

    ngOnInit() {
        this.replyModel.topicId = this.topicId
        this.replyModel.topicTitle = this.topicTitle
        this.replyService.getCommentsByTopicId(this.replyModel.topicId).subscribe(data => {
            this.replies = data
            this.replies.forEach(reply => {
                this.authService.getUserByName(reply.author).subscribe(data => {
                    this.user.push(data[0])
                    // this.user = this.user.sort((a, b) => {
                    //     return Number(b._kmd.ect) - Number(a._kmd.ect)
                    // })
                    //objs.sort((a,b) => (a.last_nom > b.last_nom) ? 1 : ((b.last_nom > a.last_nom) ? -1 : 0));
                    //this.user.sort((a, b) => a._kmd.ect - b._kmd.ect)
                    //console.log(data[0]);
                    console.log(this.user);
                })
            })
        })
    }

    addReply() {
        this.replyService.addReply(this.replyModel).subscribe(() => {
            //this.replies = this.replyService.getCommentsByTopicId(this.replyModel.topicId)
            this.replyService.getCommentsByTopicId(this.replyModel.topicId).subscribe(data => {
                this.replies = data
                this.replyModel.content = ''
                //this is to increase reply count on the topic in forums page
                this.topicService.getSingleTopic(this.topicId).subscribe(data => {
                    this.topicModel = data
                    this.topicModel.replies += 1
                    this.topicService.editTopic(this.topicId, this.topicModel).subscribe()
                })
            })
        })
    }

    deleteReply(id: string) {
        if (confirm('DELETE selected reply.\nAre you sure about that?')) {
            this.replyService.deleteReply(id).subscribe(() => {
                this.toastr.success('Reply Deleted Successfully', 'Success')
                this.replyService.getCommentsByTopicId(this.replyModel.topicId).subscribe(data => {
                    this.replies = data
                    //this is to reduce reply count on the topic in forums page
                    this.topicService.getSingleTopic(this.topicId).subscribe(data => {
                        this.topicModel = data
                        this.topicModel.replies -= 1
                        this.topicService.editTopic(this.topicId, this.topicModel).subscribe()
                    })
                })
            })
        }
    }

    replyLog(reply) {
        console.log(reply);

    }

    addEmoji(event) {
        let emoji = event.target.innerText
        this.replyModel.content += emoji
    }

}
