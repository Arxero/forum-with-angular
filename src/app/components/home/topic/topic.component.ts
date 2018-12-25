import { Component, OnInit, Input } from '@angular/core';
import { AddTopicModel } from 'src/app/core/models/topic-models/add-topic.model';
import { ActivatedRoute } from '@angular/router';
import { TopicService } from 'src/app/core/services/topic.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
    selector: 'app-topic',
    templateUrl: './topic.component.html',
    styleUrls: ['./topic.component.scss']
})
export class TopicComponent implements OnInit {
    //@Input ('singleTopic') singleTopic: AddTopicModel;
    postId: string
    forumId: string
    topic: AddTopicModel
    user: any
    constructor(
        private route: ActivatedRoute,
        private topicService: TopicService,
        public authService: AuthService) {
        this.postId = this.route.snapshot.params['topicId']
        this.forumId = this.route.snapshot.params['forumId']
    }

    ngOnInit() {
        this.topicService.getSingleTopic(this.postId).subscribe(data => {
            this.topic = data
            this.authService.getUserByName(this.topic.author).subscribe(data => {
                this.user = data
            })
        })
    }

}
