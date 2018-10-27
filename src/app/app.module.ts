import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { SingupAdvanceComponent } from './singup-advance/singup-advance.component';
import { AddressComponent } from './address/address.component';

@NgModule({
  declarations: [AppComponent, SignupComponent, SingupAdvanceComponent, AddressComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: 'signup', component: SignupComponent },
      { path: 'signup-advance', component: SingupAdvanceComponent },
      {
        path: 'product',
        loadChildren: './product/product.module#ProductModule'
      },
      { path: '**', redirectTo: '/signup', pathMatch: 'full' }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
