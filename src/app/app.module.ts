import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Route, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar.component';
import { CompletedPage } from './pages/completed.page';
import { HomePage } from './pages/home.page';

const routes: Route[] = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'completed',
    component: CompletedPage,
  },
];
@NgModule({
  declarations: [AppComponent, HomePage, CompletedPage, NavbarComponent],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
