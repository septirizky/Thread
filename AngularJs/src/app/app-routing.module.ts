import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProfilComponent } from './profil/profil.component';
import { ThreadComponent } from './components/thread/thread.component';
import { UserComponent } from './components/user/user.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  {
    path: 'home',
    component: HomeComponent,
    children: [{ path: 'threads', component: ThreadComponent }],
  },
  {
    path: 'profil',
    component: ProfilComponent,
    children: [{ path: 'users/:id', component: UserComponent }],
  },

  // { path: 'users/:id', component: UserComponent },
  // { path: 'product/add', component: AddProductComponent },
  // { path: 'product/update/:id', component: EditProductComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
