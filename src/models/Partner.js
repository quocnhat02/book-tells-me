import mongoose from "mongoose";

const { Schema } = mongoose;

const partnerSchema = new Schema({
  name: { type: String, maxLength: 50 },
  urlPartner: { type: String, maxLength: 2000 },
});

module.exports = mongoose.model("Partner", partnerSchema);
