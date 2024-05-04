


export class PaymentDetails {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  cardNumber: string;
  amount: number;


  constructor(id: number, firstName: string, lastName: string, email: string, cardNumber: string, amount: number) {
    this.id = "booking_"+(id);
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.cardNumber = cardNumber;
    this.amount = amount;
  }
}
