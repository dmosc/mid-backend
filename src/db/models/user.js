import { model, Schema } from 'mongoose';
import mongooseDelete from 'mongoose-delete';
import { roles } from '@utils/constants';

const Phone = new Schema({
  countryCode: { type: String, required: true },
  number: { type: String, required: true },
});

const User = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    profileImg: { type: String },
    phones: { type: [Phone], default: [], required: true },
    password: { type: String, required: true },
    mediator: {
      facilitatorId: { type: String, required: true },
      certificateUrl: { type: String, required: true },
      biography: { type: String, required: true },
    },
    representative: {
      role: { type: String, enum: [...roles], required: true },
      company: { type: Schema.Types.ObjectId, ref: 'Company', required: true },
    },
  },
  {
    timestamps: true,
  }
);

User.plugin(mongooseDelete);

export default model('User', User);
