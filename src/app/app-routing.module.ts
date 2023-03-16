import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StripeComponent } from './stripe/stripe.component';


const routes: Routes = [
  { path: 'stripe', component: StripeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
