import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'

//Components
import { ForumsComponent } from './forums/forums.component';


//Modules
import { AppRoutingModule } from 'src/app/app-routing.module';

@NgModule({
    declarations: [
        ForumsComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        AppRoutingModule
    ],
    providers: [
    ]

})
export class HomeModule { }
