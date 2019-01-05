import { Component, OnInit } from '@angular/core';
import { TopicService } from 'src/app/core/services/topic.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { AddTopicModel } from 'src/app/core/models/topic-models/add-topic.model';

@Component({
    selector: 'app-my-topics',
    templateUrl: './my-topics.component.html',
    styleUrls: ['./my-topics.component.scss']
})
export class MyTopicsComponent implements OnInit {
    topics: AddTopicModel[]

    constructor(
        private topicService: TopicService,
        private authService: AuthService
    ) { }

    ngOnInit() {
        this.topicService.getMyTopics(this.authService.user().username).subscribe(data => {
            this.topics = data
        })
    }

}
