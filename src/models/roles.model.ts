import { model, Schema, Document } from 'mongoose';
import { Role } from '@interfaces/roles.interface';

const RoleSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

export const RoleModel = model<Role & Document>('Role', RoleSchema);
