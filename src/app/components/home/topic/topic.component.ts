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
        '1' : 'Announcements',
        '2' : 'VIP Application',
        '3' : 'Admin Application',
        '4' : 'Suggestions',
        '5' : 'Cafeteria',
    }
    adminRole: string = 'edcd0c4e-6625-4896-bacb-e8ea4c2f8e91'
    urlRegex: any = new RegExp(/(?<!])https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g)
    imageRegexWithTags: any = new RegExp(/\[img]https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)\[\/img]/g)
    imageRegexWithoutTags: any = new RegExp(/(?<=\[img])https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)(?=\[\/img])/g)

    constructor(
        private route: ActivatedRoute,
        private topicService: TopicService,
        public authService: AuthService,
        private toastr: ToastrService,
        private router: Router,
        private userService : UsersService) {
        this.topicId = this.route.snapshot.params['topicId']
        this.forumId = this.route.snapshot.params['forumId']
        
    }

    ngOnInit() {
        this.topicService.getSingleTopic(this.topicId).subscribe(data => {
            this.topic = data
            // this.topic.description = this.topic.description.replace(/[\r\n]+/, '<br>')
            this.topic.description = this.topic.description.replace(new RegExp('\n', 'g'), "<br/>")
            this.topic.description.match(this.urlRegex).map(url => {
                this.topic.description = this.topic.description.replace(url, `<a href=${url}>${url}</a>`)
            })
            this.topic.description.match(this.imageRegexWithTags).map(imageUrlWithTags => {
                let imageUrlWithoutTags = imageUrlWithTags.match(this.imageRegexWithoutTags)[0]
                console.log(imageUrlWithoutTags);
                
                this.topic.description = this.topic.description.replace(imageUrlWithTags, `<img src="${imageUrlWithoutTags}" alt="image" class="post-image">`)
            })
            // this.topic.description.match(this.imageRegex).map(matchedImage => {
                
            //     let linkImage = matchedImage.match(this.urlRegex)
            //     console.log(matchedImage + '');

            //     this.topic.description = this.topic.description.replace(matchedImage, `<img src="${linkImage[0]}" alt="image" class="post-image">`)
            // })

            //let matchedImage = this.topic.description.match(this.imageRegex)
            //let linkImage = matchedImage.match(this.urlRegex)
            //this.topic.description = this.topic.description.replace(matchedImage, `<img src="${linkImage}" alt="image" class="post-image">`)
            //console.log(matchedImage);
            
            //this.topic.description = this.topic.description.replace(matchedUrl, `<a href=${matchedUrl}>${matchedUrl}</a>`)
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
