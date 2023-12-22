import { Document, model, Schema } from 'mongoose';
import toJSON from './plugins/toJson.plugin';
import paginate from './plugins/paginate.plugin';
import { DB_COLLECTIONS } from '@/config';
import { IBoardLocation } from '@/interfaces/board.interface';

const BoardLocationSchema: Schema<IBoardLocation & Document> = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    country: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    postalCode: {
      type: String,
    },
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
    googlePlaceId: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

BoardLocationSchema.plugin(toJSON);
BoardLocationSchema.plugin(paginate);

export const BoardLocationModel = model<IBoardLocation & Document>(DB_COLLECTIONS.BOARD_LOCATION, BoardLocationSchema);

export default BoardLocationModel;
