import { Component, OnInit } from '@angular/core';
import { AddTopicModel } from 'src/app/core/models/topic-models/add-topic.model';
import { TopicService } from 'src/app/core/services/topic.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-edit-topic',
    templateUrl: './edit-topic.component.html',
    styleUrls: ['./edit-topic.component.scss']
})
export class EditTopicComponent implements OnInit {
    editTopicModel: AddTopicModel
    forumId: number
    topicId: string
    forumName: Object = {
        '1': 'Announcements',
        '2': 'VIP Application',
        '3': 'Admin Application',
        '4': 'Suggestions',
        '5': 'Cafeteria',
    }
    alteredDescription: string
    urlRegex: any = new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g)

    constructor(
        private topicService: TopicService,
        public authService: AuthService,
        private route: ActivatedRoute,
        private toastr: ToastrService,
        private router: Router) {
        this.forumId = this.route.snapshot.params['forumId']
        this.topicId = this.route.snapshot.params['topicId']
    }

    ngOnInit() {
        this.topicService.getSingleTopic(this.topicId).subscribe(data => {
            this.editTopicModel = data
        })
    }

    editTopic() {
        this.topicService.editTopic(this.topicId, this.editTopicModel).subscribe(() => {
            this.toastr.success('Topic edited successfully', 'Success')
            this.router.navigate([`view/forum/${this.forumId}/viewtopic/${this.topicId}`])

        })
    }

    convertBBCode() {
        this.alteredDescription = this.editTopicModel.description

        //looking for new lines and if there is replace it with break
        this.alteredDescription = this.alteredDescription.replace(new RegExp('\n', 'g'), "<br/>")
        
        //looking for urls in the post and if there is make them clickable
        let urlRegexNoImgTag = new RegExp(/(?<!])https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g)
        if (urlRegexNoImgTag.test(this.alteredDescription)) {
            
            this.alteredDescription.match(urlRegexNoImgTag).map(url => {
                this.alteredDescription = this.alteredDescription.replace(url, `<a href=${url}>${url}</a>`)
            })
        }

        //looking for bbcode for image and if there is one or more, display the image
        let imageRegexWithTags = new RegExp(/\[img]https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)\[\/img]/g)
        let imageRegexWithoutTags = new RegExp(/(?<=\[img])https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)(?=\[\/img])/g)
        if (imageRegexWithTags.test(this.alteredDescription)) {
            this.alteredDescription.match(imageRegexWithTags).map(imageUrlWithTags => {
                let imageUrlWithoutTags = imageUrlWithTags.match(imageRegexWithoutTags)[0]
                
                this.alteredDescription = this.alteredDescription.replace(imageUrlWithTags, `<img src="${imageUrlWithoutTags}" alt="image" class="post-image">`)
            })
        }

        //looking for video link ending like .mp4
        let videoTagRegexWithTags =  new RegExp(/\[video]https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)\[\/video]/g)
        if (videoTagRegexWithTags.test(this.alteredDescription)) {
            this.alteredDescription.match(videoTagRegexWithTags).map(videoUrlWithTags => {
                let videoUrlWithoutTags = videoUrlWithTags.match(this.urlRegex)[0]
                this.alteredDescription = this.alteredDescription.replace(videoUrlWithTags, `<video src="${videoUrlWithoutTags}" controls="controls" width=100%>Please upgrade to a browser which supports HTML 5.</video>`)
            })
        }

        //looking for audio links ending like .mp3
        let audioTagRegexWithTags =  new RegExp(/\[audio]https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)\[\/audio]/g)
        if (audioTagRegexWithTags.test(this.alteredDescription)) {
            this.alteredDescription.match(audioTagRegexWithTags).map(audioUrlWithTags => {
                let audioUrlWithoutTags = audioUrlWithTags.match(this.urlRegex)[0]
                this.alteredDescription = this.alteredDescription.replace(audioUrlWithTags, `<audio src="${audioUrlWithoutTags}" controls="controls" width=100%>Please upgrade to a browser which supports HTML 5.</audio>`)
            })
        }

        //looking for youtube url in order to embed the video directly
        let youtubeUrlRegex = new RegExp(/(?<=(<a href=https:\/\/www\.youtube\.com\/watch\?v=).{11}>(https:\/\/www\.youtube\.com\/watch\?v=)).*?(?=<\/a>)/g)
        if (youtubeUrlRegex.test(this.alteredDescription)) {
            this.alteredDescription.match(youtubeUrlRegex).map(videoId => {
                let youtubeLinkWithAnchors = `<a href=https://www.youtube.com/watch?v=${videoId}>https://www.youtube.com/watch?v=${videoId}</a>`
                let videoUrl = 'https://www.youtube.com/embed/' + videoId;
                this.alteredDescription = this.alteredDescription.replace(youtubeLinkWithAnchors, `<iframe max-width="100%" width="100%" height="423" src="${videoUrl}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`)
            })
        }
    }



    addEmoji(asd) {
        let emoji = asd.target.innerText
        this.editTopicModel.description += emoji
    }
    insertImageTags() {
        this.editTopicModel.description += '[img][/img]'
    }
    insertVideoTags() {
        this.editTopicModel.description += '[video][/video]'
    }
    insertAudioTags() {
        this.editTopicModel.description += '[audio][/audio]'
    }

}
