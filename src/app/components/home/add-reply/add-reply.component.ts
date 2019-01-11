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
    urlRegex: any = new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g)

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


            this.replies.map(reply => {
                //looking for new lines and if there is replace it with break
                reply.content = reply.content.replace(new RegExp('\n', 'g'), "<br/>")

                //looking for urls in the post and if there is make them clickable
                let urlRegexNoImgTag = new RegExp(/(?<!])https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g)
                if (urlRegexNoImgTag.test(reply.content)) {
                    reply.content.match(urlRegexNoImgTag).map(url => {
                        reply.content = reply.content.replace(url, `<a href=${url}>${url}</a>`)
                    })
                }

                //looking for bbcode for image and if there is one or more, display the image
                let imageRegexWithTags = new RegExp(/\[img]https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)\[\/img]/g)
                let imageRegexWithoutTags = new RegExp(/(?<=\[img])https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)(?=\[\/img])/g)
                if (imageRegexWithTags.test(reply.content)) {
                    reply.content.match(imageRegexWithTags).map(imageUrlWithTags => {
                        let imageUrlWithoutTags = imageUrlWithTags.match(imageRegexWithoutTags)[0]

                        reply.content = reply.content.replace(imageUrlWithTags, `<img src="${imageUrlWithoutTags}" alt="image" class="post-image">`)
                    })
                }

                //looking for video link ending like .mp4
                let videoTagRegexWithTags = new RegExp(/\[video]https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)\[\/video]/g)
                if (videoTagRegexWithTags.test(reply.content)) {
                    reply.content.match(videoTagRegexWithTags).map(videoUrlWithTags => {
                        let videoUrlWithoutTags = videoUrlWithTags.match(this.urlRegex)[0]
                        reply.content = reply.content.replace(videoUrlWithTags, `<video src="${videoUrlWithoutTags}" controls="controls" width=100%>Please upgrade to a browser which supports HTML 5.</video>`)
                    })
                }

                //looking for audio links ending like .mp3
                let audioTagRegexWithTags = new RegExp(/\[audio]https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)\[\/audio]/g)
                if (audioTagRegexWithTags.test(reply.content)) {
                    reply.content.match(audioTagRegexWithTags).map(audioUrlWithTags => {
                        let audioUrlWithoutTags = audioUrlWithTags.match(this.urlRegex)[0]
                        reply.content = reply.content.replace(audioUrlWithTags, `<audio src="${audioUrlWithoutTags}" controls="controls" width=100%>Please upgrade to a browser which supports HTML 5.</audio>`)
                    })
                }

                //looking for youtube url in order to embed the video directly
                let youtubeUrlRegex = new RegExp(/(?<=(<a href=https:\/\/www\.youtube\.com\/watch\?v=).{11}>(https:\/\/www\.youtube\.com\/watch\?v=)).*?(?=<\/a>)/g)
                if (youtubeUrlRegex.test(reply.content)) {
                    reply.content.match(youtubeUrlRegex).map(videoId => {
                        let youtubeLinkWithAnchors = `<a href=https://www.youtube.com/watch?v=${videoId}>https://www.youtube.com/watch?v=${videoId}</a>`
                        let videoUrl = 'https://www.youtube.com/embed/' + videoId;
                        reply.content = reply.content.replace(youtubeLinkWithAnchors, `<iframe max-width="100%" width="100%" height="423" src="${videoUrl}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`)
                    })
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

                ///////////////////
                this.replies.map(reply => {
                    //looking for new lines and if there is replace it with break
                    reply.content = reply.content.replace(new RegExp('\n', 'g'), "<br/>")
    
                    //looking for urls in the post and if there is make them clickable
                    let urlRegexNoImgTag = new RegExp(/(?<!])https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g)
                    if (urlRegexNoImgTag.test(reply.content)) {
                        reply.content.match(urlRegexNoImgTag).map(url => {
                            reply.content = reply.content.replace(url, `<a href=${url}>${url}</a>`)
                        })
                    }
    
                    //looking for bbcode for image and if there is one or more, display the image
                    let imageRegexWithTags = new RegExp(/\[img]https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)\[\/img]/g)
                    let imageRegexWithoutTags = new RegExp(/(?<=\[img])https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)(?=\[\/img])/g)
                    if (imageRegexWithTags.test(reply.content)) {
                        reply.content.match(imageRegexWithTags).map(imageUrlWithTags => {
                            let imageUrlWithoutTags = imageUrlWithTags.match(imageRegexWithoutTags)[0]
    
                            reply.content = reply.content.replace(imageUrlWithTags, `<img src="${imageUrlWithoutTags}" alt="image" class="post-image">`)
                        })
                    }
    
                    //looking for video link ending like .mp4
                    let videoTagRegexWithTags = new RegExp(/\[video]https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)\[\/video]/g)
                    if (videoTagRegexWithTags.test(reply.content)) {
                        reply.content.match(videoTagRegexWithTags).map(videoUrlWithTags => {
                            let videoUrlWithoutTags = videoUrlWithTags.match(this.urlRegex)[0]
                            reply.content = reply.content.replace(videoUrlWithTags, `<video src="${videoUrlWithoutTags}" controls="controls" width=100%>Please upgrade to a browser which supports HTML 5.</video>`)
                        })
                    }
    
                    //looking for audio links ending like .mp3
                    let audioTagRegexWithTags = new RegExp(/\[audio]https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)\[\/audio]/g)
                    if (audioTagRegexWithTags.test(reply.content)) {
                        reply.content.match(audioTagRegexWithTags).map(audioUrlWithTags => {
                            let audioUrlWithoutTags = audioUrlWithTags.match(this.urlRegex)[0]
                            reply.content = reply.content.replace(audioUrlWithTags, `<audio src="${audioUrlWithoutTags}" controls="controls" width=100%>Please upgrade to a browser which supports HTML 5.</audio>`)
                        })
                    }
    
                    //looking for youtube url in order to embed the video directly
                    let youtubeUrlRegex = new RegExp(/(?<=(<a href=https:\/\/www\.youtube\.com\/watch\?v=).{11}>(https:\/\/www\.youtube\.com\/watch\?v=)).*?(?=<\/a>)/g)
                    if (youtubeUrlRegex.test(reply.content)) {
                        reply.content.match(youtubeUrlRegex).map(videoId => {
                            let youtubeLinkWithAnchors = `<a href=https://www.youtube.com/watch?v=${videoId}>https://www.youtube.com/watch?v=${videoId}</a>`
                            let videoUrl = 'https://www.youtube.com/embed/' + videoId;
                            reply.content = reply.content.replace(youtubeLinkWithAnchors, `<iframe max-width="100%" width="100%" height="423" src="${videoUrl}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`)
                        })
                    }
                })

                ////////////////

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
