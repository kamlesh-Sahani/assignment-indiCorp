import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";

const adminSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter the name"],
    },
    email: {
      type: String,
      required: [true, "Please enter the email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please enter the password"],
      select: false,
      minlength: [8, "Password must be at least 8 characters long"],
    }
  },
  { timestamps: true }
);

adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});
adminSchema.methods.matchPassword = async function(password){
  return await bcrypt.compare(password,this.password);
}

const adminModel = mongoose.models?.admin || mongoose.model("admin", adminSchema);

export default adminModel;
