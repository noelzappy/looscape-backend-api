import { Document, model, Schema } from 'mongoose';
import { ROLE, User } from '@interfaces/users.interface';
import toJSON from './plugins/toJson.plugin';
import paginate from './plugins/paginate.plugin';
import { DB_COLLECTIONS } from '@/config';
import { compare, hash } from 'bcrypt';

const UserSchema: Schema<User & Document> = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    private: true,
  },
  name: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  company: {
    type: String,
  },
  country: {
    type: String,
  },
  role: {
    type: String,
    enum: Object.values(ROLE),
    default: ROLE.USER,
  },
});

UserSchema.plugin(toJSON);
UserSchema.plugin(paginate);

/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
UserSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
};

/**
 * Check if password matches the user's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
UserSchema.methods.isPasswordMatch = async function (password) {
  return compare(password, this.password || '');
};

/**
 * Hashes the password of the user if it has been modified
 */
UserSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await hash(this.password, 10);
  }
  next();
});

export const UserModel = model<User & Document>(DB_COLLECTIONS.USER, UserSchema);
