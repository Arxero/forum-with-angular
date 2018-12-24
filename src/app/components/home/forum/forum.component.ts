import { Component, OnInit, Input } from '@angular/core';
import { TopicService } from 'src/app/core/services/topic.service';
import { AddTopicModel } from 'src/app/core/models/topic-models/add-topic.model';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-forum',
    templateUrl: './forum.component.html',
    styleUrls: ['./forum.component.scss']
})
export class ForumComponent implements OnInit {
    topics: AddTopicModel[]
    forumId: string
    forumName: Object = {
        '1' : 'Announcements',
        '2' : 'VIP Application',
        '3' : 'Admin Application',
        '4' : 'Suggestions',
        '5' : 'Cafeteria',
    }
    

    constructor(private topicService: TopicService,
        private route: ActivatedRoute) {
            this.forumId = this.route.snapshot.params['id']
         }

    ngOnInit() {
        this.topicService.getTopicsByForum(this.forumId).subscribe(data => {
            this.topics = data;
        })
    }

}
