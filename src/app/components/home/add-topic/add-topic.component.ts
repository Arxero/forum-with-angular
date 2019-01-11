import { Component, OnInit } from '@angular/core';
import { AddTopicModel } from 'src/app/core/models/topic-models/add-topic.model';
import { TopicService } from 'src/app/core/services/topic.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/core/services/users.service';
import { UserModel } from 'src/app/core/models/auth-models/user.model';

@Component({
    selector: 'app-add-topic',
    templateUrl: './add-topic.component.html',
    styleUrls: ['./add-topic.component.scss']
})
export class AddTopicComponent implements OnInit {
    addTopicModel: AddTopicModel
    alteredDescription: string
    forumId: string
    forumName: Object = {
        '1': 'Announcements',
        '2': 'VIP Application',
        '3': 'Admin Application',
        '4': 'Suggestions',
        '5': 'Cafeteria',
    }
    user: UserModel

    constructor(
        private topicService: TopicService,
        public authService: AuthService,
        private route: ActivatedRoute,
        private userService: UsersService) {
        let author = authService.user().username
        let forumId = this.route.snapshot.params['id']
        this.addTopicModel = new AddTopicModel('', '', author, forumId, 0)

        this.forumId = this.route.snapshot.params['id']

    }

    ngOnInit() {
    }

    addTopic() {
        this.topicService.createTopic(this.addTopicModel).subscribe(() => {
            this.userService.getUserByName(this.addTopicModel.author).subscribe(data => {
                this.user = data[0]
                this.user.postsCount += 1
                this.userService.editUserById(this.user, this.user._id).subscribe()
            })
        })

    }

    convertBBCode() {
        //console.log('yes');
        console.log(this.alteredDescription);
        this.alteredDescription = ''
        //looking for new lines and if there is replace it with break
        this.addTopicModel.description = this.addTopicModel.description.replace(new RegExp('\n', 'g'), "<br/>")
    
        //looking for urls in the post and if there is make them clickable
        // let urlRegexNoImgTag = new RegExp(/(?<!])https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g)
        // if (urlRegexNoImgTag.test(this.addTopicModel.description)) {
            
        //     this.addTopicModel.description.match(urlRegexNoImgTag).map(url => {
        //         this.alteredDescription = this.addTopicModel.description.replace(url, `<a href=${url}>${url}</a>`)
        //     })
        // }

        //looking for bbcode for image and if there is one or more, display the image
        let imageRegexWithTags = new RegExp(/\[img]https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)\[\/img]/g)
        let imageRegexWithoutTags = new RegExp(/(?<=\[img])https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)(?=\[\/img])/g)
        if (imageRegexWithTags.test(this.addTopicModel.description)) {
            this.addTopicModel.description.match(imageRegexWithTags).map(imageUrlWithTags => {
                let imageUrlWithoutTags = imageUrlWithTags.match(imageRegexWithoutTags)[0]
                
                this.addTopicModel.description = this.addTopicModel.description.replace(imageUrlWithTags, `<img src="${imageUrlWithoutTags}" alt="image" class="post-image">`)
            })
        }
    }


    addEmoji(event) {
        let emoji = event.target.innerText
        this.addTopicModel.description += emoji
    }
    insertImageTags() {
        this.addTopicModel.description += '[img][/img]'
    }
    insertVideoTags() {
        this.addTopicModel.description += '[video][/video]'
    }
    insertAudioTags() {
        this.addTopicModel.description += '[audio][/audio]'
    }
}
