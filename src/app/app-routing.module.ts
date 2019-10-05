import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'sign-in', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'user-home', loadChildren: './pages/user-home/user-home.module#UserHomePageModule' },
  { path: 'admin-home', loadChildren: './pages/admin-home/admin-home.module#AdminHomePageModule' },
  { path: 'sign-up', loadChildren: './pages/sign-up/sign-up.module#SignUpPageModule' },
  { path: 'sign-in', loadChildren: './pages/sign-in/sign-in.module#SignInPageModule' },
  { path: 'menu', loadChildren: './pages/user/menu/menu.module#MenuPageModule' },
  { path: 'profile-edit', loadChildren: './pages/user/profile-edit/profile-edit.module#ProfileEditPageModule' },  { path: 'process-trip', loadChildren: './pages/process-trip/process-trip.module#ProcessTripPageModule' },
  { path: 'dummy-page', loadChildren: './pages/dummy-page/dummy-page.module#DummyPagePageModule' },
  { path: 'loan-req-modal', loadChildren: './pages/loan-req-modal/loan-req-modal.module#LoanReqModalPageModule' },


  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
