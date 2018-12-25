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


@NgModule({
    declarations: [
        ForumsComponent,
        ForumComponent,
        AddTopicComponent,
        TopicComponent,
        EditTopicComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        HomeRoutingModule
    ],
    providers: [
    ]

})
export class HomeModule { }
