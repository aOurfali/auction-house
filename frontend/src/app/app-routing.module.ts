import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ErrorComponent } from './error/error.component';
import { OverviewComponent } from './overview/overview.component';
import { AuctionsComponent } from './auctions/auctions.component';
import { MyAuctionsComponent } from './my-auctions/my-auctions.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: OverviewComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'loginError', component: ErrorComponent },
  { path: 'auctions', component: AuctionsComponent },
  { path: 'myAuctions', component: MyAuctionsComponent },
  { path: 'profile', component: ProfileComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
