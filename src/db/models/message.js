import { model, Schema } from 'mongoose';
import mongooseDelete from 'mongoose-delete';

const Message = new Schema(
  {
    message: {type: String, required: true},
    from: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    mediation: { type: Schema.Types.ObjectId, ref: 'Mediation', required: true },
  },
  {
    timestamps: true,
  }
);

Message.plugin(mongooseDelete);

export default model('Message', Message);