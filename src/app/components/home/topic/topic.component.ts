import { Component, OnInit, Input } from '@angular/core';
import { AddTopicModel } from 'src/app/core/models/topic-models/add-topic.model';
import { ActivatedRoute, Router } from '@angular/router';
import { TopicService } from 'src/app/core/services/topic.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from 'src/app/core/services/users.service';
import { UserModel } from 'src/app/core/models/auth-models/user.model';

@Component({
    selector: 'app-topic',
    templateUrl: './topic.component.html',
    styleUrls: ['./topic.component.scss']
})
export class TopicComponent implements OnInit {
    //@Input ('singleTopic') singleTopic: AddTopicModel;
    topicId: string
    forumId: string
    topic: AddTopicModel
    user: UserModel
    forumName: Object = {
        '1': 'Announcements',
        '2': 'VIP Application',
        '3': 'Admin Application',
        '4': 'Suggestions',
        '5': 'Cafeteria',
    }
    adminRole: string = 'edcd0c4e-6625-4896-bacb-e8ea4c2f8e91'
    urlRegex: any = new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g)


    constructor(
        private route: ActivatedRoute,
        private topicService: TopicService,
        public authService: AuthService,
        private toastr: ToastrService,
        private router: Router,
        private userService: UsersService,) {
        this.topicId = this.route.snapshot.params['topicId']
        this.forumId = this.route.snapshot.params['forumId']

    }

    ngOnInit() {
        this.topicService.getSingleTopic(this.topicId).subscribe(data => {
            this.topic = data
            //looking for new lines and if there is replace it with break
            this.topic.description = this.topic.description.replace(new RegExp('\n', 'g'), "<br/>")

            //looking for urls in the post and if there is make them clickable
            let urlRegexNoImgTag = new RegExp(/(?<!])https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g)
            if (urlRegexNoImgTag.test(this.topic.description)) {
                this.topic.description.match(urlRegexNoImgTag).map(url => {
                    this.topic.description = this.topic.description.replace(url, `<a href=${url}>${url}</a>`)
                })
            }

            //looking for bbcode for image and if there is one or more, display the image
            let imageRegexWithTags = new RegExp(/\[img]https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)\[\/img]/g)
            let imageRegexWithoutTags = new RegExp(/(?<=\[img])https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)(?=\[\/img])/g)
            if (imageRegexWithTags.test(this.topic.description)) {
                this.topic.description.match(imageRegexWithTags).map(imageUrlWithTags => {
                    let imageUrlWithoutTags = imageUrlWithTags.match(imageRegexWithoutTags)[0]
                    
                    this.topic.description = this.topic.description.replace(imageUrlWithTags, `<img src="${imageUrlWithoutTags}" alt="image" class="post-image">`)
                })
            }

            //looking for video link ending like .mp4
            let videoTagRegexWithTags =  new RegExp(/\[video]https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)\[\/video]/g)
            if (videoTagRegexWithTags.test(this.topic.description)) {
                this.topic.description.match(videoTagRegexWithTags).map(videoUrlWithTags => {
                    let videoUrlWithoutTags = videoUrlWithTags.match(this.urlRegex)[0]
                    this.topic.description = this.topic.description.replace(videoUrlWithTags, `<video src="${videoUrlWithoutTags}" controls="controls" width=100%>Please upgrade to a browser which supports HTML 5.</video>`)
                })
            }

            //looking for audio links ending like .mp3
            let audioTagRegexWithTags =  new RegExp(/\[audio]https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)\[\/audio]/g)
            if (audioTagRegexWithTags.test(this.topic.description)) {
                this.topic.description.match(audioTagRegexWithTags).map(audioUrlWithTags => {
                    let audioUrlWithoutTags = audioUrlWithTags.match(this.urlRegex)[0]
                    this.topic.description = this.topic.description.replace(audioUrlWithTags, `<audio src="${audioUrlWithoutTags}" controls="controls" width=100%>Please upgrade to a browser which supports HTML 5.</audio>`)
                })
            }

            //looking for youtube url in order to embed the video directly
            let youtubeUrlRegex = new RegExp(/<a href=https:\/\/www.youtube.com\/.+?>.+<\/a>/g)
            if (youtubeUrlRegex.test(this.topic.description)) {
                this.topic.description.match(youtubeUrlRegex).map(youtubeLinkWithAnchors => {
                    let youtubeLinkWithoutAnchors = youtubeLinkWithAnchors.match(this.urlRegex)[0].substr(32)
                    let videoUrl = 'https://www.youtube.com/embed/' + youtubeLinkWithoutAnchors;
                    this.topic.description = this.topic.description.replace(youtubeLinkWithAnchors, `<iframe max-width="100%" width="752" height="423" src="${videoUrl}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`)
                })
            }

            this.userService.getUserByName(this.topic.author).subscribe(data => {
                this.user = data
            })
        })
    }

    deleteTopic(id: string) {
        if (confirm(`DELETE topic: ${this.topic.subject}\nAre you sure about that?`)) {
            this.topicService.deleteTopic(this.topicId).subscribe(() => {
                this.toastr.success('Topic Deleted Successfully', 'Success')
                this.router.navigate([`view/forum/${this.forumId}`])

                this.userService.getUserByName(this.topic.author).subscribe(data => {
                    this.user = data[0]
                    this.user.postsCount -= 1
                    this.userService.editUserById(this.user, this.user._id).subscribe()
                })
            })
        }
    }

}
