import { Document, model, Schema } from 'mongoose';
import toJSON from './plugins/toJson.plugin';
import paginate from './plugins/paginate.plugin';
import { DB_COLLECTIONS } from '@/config';
import { BoardStatus, IBoard } from '@/interfaces/board.interface';

const BoardSchema: Schema<IBoard & Document> = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    height: {
      type: Number,
      required: true,
    },
    width: {
      type: Number,
      required: true,
    },
    doubleSided: {
      type: Boolean,
      required: true,
    },
    location: {
      type: Schema.Types.ObjectId,
      ref: DB_COLLECTIONS.BOARD_LOCATION,
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(BoardStatus),
      default: BoardStatus.ACTIVE,
    },
  },
  {
    timestamps: true,
  },
);

BoardSchema.plugin(toJSON);
BoardSchema.plugin(paginate);

export const BoardModel = model<IBoard & Document>(DB_COLLECTIONS.BOARD, BoardSchema);

export default BoardModel;
