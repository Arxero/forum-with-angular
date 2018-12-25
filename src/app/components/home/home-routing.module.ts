import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForumComponent } from './forum/forum.component';
import { AddTopicComponent } from './add-topic/add-topic.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { TopicComponent } from './topic/topic.component';
import { EditTopicComponent } from './edit-topic/edit-topic.component';

const homeRoutes: Routes = [
    {path: 'forum/:id', component: ForumComponent},
    {path: 'forum/:id/add-topic', component: AddTopicComponent, canActivate: [AuthGuard]},
    {path: 'forum/:forumId/viewtopic/:topicId', component: TopicComponent},
    {path: 'forum/:forumId/edittopic/:topicId', component: EditTopicComponent},
]

@NgModule({
    imports: [
        RouterModule.forChild(homeRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class HomeRoutingModule { }