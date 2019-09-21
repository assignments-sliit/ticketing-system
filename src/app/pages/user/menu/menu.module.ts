import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MenuPage } from './menu.page';

const routes: Routes = [
  {
    path: '',
    component: MenuPage,
    children:[
      { path: 'profile', 
      loadChildren: '../profile/profile.module#ProfilePageModule'
     },
      { path: 'users-home',
       loadChildren: '../users-home/users-home.module#UsersHomePageModule'
       },
     { path: 'view-time-table',
      loadChildren: '../view-time-table/view-time-table.module#ViewTimeTablePageModule' 
    },
    {
      path :'',
      redirectTo:'/menu/users-home'
    }

    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MenuPage]
})
export class MenuPageModule {}
