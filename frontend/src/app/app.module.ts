import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {CheckboxModule} from 'primeng/checkbox';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import { OverviewComponent } from './overview/overview.component';
import {ToolbarModule} from 'primeng/toolbar';
import {SelectButtonModule} from 'primeng/selectbutton';
import { BlockUIModule } from 'primeng/blockui';
import { DataViewModule } from 'primeng/dataview';
import { RatingModule } from 'primeng/rating';
import { TagModule } from 'primeng/tag';
import { ErrorComponent } from './error/error.component';
import { AccessComponent } from './access/access.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { JwtInterceptor } from './jwt.interceptor';
import { WINDOW_PROVIDERS } from './wToken';
import { JwtHelperService, JWT_OPTIONS } from "@auth0/angular-jwt";
import { CarouselModule } from 'primeng/carousel';
import { LogoutComponent } from './logout/logout.component';

export function tokenGetter() {
  return localStorage.getItem("access_token");
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    OverviewComponent,
    ErrorComponent,
    AccessComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    CheckboxModule,
    InputTextModule,
    ButtonModule,
    ToolbarModule,
    SelectButtonModule,
    BlockUIModule,
    DataViewModule,
    RatingModule,
    TagModule,
    CarouselModule,
    JwtModule.forRoot({
      config: {
       tokenGetter: tokenGetter,
      allowedDomains: ["localhost:3000", "foo.com", "bar.com"]
      },
    }),
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    WINDOW_PROVIDERS,
    JwtHelperService, 
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
