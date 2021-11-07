import { path } from '@angular-devkit/core';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { NotFoundComponent } from './index/not-found/not-found.component';
import { CustomPreloadingStrategyService } from './shared/custom-preloading-strategy.service';

const routes: Routes = [ {path:'register', component: RegisterComponent},
{path:'login', component: LoginComponent},
{ path: 'gallery', loadChildren: () => import('./gallery/gallery.module').then(m => m.GalleryModule),data:{ preload: true}},
{path:'**',component: NotFoundComponent},
{path:'', redirectTo:'login', pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: CustomPreloadingStrategyService})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
