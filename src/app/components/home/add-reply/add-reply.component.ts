import { Component, OnInit, Input } from '@angular/core';
import { ReplyModel } from 'src/app/core/models/topic-models/reply.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { ReplyService } from 'src/app/core/services/reply.service';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { TopicService } from 'src/app/core/services/topic.service';
import { AddTopicModel } from 'src/app/core/models/topic-models/add-topic.model';
import { RegisterModel } from 'src/app/core/models/auth-models/register.model';
import { UsersService } from 'src/app/core/services/users.service';
import { UserModel } from 'src/app/core/models/auth-models/user.model';

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
    users: any
    user: UserModel

    @Input('topicId') topicId: string;
    @Input('topicTitle') topicTitle: string;
    @Input('forumId') forumId: string;

    constructor(
        private replyService: ReplyService,
        public authService: AuthService,
        private toastr: ToastrService,
        private router: Router,
        private topicService: TopicService,
        private userService: UsersService) {
        let author = ''
        if (authService.isLoggedIn()) {
            author = authService.user().username
        }
        this.replyModel = new ReplyModel('', '', author, '', this.forumId)
    }

    ngOnInit() {
        this.replyModel.topicId = this.topicId
        this.replyModel.topicTitle = this.topicTitle
        this.replyModel.forumId = this.forumId
        this.replyService.getCommentsByTopicId(this.topicId).subscribe(data => {
            this.replies = data
            this.userService.getAllUsers().subscribe(data => {
                this.users = data
                for (let i = 0; i < this.users.length; i++) {
                    this.users[this.users[i].username] = this.users[i]
                    this.users.splice(i--, 1)
                }
            })
        })
    }

    addReply() {
        this.replyService.addReply(this.replyModel).subscribe(() => {
            //this.replies = this.replyService.getCommentsByTopicId(this.replyModel.topicId)
            this.replyService.getCommentsByTopicId(this.topicId).subscribe(data => {
                this.replies = data
                this.replyModel.content = ''

                //this is to increase reply count on the topic in forums page
                this.topicService.getSingleTopic(this.topicId).subscribe(data => {
                    this.topicModel = data
                    this.topicModel.replies += 1
                    this.topicService.editTopic(this.topicId, this.topicModel).subscribe()
                })

                //refreshing the users meta info
                this.users[this.authService.user().username].postsCount += 1

                //this is to increase postCount in the current user
                let userId = this.authService.user().id
                this.userService.getUserById(userId).subscribe(data => {
                    this.user = data
                    this.user.postsCount += 1
                    this.userService.editUserById(this.user, this.user._id).subscribe()
                })
            })
        })
    }

    deleteReply(id: string, author: string) {
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

                    //this is to deincrease postCount in the current user
                    this.userService.getUserByName(author).subscribe(data => {
                        this.user = data[0]
                        this.user.postsCount -= 1
                        this.userService.editUserById(this.user, this.user._id).subscribe()
                        //refreshing the users meta info
                        this.users[author].postsCount -= 1
                    })
                })
            })
        }
    }

    addEmoji(event) {
        let emoji = event.target.innerText
        this.replyModel.content += emoji
    }

}
