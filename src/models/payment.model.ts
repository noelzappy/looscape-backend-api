import { Document, model, Schema } from 'mongoose';
import toJSON from './plugins/toJson.plugin';
import paginate from './plugins/paginate.plugin';
import { DB_COLLECTIONS } from '@/config';
import { IPayment } from '@/interfaces/payment.interface';

const PaymentSchema: Schema<IPayment> = new Schema<IPayment>(
  {
    internalReference: {
      type: String,
      required: true,
    },
    externalReference: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    amountCharged: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    paymentStatus: {
      type: String,
      required: true,
    },
    paymentGateway: {
      type: String,
      required: true,
    },
    amountReceived: {
      type: Number,
      required: true,
    },
    metadata: {
      type: Object,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

PaymentSchema.plugin(toJSON);
PaymentSchema.plugin(paginate);

export const PaymentModel = model<IPayment & Document>(DB_COLLECTIONS.PAYMENT, PaymentSchema);

export default PaymentModel;
