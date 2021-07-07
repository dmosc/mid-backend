import { model, Schema } from 'mongoose';
import mongooseDelete from 'mongoose-delete';
import { events } from '@utils/constants';

const Event = new Schema(
  {
    type: { type: String, enum: [...events], required: true },
    triggeredBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    mediation: { type: Schema.Types.ObjectId, ref: 'Mediation', required: true },
  },
  {
    timestamps: true,
  }
);

Event.plugin(mongooseDelete);

export default model('Event', Event);
