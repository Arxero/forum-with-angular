import { Component, OnInit } from '@angular/core';
import { TopicService } from 'src/app/core/services/topic.service';

@Component({
    selector: 'app-forums',
    templateUrl: './forums.component.html',
    styleUrls: ['./forums.component.scss']
})
export class ForumsComponent implements OnInit {
    allTopics : Object = {
        '1' : [],
        '2' : [],
        '3' : [],
        '4' : [],
        '5' : [],
    }
    constructor(private topicService: TopicService) { }

    ngOnInit() {
        this.topicService.getAllTopics().subscribe(data => {
            this.allTopics['1'] = data.filter(x => x.forumId == 1)
            this.allTopics['2'] = data.filter(x => x.forumId == 2)
            this.allTopics['3'] = data.filter(x => x.forumId == 3)
            this.allTopics['4'] = data.filter(x => x.forumId == 4)
            this.allTopics['5'] = data.filter(x => x.forumId == 5)
            //data = data.filter(x => x.forumId == 2)
            console.log(this.allTopics);
            
        })
    }

}
