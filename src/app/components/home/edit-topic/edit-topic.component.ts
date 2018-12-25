import { Component, OnInit } from '@angular/core';
import { AddTopicModel } from 'src/app/core/models/topic-models/add-topic.model';
import { TopicService } from 'src/app/core/services/topic.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { ActivatedRoute } from '@angular/router';

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
        public route: ActivatedRoute) {
        let author = authService.user().username
        this.forumId = +this.route.snapshot.params['forumId']
        this.editTopicModel = new AddTopicModel('', '', '', 0, 0)
    
        this.topicId = this.route.snapshot.params['topicId']
    }

    ngOnInit() {
        this.topicService.getSingleTopic(this.topicId).subscribe(data => {
            this.editTopicModel = data
        })
    }

    editTopic(){
        this.topicService.editPost(this.topicId, this.editTopicModel).subscribe(() => {
            //work in progress, scheduled for tommorow
        })
    }

    addEmoji(asd) {
        let emoji = asd.target.innerText
        this.editTopicModel.description += emoji
    }

}
