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
    forumId : number
    topicId : string
    forumName: Object = {
        '1' : 'Announcements',
        '2' : 'VIP Application',
        '3' : 'Admin Application',
        '4' : 'Suggestions',
        '5' : 'Cafeteria',
    }

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

    editTopic(){
        this.topicService.editTopic(this.topicId, this.editTopicModel).subscribe(() => {
            this.toastr.success('Topic edited successfully', 'Success')
            this.router.navigate([`view/forum/${this.forumId}/viewtopic/${this.topicId}`])
            
        })
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
