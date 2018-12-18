import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameComponent } from './game/game.component';
import { AboutComponent } from './about/about.component';
import { AuthenticatedGuard } from './guards/authenticated.guard';
import { TemplateDrivenFormComponent } from './template-driven-form/template-driven-form.component';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';

const routes: Routes = [
    { path: 'home', component: GameComponent },
    { path: 'about/:id/:name', component: AboutComponent, canActivate: [AuthenticatedGuard] },
    { path: 'template-driven-form', component: TemplateDrivenFormComponent },
    { path: 'reactive-form', component: ReactiveFormComponent },
    { path: '', component: GameComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [AuthenticatedGuard]
})
export class AppRoutingModule { }
