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

  makePayment(amountInCents) {
    console.log(
      `${this.user} made a payment of $${amountInCents / 100} with Stripe.`
    );
  }
}

class Paypal {
  makePayment(user, amountInDollars) {
    console.log(`${user} made payment of $${amountInDollars} with Paypal.`);
  }
}

abstract class PaymentProcessor {
  user: string;
  constructor(user: string) {
    this.user = user;
  }

  pay() {}
}
