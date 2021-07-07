import { model, Schema } from 'mongoose';
import mongooseDelete from 'mongoose-delete';
import { states } from '@utils/constants';

const Mediation = new Schema(
  {
    start: { type: Date, default: Date.now },
    end: { type: Date },
    zoomUrl: { type: String, required: true },
    inviteesEmails: { type: [String], required: true },
    files: { type: [String], default: [] },
    password: { type: String, required: true },
    state: { type: String, enum: [...states], required: true },
    complaint: { type: Schema.Types.ObjectId, ref: 'Complaint' },
    mediator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    representatives: { type: [Schema.Types.ObjectId], ref: 'User', required: true },
    requestedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  {
    timestamps: true,
  }
);

Mediation.plugin(mongooseDelete);

export default model('Mediation', Mediation);
