export enum PaymentStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED',
  DECLINED = 'DECLINED',
}

export interface IPayment {
  id: string;
  _id: string;
  internalReference: string;
  externalReference: string;
  date: Date;
  amountCharged: number;
  currency: string;
  paymentMethod: string;
  paymentStatus: PaymentStatus;
  paymentGateway: string;
  amountReceived: number;
  metadata: any;
}
