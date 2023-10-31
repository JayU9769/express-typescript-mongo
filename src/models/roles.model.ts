import { model, Schema, Document } from 'mongoose';
import {EGuard, IRole} from '@interfaces/roles.interface';

const RoleSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  guard: {
    type: String,
    enum: EGuard,
    default: EGuard.WEB,
  }
}, { timestamps: true });

export const RoleModel = model<IRole & Document>('Role', RoleSchema);
