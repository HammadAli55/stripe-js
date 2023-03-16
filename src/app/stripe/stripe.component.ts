import { Component, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import{ loadStripe, Stripe } from '@stripe/stripe-js'

@Component({
  selector: 'app-stripe',
  templateUrl: './stripe.component.html',
  styleUrls: ['./stripe.component.css']
})
export class StripeComponent implements OnInit { 

title = 'stripe-payment';
private stripe: Stripe;

constructor() {

}

async ngOnInit() {
  this.stripe = await loadStripe('Enter Publishable key')

  const elements = this.stripe.elements();
  const card = elements.create('card');
  card.mount('#card')

  card.on('change', (event) => {
    const displayError = document.getElementById('card-errors');
    event.error ? displayError.textContent = event.error.message: displayError.textContent='';
  });
    const button = document.getElementById('button');
    button.addEventListener('click', async(event)=>{
      event.preventDefault();
      const ownerInfo = {
        owner: {name: 'hammad'},
        amount: 1000 * 100,
        currency: 'mxn'
      };

      try{
        const result = await this.stripe.createSource(card, ownerInfo);
        console.log('result:', result)
      }
      catch(e) {
        console.warn(e.message)
      }
  })
}
}
