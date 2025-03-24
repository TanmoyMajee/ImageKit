import mongoose , { Schema , model , models} from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser {
  email: string;
  password: string;
  _id?:mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema = new mongoose.Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  }
},
  { timestamps: true }
)
// hash password before saving , pre is a middleware hook , if password is  modified then 
// it will not hash the password again
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")){
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
})
// check if user already exists
const User = models?.ImageKiitUser || model<IUser>("ImageKiitUser", userSchema);

export default User;
