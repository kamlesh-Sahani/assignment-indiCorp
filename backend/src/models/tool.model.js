import mongoose, { Schema } from "mongoose";

const toolSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Please enter the tool title"],
    },
    category: {
      type: String,
      required: [true, "Please enter the tool category"],
    },
    image: {
      type: String,
      default: ""
    },
    quantity: {
      type: Number,
      required: [true, "Please enter the quantity"],
      min: [0, "Quantity cannot be negative"],
    },
  
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "admin",
      required: true,
    },
  },
  { timestamps: true }
);

const toolModel = mongoose.models?.tool || mongoose.model("tool", toolSchema);

export default toolModel;
