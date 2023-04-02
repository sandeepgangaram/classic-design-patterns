//Dependency Inversion Principle
//High level modules should not be directly depending
//on the low level modules
//but rather depend on abstract class/interface

//example:
// Store -> Stripe NO
//Store -> PaymentProcessor -> (Stripe, Paypal) YES

class Stripe {
  user: string;
  constructor(user: string) {
    this.user = user;
  }

  makePayment(amountInCents: number) {
    console.log(
      `${this.user} made a payment of $${amountInCents / 100} with Stripe.`
    );
  }
}

class Paypal {
  makePayment(user: string, amountInDollars: number) {
    console.log(`${user} made payment of $${amountInDollars} with Paypal.`);
  }
}

//Interface to define the Wrapper Structure
interface PaymentProcessor {
  user: string;
  pay: (amount: number) => void;
}

class StripePaymentProcessor implements PaymentProcessor {
  user: string;
  stripe: any;

  constructor(user: string) {
    this.user = user;
    this.stripe = new Stripe(user);
  }

  pay(amountInDollars: number) {
    this.stripe.makePayment(amountInDollars * 100);
  }
}

class PaypalPaymentProcessor implements PaymentProcessor {
  user: string;
  paypal: any;

  constructor(user: string) {
    this.user = user;
    this.paypal = new Paypal();
  }

  pay(amountInDollars: number) {
    this.paypal.makePayment(this.user, amountInDollars);
  }
}
