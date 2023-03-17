import { Component, OnInit } from '@angular/core';
import{ loadStripe, Stripe } from '@stripe/stripe-js'
import { CheckoutService } from './../checkout.service';
import { Address } from './stripe.model';

@Component({
  selector: 'app-stripe',
  templateUrl: './stripe.component.html',
  styleUrls: ['./stripe.component.css']
})
export class StripeComponent implements OnInit { 

title = 'stripe-payment';
address: Address = new Address();
personName:string = ''
email:string = ''
success: boolean = false
failure:boolean = false
inputError: string = '';

private stripe: Stripe;

constructor(private checkout: CheckoutService) {

}

async ngOnInit() {
  this.stripe = await loadStripe('pk_test_51MllwGBUJKiCM3GCrQYp5SLrIFAd34f1dhnhG4osqY3D3UxvX5drgEgPknaJlgKVFXRwjoFkcTVBNY4RlM8CneAG00Vi5JTpLO')

  const elements = this.stripe.elements();
  const card = elements.create('card');
  card.mount('#card')

  card.on('change', (event) => {
    const displayError = document.getElementById('card-errors');
    event.error ? displayError.textContent = event.error.message: displayError.textContent='';
    this.inputError = displayError.textContent
    console.log("displayError", displayError.textContent)
  });
    const button = document.getElementById('button');
    button.addEventListener('click', async(event)=>{
      event.preventDefault();
      const ownerInfo = {
        owner: {name: this.personName, email: this.email, address: this.address},
        amount: 1000 * 100,
        currency: 'mxn'
      };

      const paymentstripe = (stripeToken: any) => {
        this.checkout.makePayment(stripeToken).subscribe((data: any) => {
          console.log(data);
          if (data.data === "success") {
            this.success = true
          }
          else {
            this.failure = true
          }
      });
    }

      try{
        const result = await this.stripe.createSource(card, ownerInfo);
        console.log('result:', result)
        paymentstripe(result.source)
      }
      catch(e) {
        console.warn(e.message)
      }
  })
}
}
