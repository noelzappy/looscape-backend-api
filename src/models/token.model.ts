import { DB_COLLECTIONS } from '@/config';
import { TOKEN_TYPE, TokenData } from '@/interfaces/auth.interface';
import { model, Schema, Document } from 'mongoose';

const TokenSchema: Schema = new Schema(
  {
    token: {
      type: String,
      required: true,
      unique: true,
    },
    user: {
      type: String,
      required: true,
      ref: 'User',
    },
    type: {
      type: String,
      enum: Object.values(TOKEN_TYPE),
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const TokenModel = model<TokenData & Document>(DB_COLLECTIONS.TOKEN, TokenSchema);
