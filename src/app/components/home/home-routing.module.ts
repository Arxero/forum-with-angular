import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForumComponent } from './forum/forum.component';
import { AddTopicComponent } from './add-topic/add-topic.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';

const homeRoutes: Routes = [
    {path: 'forum/:id', component: ForumComponent},
    {path: 'forum/:id/add-topic', component: AddTopicComponent, canActivate: [AuthGuard]},
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