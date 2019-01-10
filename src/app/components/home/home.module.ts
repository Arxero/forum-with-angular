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
import { UsersService } from 'src/app/core/services/users.service';
import { SafePipe } from 'src/app/core/pipes/safe.pipe';


@NgModule({
    declarations: [
        ForumsComponent,
        ForumComponent,
        AddTopicComponent,
        TopicComponent,
        EditTopicComponent,
        AddReplyComponent,
        EditReplyComponent,
        SafePipe
    ],
    imports: [
        CommonModule,
        FormsModule,
        HomeRoutingModule
    ],
    providers: [
        TopicService,
        ReplyService,
        UsersService
    ]

})
export class HomeModule { }
