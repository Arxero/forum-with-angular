import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TopicService } from 'src/app/core/services/topic.service';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
    searchInput: string
    searchResults: any

    constructor(
        private route: ActivatedRoute,
        private topicService: TopicService) {
        this.searchInput = this.route.snapshot.params['id']
    }


    ngOnInit() {
        this.topicService.searchTopic(this.searchInput).subscribe(data => {
            this.searchResults = data
        })
        
    }

}
