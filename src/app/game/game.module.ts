import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { GameComponent } from './game.component';
import { SubscribeComponent } from '../subscribe/subscribe.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AboutComponent } from '../about/about.component';
import { TemplateDrivenFormComponent } from '../template-driven-form/template-driven-form.component';
import { ReactiveFormComponent } from '../reactive-form/reactive-form.component';

@NgModule({
    declarations: [
        GameComponent,
        SubscribeComponent,
        AboutComponent,
        TemplateDrivenFormComponent,
        ReactiveFormComponent
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [
        GameComponent,
    ]
})

export class HomeModule {
}