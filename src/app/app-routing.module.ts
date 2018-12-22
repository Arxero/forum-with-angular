import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Guards

//Components
import { RegisterComponent } from './components/authentication/register/register.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { ForumsComponent } from './components/home/forums/forums.component';
import { HomeModule } from './components/home/home.module';
import { AuthGuard } from './core/guards/auth.guard';


const routes: Routes = [
    { path: '', component: ForumsComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'view', loadChildren: () => HomeModule },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: []
})
export class AppRoutingModule { }
