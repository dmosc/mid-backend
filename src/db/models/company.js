import { model, Schema } from 'mongoose';
import mongooseDelete from 'mongoose-delete';

const Address = new Schema({
  country: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  street: { type: String, required: true },
  postcode: { type: String, required: true },
});

const Company = new Schema(
  {
    name: { type: String, required: true },
    businessName: { type: String, required: true },
    address: { type: Address, required: true },
  },
  {
    timestamps: true,
  }
);

Company.plugin(mongooseDelete);

export default model('Company', Company);
