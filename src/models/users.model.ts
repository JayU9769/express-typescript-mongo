import { model, Schema, Document } from 'mongoose';
import { IUser } from '@interfaces/users.interface';

const UserSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
}, { timestamps: true });

export const UserModel = model<IUser & Document>('User', UserSchema);
