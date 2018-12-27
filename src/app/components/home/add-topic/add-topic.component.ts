import { Component, OnInit } from '@angular/core';
import { AddTopicModel } from 'src/app/core/models/topic-models/add-topic.model';
import { TopicService } from 'src/app/core/services/topic.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-add-topic',
    templateUrl: './add-topic.component.html',
    styleUrls: ['./add-topic.component.scss']
})
export class AddTopicComponent implements OnInit {
    addTopicModel: AddTopicModel
    forumId : string
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
        let forumId = this.route.snapshot.params['id']
        this.addTopicModel = new AddTopicModel('', '', author, forumId, 0)

        this.forumId = this.route.snapshot.params['id']
    }

    ngOnInit() {
    }

    addTopic() {
        this.topicService.createTopic(this.addTopicModel).subscribe()
        
    }
    addEmoji(event) {
        let emoji = event.target.innerText
        this.addTopicModel.description += emoji
    }
}
