import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";

const mechanicSchema = new Schema(
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
    },
    mobile: {
      type: String,
      required: [true, "Please enter the mobile number"],
    },
    experience: {
      type: String,
      required: [true, "Please enter the experience"],
    },
    picture: {
      type: String,
      default: "",
    }
  },
  { timestamps: true }
);

mechanicSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});
mechanicSchema.methods.matchPassword = async function(password){
  return await bcrypt.compare(password,this.password);
}

const mechanicModel = mongoose.models?.mechanic || mongoose.model("mechanic", mechanicSchema);

export default mechanicModel;
