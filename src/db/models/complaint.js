import { model, Schema } from 'mongoose';
import mongooseDelete from 'mongoose-delete';

const Complaint = new Schema(
  {
    from: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

Complaint.plugin(mongooseDelete);

export default model('Complaint', Complaint);
