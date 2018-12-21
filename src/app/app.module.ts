import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Modules
import { AuthModule } from './components/authentication/auth.module';

//Interceptors
import { JwtInterceptor } from './core/interceptors/jwt.interceptor';


//Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/shared/header/header.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
  ],
  providers: [
      {
          provide: HTTP_INTERCEPTORS,
          useClass: JwtInterceptor, 
          multi: true
      }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
