import { model, Schema, Document } from 'mongoose';
import { Admin } from '@interfaces/admins.interface';

const AdminSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone_no: {
    type: String,
    required: true,
  },
  status: {
    type: Number,
    required: true,
  },
  roles: [
    {
      _id: { type: Schema.Types.ObjectId, ref: 'Role' },
      name: String,
    },
  ],
});

export const AdminModel = model<Admin & Document>('Admin', AdminSchema);
