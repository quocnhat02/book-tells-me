import mongoose from "mongoose";

const { Schema } = mongoose;

const partnerSchema = new Schema({
  name: { type: String, maxLength: 100 },
  urlPartner: { type: String, maxLength: 100 },
});

module.exports = mongoose.model("Partner", partnerSchema);
