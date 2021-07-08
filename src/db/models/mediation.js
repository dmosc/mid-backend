import { model, Schema } from 'mongoose';
import mongooseDelete from 'mongoose-delete';
import { states } from '@utils/constants';

const Mediation = new Schema(
  {
    start: { type: Date },
    end: { type: Date },
    description: { type: String },
    zoomUrl: { type: String, required: true },
    inviteesEmails: { type: [String], required: true },
    files: { type: [String], default: [] },
    password: { type: String, required: true },
    state: { type: String, enum: [...states], required: true },
    complaint: { type: Schema.Types.ObjectId, ref: 'Complaint' },
    mediator: { type: Schema.Types.ObjectId, ref: 'User' },
    representatives: { type: [Schema.Types.ObjectId], ref: 'User', required: true },
    requestedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  {
    timestamps: true,
  }
);

Mediation.plugin(mongooseDelete);

export default model('Mediation', Mediation);
