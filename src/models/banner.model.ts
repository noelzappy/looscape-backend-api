import { Document, model, Schema } from 'mongoose';
import toJSON from './plugins/toJson.plugin';
import paginate from './plugins/paginate.plugin';
import { DB_COLLECTIONS } from '@/config';
import { BannerStatus, IBanner } from '@/interfaces/banner.interface';

const BannerSchema: Schema<IBanner & Document> = new Schema(
  {
    assetType: {
      type: String,
      enum: ['image', 'video'],
      required: true,
    },
    assetUrl: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    board: {
      type: Schema.Types.ObjectId,
      ref: DB_COLLECTIONS.BOARD,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: DB_COLLECTIONS.USER,
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(BannerStatus),
      default: BannerStatus.PENDING,
      required: true,
    },
    duration: {
      type: Number,
      enum: [15, 30, 45, 60],
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

BannerSchema.plugin(toJSON);
BannerSchema.plugin(paginate);

const BannerModel = model<IBanner & Document>(DB_COLLECTIONS.BANNER, BannerSchema);

export default BannerModel;
