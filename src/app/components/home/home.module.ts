import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

//Components
import { ForumsComponent } from './forums/forums.component';


//Modules
import { ForumComponent } from './forum/forum.component';
import { HomeRoutingModule } from './home-routing.module';
import { AddTopicComponent } from './add-topic/add-topic.component';
import { TopicComponent } from './topic/topic.component';
import { EditTopicComponent } from './edit-topic/edit-topic.component';
import { AddReplyComponent } from './add-reply/add-reply.component';
import { TopicService } from 'src/app/core/services/topic.service';
import { ReplyService } from 'src/app/core/services/reply.service';
import { EditReplyComponent } from './edit-reply/edit-reply.component';


@NgModule({
    declarations: [
        ForumsComponent,
        ForumComponent,
        AddTopicComponent,
        TopicComponent,
        EditTopicComponent,
        AddReplyComponent,
        EditReplyComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        HomeRoutingModule
    ],
    providers: [
        TopicService,
        ReplyService
    ]

})
export class HomeModule { }
