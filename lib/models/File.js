import mongoose from "mongoose";
const Schema = mongoose.Schema;

const filesSchema = new Schema(
  {
    filename: {
      type: "String",
      required: true,
    },
    securedUrl: {
      type: "String",
      required: true,
    },
    format: {
      type: "String",
      required: true,
    },
    sizeInBytes: {
      type: "Number",
      required: true,
    },
    sender: { type: "String" },
    receiver: { type: "String" },
  },
  { timestamps: true }
);

export default mongoose.models.File || mongoose.model("File", filesSchema);
