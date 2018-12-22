import { Component, OnInit } from '@angular/core';
import { AddTopicModel } from 'src/app/core/models/topic-models/add-topic.model';

@Component({
  selector: 'app-add-topic',
  templateUrl: './add-topic.component.html',
  styleUrls: ['./add-topic.component.scss']
})
export class AddTopicComponent implements OnInit {
    addTopicModel : AddTopicModel

  constructor() { }

  ngOnInit() {
  }

}
